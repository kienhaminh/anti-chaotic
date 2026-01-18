# Use Case Specification

## UC-[ID]: [Use Case Name]

- **Actor(s)**: [Primary Actor], [Secondary Actor]
- **Description**: Brief summary of the interaction.
- **Trigger**: What starts this use case?
- **Preconditions**: What must be true before this starts? (e.g., User is logged in).
- **Postconditions**: What is the state of the system after success?
- **Priority**: High/Medium/Low

## Main Flow (Happy Path)

| Step | Actor Action             | System Response                    |
| :--- | :----------------------- | :--------------------------------- |
| 1    | Navigate to "My Profile" | Displays profile form              |
| 2    | Updates phone number     | Validates format                   |
| 3    | Clicks "Save"            | Saves data and shows success toast |

## Alternative Flows

### A1. Invalid Input

- **At Step 2**: User enters invalid phone format.
- **System**: Displays "Invalid format" error below field.
- **Return**: To Step 2.

### A2. Network Error

- **At Step 3**: API call fails.
- **System**: Displays "Connection failed, retry?" modal.

## Exceptions (Error Conditions)

- **E1**: Database is locked.
- **E2**: Session expires during action.

## Business Rules associated

- **BR-05**: Phone number must be unique.
