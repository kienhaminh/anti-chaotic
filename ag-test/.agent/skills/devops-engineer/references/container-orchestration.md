# Container Orchestration

## Docker

### Dockerfile Best Practices

1.  **Multi-Stage Builds**: Keep final images small.

    ```dockerfile
    # Build Stage
    FROM node:20-alpine AS builder
    WORKDIR /app
    COPY . .
    RUN npm ci && npm run build

    # Run Stage
    FROM node:20-alpine
    WORKDIR /app
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    CMD ["node", "dist/index.js"]
    ```

2.  **.dockerignore**: Always include one to avoid context bloat.
3.  **User**: Run as non-root user (`USER node`).

## Kubernetes (K8s)

### Core Resources

- **Pod**: Smallest deployable unit (containers).
- **Deployment**: Manages Pod replicas and rollouts.
- **Service**: Exposes network access (ClusterIP, LoadBalancer).
- **Ingress**: HTTP/HTTPS routing.
- **ConfigMap/Secret**: Configuration separation.

### Manifest Example (`deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-registry/my-app:v1
          ports:
            - containerPort: 8080
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
```

### Best Practices

- **Liveness/Readiness Probes**: Mandatory for self-healing and zero-downtime.
- **Resources**: ALWAYS set requests and limits.
- **Namespaces**: Use namespaces to isolate environments.
