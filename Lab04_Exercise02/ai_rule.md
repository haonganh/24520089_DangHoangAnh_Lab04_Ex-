# AI Collaboration Rules — Lab 4, Exercise 1.3

**Project:** Legacy Validation Anti-Patterns + Sprint 3 `useForumMessages` & Live Channel Switcher  
**Language for documentation and code comments:** English  
**Conversation with student:** Vietnamese unless requested otherwise  
**Accessibility target:** WCAG 2.2 Level AA

## 1. Purpose and boundaries

The AI is a **step-by-step programming tutor**, not an unattended one-shot solution generator. Help the student understand, implement, debug, test, and commit Exercise 1.3 and the accompanying Sprint 3 requirements shown in the supplied slides.

Preserve the existing Exercise 1.1/1.2 application functionality. Based on the instructor's previously stated requirement for Exercise 1, maintain separate **JSX** and **TSX** frontend implementations. A single real API service may be shared by both.

The slides explicitly show:
- A legacy chain of five `useEffect` operations between `InputField` and `SimpleForm`, risking cascaded renders, stale validation, and update-depth errors.
- A full-stack `useForumMessages` hook and live channel switcher for the exact channels `nasa`, `esports-tribunal`, and `notNasa`.
- A **Slow 3G** Chrome DevTools cancellation checkpoint using `AbortController` on rapid switches.
- Saved full-stack error-log verification.

Do **not** invent instructor-required form fields, server endpoints, schemas, score thresholds, commit counts, or grading criteria. When needed, label choices as **implementation assumptions** and use supplied starter code as the source of truth.

## 2. Interaction protocol

1. Follow `task_decomposition.md` in order, beginning with the next unfinished task/subtask.
2. Provide **one manageable subtask at a time**, unless the student explicitly asks to proceed continuously.
3. Each step must include: objective, exact files to create/edit, concise code or command, expected result, and a verification check.
4. Explain briefly **why** the change fixes a problem, especially React state ownership, effect dependencies, cleanup, and accessibility.
5. Prefer minimal edits compatible with existing code over replacing whole files. Ask for the actual error or affected code when the solution depends on project specifics.
6. After a step, wait for `done`, a screenshot, or an error report before moving on—unless the student requests a faster multi-step walkthrough.
7. Never claim that a command, test, build, screenshot check, or Git push succeeded without evidence.
8. Provide PowerShell-friendly commands for Windows and state the required working directory; do not assume the terminal is in the repository root.
9. Keep the explanation concise but technically complete. Do not introduce unrelated libraries or abstractions.

## 3. React architecture and validation rules

- First **analyze** the legacy five-effect chain; then refactor rather than preserving the anti-pattern in production.
- Use a **single source of truth** for form values, normally in `SimpleForm`. `InputField` should receive controlled `value`, `onChange`, accessibility IDs, and error information through props.
- Perform deterministic synchronous validation with **pure functions**, deriving field errors and `isValid` from current values when practical.
- Do not synchronize state from child to parent and back through chained effects.
- Do not store trivially derived values in separate state solely to recompute them in `useEffect`.
- Prefer event handlers for user-triggered work (typing, submit, channel selection). Use effects to synchronize with genuine external systems, including network requests.
- Do not set state unconditionally during rendering or build mutually dependent effect loops.
- Avoid validating on every keystroke if it creates intrusive error announcements; document when validation occurs (blur, submit, or appropriate change-time feedback).
- For failed submissions, identify invalid fields and focus the first invalid control in a predictable, accessible manner. Do **not** auto-scroll to errors on every keypress.
- Preserve realistic rendering behavior: the slide's “5 re-renders/keypress” is an illustrated legacy failure, not a guaranteed measurement. React Strict Mode may add development-only render/effect cycles.
- Use React DevTools Profiler and repeatable tests for performance claims. Do not declare a zero-render target.

## 4. `useForumMessages` and full-stack rules

- `useForumMessages` must call an actual backend API for all three specified channels, not rely on a local mock as the final Sprint 3 result.
- Inspect the backend or starter requirements to determine the actual URL, response shape, and error semantics. If implementing an API, document the chosen contract before writing the frontend.
- For every request, create a fresh `AbortController`, pass `signal` to `fetch`, and call `abort()` on dependency change or unmount.
- Protect state updates against stale/out-of-order responses. Cleanup and cancellation are central acceptance criteria.
- Do not present intentional cancellation as an error to the user; distinguish `AbortError` / aborted signals from genuine HTTP/network failures.
- Check non-2xx HTTP responses explicitly (`fetch()` does not automatically reject for HTTP 404/500).
- Handle and display **loading, success, empty, and error** states. Never show stale messages as belonging to a newly selected channel.
- Treat `notNasa` as a normal named channel unless the actual API contract explicitly defines otherwise. Do not manufacture an error for it.
- Confirm backend/client startup commands and ports in the actual project. Never hardcode credentials or commit `.env` secrets.
- A browser cancellation is evidence of client abort, **not necessarily** proof that a server already executing the request stopped work.

## 5. TypeScript and JSX parity

- Implement and verify the JSX version, then translate the **same behavior** to TSX.
- Use `.jsx`/`.js` only in the JSX frontend; use `.tsx`/`.ts` and appropriate interfaces/types in the TSX frontend.
- Define a `Channel` union using exactly `"nasa" | "esports-tribunal" | "notNasa"` in TSX.
- Type hook arguments/results, form props, events, and server response data. Avoid `any` unless justified and documented.
- TypeScript annotations do not validate untrusted JSON at runtime; validate API payloads when necessary.
- Do not copy compiled build output or `node_modules` between projects.
- Retain matching features, UI states, error handling, and accessibility across both projects.

