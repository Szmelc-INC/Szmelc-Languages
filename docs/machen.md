# Machen

> A build system that reads like a German Makefile: `ziel` (target), `setze` (set), `mach` (do it). It has no tab rule: indentation is any whitespace.

| Field | Value |
|---|---|
| Type | programming |
| Color | `#1f8a8a` |
| Extensions | `.machen` (primary), `.mach` (included fragments) |
| Filenames | `Machenfile`, `machenfile`, `Machendatei` |
| MIME | `text/x-machen` |
| Signature | `#! machen <version>` on line 1 (optional) |
| Interpreter | `machen` |
| TextMate scope | `source.machen` |

## Syntax
```machen
#! machen 1.0
importiere "gemeinsam.machen"     # include another file
setze CC      = "vibecc"          # set
setze FLAGS  ?= "-O2"             # set only if unset (env wins)
setze SRC    += glob("src/*.vc")  # append

standard alles                    # default target

ziel alles: bauen pruefen         # target with dependencies

ziel bauen: $SRC
    mach $CC $FLAGS -o build/app $SRC   # run a command
    sag "fertig"                        # echo

ziel sauber!:                     # "!" = always run (phony)
    mach rm -rf build
```

| Keyword | Meaning |
|---|---|
| `ziel name[!]: deps` | target (`!` marks it phony) |
| `setze` with `=`, `?=`, `+=` | set variable / set if unset / append |
| `mach` | run a shell command |
| `sag` | print a message |
| `fehler` | print to stderr and fail |
| `wenn` / `sonst` / `ende` | if / else / end |
| `fuer x in list ... ende` | loop |
| `importiere` | include |
| `standard` | default target |

Variables: `$NAME`, `${NAME}`. Automatic variables, as in make: `$@` (target), `$<` (first dependency), `$^` (all dependencies).
Builtins: `glob()`, `existiert()`, `umgebung(name, default)`, `ersetze()`, `basisname()`.

## Example
See [`samples/Machen/build.machen`](../samples/Machen/build.machen).
