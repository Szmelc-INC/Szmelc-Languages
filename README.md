<div align="center">

# Szmelc-Languages

**Six languages and formats of the Szmelc™ family: specs, grammars and the files that make tools recognise them.**

[![CI status](https://img.shields.io/github/actions/workflow/status/Szmelc-INC/Szmelc-Languages/check.yml?branch=main&label=check&logo=githubactions&logoColor=white)](https://github.com/Szmelc-INC/Szmelc-Languages/actions/workflows/check.yml)
[![License: MIT](https://img.shields.io/github/license/Szmelc-INC/Szmelc-Languages?logo=opensourceinitiative&logoColor=white&color=105c5c)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-6-105c5c)](#the-languages)
[![Linguist fork](https://img.shields.io/badge/linguist-Szmelc--INC%2Flinguist-105c5c?logo=github)](https://github.com/Szmelc-INC/linguist)

</div>

## The languages
| | Language | Type | Extensions | Filenames | Spec |
|---|---|---|---|---|---|
| ![](https://img.shields.io/badge/-%20-7fffd4) | **Vibe-C** | programming | `.vc` `.vic` `.vice` | | [docs/vibe-c.md](docs/vibe-c.md) |
| ![](https://img.shields.io/badge/-%20-7a5c2e) | **Szajs Script** | programming | `.szajs` `.sx` | | [docs/szajs-script.md](docs/szajs-script.md) |
| ![](https://img.shields.io/badge/-%20-105c5c) | **Szmelc.inc** | data | `.szmelc` `.inc`¹ `.sernik` | `Szmelcfile` `szmelc.inc` | [docs/szmelc-inc.md](docs/szmelc-inc.md) |
| ![](https://img.shields.io/badge/-%20-c0c0c0) | **Markdebil** | prose | `.debil` `.dbl` `.mdbl` | | [docs/markdebil.md](docs/markdebil.md) |
| ![](https://img.shields.io/badge/-%20-1f8a8a) | **Machen** | programming (build) | `.machen` `.mach` | `Machenfile` `Machendatei` | [docs/machen.md](docs/machen.md) |
| ![](https://img.shields.io/badge/-%20-b83a3a) | **R3000** (Rozkurwator 3000) | programming | `.r3k` `.r3000` `.rzk` | | [docs/r3000.md](docs/r3000.md) |

¹ `.inc` is shared with PHP, Pascal, assembly and others. It counts as Szmelc.inc only when line 1 is `%szmelc.inc <version>`.

Each format has a **signature**: a fixed first line, shebang or frontmatter. Linguist heuristics, `file(1)` magic, shared-mime-info, vim and VS Code all use it to detect the format:

| Language | Signature |
|---|---|
| Vibe-C | `//! vibe-c 0.3` |
| Szajs Script | `#!/usr/bin/env szajs` |
| Szmelc.inc | `%szmelc.inc 1.0 manifest\|include\|sernik` |
| Markdebil | `+++ markdebil` frontmatter |
| Machen | `#! machen 1.0` |
| R3000 | `;; R3000` or `#!/usr/bin/env r3k` |

## Recognition on GitHub: what works and what waits
The colored language bar on github.com comes from [github/linguist](https://github.com/github/linguist). Linguist only adds a language after it is in wide use: about 2000 files per extension, from many unrelated repositories ([CONTRIBUTING.md](https://github.com/github/linguist/blob/main/CONTRIBUTING.md#language-extension-and-filename-usage-requirements)). It closes PRs for new or hobby languages. So:

1. **Ready now:** [Szmelc-INC/linguist](https://github.com/Szmelc-INC/linguist) is a Linguist fork that knows all six languages: definitions, colors, `.inc` heuristic, samples and grammars. It passes the Linguist test suite. Use it to compute language stats locally or in CI:
   ```sh
   gem install specific_install && gem specific_install -l https://github.com/Szmelc-INC/linguist
   github-linguist --breakdown .
   ```
2. **Interim on github.com:** copy [`integrations/gitattributes/interim.gitattributes`](integrations/gitattributes/interim.gitattributes) into a repo's `.gitattributes`. Files then count as the nearest existing language (Vibe-C → C, Machen → Makefile, …). `linguist-language` can only name languages that Linguist already ships.
3. **Upstream:** when there are enough files in the wild, open a PR from the fork to `github/linguist`. Ready-made snippets are in [`linguist/`](linguist).

## Integrations
| Target | File | Install |
|---|---|---|
| VS Code | [`integrations/vscode/`](integrations/vscode) | `cd integrations/vscode && npx @vscode/vsce package && code --install-extension *.vsix` |
| Vim / Neovim | [`integrations/vim/`](integrations/vim) | copy `ftdetect/` and `syntax/` to `~/.vim/` (or `~/.config/nvim/`) |
| Desktop MIME | [`integrations/mime/szmelc-languages.xml`](integrations/mime/szmelc-languages.xml) | `xdg-mime install integrations/mime/szmelc-languages.xml` |
| `file(1)` | [`integrations/magic/szmelc.magic`](integrations/magic/szmelc.magic) | `file -m integrations/magic/szmelc.magic hello.vc` |
| GitHub (interim) | [`integrations/gitattributes/interim.gitattributes`](integrations/gitattributes/interim.gitattributes) | append to `.gitattributes` |
| Any TextMate editor | [`grammars/`](grammars) | Sublime, Zed, Shiki, `bat` (`bat cache --build`) |

### Packages
```sh
makepkg -si                 # Arch: installs MIME, magic, vim files, grammars and docs
nix profile install github:Szmelc-INC/Szmelc-Languages
nix run github:Szmelc-INC/Szmelc-Languages   # consistency check
```

## Layout and contributing
[`registry.json`](registry.json) is the single source of truth. Every file under `linguist/` and `integrations/` is generated from it:

```sh
npm ci
npm run build   # regenerate
npm run check   # registry ↔ grammars ↔ samples ↔ generated files, then tokenize every sample with the VS Code engine
```

To add a language, add an entry to `registry.json`, a grammar in `grammars/`, samples in `samples/<Name>/` (one per extension and filename) and a spec in `docs/`, then run `npm run build`.

## License
[MIT](LICENSE) © Szmelc.INC. All samples were written for this repo and are MIT too.
