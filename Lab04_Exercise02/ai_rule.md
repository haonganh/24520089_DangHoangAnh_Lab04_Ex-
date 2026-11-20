# AI Collaboration Rules — Lab 4, Exercise 1.3 and Sprint 3

**Required workspace:** `24520089_DangHoangAnh_Lab04_Ex/Lab04_Exercise02/`  
**Required frontend:** **React + TypeScript (TSX) only; exactly one frontend app**  
**Documentation and code comments:** English  
**Student-facing instructions:** Vietnamese unless otherwise requested  
**Accessibility target:** WCAG 2.2 Level AA

## 1. Project boundaries — mandatory

1. Work **only within `Lab04_Exercise02/`** for Exercise 1.3 and Sprint 3.
2. Create **one** frontend in `Lab04_Exercise02/app`, using the Vite `react-ts` template unless an instructor-supplied TSX starter already exists.
3. Write React components in `.tsx` and non-JSX frontend logic/types in `.ts`. **Do not create `Exercise_JSX`, `.jsx` components, or a second JSX frontend.**
4. `Lab04_Exercise01/` is the previous exercise; **do not modify or move its files** and do not import its implementation as the active Exercise 1.3 app.
5. Keep `ai_rule.md`, `task_decomposition.md`, and evidence in `Lab04_Exercise02/`. A backend may live in `Lab04_Exercise02/server/`; it is a full-stack API service, **not a second JSX application**. Prefer TypeScript for new backend code if no starter imposes another language.
6. Use the **existing Git repository** at `24520089_DangHoangAnh_Lab04_Ex/`; **do not create a nested repository** or change the remote without explicit instruction.
7. The screenshots establish the validation anti-pattern analysis and Sprint 3 network/error checkpoints. They do **not** specify form fields, backend implementation, API schema, ports, exact Git commit count, or grading scores. Mark unspecified design choices clearly as assumptions.

## 2. Step-by-step tutoring protocol

1. Follow `Lab04_Exercise02/task_decomposition.md` in order, starting from the next unfinished task.
2. Teach **one manageable subtask at a time**; accelerate only if the student requests a continuous walkthrough.
3. For every step provide: **goal → exact path → short code/PowerShell commands → expected behavior → test**; include Git commit instructions at defined milestones.
4. Start commands with the correct working directory: `Lab04_Exercise02` for setup/docs, `Lab04_Exercise02/app` for frontend npm scripts, and `Lab04_Exercise02/server` for backend commands if a server exists.
5. Prefer focused edits over rewriting unrelated files; first inspect starter code and preserve any instructor-specific contracts.
6. Explain state ownership, effect dependencies and cleanup, network aborts, and relevant accessibility semantics briefly but precisely.
7. Stop after the current step and accept `done`, terminal output, or screenshots before continuing, unless asked to keep going.
8. Never claim code was run, a build passed, the Network panel showed cancellation, or GitHub was updated without evidence.
9. When errors occur, use the exact compiler/terminal message and propose the smallest safe fix. Avoid unsupported commands and forced Git operations.

## 3. Source-of-truth for the assignment

The two supplied slides explicitly describe:

- **Exercise 1.3: Legacy Validation Anti-Patterns** involving five `useEffect` operations across `InputField` and `SimpleForm`: `syncToParent`, `validateField`, `calcFormValidity`, `syncErrorsToChild`, and `autoScrollToError`.
- Risks: **cascading re-renders**, rapidly typed values producing stale/out-of-order updates, and potential `Maximum update depth exceeded` errors.
- **Sprint 3: Full-Stack `useForumMessages` & Live Channel Switcher**, using exact channel identifiers `nasa`, `esports-tribunal`, and `notNasa`.
- Chrome DevTools verification on simulated **Slow 3G** that obsolete in-flight requests are cancelled using `AbortController`, plus **saved full-stack error-log evidence**.

**Implementation agreement for this student:** TSX only in `Lab04_Exercise02`. Do not re-introduce the earlier two-frontend plan into this exercise.

## 4. React / TypeScript validation architecture

