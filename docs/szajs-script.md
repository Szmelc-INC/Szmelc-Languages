# Szajs Script

> A small scripting language with Polish keywords, for glue code nobody wants to own. "Szajs" is Polish slang for junk, and the language is proud of that.

| Field | Value |
|---|---|
| Type | programming |
| Color | `#7a5c2e` |
| Extensions | `.szajs` (primary), `.sx` (short form, for scripts in `$PATH`) |
| MIME | `text/x-szajs` |
| Signature | shebang `#!/usr/bin/env szajs` |
| Interpreter | `szajs` |
| TextMate scope | `source.szajs` |

## Metadata
Put `#@ key: value` comments directly after the shebang:

```szajs
#!/usr/bin/env szajs
#@ nazwa: backup
#@ wersja: 1.0.0
#@ licencja: MIT
#@ opis: kopia katalogu domowego
```

Recognised keys: `nazwa` (name), `wersja` (version), `autor`, `licencja`, `opis` (description) and `wymaga` (a list of required binaries). `szajs --meta plik.szajs` prints them as JSON.

## Syntax
- Blocks end with `koniec`. Indentation is for humans only.
- Keywords accept both the Polish spelling and an ASCII spelling: `jeśli`/`jesli`, `dopóki`/`dopoki`, `spróbuj`/`sprobuj`, `złap`/`zlap`, `fałsz`/`falsz`, `stała`/`stala`.
- Strings use `"..."` with `${expr}` interpolation. `'...'` strings are raw.
- Comments: `#` runs to end of line. `#[ ... ]#` is a block comment.

| Keyword | Meaning |
|---|---|
| `niech` / `stała` | let / const |
| `robota name(args) ... koniec` | function |
| `daj` | return |
| `jeśli` / `albo jeśli` / `albo` | if / else if / else |
| `dopóki` | while |
| `dla x w lista` | for-in |
| `przerwij` / `dalej` | break / continue |
| `spróbuj` / `złap e` / `wywal` | try / catch / throw |
| `i` / `lub` / `nie` | and / or / not |
| `prawda` / `fałsz` / `nic` | true / false / null |

Builtins: `wypisz` (print), `wczytaj` (read), `lista` (glob), `kopiuj` (copy), `środowisko` (env).

## Example
See [`samples/Szajs Script/hello.szajs`](<../samples/Szajs Script/hello.szajs>).
