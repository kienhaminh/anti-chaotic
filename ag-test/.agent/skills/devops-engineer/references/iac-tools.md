# Infrastructure as Code (IaC) Tools

## Terraform (The Standard)

### Structure

- `main.tf`: Resources
- `variables.tf`: Input schemas
- `outputs.tf`: Return values
- `provider.tf`: Provider config

### Essential Commands

```bash
terraform init          # Initialize backend
terraform plan -out=tfplan # Preview changes
terraform apply tfplan  # Execute changes
terraform fmt -recursive # Format code
terraform validate      # Check syntax
```

### Best Practices

- **Remote Backend**: Store state in S3/GCS with locking (DynamoDB).
- **Modules**: Use standard directory structure for reusability.
- **Versions**: Pin provider versions in `required_providers`.

## Pulumi (The Modern)

### Philosophy

Write infrastructure in real programming languages (TS, Python, Go).

### Essential Commands

```bash
pulumi new aws-typescript # Start project
pulumi up                 # Plan & Apply
pulumi stack ls           # List stacks (dev/prod)
```

### Best Practices

- **ComponentResources**: Group multiple resources into logical components (e.g., `VpcComponent`).
- **Secrets**: Use `pulumi config set --secret` to encrypt values.

## Ansible (The Configurator)

### Philosophy

Agentless configuration management using YAML playbooks and SSH.

### Essential Commands

```bash
ansible-playbook -i inventory site.yml
```

### Best Practices

- **Idempotency**: Ensure tasks can run multiple times without side effects.
- **Roles**: Organize tasks into reusable Roles (Galaxy).
- **Vault**: Encrypt sensitive variables with `ansible-vault`.
