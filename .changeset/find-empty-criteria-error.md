---
"@rushdb/javascript-sdk": patch
---

Fix `findById`, `findOne` and `findUniq` silently returning an arbitrary record when called with `undefined` criteria: they now throw `EmptyTargetError` before any request is sent.