- Analyze the five-effect chain first. If the legacy code does not exist, create a **safe, clearly labeled illustration** rather than making the production app intentionally loop.
- Keep form values in one owner, usually `SimpleForm.tsx`; keep `InputField.tsx` as a controlled component receiving typed props.
- Define `FormValues`, `FormErrors`, `InputFieldProps`, and event types; prefer `import type` for type-only imports. Avoid unneeded `any` and unsafe assertions.
- Implement synchronous, deterministic validation using **pure functions**; derive validation results from current values instead of mirroring derived state through `useEffect`.
- **Never** create `InputField` → parent → `InputField` effect-sync cycles, unconditional `setState` in render, or effects with unstable dependencies that repeatedly update each other.
- Perform user-triggered changes in event handlers; use effects for actual external synchronization such as fetch requests.
- Avoid excessive error announcements during typing. Choose a reasonable validation timing (blur, submit, or measured change-time updates).
- On failed submit, present actionable errors and focus the first invalid field; do not auto-scroll to an error on every keystroke.
- Treat "5 re-renders/keypress" as an **illustrated slide outcome**, not a guaranteed result; account for development React Strict Mode when profiling.
- Confirm improvements with React DevTools Profiler and tested states, not arbitrary render-count promises.

## 5. `useForumMessages` and full-stack API rules

- Implement `src/hooks/useForumMessages.ts` using a **real backend request**. Do not present local in-memory frontend mock messages as final Sprint 3 completion.
- Inspect a supplied backend first. If no API exists, document a minimal contract and implement a local server **inside `Lab04_Exercise02/server/`**.
- Define a strict `Channel` union of `"nasa" | "esports-tribunal" | "notNasa"`, typed message models, and typed hook state.
- Treat `notNasa` as a valid named channel unless the actual instructor API says otherwise; do not create a fake failure for it.
- Create a **fresh `AbortController` for each request**; pass its signal into `fetch`; abort in effect cleanup on channel change or unmount.
- Handle `AbortError` and aborted signals as expected cancellation, **not** user-facing network errors.
- Explicitly handle HTTP non-2xx status codes, connectivity failures, malformed data, and empty results. Types alone do not validate external JSON at runtime.
- Prevent out-of-order responses from replacing data of a newer channel. A loading state must not falsely display old-channel messages as current.
- Expose accessible **loading, success, empty, and error** states, with sensible retry behavior when applicable.
- Never commit `.env` secrets, access tokens, personally identifying data, or private backend logs.
- A cancelled fetch in Chrome proves client cancellation; it does **not** automatically prove that server-side work stopped.

## 6. WCAG 2.2 Level AA requirements

Use native semantic HTML whenever possible. Applicable Level A and AA criteria include:

| WCAG criterion | Minimum implementation / verification |
| --- | --- |
| **1.3.1 Info and Relationships** | Associate form labels, descriptions, field groups, and headings with correct HTML semantics. |
| **1.4.3 Contrast (Minimum)** | Test normal text at 4.5:1 and large text at 3:1, except applicable WCAG exceptions. |
| **1.4.10 Reflow** | Verify usable layout at 320 CSS px equivalent without lost content or avoidable two-dimensional scrolling. |
| **1.4.11 Non-text Contrast** | Test applicable control boundaries and visual state indicators at 3:1. |
| **2.1.1 Keyboard** | Form and channel switcher must be fully keyboard operable. |
| **2.4.3 Focus Order** | Preserve logical sequential focus through fields, buttons, and status content. |
| **2.4.7 Focus Visible** | Provide a clear focus indicator. |
| **2.4.11 Focus Not Obscured (Minimum)** | Ensure focused controls are not entirely covered by other content. |
| **3.3.1 Error Identification** | State which field is wrong and explain the error in text. |
| **3.3.2 Labels or Instructions** | Provide explicit labels and necessary format/required-field guidance. |
| **3.3.3 Error Suggestion** | Suggest corrections when feasible and safe. |
| **4.1.2 Name, Role, Value** | Prefer native inputs, buttons, and selects with accessible names. |
| **4.1.3 Status Messages** | Make nonurgent loading/results available to assistive technology without unnecessary focus changes. |

Practical rules:

