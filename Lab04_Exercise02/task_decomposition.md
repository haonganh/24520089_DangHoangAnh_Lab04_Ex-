# Lab 4 — Exercise 1.3 and Sprint 3: Task Decomposition

**Project location:** `24520089_DangHoangAnh_Lab04_Ex/Lab04_Exercise02/`  
**Frontend:** **one React + TypeScript project (`.tsx` / `.ts`) only**  
**Language:** English for documentation, code, and comments  
**Accessibility target:** WCAG 2.2 Level AA (all applicable Level A and AA criteria)  
**Workflow:** Small subtasks → run → verify → atomic Git commit → continue

## 1. Scope and interpretation of the slides

The provided slides describe **two workstreams**:

1. **Exercise 1.3 — Legacy Validation Anti-Patterns.** Investigate the five-effect chain across `InputField` and `SimpleForm`: `syncToParent` → `validateField` → `calcFormValidity` → `syncErrorsToChild` → `autoScrollToError`. Explain cascading renders, potential race/stale-state problems, and the risk of `Maximum update depth exceeded`. Then implement a safer form design.
2. **Sprint 3 — Full-Stack Custom Hook `useForumMessages` & Live Channel Switcher.** Fetch messages for exactly `nasa`, `esports-tribunal`, and `notNasa`; cancel obsolete requests using `AbortController`; verify rapid switching with Chrome DevTools set to **Slow 3G**; save full-stack error-log evidence.

**Confirmed student scope for this work:** Implement **only the TypeScript/TSX version**, entirely under `Lab04_Exercise02`. **Do not create a JSX frontend**, do not copy the previous Exercise 1.1/1.2 frontend, and do not modify `Lab04_Exercise01`.

**Not determined by the screenshots:** specific form fields, validation rules, backend framework, endpoint URL, payload format, starter files, rubric scores, and required commit count. Inspect any instructor-supplied starter code first. If none is supplied, select a minimal design and label it as an **implementation assumption**, not a slide requirement.

## 2. Target directory structure

```text
24520089_DangHoangAnh_Lab04_Ex/       # EXISTING Git repository root
├── Lab04_Exercise01/                 # Previous exercise: do not edit
└── Lab04_Exercise02/
    ├── ai_rule.md
    ├── task_decomposition.md
    ├── app/                           # SINGLE Vite React + TypeScript frontend
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── components/
    │       │   ├── InputField.tsx
    │       │   ├── SimpleForm.tsx
    │       │   └── ChannelSwitcher.tsx
    │       ├── hooks/
    │       │   └── useForumMessages.ts
    │       ├── types/
    │       │   └── forum.ts
    │       ├── validation/
    │       │   └── validateForm.ts
    │       ├── App.tsx
    │       └── ...
    ├── server/                        # Real API; create only if no starter exists
    │   └── ...                        # TypeScript backend recommended, not mandated
    └── evidence/
        ├── validation-baseline.md
        ├── network-cancellation.md
        ├── fullstack-error-log.md
        └── accessibility-checklist.md
```

A small backend is permitted because the Sprint 3 slide explicitly requires **full-stack** data fetching. It is **not** a second frontend/project in JSX. Keep all related source and evidence inside `Lab04_Exercise02`.

## 3. Execution roadmap

### T0 — Verify Git, initialize the TSX app, and preserve the baseline

- [ ] **T0.1** Open VS Code at the existing repository and confirm `Lab04_Exercise02/ai_rule.md` and `task_decomposition.md` exist.
- [ ] **T0.2** Run `git status`, `git branch`, and `git remote -v`; confirm where the repository root is. **Do not run `git init` inside `Lab04_Exercise02`.**
- [ ] **T0.3** Inspect `Lab04_Exercise02` for starter files. If no frontend exists, create **one** Vite React TypeScript app in `Lab04_Exercise02/app`.
- [ ] **T0.4** Install dependencies, run `npm run dev` and `npm run build` **from `Lab04_Exercise02/app`**, and confirm a clean baseline.
- [ ] **T0.5** Check `.gitignore` to exclude `node_modules/`, `dist/`, `.env`, and secrets. Commit the two Markdown files and project baseline in sensible, separate commits if not already committed.

**Suggested PowerShell commands when already inside `Lab04_Exercise02` (only if `app` does not exist):**

