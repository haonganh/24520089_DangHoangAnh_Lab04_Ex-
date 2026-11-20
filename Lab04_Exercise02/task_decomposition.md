# Lab 4 — Exercise 1.3: Task Decomposition

**Topic:** Legacy Validation Anti-Patterns and Sprint 3 — `useForumMessages` & Live Channel Switcher  
**Language:** English  
**Accessibility target:** WCAG 2.2, Level AA  
**Workflow:** Small, testable subtasks with atomic Git commits; JSX first, TSX second.

## 1. Scope and source-of-truth

The two supplied slides describe **two related but distinct workstreams**:

1. **Exercise 1.3 — Legacy Validation Anti-Patterns:** investigate five chained `useEffect` hooks across `InputField` and `SimpleForm`. The illustrated failure sequence is `syncToParent` → `validateField` → `calcFormValidity` → `syncErrorsToChild` → `autoScrollToError`, with unnecessary render cascades, out-of-order updates, and a possible maximum-update-depth error.
2. **Sprint 3 — Full-Stack Custom Hook `useForumMessages` & Live Channel Switcher:** fetch data for the exact channels `nasa`, `esports-tribunal`, and `notNasa`; switch channels rapidly; use `AbortController` to cancel obsolete in-flight requests; verify the Network panel under Chrome's simulated **Slow 3G**; save full-stack error-log evidence.

**Implementation assumption:** In accordance with the instructor's earlier requirement for Exercise 1, implement the frontend in **two independent projects**, JSX and TSX. A shared backend may serve both. This is a project organization decision, not a claim that these screenshots explicitly require two copies.

**Not specified by the slides:** form field names/validation rules, existing starter code, server framework, API URL, JSON response shape, and submission filenames. Inspect starter files or instructor notes before choosing them. Do not claim an illustrative API contract is an instructor requirement.

## 2. Suggested directory structure

```text
Lab04_Exercise01/
├── ai_rule.md
├── task_decomposition.md
├── Exercise_1_JSX/
│   └── src/
│       ├── components/          # InputField.jsx, SimpleForm.jsx, ChannelSwitcher.jsx
│       ├── hooks/               # useForumMessages.js
│       ├── services/            # messagesApi.js (optional)
│       └── ...                  # Existing router / master-detail code remains
├── Exercise_1_TSX/
│   └── src/
│       ├── components/          # InputField.tsx, SimpleForm.tsx, ChannelSwitcher.tsx
│       ├── hooks/               # useForumMessages.ts
│       ├── types/               # ForumMessage.ts, etc.
│       └── ...
├── server/                     # Optional shared real API; adapt to starter project
└── evidence/
    ├── validation-baseline.md
    ├── network-cancellation.md
    ├── fullstack-error-log.md
    └── accessibility-checklist.md
```

Do not delete working Exercise 1.1/1.2 files. If Exercise 1.3 has its own repository, use the same structure within that repository instead.

## 3. Execution tasks

### T0 — Inspect requirements and preserve the baseline

- [ ] **T0.1** Confirm the Git repository, branch, existing JSX/TSX applications, and available backend/starter code.
- [ ] **T0.2** Record what is explicitly required by the slides vs. what is an implementation choice.
- [ ] **T0.3** Verify `node`, `npm`, `git`, `npm run dev`, and `npm run build` in both frontend projects.
- [ ] **T0.4** Make a clean baseline commit before substantial refactoring if there are uncommitted starter changes.

**Pass:** Both existing projects still run; baseline is preserved.

### T1 — Reproduce and explain the legacy `useEffect` chain

