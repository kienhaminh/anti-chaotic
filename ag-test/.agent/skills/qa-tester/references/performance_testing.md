# Performance Testing Insights & Patterns

## Core Philosophy

**"Performance is a Feature"**
A slow system is a broken system. Performance testing establishes the baseline and catches regressions before they crash production.

## Metrics That Matter

1.  **Latency**: Time to First Byte (TTFB) and Total Duration. (e.g., "95% of requests < 500ms")
2.  **Throughput**: Requests Per Second (RPS) the system can handle.
3.  **Error Rate**: Percentage of failed requests under load.

## Testing Types

1.  **Load Testing**: Simulating expected peak traffic. (Can we handle Black Friday?)
2.  **Stress Testing**: Finding the breaking point. (At what RPS does the DB crash?)
3.  **Soak Testing**: Running load for distinct periods (e.g., 24h) to find memory leaks.

## Tools of Trade

- **k6**: Developer-friendly, scriptable in JS.
- **Artillery**: Good for testing Socket.io/WebSockets.

## Example (k6 Script)

```javascript
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100, // Virtual Users
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must be faster than 500ms
  },
};

export default function () {
  const res = http.get("https://api.myapp.com/products");
  check(res, { "is status 200": (r) => r.status === 200 });
  sleep(1);
}
```
