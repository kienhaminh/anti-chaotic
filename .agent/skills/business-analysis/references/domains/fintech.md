# Domain: FinTech (Financial Technology)

## 1. Core Mindset

- **Precision**: Integers for money (cents), never floats.
- **Auditability**: Every action needs a trace. Immutable logs.
- **Security**: PCI-DSS compliance, Data encryption at rest/transit.

## 2. Key Terminology (Glossary)

- **KYC (Know Your Customer)**: Mandatory identity verification.
- **AML (Anti-Money Laundering)**: Monitoring for suspicious transaction patterns.
- **Ledger**: The source of truth. Double-entry bookkeeping (Debits = Credits).
- **PSP (Payment Service Provider)**: Stripe, PayPal, Adyen.
- **PCI-DSS**: Security standards for handling credit card info.

## 3. Common Entities (Data Models)

- **Wallet**: Holds balance. `user_id`, `currency`, `balance_cents`.
- **Transaction**: A movement of funds. `id`, `amount`, `source_wallet`, `dest_wallet`, `type` (deposit, withdrawal, transfer).
- **KYCprofile**: Verification status. `document_url`, `status` (pending, approved, rejected).

## 4. Key Workflows

### A. Deposit Funds (Mock)

1.  User initiates deposit $50.
2.  System creates `Transaction` (status: pending).
3.  User redirected to PSP.
4.  Webhook received -> Update `Transaction` (success).
5.  Credit User `Wallet` (+5000 cents).

### B. Peer-to-Peer Transfer

1.  **Check Balance**: Ensure Sender has > Amount.
2.  **Lock Funds**: Prevent double-spend (Database transaction).
3.  **Debit Sender**: `Wallet A` -= Amount.
4.  **Credit Receiver**: `Wallet B` += Amount.
5.  **Audit Log**: Record immutable entry.

## 5. Regulatory Compliance Checklist

- [ ] **GDPR/CCPA**: Right to be forgotten (BUT financial records must be kept for X years).
- [ ] **SCA (Strong Customer Authentication)**: 2FA for payments (PSD2 in Europe).