- [ ] **T1.1** Locate or create an isolated **legacy demonstration** of `InputField` and `SimpleForm` without replacing the working refactored form.
- [ ] **T1.2** Trace the slide's five effects in order: `syncToParent`, `validateField`, `calcFormValidity`, `syncErrorsToChild`, `autoScrollToError`.
- [ ] **T1.3** Use React DevTools Profiler and/or temporary instrumentation to inspect updates per keystroke. Record development Strict Mode behavior separately.
- [ ] **T1.4** Type rapidly and describe any stale validation/errors; identify cycles that *could* cause `Maximum update depth exceeded` without intentionally locking up the app.
- [ ] **T1.5** Save findings in `evidence/validation-baseline.md`, including screenshots or traces if available.

**Pass:** Evidence distinguishes observed symptoms from the five-render cascade illustrated on the slide.  
**Suggested commit:** `docs(ex1.3): document legacy validation effect chain`

### T2 — Design a safe validation architecture

- [ ] **T2.1** Define the form fields and validation requirements from starter materials. If none exist, mark selected demonstration rules as assumptions.
- [ ] **T2.2** Choose one owner of the form values (usually `SimpleForm`); make `InputField` controlled/presentational.
- [ ] **T2.3** Implement validation as **pure synchronous functions** from current form values, when feasible.
- [ ] **T2.4** Derive `isValid` and field errors instead of mirroring them between parent and child via effects.
- [ ] **T2.5** Reserve `useEffect` for external synchronization only; handle user-triggered validation and submit behavior in event handlers.
- [ ] **T2.6** Plan to focus the first invalid field **on failed submission**, not auto-scroll on every keystroke.

**Pass:** There is no cyclical parent/child state synchronization and no five-effect validation pipeline.

### T3 — Refactor the JSX form

- [ ] **T3.1** Implement/update `InputField.jsx` with stable `id`, `<label htmlFor>`, controlled value, `onChange`, and error props.
- [ ] **T3.2** Implement/update `SimpleForm.jsx` with one source of truth for field values and pure validation.
- [ ] **T3.3** Associate visible error text using `aria-invalid` and `aria-describedby`; preserve helpful instructions.
- [ ] **T3.4** Add submit behavior, error summary if needed, and focus the first invalid field after failed submit.
- [ ] **T3.5** Ensure the form can be opened in the existing router without breaking earlier exercises.

**Pass:** Updating one input produces correct current validation, with no effect-driven feedback loop.  
**Suggested commit:** `refactor(ex1.3-jsx): replace chained effects with derived validation`

### T4 — Verify and stabilize the JSX form

- [ ] **T4.1** Test empty, valid, invalid, and rapid-input cases.
- [ ] **T4.2** Check React DevTools and browser Console: no maximum-update-depth exception or React key/controlled-input warnings.
- [ ] **T4.3** Compare render traces against the legacy baseline; do not mandate a fixed render count in development Strict Mode.
- [ ] **T4.4** Verify label-to-input association, keyboard focus, error announcements, and visible instructions.
- [ ] **T4.5** Run `npm run build` from `Exercise_1_JSX`.

**Pass:** JSX form works and builds; before/after comparison is recorded.  
**Suggested commit (only if code changed):** `test(ex1.3-jsx): verify validation and accessibility`

### T5 — Implement the same form in TSX

- [ ] **T5.1** Define `FormValues`, `FormErrors`, and `InputFieldProps` TypeScript types/interfaces.
- [ ] **T5.2** Implement `InputField.tsx` and `SimpleForm.tsx` with explicit prop/event types where needed.
- [ ] **T5.3** Use `import type` for type-only imports; avoid unnecessary `any` and non-null assertions.
- [ ] **T5.4** Preserve the JSX behavior and accessible markup; do not replace the implementation with a second logic design.
- [ ] **T5.5** Run `npm run build` and test rapid typing, invalid submit, and valid submit.

**Pass:** TypeScript passes with the same user-visible behavior as JSX.  
**Suggested commit:** `refactor(ex1.3-tsx): implement typed effect-free form validation`

### T6 — Establish the full-stack message API

