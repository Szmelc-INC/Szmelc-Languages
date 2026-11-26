#!/usr/bin/env node
// Tokenizes every sample with its grammar (the VS Code engine) and checks key scopes.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import vsctm from "vscode-textmate";
import oniguruma from "vscode-oniguruma";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reg = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const wasm = readFileSync(require.resolve("vscode-oniguruma/release/onig.wasm")).buffer;
await oniguruma.loadWASM(wasm);

const byScope = Object.fromEntries(reg.languages.map((l) => [l.scope, join(root, "grammars", `${l.slug}.tmLanguage.json`)]));
const registry = new vsctm.Registry({
  onigLib: Promise.resolve({ createOnigScanner: (p) => new oniguruma.OnigScanner(p), createOnigString: (s) => new oniguruma.OnigString(s) }),
  loadGrammar: async (scope) => byScope[scope] ? vsctm.parseRawGrammar(readFileSync(byScope[scope], "utf8"), byScope[scope]) : null,
});

// [sample file, token text, scope that must be present]
const expect = {
  "Vibe-C": [["hello.vc", "vibe-c", "keyword.other.signature"], ["hello.vc", "send", "keyword.control"], ["hello.vc", "yolo", "keyword.control.vibe"], ["hello.vc", "chill", "storage.modifier"], ["hello.vc", "prompt", "comment.block.prompt"], ["ring.vic", "fr", "constant.language"]],
  "Szajs Script": [["hello.szajs", "robota", "storage.type.function"], ["hello.szajs", "dopóki", "keyword.control"], ["hello.szajs", "złap", "keyword.control"], ["hello.szajs", "wersja", "storage.type.annotation"], ["backup.sx", "prawda", "constant.language"]],
  "Szmelc.inc": [["sernik.szmelc", "%szmelc.inc", "keyword.other.signature"], ["sernik.szmelc", "@corp", "keyword.control.directive"], ["sernik.szmelc", "project.authors", "entity.name.section"], ["sernik.szmelc", "&shared.helpers", "variable.other.reference"], ["common.inc", "nie", "constant.language.boolean"], ["release.sernik", "2026-11-26T12:00:00Z", "constant.other.date"]],
  "Markdebil": [["README.debil", "markdebil", "keyword.other.signature"], ["README.debil", "!!!NAJPIERW PODŁĄCZ DO PRĄDU!!!", "markup.bold.shout"], ["README.debil", ">:(", "punctuation.definition.rant"], ["README.debil", "[[Kabel]]", "markup.underline.link.wiki"], ["notes.mdbl", "==Ustalenie==", "markup.highlight"]],
  "Machen": [["build.machen", "ziel", "storage.type.target"], ["build.machen", "bauen", "entity.name.function.target"], ["build.machen", "setze", "storage.modifier"], ["build.machen", "mach", "keyword.control.command"], ["build.machen", "!", "storage.modifier.phony"], ["gemeinsam.mach", "umgebung", "support.function.builtin"]],
  "R3000": [["wreck.r3k", "R3000", "keyword.other.signature"], ["wreck.r3k", "|>", "keyword.operator"], ["wreck.r3k", "rozwal", "support.function.wrecker"], ["wreck.r3k", "!!!", "keyword.control.panic"], ["wreck.r3k", "ziarno", "variable.parameter.named"], ["fuzz.r3000", "moc", "keyword.other.directive"]],
};

let fail = 0, ok = 0;
for (const l of reg.languages) {
  const grammar = await registry.loadGrammar(l.scope);
  if (!grammar) { console.error(`✗ ${l.name}: grammar failed to load`); fail++; continue; }
  const tokens = new Map();
  const dir = join(root, "samples", l.name);
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) continue;
    let stack = vsctm.INITIAL; const list = [];
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const r = grammar.tokenizeLine(line, stack);
      for (const t of r.tokens) list.push([line.slice(t.startIndex, t.endIndex), t.scopes.join(" ")]);
      stack = r.ruleStack;
    }
    tokens.set(f, list);
  }
  for (const [file, text, scope] of expect[l.name] ?? []) {
    const hit = (tokens.get(file) ?? []).some(([t, s]) => t.trim() === text && s.includes(scope));
    if (hit) ok++; else { fail++; console.error(`✗ ${l.name} ${file}: "${text}" lacks ${scope}`); }
  }
}
console.log(`${fail ? "✗" : "✓"} grammar assertions: ${ok} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
