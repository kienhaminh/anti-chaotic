# Domain Specific Guides

This guide provides tailored advice for managing products in different domains.

## 1. General SaaS (Software as a Service)

**Focus**: Growth, Retention, Churn Reduction.

- **Key Metrics**: ARR/MRR, Churn Rate, LTV/CAC, DAU/MAU.
- **Strategy**: Product-Led Growth (PLG) or Sales-Led depending on enterprise vs. SMB.
- **Discovery**: Strong focus on funnel optimization and user onboarding friction.
- **Compliance**: GDPR/CCPA are baseline.

## 2. FinTech (Financial Technology)

**Focus**: Trust, Security, Compliance, Accuracy.

- **Constraints**: Heavily regulated. "Move fast and break things" DOES NOT apply here.
- **Key Metrics**: Transaction Volume, Fraud Rate, AUM (Assets Under Management).
- **Risk Management**: Every feature must pass Legal/Compliance review before dev.
- **Data Consistency**: Ledger integrity is paramount. Double-entry accounting principles often apply to product logic.

## 3. Internal Tools & Platforms

**Focus**: Efficiency, Workflow Optimization, Employee Satisfaction.

- **Customer**: Your colleagues (Support, Ops, Sales).
- **Key Metrics**: Time to Resolve (TTR), Task Completion Time, Error Rate reduction.
- **Strategy**: "Shadowing" users is critical. You can talk to 100% of your user base.
- **Challenges**: Fighting for budget/engineering resources against revenue-generating features.

## 4. HealthTech

**Focus**: Patient Outcomes, Data Privacy (HIPAA), Usability.

- **Constraints**: High regulatory burden (FDA, HIPAA).
- **Key Metrics**: Patient Adherence, Clinical Outcomes, Claim Processing Speed.
- **Strategy**: Empathy is key. Users are often in distress.

## 5. E-Commerce

**Focus**: Conversion Rate, Average Order Value (AOV), Customer Experience.

- **Key Metrics**: Cart Abandonment Rate, GMV, Return Rate.
- **Discovery**: Heavy A/B testing on UI/UX optimization.
- **Seasonality**: Critical planning for peaks (Black Friday etc.).

## 6. EdTech (Education Technology)

**Focus**: Learning Outcomes, Engagement, Accessibility.

- **Key Metrics**: Course Completion Rate, Time on Platform, Learning Progress, NPS.
- **Personas**: Students, Teachers/Instructors, Administrators, Parents.
- **Strategy**: Gamification for engagement, adaptive learning for personalization.
- **Constraints**: Accessibility (WCAG), age-appropriate design (COPPA for children).
- **Seasonality**: Academic calendar drives demand (back-to-school, exam periods).

## 7. Blockchain / Web3

**Focus**: Decentralization, Security, User Sovereignty, Transparency.

- **Key Metrics**: TVL (Total Value Locked), Active Wallets, Transaction Volume, Gas Efficiency.
- **Constraints**: Immutability (can't "fix" bugs easily), gas costs, UX complexity.
- **Strategy**: Simplify wallet/signing UX, abstract blockchain complexity from users.
- **Risk Management**: Smart contract audits, bug bounties, gradual rollouts.
- **Community**: Token holders are stakeholders. Governance proposals matter.

## 8. Food & Beverage (F&B)

**Focus**: Operations Efficiency, Customer Experience, Inventory Management.

- **Key Metrics**: Table Turnover Rate, Order Accuracy, Delivery Time, Food Cost %.
- **Personas**: Customers, Kitchen Staff, Waiters, Managers, Delivery Drivers.
- **Strategy**: Streamline ordering flow, real-time inventory tracking, loyalty programs.
- **Constraints**: Peak hours stress testing, offline capability, diverse hardware (POS, printers).
- **Integration**: Payment gateways, delivery platforms (Grab, Gojek), accounting systems.

## 9. AI/ML Products

**Focus**: Accuracy, Explainability, Trust, Continuous Learning.

- **Key Metrics**: Model Accuracy/Precision/Recall, Latency, User Trust Score, Feedback Loop Rate.
- **Strategy**: Human-in-the-loop for critical decisions, confidence scores, graceful degradation.
- **Constraints**: Bias detection, data privacy, model interpretability requirements.
- **UX Patterns**: Progressive disclosure of AI reasoning, easy feedback mechanisms.
- **Risk Management**: Hallucination handling, fallback to non-AI flows.

## 10. Marketplace / Platform

**Focus**: Liquidity, Trust, Take Rate Optimization, Network Effects.

- **Key Metrics**: GMV, Take Rate, Buyer/Seller Ratio, Repeat Transaction Rate.
- **Strategy**: Solve chicken-and-egg problem, build trust through reviews/verification.
- **Personas**: Buyers, Sellers, Platform Admins.
- **Constraints**: Fraud prevention, dispute resolution, payment splitting.
- **Network Effects**: Focus on density (geographic, category) before breadth.