- [ ] **T6.1** Inspect the actual backend supplied by the instructor. If none exists, create a minimal local API service and document the choice.
- [ ] **T6.2** Define and document the **actual** request URL, allowed channels (`nasa`, `esports-tribunal`, `notNasa`), response shape, and error format.
- [ ] **T6.3** Implement a real server endpoint that returns channel-specific messages, including meaningful HTTP status codes for failures.
- [ ] **T6.4** Configure frontend-to-backend connectivity (for example, a Vite proxy or environment-based base URL), avoiding hardcoded secrets.
- [ ] **T6.5** Verify one successful request and one controlled server-error case independently of React (e.g., browser Network panel or `curl`).

**Example contract ONLY if no instructor contract exists:** `GET /api/messages?channel=nasa` returning `{ "channel": "nasa", "messages": [...] }`. Do not assume this shape before implementation.

**Pass:** A real API responds for all three named channels; error behavior is observable.  
**Suggested commit:** `feat(ex1.3): add full-stack channel messages API`

### T7 — Build `useForumMessages` in JSX

- [ ] **T7.1** Implement `useForumMessages.js` accepting the active channel, exposing `messages`, `loading`, and `error` (or a documented equivalent).
- [ ] **T7.2** Start a new `AbortController` for each fetch; pass `controller.signal` to `fetch()`.
- [ ] **T7.3** Abort the prior in-flight request on channel change and on component unmount via the effect cleanup function.
- [ ] **T7.4** Distinguish intentional abort (`AbortError`/signal aborted) from genuine network/HTTP failures; do not display cancellation as a user-facing error.
- [ ] **T7.5** Guard against stale responses updating the current channel (especially if API wrappers do not fully honor cancellation).
- [ ] **T7.6** Implement a labeled channel switcher and accessible loading/empty/error/success states.

**Pass:** Switching channels rapidly does not display stale results for a previously selected channel.  
**Suggested commit:** `feat(ex1.3-jsx): add cancellable forum messages channel switcher`

### T8 — Build `useForumMessages` in TSX

- [ ] **T8.1** Define a `Channel` union for the exact three channel names and typed message/response data.
- [ ] **T8.2** Implement `useForumMessages.ts` with typed state, errors, abort cleanup, and stale-result protection.
- [ ] **T8.3** Implement the TSX channel switcher with the same accessible states as JSX.
- [ ] **T8.4** Validate/normalize untrusted server responses where necessary; do not rely on static types to validate network JSON at runtime.
- [ ] **T8.5** Run TypeScript checks and `npm run build`.

**Pass:** TSX matches the JSX behavior, and type checking succeeds.  
**Suggested commit:** `feat(ex1.3-tsx): implement typed cancellable forum messages hook`

### T9 — Sprint 3 Network cancellation checkpoint (both frontends)

- [ ] **T9.1** Start the backend and one frontend; open Chrome DevTools → Network.
- [ ] **T9.2** Set throttling to **Slow 3G**, enable **Disable cache**, and preserve the Network log if helpful.
- [ ] **T9.3** Rapidly switch `nasa` → `esports-tribunal` → `notNasa` while previous requests are still pending.
- [ ] **T9.4** Check that obsolete fetches are aborted/cancelled in the client and the latest channel's results are rendered. Capture Network screenshots or a HAR export if permitted.
- [ ] **T9.5** Repeat with JSX and TSX. Distinguish a cancelled browser request from proof that server work stopped.
- [ ] **T9.6** Document how development Strict Mode can trigger extra setup/cleanup requests; test production behavior if results are ambiguous.
- [ ] **T9.7** Save `evidence/network-cancellation.md` with reproduction steps, expected/actual results, screenshot paths, and pass/fail status.

**Pass:** In-flight cancellation is evidenced under Slow 3G for both projects; no stale channel content appears.

### T10 — Full-stack error log verification