```powershell
npm create vite@latest app -- --template react-ts
cd app
npm install
npm run build
```

**Pass:** One `app/` TSX frontend exists and builds; no JSX app is created; old exercise remains untouched.  
**Suggested commit:** `chore(ex1.3): initialize TypeScript frontend` (after the documentation commit, if applicable).

### T1 — Analyze the legacy five-`useEffect` anti-pattern

- [ ] **T1.1** Find instructor-provided `InputField` / `SimpleForm` code. If absent, create a **clearly labeled, isolated legacy illustration**; never rely on a deliberately looping form as the application's live implementation.
- [ ] **T1.2** Map the five steps: `syncToParent`, `validateField`, `calcFormValidity`, `syncErrorsToChild`, `autoScrollToError`.
- [ ] **T1.3** Explain redundant parent–child state synchronization, stale/racing updates during rapid typing, and maximum-update-depth risk.
- [ ] **T1.4** Inspect a *safe* sample using React DevTools Profiler and/or console instrumentation; do not intentionally freeze the page to reproduce an infinite loop.
- [ ] **T1.5** Record the source, observed behavior, and a labeled comparison with the slide's **illustrative** "5 renders/keypress" in `evidence/validation-baseline.md`. Account for development Strict Mode.

**Pass:** The failure mechanism is documented without fabricated measurements or an uncontrolled render loop.  
**Suggested commit:** `docs(ex1.3): analyze legacy validation effect chain`.

### T2 — Design safe form state and validation

- [ ] **T2.1** Determine fields/rules from starter code; otherwise choose and document a minimal example.
- [ ] **T2.2** Make `SimpleForm.tsx` the **single source of truth** for form values.
- [ ] **T2.3** Keep `InputField.tsx` controlled via props: `id`, `label`, `value`, `onChange`, and error/instruction text.
- [ ] **T2.4** Use **pure synchronous** validation functions in `src/validation/validateForm.ts`. Derive errors and validity from current input rather than synchronizing them with effects.
- [ ] **T2.5** Decide a non-intrusive feedback strategy (e.g., validate on blur and submit); on failed submit, focus the first invalid input.
- [ ] **T2.6** Define TypeScript types/interfaces for form values, errors, and component props. Avoid `any`.

**Pass:** The design has no child→parent→child effect feedback loop.

### T3 — Implement the refactored form in TSX

- [ ] **T3.1** Implement `InputField.tsx` with `<label htmlFor>` and correctly typed `onChange`.
- [ ] **T3.2** Implement `SimpleForm.tsx` and pure validators with controlled values.
- [ ] **T3.3** Expose validation errors through readable text, `aria-invalid`, and `aria-describedby` linked to the correct input.
- [ ] **T3.4** Handle submit predictably; focus the first invalid field only after a failed submission, rather than scrolling on each keystroke.
- [ ] **T3.5** Render the form from `App.tsx` (or from an existing starter route) without creating a separate JSX application.
- [ ] **T3.6** Build using `npm run build` inside `Lab04_Exercise02/app`.

**Pass:** Valid/invalid submission works, TypeScript passes, and there is no chained validation `useEffect`.  
**Suggested commit:** `refactor(ex1.3): replace chained effects with typed form validation`.

### T4 — Verify the form and compare performance

- [ ] **T4.1** Test blank fields, invalid values, correction, valid submit, and rapid input.
- [ ] **T4.2** Confirm no stale field errors or uncontrolled/controlled-input warnings.
- [ ] **T4.3** Use React DevTools Profiler and Chrome Console to check for cascading renders and `Maximum update depth exceeded`.
- [ ] **T4.4** Verify labels, focus, error announcements, and keyboard interaction.
- [ ] **T4.5** Update `evidence/validation-baseline.md` with measured before/after findings; note when a baseline is illustrative rather than measured.

**Pass:** The refactored TSX form is stable and accessible in tested states.  
**Suggested commit if changes were required:** `test(ex1.3): verify typed form validation`.

### T5 — Implement or connect a real backend API

