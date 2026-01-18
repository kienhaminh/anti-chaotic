# SaaS (Software as a Service) Domain

## Overview

SaaS products are cloud-based software solutions delivered on a subscription basis. BA focus is on user journeys, subscription management, and self-service capabilities.

## Key Entities

- **Tenant/Organization**: Multi-tenant architecture considerations
- **User Roles**: Admin, Member, Guest, Billing Admin
- **Subscription**: Plan, Billing Cycle, Usage Limits
- **Feature Flags**: Entitlements per plan tier

## Common Use Cases

1. **User Onboarding**: Sign up → Email verify → First-time setup wizard
2. **Team Management**: Invite users, Assign roles, Remove members
3. **Subscription Management**: Upgrade, Downgrade, Cancel, Pause
4. **Usage Tracking**: Quota monitoring, Overage alerts
5. **Self-Service Support**: Knowledge base, Ticket submission

## Key Metrics to Document

- **ARR/MRR**: Annual/Monthly Recurring Revenue
- **Churn Rate**: Customer attrition
- **LTV/CAC**: Lifetime Value vs Customer Acquisition Cost
- **DAU/MAU**: Daily/Monthly Active Users
- **NPS**: Net Promoter Score

## BA Considerations

- **Multi-tenancy**: Data isolation between customers
- **Plan Gating**: Which features at which tier
- **Trial Logic**: Time-limited trials, feature-limited trials
- **Billing Integration**: Stripe, Paddle, Chargebee patterns
- **SSO/SAML**: Enterprise authentication requirements
