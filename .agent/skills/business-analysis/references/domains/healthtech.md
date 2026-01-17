# Domain: HealthTech (Healthcare)

## 1. Core Mindset

- **Privacy First**: HIPAA (USA) / GDPR (EU) compliance is non-negotiable.
- **Interoperability**: Systems must talk (FHIR, HL7 standards).
- **Data Integrity**: Lives are at stake. Zero tolerance for data errors.

## 2. Key Terminology (Glossary)

- **PHI (Protected Health Information)**: Any data identifying a patient + health info.
- **HIPAA**: US law protecting PHI.
- **EMR/EHR**: Electronic Medical/Health Record.
- **FHIR (Fast Healthcare Interoperability Resources)**: Modern standard for exchanging health data.
- **Telemedicine**: Remote delivery of healthcare.
- **Triage**: Prioritizing patients based on severity.

## 3. Common Entities (Data Models)

- **Patient**: The user. `mrn` (Medical Record Number), `dob`.
- **Provider**: Doctor/Nurse. `npi` (National Provider Identifier), `specialty`.
- **Appointment**: `patient_id`, `provider_id`, `time`, `reason`.
- **Observation**: Vital signs (BP, Heart Rate). FHIR Resource.

## 4. Key Workflows

### A. Appointment Booking

1.  **Availability Search**: Query Provider schedule.
2.  **Booking**: Create `Appointment` (status: scheduled).
3.  **Confirmation**: Email/SMS to Patient (No PII in subject line!).

### B. Telehealth Session

1.  **Check-in**: Patient enters virtual waiting room.
2.  **Provider Join**: Video session starts (WebRTC, HIPAA compliant encrypted).
3.  **SOAP Note**: Provider documents Subjective, Objective, Assessment, Plan.
4.  **Billing**: Generate claim (ICD-10 codes).

## 5. Regulatory Compliance Checklist

- [ ] **Encryption**: At rest and in transit.
- [ ] **Access Logs**: Who viewed what record and when? (Audit Trail).
- [ ] **BAA (Business Associate Agreement)**: Required for all vendors handling PHI (e.g., AWS, Twilio).