- [ ] **T5.1** Inspect instructor-provided backend first. If absent, create a minimal real local API under `Lab04_Exercise02/server` (TypeScript recommended).
- [ ] **T5.2** Document the request path, supported channels, response structure, and error shape before writing the frontend hook.
- [ ] **T5.3** Return channel-specific data for `nasa`, `esports-tribunal`, and `notNasa`; use appropriate HTTP codes for genuine errors.
- [ ] **T5.4** Connect the Vite app to the backend using a documented base URL or proxy; never embed credentials.
- [ ] **T5.5** Smoke-test success for all three channels and a controlled failure independently of React.

**Possible example only if no API contract was supplied:** `GET /api/messages?channel=nasa` → `{ "channel": "nasa", "messages": [...] }`. This is not an instructor-defined endpoint.

**Pass:** Real backend requests can be observed in Network; all three specified channels work.  
**Suggested commit:** `feat(ex1.3): add channel messages API`.

### T6 — Implement the typed `useForumMessages` hook

- [ ] **T6.1** Define `type Channel = "nasa" | "esports-tribunal" | "notNasa"` and appropriate message/response types in `src/types/forum.ts`.
- [ ] **T6.2** Implement `src/hooks/useForumMessages.ts`; accept the active channel and return a typed loading, success/empty, or error state.
- [ ] **T6.3** Allocate a **new `AbortController` per request**, pass `signal` to `fetch`, and abort inside the effect cleanup on channel change/unmount.
- [ ] **T6.4** Do not report intentional aborts as errors. Handle HTTP non-2xx, network failures, and malformed payloads safely.
- [ ] **T6.5** Prevent late responses from replacing messages for a newer channel; clear or label previous data during transitions.
- [ ] **T6.6** Check TypeScript compilation and `npm run build`.

**Pass:** The hook fetches real data, cleans up requests, and cannot display stale results under a new channel.  
**Suggested commit:** `feat(ex1.3): implement typed cancellable useForumMessages hook`.

### T7 — Build the accessible live channel switcher

- [ ] **T7.1** Create `src/components/ChannelSwitcher.tsx` with a labeled native `<select>` or an accessible equivalent.
- [ ] **T7.2** Provide exactly the three choices `nasa`, `esports-tribunal`, and `notNasa`.
- [ ] **T7.3** Connect the selected channel to `useForumMessages` and display messages from the **active** channel only.
- [ ] **T7.4** Implement distinct loading, empty, success, and genuine-error states; offer retry if useful.
- [ ] **T7.5** Use appropriate status announcements without repeatedly interrupting typing or stealing focus.
- [ ] **T7.6** Confirm keyboard navigation and run `npm run build`.

**Pass:** One TSX UI provides rapid channel switching without stale content.  
**Suggested commit:** `feat(ex1.3): add accessible live channel switcher`.

### T8 — Verify cancellation with Chrome DevTools Slow 3G

- [ ] **T8.1** Start the backend and `Lab04_Exercise02/app`; open Chrome DevTools → **Network**.
- [ ] **T8.2** Select **Slow 3G**, optionally enable **Disable cache**, and keep the Fetch/XHR requests visible.
- [ ] **T8.3** Rapidly switch `nasa` → `esports-tribunal` → `notNasa` before the previous requests finish.
- [ ] **T8.4** Inspect requests for cancelled/aborted old fetches; verify that the final UI shows data belonging only to `notNasa`.
- [ ] **T8.5** Repeat the sequence and distinguish expected React Strict Mode development cleanup requests from real failures.
- [ ] **T8.6** Record actual observations, reproduction steps, and screenshot references in `evidence/network-cancellation.md`.

**Pass:** Obsolete in-flight requests are demonstrably cancelled client-side; the most recent channel controls the UI.  
**Note:** Browser cancellation is **not** proof that backend work already underway was stopped.

### T9 — Verify full-stack errors and save logs

- [ ] **T9.1** Simulate or trigger **one genuine** HTTP/network failure without redefining `notNasa` as an error channel.
- [ ] **T9.2** Confirm the frontend displays an understandable error state and any retry behavior works.
- [ ] **T9.3** Confirm an intentional `AbortController` cancellation is **not** shown as a user-visible failure.
- [ ] **T9.4** Capture sanitized Console, Network, and backend evidence as appropriate.
- [ ] **T9.5** Save `evidence/fullstack-error-log.md` with actual timestamp, channel, conditions, HTTP status (if present), UI state, server logs, and result.

