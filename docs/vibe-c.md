# Vibe-C

> C, but vibe-coded. Same machine model, same headers, more honest keywords, and prompt blocks that record how the code was made.

| Field | Value |
|---|---|
| Type | programming |
| Color | `#7fffd4` |
| Extensions | `.vc` (source, primary), `.vic` (header, "Vibe-C include"), `.vice` (unsafe or experimental unit) |
| MIME | `text/x-vibe-c` |
| Signature | `//! vibe-c <version>` on line 1 |
| TextMate scope | `source.vibe-c` |
| Compiler | `vibecc` (transpiles to C11, then hands off to `cc`) |

## Signature and metadata
Line 1 is the signature. Metadata lines follow it. Each one is a `//!` comment with an `@key value` pair:

```c
//! vibe-c 0.3
//! @vibe immaculate        // immaculate | chill | cursed : how sure the author is
//! @model claude-opus-5-5  // model that helped write this file, if any
//! @license MIT
```

`vibecc --meta file.vc` prints these as JSON. Unknown keys are kept, not rejected.

## Prompt blocks
`/*~ ... ~*/` is a prompt block. To C it is a comment. `vibecc --prompts` lists the blocks, and an LLM tool can use them to regenerate the function under them.

```c
/*~ prompt: parse an unsigned int, return -1 when the input is sus ~*/
```

## Keywords
Vibe-C is C11 plus these keywords. Each one lowers to plain C:

| Vibe-C | C | Meaning |
|---|---|---|
| `vibe` | *(nothing)* | marks a function as vibe-coded (shows up in `--meta`) |
| `chill` | `const` | |
| `sus` | `volatile` | |
| `lowkey` / `highkey` | `static` / `extern` | |
| `send` | `return` | |
| `nocap(x)` | `assert(x)` | |
| `vibecheck(x)` | runtime check that logs and continues | |
| `bruh(msg)` | `fprintf(stderr, msg); abort();` | |
| `yolo { }` | block with bounds checks and sanitizers disabled | |
| `fr` / `cap` | `1` / `0` | |
| `#vibe strict\|loose` | pragma: in `strict` mode, `yolo` blocks are warnings | |

## Example
See [`samples/Vibe-C/hello.vc`](../samples/Vibe-C/hello.vc).
