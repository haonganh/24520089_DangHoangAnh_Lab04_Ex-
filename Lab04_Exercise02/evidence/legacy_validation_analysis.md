# Exercise 1.3 — Legacy Validation Anti-Pattern Analysis

## 1. Problem Overview

The legacy form architecture chains five useEffect hooks
between InputField and SimpleForm.

This can cause unnecessary re-renders, race conditions,
and infinite update loops.

## 2. Five useEffect Anti-Patterns

| Effect | Responsibility | Potential Problem |
|---|---|---|
| #1 | syncToParent() | Duplicated state synchronization |
| #2 | validateField() | Cascading validation updates |
| #3 | calcFormValidity() | Unnecessary derived state |
| #4 | syncErrorsToChild() | Repeated child re-renders |
| #5 | autoScrollToError() | Repeated DOM side effects |

## 3. Architectural Problems

### Cascading Re-renders
State updates trigger additional effects and renders.

### Race Conditions
Rapid input changes may cause asynchronous results
to update the form out of order.

### Infinite Loop Risk
Mutually dependent state updates can trigger
React's Maximum update depth exceeded error.

## 4. Proposed Refactoring

- Use SimpleForm as the single source of truth.
- Implement InputField as a controlled component.
- Derive validation results using pure functions.
- Avoid storing values that can be computed.
- Validate on input events or form submission.
- Use explicit event handlers for user interactions.
- Avoid useEffect for synchronous form validation.

## 5. Accessibility Requirements

- Associate labels with form controls.
- Use aria-invalid for invalid inputs.
- Use aria-describedby for validation messages.
- Ensure keyboard accessibility.
- Provide accessible error feedback.

Target: WCAG 2.2 Level AA.

## 6. Expected Outcome

- No circular effect dependencies.
- No unnecessary state synchronization.
- Predictable validation behavior.
- No maximum update depth errors.
- Accessible form feedback.

Note: This analysis is based on the assignment slide.
Actual render counts must be measured during testing.