**Pass:** Evidence differentiates a real backend failure from a deliberate cancelled fetch.  
**Suggested commit:** `test(ex1.3): document cancellation and full-stack errors`.

### T10 — Test WCAG 2.2 AA and React DevTools

- [ ] **T10.1** Verify keyboard-only operation (`Tab`, `Shift+Tab`, `Enter`, arrow keys where appropriate), visible focus, and logical focus order (2.1.1, 2.4.3, 2.4.7).
- [ ] **T10.2** Check label/error relationships (`<label>`, `aria-invalid`, `aria-describedby`) and useful error instructions (1.3.1, 3.3.1, 3.3.2, 3.3.3).
- [ ] **T10.3** Check screen-reader/live-status behavior for loading, success, empty, and error states (4.1.2, 4.1.3).
- [ ] **T10.4** Measure applicable text contrast (1.4.3), non-text contrast (1.4.11), and test reflow at 320 CSS px (1.4.10).
- [ ] **T10.5** Verify focus is not obscured (2.4.11); respect reduced-motion settings for any nonessential animation.
- [ ] **T10.6** Use React DevTools, Lighthouse/axe, manual keyboard and (if available) screen-reader testing; record actual results and limitations.
- [ ] **T10.7** Write `evidence/accessibility-checklist.md` with passes, failures, fixes, and evidence links.

**Pass:** Applicable Level A/AA issues in tested flows are addressed or explicitly recorded. An automated score alone does **not** prove WCAG conformance.

### T11 — Final build, Git, and submission check

- [ ] **T11.1** Run `npm run build` in **the single** `Lab04_Exercise02/app` frontend; run backend checks/smoke tests using the actual server's instructions.
- [ ] **T11.2** Confirm all Exercise 1.3 and Sprint 3 artifacts are in `Lab04_Exercise02` and no changes were made to `Lab04_Exercise01`.
- [ ] **T11.3** Document startup commands for both `app` and `server` (when used), API contract, and evidence paths in a brief README.
- [ ] **T11.4** From the **existing repository**, run `git status`, `git diff --staged`, `git log --oneline`, and check `git remote -v`.
- [ ] **T11.5** Commit only relevant source/docs/evidence (never secrets, `node_modules`, or `dist`) and `git push`. Confirm the push succeeded.
- [ ] **T11.6** Compare the final implementation to the instructor's submission instructions.

**Pass:** One TSX app builds, real API behavior and Sprint 3 evidence are saved, and the Git repository is clean and pushed.

## 4. Acceptance checklist (TSX only)

| Requirement | Done | Evidence |
| --- | :---: | --- |
| Five chained effects analyzed without inducing a crash | ☐ | `evidence/validation-baseline.md` |
| `InputField.tsx` + `SimpleForm.tsx` use stable controlled state | ☐ | Source + React DevTools |
| Typed, pure validation avoids parent/child effect loops | ☐ | Source + form tests |
| Keyboard, labels, errors, and focus are usable | ☐ | `evidence/accessibility-checklist.md` |
| Real backend serves three required channels | ☐ | Network + API smoke tests |
| Typed `useForumMessages.ts` fetches and cancels requests | ☐ | Hook + Network |
| Rapid switches under Slow 3G cancel outdated fetches | ☐ | `evidence/network-cancellation.md` |
| Genuine errors and intentional aborts are distinguished | ☐ | `evidence/fullstack-error-log.md` |
| WCAG 2.2 A/AA checks recorded | ☐ | Accessibility checklist |
| TSX build succeeds; Git commits and push verified | ☐ | Terminal + Git log |

## 5. Working conventions

- Complete **one subtask at a time**, unless the student asks for continuous steps.
- Use PowerShell commands with the current working directory stated explicitly.
- Make atomic commits at meaningful milestones; do **not** invent a required instructor commit count.
- Avoid recreating a dangerous infinite-update form in the live application.
- The slide's "5 renders per keypress" is an illustrative warning, **not a reproducible measurement guarantee**.
- Do not claim tests, logs, screenshots, or pushes occurred without actual verification.

## 6. References

- React — You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- React — `useEffect`: https://react.dev/reference/react/useEffect
- MDN — AbortController: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- W3C — WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/
