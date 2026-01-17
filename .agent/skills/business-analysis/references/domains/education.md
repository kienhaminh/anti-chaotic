# Domain Knowledge: Education (EdTech) / LMS

## Core Entities (Ontology)

- **Institution/School**: Top-level tenant.
- **Curriculum**:
  - **Program**: E.g., "Computer Science BS".
  - **Course**: E.g., "CS101 - Intro to Programming".
  - **Section/Class**: Specific instance (e.g., "Fall 2026, Section A").
- **People**:
  - **Student**: Consumer of content. Constraints: COPPA/FERPA compliance.
  - **Instructor**: Creator/Grader.
  - **Admin**: Scheduler/Manager.
- **Assessment**:
  - **Assignment**: Submission based (File, Text).
  - **Quiz**: Automated grading (MCQ, True/False).
  - **Rubric**: Criteria-based grading matrix.
- **Gradebook**:
  - **Weighted Categories**: (Homework 20%, Exam 80%).
  - **Letter Grading**: (A > 90%).

## Common Workflows

### 1. Enrollment Flow

- Student adds course -> Check prerequisites -> Check seat capacity -> Payment (if applicable) -> Active Enrollment.
- _Edge Cases_: Waitlists, Holds (financial/academic), Time conflicts.

### 2. Assignment Submission

- Student uploads file -> Antivirus scan -> Timestamp log -> Status: "Submitted".
- _Edge Cases_: Late submission (grace period?), File size limit, Unsupported format.

### 3. Grading Flow

- Instructor views submission -> Attaches Rubric scores -> Calculates total -> Publishes grade -> Student Notified.

## Key Regulations

- **FERPA (USA)**: Student records privacy.
- **LTI (Learning Tools Interoperability)**: Standard for plugging external tools (e.g., Zoom, Turnitin) into LMS.
- **SCORM/xAPI**: Content standards for courseware.
