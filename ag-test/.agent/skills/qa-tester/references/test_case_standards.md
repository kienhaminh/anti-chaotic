# Test Case Standards & Templates

To ensure "detailed and specific" test testing, all test cases must follow these standards.

## 1. The Anatomy of a Perfect Test Case

A test case is not just a sentence; it is a script that a machine or a human can execute without ambiguity.

| Field               | Description                                  | Example                                                                        |
| :------------------ | :------------------------------------------- | :----------------------------------------------------------------------------- |
| **ID**              | Unique Identifier                            | `TC-AUTH-001`                                                                  |
| **Title**           | Concise summary including Condition & Result | `Login - Valid Credentials - Redirects to Dashboard`                           |
| **Priority**        | P0 (Critical), P1 (High), P2 (Medium)        | `P0`                                                                           |
| **Type**            | Functional, Security, UI, Performance, API   | `Functional`                                                                   |
| **Pre-conditions**  | State required _before_ the test starts      | 1. App is open<br>2. User is registered<br>3. User is logged out               |
| **Test Data**       | Specific data values used                    | email: `test@example.com`, pass: `Correct123!`                                 |
| **Steps**           | Numbered, atomic actions                     | 1. Click "Login" button<br>2. Enter email<br>3. Enter password<br>4. Submit    |
| **Expected Result** | Verifiable outcome for _each_ critical step  | 1. Login form appears<br>4. Dashboard loads within 2s, "Welcome" toast appears |

## 2. Granularity Rules

- **One Action per Step**: Do not combine actions.
  - ❌ _Bad_: "Enter credentials and click login."
  - ✅ _Good_:
    1. Enter "user@example.com" in Email field.
    2. Enter "password" in Password field.
    3. Click "Sign In" button.
- **Specific Data**: Never use "valid data" or "random text".
  - ❌ _Bad_: "Enter valid email."
  - ✅ _Good_: "Enter `user_verified@domain.com`."
- **Verifiable Results**: Avoid vague outcomes.
  - ❌ _Bad_: "It works."
  - ✅ _Good_: "URL changes to `/dashboard`, and 'Logout' button is visible."

## 3. Test Case Templates

### Template A: UI/Functional Test

```markdown
**ID**: TC-[Module]-[Number]
**Title**: [Action] - [Condition] -> [Outcome]
**Priority**: [P0/P1/P2]
**Pre-conditions**:

1. [State 1]
2. [State 2]

**Test Data**:

- [Field 1]: [Value]
- [Field 2]: [Value]

**Steps**:

1. [Step 1 execution]
2. [Step 2 execution]

**Expected Results**:

- [Verification 1]
- [Verification 2]
```

### Template B: API Test

````markdown
**ID**: API-[Endpoint]-[Number]
**Title**: [Method] [Endpoint] - [Scenario]
**Priority**: P1

**Request**:

- Method: POST
- URL: `/api/v1/orders`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  { "item": "id_123", "qty": 1 }
  ```
````

**Expected Response**:

- Status Code: 201 Created
- Body Schema Match: `OrderResponse`
- DB Info: Record created in `orders` table

```

## 4. Writing Best Practices

1. **Golden Path First**: Always write the "Happy Path" (Success case) first.
2. **Negative Testing**: Immediately follow with failure cases (Validation errors, Timeout, Bad Auth).
3. **Atomic Independence**: Tests should not depend on the "memory" of previous tests (unless explicitly an End-to-End flow).
4. **Clean Up**: If a test creates data (e.g., "Create User"), define the cleanup or use ephemeral environments.
```
