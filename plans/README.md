# Animation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Coordinate the hero scroll motion | HIGH | DONE |
| 002 | Neutralize the black foundation | MEDIUM | DONE |
| 003 | Restore scroll-driven section masks | HIGH | DONE |
| 004 | Add a slow hero shader | MEDIUM | DONE |

## Recommended execution order

1. Plan 002 established the exact-black color contract used by every later visual.
2. Plan 003 restored section masks independently of the hero shader and protects content readability.
3. Plan 004 added the shader on top of plan 002 while preserving the motion completed by plan 001.

## Dependencies

- Plan 001 is complete.
- Plans 001 through 004 are complete.