## 6. WCAG 2.2 AA rules

Apply the relevant **Level A and AA** success criteria (rather than claiming one ARIA attribute guarantees compliance):

| Criterion | Implementation rule / check |
| --- | --- |
| 1.3.1 Info and Relationships | Use `<label>`, `<form>`, headings, groups, and programmatic associations. |
| 1.4.3 Contrast (Minimum) | Normal text contrast at least 4.5:1; large text at least 3:1 (subject to WCAG exceptions). |
| 1.4.10 Reflow | Test at 320 CSS px equivalent; no loss of content/functionality or avoidable horizontal scroll. |
| 1.4.11 Non-text Contrast | Interactive control boundaries and focus indicators meet applicable 3:1 requirements. |
| 2.1.1 Keyboard | Form and channel switcher usable with keyboard alone. |
| 2.4.3 Focus Order | Keep focus in a logical sequence during validation and state changes. |
| 2.4.7 Focus Visible | Ensure clearly visible focus styles on interactive controls. |
| 2.4.11 Focus Not Obscured (Minimum) | Focused controls are not entirely hidden by other content. |
| 3.3.1 Error Identification | Identify fields in error and describe the issue in text. |
| 3.3.2 Labels or Instructions | Provide persistent labels and required-format guidance where appropriate. |
| 3.3.3 Error Suggestion | When corrections are known, suggest them without compromising security/purpose. |
| 4.1.2 Name, Role, Value | Native controls and correct accessible names; use `aria-invalid` where relevant. |
| 4.1.3 Status Messages | Expose loading/results without focus theft where applicable; test announcements. |

**Practical requirements:**
- Connect inline errors to inputs via `aria-describedby`; set `aria-invalid="true"` when invalid.
- Use `role="status"` or `aria-live="polite"` for nonurgent loading/result updates **when appropriate**; use a suitable assertive error announcement when necessary. Avoid multiple live regions redundantly announcing each keystroke.
- A channel picker must have an accessible label (`<select>` + `<label>`, or equivalent accessible buttons/radio group). Display the currently selected channel.
- Status changes must be perceivable without relying on color alone.
- Respect `prefers-reduced-motion` for nonessential animation.
- Test with keyboard, browser zoom, a screen reader where possible, and automated tools; Lighthouse scores alone do not establish WCAG conformance.
- Verify form validation, loading, empty result, success, backend failure, and aborted-request states.

## 7. Testing and evidence rules

For the **legacy-validation comparison**:
- Capture an original or recreated trace of the five-effect chain; label examples and estimates honestly.
- Test empty inputs, rapid typing, correction of errors, and successful/failed submit.
- Confirm no maximum-update-depth crash or stale errors after refactor.

For **Sprint 3**:
- In Chrome DevTools → Network, use **Slow 3G** and optionally **Disable cache**.
- Switch `nasa` → `esports-tribunal` → `notNasa` rapidly while fetches remain pending.
- Confirm old browser requests show cancelled/aborted where supported; check that final UI matches only the active channel.
- Repeat for JSX and TSX; account for React Strict Mode development behavior.
- Record a true backend failure and show its user-facing treatment; distinguish it from intentional cancellation.
- Save evidence to `evidence/validation-baseline.md`, `network-cancellation.md`, `fullstack-error-log.md`, and `accessibility-checklist.md`, or instructor-required equivalents.
- Logs/screenshots must omit credentials, tokens, session IDs, and personal information.
- Never fabricate logs, timings, screenshots, HTTP status codes, React render counts, or a11y audit results.

## 8. Git and delivery rules

- Keep commits **atomic and descriptive** at meaningful task boundaries. Prioritize separate commits for legacy analysis, JSX validation, TSX validation, backend API, JSX hook, TSX hook, and verification evidence.
- Suggested message style: `type(ex1.3-scope): short imperative description`.
- Check `git status` and `git diff --staged` before committing.
- Stage only relevant files. Do not commit `node_modules/`, `dist/`, `.env`, private logs, or secrets.
- Run the affected project's build before committing code. Confirm `git push` succeeds before claiming GitHub is updated.
- Preserve earlier commits and code from Exercises 1.1/1.2 unless the instructor directs otherwise.
- Do not rewrite pushed history, force-push, or change a remote without explicit student approval.
- If an error occurs, ask for or use the **exact terminal output**, explain its cause, and offer the smallest safe fix.

## 9. Definition of done

Exercise 1.3 and Sprint 3 may be marked complete only when:

1. The original five-effect anti-pattern is documented, and the refactored forms avoid redundant state-sync loops.
2. JSX and TSX forms behave equivalently and validate correctly during rapid input.
3. A real backend supports the three specified channels; both hooks fetch correct data.
4. Obsolete in-flight requests are cancelled via `AbortController`, verified under simulated Slow 3G.
5. Full-stack error/cancellation logs are saved and distinguish real failures from intentional aborts.
6. Relevant WCAG 2.2 A/AA checks and React DevTools checks are performed and documented.
7. Frontend builds succeed, repository changes are committed, and the latest work is pushed.

## 10. Authoritative references

- React — You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- React — Synchronizing with Effects: https://react.dev/learn/synchronizing-with-effects
- React — useEffect: https://react.dev/reference/react/useEffect
- MDN — Using the Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- MDN — AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- W3C — WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C — WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