- [ ] **T10.1** Trigger a controlled backend failure (e.g., a documented test error status or a temporarily stopped API), without changing the meaning of `notNasa` unless specified by the API.
- [ ] **T10.2** Verify that HTTP/network failures show a useful message and optional retry action.
- [ ] **T10.3** Confirm intentional aborts do **not** appear as full-stack errors.
- [ ] **T10.4** Capture sanitized browser Console, Network, and backend logs as available.
- [ ] **T10.5** Save `evidence/fullstack-error-log.md` with timestamp, channel, reproduction, HTTP status/error, frontend state, backend observation, and outcome; remove tokens and personal data.

**Pass:** One legitimate failure and one intentional cancellation are documented and correctly distinguished.  
**Suggested commit:** `test(ex1.3): add network cancellation and error log evidence`

### T11 — WCAG 2.2 AA and React DevTools checkpoint

- [ ] **T11.1** Test keyboard-only use and focus visibility for form and channel controls (WCAG 2.1.1, 2.4.7).
- [ ] **T11.2** Ensure inputs have associated labels/instructions; identify errors in text and link errors to fields (3.3.1, 3.3.2, 1.3.1).
- [ ] **T11.3** Where appropriate, expose loading/completion with `role="status"` or a polite live region, and failures with `role="alert"` or another tested accessible pattern (4.1.3); prevent repetitive announcements.
- [ ] **T11.4** Check contrast (1.4.3 and 1.4.11), zoom/reflow at 320 CSS px (1.4.10), focus not obscured (2.4.11), and reduced motion when animation exists.
- [ ] **T11.5** Test the form, loading, successful messages, empty results, and error screens in JSX **and** TSX.
- [ ] **T11.6** Use React DevTools Profiler and Chrome Lighthouse/axe as aids, then complete manual checks; automated scores alone are insufficient.
- [ ] **T11.7** Write observed results and outstanding issues in `evidence/accessibility-checklist.md`.

**Pass:** No known Level A/AA violation remains in tested flows; evidence is documented. Never claim certified WCAG conformance from Lighthouse alone.

### T12 — Final build, Git, and submission audit

- [ ] **T12.1** Run `npm run build` inside **each** frontend; run backend tests or a documented smoke test.
- [ ] **T12.2** Confirm earlier Exercise 1.1/1.2 routes still work (if shared apps).
- [ ] **T12.3** Verify README/start commands for backend and both frontends; document environment variables without committing secrets.
- [ ] **T12.4** Check `git status`, `git log --oneline`, and `git remote -v` from the actual repository root.
- [ ] **T12.5** Make any final focused commits and push with `git push`; confirm the remote has the latest files.
- [ ] **T12.6** Confirm the instructor's submission location, evidence requirements, and deadline.

**Pass:** Both builds succeed, Sprint 3 evidence exists, and the repository is clean and pushed.

## 4. Acceptance matrix

| Requirement | JSX | TSX | Evidence |
| --- | --- | --- | --- |
| Legacy five-effect chain analyzed | ☐ | ☐ | `validation-baseline.md` |
| Controlled form without state-sync loop | ☐ | ☐ | Code + React Profiler |
| Rapid typing does not cause stale errors | ☐ | ☐ | Manual/automated test |
| Three exact channel choices available | ☐ | ☐ | UI + API logs |
| `useForumMessages` fetches real API data | ☐ | ☐ | Network + server output |
| Obsolete requests aborted on rapid switching | ☐ | ☐ | Slow 3G Network evidence |
| Genuine errors handled; aborts ignored as errors | ☐ | ☐ | `fullstack-error-log.md` |
| Keyboard, form errors, live status tested | ☐ | ☐ | WCAG checklist |
| Build and Git push succeed | ☐ | ☐ | Terminal + Git history |

## 5. Recommended learning rhythm

Work **one subtask at a time**: edit → run → verify → commit at the specified milestone → move on. The trace's suggested “5 re-renders/keypress” is an illustration, **not a measured benchmark** until reproduced. Use meaningful atomic commits rather than committing every tiny line change.

## 6. References

- React — You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- React — useEffect: https://react.dev/reference/react/useEffect
- MDN — AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- W3C — WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
