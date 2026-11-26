# Markdebil

> Markdown for people who shout. A strict superset of CommonMark: every Markdown file is valid Markdebil, and Markdebil adds what Markdown left out (emotions).

| Field | Value |
|---|---|
| Type | prose |
| Color | `#c0c0c0` |
| Extensions | `.debil` (primary), `.dbl` (short form), `.mdbl` (Markdown-compatible: no Markdebil frontmatter) |
| MIME | `text/x-markdebil` |
| Signature | frontmatter that opens with `+++ markdebil` (optional) |
| TextMate scope | `text.markdebil` |

## Frontmatter (metadata)
```markdebil
+++ markdebil
tytul: Instrukcja dla debila   ; title
autor: Szmelc.INC
iq: 3                          ; 0-200: how much the renderer explains (lower = more hand-holding)
ton: wkurwiony                 ; spokojny | wkurwiony | debilny
+++
```

## Extensions to CommonMark
| Syntax | Renders as |
|---|---|
| `!!!TEXT!!!` | shout: bold, uppercase, red (`#b83a3a`) |
| `>:( text` | rant: a blockquote with an angry gutter |
| `?? question` | question callout |
| `==text==` | highlight (aquamarine `#7fffd4`, black text) |
| `\|\|text\|\|` | spoiler |
| `[[Page]]` | wiki link |
| `%% hidden %%` | comment, not rendered |
| `:sernik:` | emoji shortcode |

## Example
See [`samples/Markdebil/README.debil`](../samples/Markdebil/README.debil).
