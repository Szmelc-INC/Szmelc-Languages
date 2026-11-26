# Szmelc.inc

> The incorporated manifest. One INI-like format describes a project, shares fragments between projects, and records "Sernik receipts" for baked releases.

| Field | Value |
|---|---|
| Type | data |
| Color | `#105c5c` (Szmelc accent) |
| Extensions | `.szmelc` (manifest, primary), `.inc` (include fragment, "incorporated"), `.sernik` (Sernik receipt) |
| Filenames | `Szmelcfile`, `szmelc.inc`, `Szmelc.inc` |
| MIME | `application/x-szmelc-inc` |
| Signature | `%szmelc.inc <version> [manifest\|include\|sernik]` on line 1 (**required**) |
| TextMate scope | `source.szmelc-inc` |

## Why the signature is required
`.inc` already belongs to PHP, Pascal, POV-Ray, NASL, SourcePawn, BitBake, C++, SQL and several assembly dialects. A `.inc` file counts as Szmelc.inc only when line 1 is the signature. GitHub Linguist (heuristic), `file(1)` magic, shared-mime-info and the vim ftdetect all use that same rule. For `.szmelc` and `.sernik` files the signature is recommended, not required.

## Profiles
| Profile | Extension | Purpose |
|---|---|---|
| `manifest` | `.szmelc`, `Szmelcfile` | describes one project |
| `include` | `.inc` | a fragment that manifests pull in with `@include` |
| `sernik` | `.sernik` | a receipt: provenance, hashes and "ingredients" of one release |

## Syntax
```szmelc
%szmelc.inc 1.0 manifest
;; comment
@corp    "Szmelc.INC"          ;; directive: top-level corp metadata
@include "common.inc"          ;; merge a fragment

[project]                      ;; section; dots nest: [project.authors]
name    = "Sernik"             ;; string
version = 6.6.6                ;; version or number
stable  = tak                  ;; boolean: tak|nie|yes|no|true|false
tags    = [sernik, szmelc]     ;; list
helpers = &shared.helpers      ;; reference to another key
flags   = $SZMELC_FLAGS        ;; environment variable
notes   = <<<
  heredoc text
>>>
```

Standard directives: `@corp`, `@ticker`, `@motto`, `@include`, `@baked` (ISO 8601 timestamp, used in sernik receipts). Readers must keep unknown directives.

## Example
See [`samples/Szmelc.inc/`](../samples/Szmelc.inc).