- Use `<label htmlFor="...">` matching the input's `id`. Add visible error text and reference it with `aria-describedby`; set `aria-invalid` for invalid fields.
- Prefer a labeled native `<select>` for channels. Present the currently active channel and use meaningful text (not color alone) for statuses.
- Use an appropriate **single** polite status announcement for loading/result updates and a suitable alert strategy for errors. Avoid duplicated live-region announcements on every keystroke.
- Preserve visible focus after asynchronous updates. Respect `prefers-reduced-motion` for nonessential animations.
- Check contrast, keyboard behavior, 200%/400% zoom or equivalent reflow, and screen-reader behavior where possible.
- Use Lighthouse/axe as supporting checks; **a high automated score does not certify WCAG 2.2 AA compliance**.

## 7. Required testing and evidence

**Legacy validation:**

- Document the five-stage chain and identify which effects cause redundant synchronization.
- Test empty/invalid/valid inputs, rapid typing, correction, and failed submit.
- Compare actual React DevTools traces before/after when safely measurable; distinguish simulated examples from observed data.
- Save results under `Lab04_Exercise02/evidence/validation-baseline.md`.

**Sprint 3 cancellation:**

- In Chrome DevTools → Network, choose **Slow 3G** and optionally **Disable cache**.
- Switch rapidly: `nasa` → `esports-tribunal` → `notNasa` while requests are still in flight.
- Verify old requests are cancelled/aborted on the client, the active channel wins, and no stale results appear.
- Record screenshot references and exact observed behavior in `Lab04_Exercise02/evidence/network-cancellation.md`.

**Full-stack errors:**

- Trigger at least one controlled genuine HTTP/network failure; never redefine `notNasa` as an error channel without a real specification.
- Show appropriate user-facing error handling and verify aborts are not reported as failures.
- Save sanitized client/server observations under `Lab04_Exercise02/evidence/fullstack-error-log.md`.

**Accessibility:**

- Test the form and channel switcher across loading, success, empty, invalid, and error states.
- Use keyboard, React DevTools, accessibility audit tooling, and manual inspection.
- Record actual findings under `Lab04_Exercise02/evidence/accessibility-checklist.md`.

**Never invent** Network status, logs, timestamps, measurements, screenshots, test passes, or missing files.

## 8. Git and delivery discipline

- Commit inside the **existing repository**, with work scoped to `Lab04_Exercise02/`; do not push or modify unrelated `Lab04_Exercise01` changes.
- Use clear **atomic commits** at meaningful milestones. Suggested names:
  - `docs(ex1.3): update TSX-only task plan and AI rules`
  - `chore(ex1.3): initialize TypeScript frontend`
  - `docs(ex1.3): analyze legacy validation effect chain`
  - `refactor(ex1.3): replace chained effects with typed form validation`
  - `feat(ex1.3): add channel messages API`
  - `feat(ex1.3): implement typed cancellable useForumMessages hook`
  - `feat(ex1.3): add accessible live channel switcher`
  - `test(ex1.3): document cancellation and full-stack errors`
- Use `git status` and `git diff --staged` before commit. Use `git add Lab04_Exercise02/...` when running from repository root, or `git add ...` for specific files within that folder.
- Build with `npm run build` from `Lab04_Exercise02/app` and smoke-test the actual backend before claiming task completion.
- Do **not** commit `node_modules`, `dist`, `.env`, tokens, or private logs. Sanitized learning evidence is fine.
- Use `git push` only after a successful commit; confirm success. Do not force-push, rewrite history, reinitialize Git, or change remotes without user permission.

## 9. Definition of done — TSX only

Exercise 1.3 and Sprint 3 are complete when:

1. The legacy five-effect anti-pattern is analyzed and documented without a live infinite loop.
2. The **single** `Lab04_Exercise02/app` TSX form uses typed controlled inputs and safe pure validation.
3. A real local/instructor backend provides data for all **three** specified channels.
4. `useForumMessages.ts` cancels obsolete requests with `AbortController` and shows no stale channel results.
5. Chrome Slow 3G cancellation and genuine full-stack error behavior are **actually verified and logged**.
6. Relevant WCAG 2.2 A/AA and React DevTools checks are performed and documented.
7. The TSX app builds, commits are atomic, GitHub push succeeds, and **`Lab04_Exercise01` is unchanged**.

## 10. Reference documentation

- React — You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- React — `useEffect`: https://react.dev/reference/react/useEffect
- MDN — AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- MDN — Using Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- W3C — WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C — WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
