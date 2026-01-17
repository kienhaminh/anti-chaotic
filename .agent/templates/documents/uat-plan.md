# User Acceptance Test (UAT) Plan

## 1. Overview

- **Feature**: ...
- **Version**: ...
- **Testers**: [List of Business Users]
- **Environment**: Staging / UAT Sandbox

## 2. Test Strategy

- **Scope**: Verification of "Happy Path" and key business rules.
- **Out of Scope**: Load testing, Security penetration testing.
- **Entry Criteria**: QA Pass, Critical bugs fixed.
- **Exit Criteria**: 100% Critical cases passed, Sign-off from Product Owner.

## 3. Test Cases

| ID     | Description      | Steps                                  | Expected Result                   | Actual Result | Status (Pass/Fail) |
| :----- | :--------------- | :------------------------------------- | :-------------------------------- | :------------ | :----------------- |
| UAT-01 | Login successful | 1. Enter valid creds<br>2. Click Login | Redirect to Dashboard             |               |                    |
| UAT-02 | Purchase item    | 1. Add to cart<br>2. Checkout          | Order Confirmation Email received |               |                    |

## 4. Defect Log (Template)

| Defect ID | Severity | Description                         | Steps to Reproduce | Assigned To |
| :-------- | :------- | :---------------------------------- | :----------------- | :---------- |
| BUG-101   | High     | Checkout crashes on currency switch | ...                | Dev Team    |

## 5. Sign-off

- [ ] I confirm the system meets business requirements.
- **Name**: ...
- **Date**: ...
