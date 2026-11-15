---
'@rushdb/javascript-sdk': patch
---

Surface the reason of every error body. A failed request now raises an `Error` whose message is `"<status> <reason>"` for a protocol error envelope (`{"error":{"code","message","retryable"}}`), a bare engine error such as `{"error":"unauthorized"}` and a RushDB Cloud error alike, in direct mode and over the HTTP client. The error also carries `code` and `retryable` when the server sends them. An empty or non-JSON body keeps the HTTP status. Before, an engine auth failure in direct mode read `401 engine request failed`.
