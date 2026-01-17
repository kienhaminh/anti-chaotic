# Cloud Providers Reference

## Service Mapping Cheat Sheet

| Service Category          | Amazon Web Services (AWS) | Google Cloud Platform (GCP) | Microsoft Azure                     |
| :------------------------ | :------------------------ | :-------------------------- | :---------------------------------- |
| **Compute - VM**          | EC2                       | Compute Engine              | Virtual Machines                    |
| **Compute - Serverless**  | Lambda                    | Cloud Functions             | Azure Functions                     |
| **Compute - Managed K8s** | EKS                       | GKE                         | AKS                                 |
| **Compute - Containers**  | ECS / Fargate             | Cloud Run                   | Container Instances / Apps          |
| **Storage - Object**      | S3                        | Cloud Storage (GCS)         | Blob Storage                        |
| **Storage - Block**       | EBS                       | Persistent Disk             | Disk Storage                        |
| **Storage - File**        | EFS                       | Filestore                   | Azure Files                         |
| **Database - RDBMS**      | RDS / Aurora              | Cloud SQL / Spanner         | Azure SQL / Database for PostgreSQL |
| **Database - NoSQL**      | DynamoDB                  | Firestore / BigTable        | Cosmos DB                           |
| **Caching**               | ElastiCache               | Memorystore                 | Azure Cache for Redis               |
| **Networking - CDN**      | CloudFront                | Cloud CDN                   | Azure Front Door / CDN              |
| **Networking - DNS**      | Route 53                  | Cloud DNS                   | Azure DNS                           |
| **IaC**                   | CloudFormation / CDK      | Deployment Manager          | ARM Templates / Bicep               |

## AWS (Amazon Web Services)

### Quick Start

- **CLI**: `aws`
- **Auth**: `aws configure` (requires `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

### Best Practices

- **Roles**: Use IAM Roles for EC2/Lambda, never baked-in credentials.
- **Regions**: Always specify regions in code (e.g., `us-east-1`).
- **Cost**: Use Budgets and Cost Explorer alarms.

## GCP (Google Cloud Platform)

### Quick Start

- **CLI**: `gcloud`
- **Auth**: `gcloud auth login` or service account JSON (`GOOGLE_APPLICATION_CREDENTIALS`).

### Best Practices

- **Projects**: Use hierarchal project structure (Folder -> Project).
- **APIs**: Explicitly enable required APIs in Terraform (`google_project_service`).
- **Network**: Use VPC-native clusters for GKE.

## Azure

### Quick Start

- **CLI**: `az`
- **Auth**: `az login` or Service Principal (`ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`).

### Best Practices

- **Resource Groups**: Logical container for lifecycle management.
- **Policies**: Use Azure Policy for governance (e.g., allow regions).
