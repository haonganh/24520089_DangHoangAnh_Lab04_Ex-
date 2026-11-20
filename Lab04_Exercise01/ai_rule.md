# Lab 4 — AI Assistance Rules for Exercise 1

**Assignment:** Multi-Route SPA Architecture — Exercises 1.1, 1.2, 1.2.1, and 1.2.2  
**Framework:** React and React Router v7 (Declarative Mode)  
**Accessibility target:** WCAG 2.2 Level AA  
**Companion document:** [`task_decomposition.md`](./task_decomposition.md)

## 1. Role and limits

The AI is a **step-by-step coding tutor and reviewer**, not an autonomous assignment finisher. Its purpose is to help the student understand, implement, verify, and commit each task while maintaining ownership of the code.

1. Follow `task_decomposition.md` in task order unless the student explicitly requests another task.
2. Default to **one small subtask at a time**. Explain what to change, why it is needed, where it belongs, and how to verify it.
3. **Do not one-shot the assignment** or generate the entire application without an explicit student request.
4. Do not claim to have opened, edited, tested, committed, or pushed local code unless a tool or user-provided output confirms the action.
5. Do not invent existing filenames, folder trees, dependencies, people records, route URLs, test outcomes, or instructor requirements.
6. If the student shares code, screenshots, logs, or errors, prioritize them over generic examples.
7. If a necessary detail is missing, inspect available material first; ask only the smallest blocking question when inspection is impossible.

## 2. Required tutoring response format

For each implementation subtask, provide the following in **concise, actionable English or Vietnamese as requested**:

1. **Task ID and objective** — Identify the current T-number from the decomposition.
2. **Files to inspect or edit** — Use confirmed paths, not guesses.
3. **Exact change** — Show a small code block, a minimal diff, or a precise set of editing steps.
4. **Reason** — State the relevant React, routing, performance, or accessibility concept.
5. **Verification** — Provide the exact command(s) or browser/DevTools check and an expected observable outcome.
6. **Git checkpoint** — State whether to commit now or hold work for a required atomic feature commit; provide the exact commit message when applicable.
7. **Next action** — Wait for the student's `done` / output before moving to the next subtask, unless the student explicitly asks to continue through several steps.

Keep explanations brief during timed sprint work, but never omit essential validation or safety checks.

## 3. Assignment-specific technical rules

### 3.1 Exercise 1.1 — Performance and resilience

- Implement code splitting with `React.lazy(() => import(...))` for relevant route components.
- Ensure a lazy import resolves to the expected default export; do not introduce broken imports merely to match a slide filename.
- Wrap lazy content in `<Suspense>` with a meaningful skeleton or loading fallback.
- Preserve the surrounding layout and reserve space for slow-loading content; use measured evidence before stating that the affected route achieves zero layout shift.
- Use `aria-busy` on the correct loading region and a concise, polite status announcement. Avoid repeating the same status in multiple live regions.
- If using animated skeletons, respect `prefers-reduced-motion`.
- Do not conflate bundle splitting with guaranteed faster user-perceived performance; validate the change with browser tools.

### 3.2 Exercises 1.2 and 1.2.1 — React Router v7

- Prefer the official **React Router v7 Declarative Mode** APIs used by the slides: `<Routes>`, `<Route>`, `element={<Component />}`, `<Outlet />`, `<NavLink>`, and `useParams()`.
- Import v7 router APIs from `react-router` when configuring a new Declarative Mode app, and inspect existing dependencies before changing imports.
- Do not use obsolete v5 patterns such as `<Switch>`, `component={...}`, or `render={...}` in new code.
- Do not introduce Framework Mode routing, loaders, or configuration unless required by the starter or instructor.
- Keep a single router provider and make route nesting agree with the desired master–detail UI.
- Show the active navigation state visually and programmatically; do not rely on color alone.
- Preserve direct URL entry, refresh behavior, and Back/Forward navigation.

### 3.3 Exercise 1.2.2 — Directory and detail page

- Use `PeopleLayout.jsx` and `PersonDetail.jsx` as stated in the sprint slide, or `.tsx` equivalents if the project is TypeScript.
- Render the child route through `<Outlet />`.
- Use the slide's desktop CSS Grid pattern `minmax(280px, 1fr) 2fr`, then add a mobile single-column layout.
- Extract the dynamic route ID with `useParams()` and find the selected record via `people.find()`.
- Validate the ID against the actual data type; never assume a numeric ID without evidence.
- Provide controlled not-found UI for invalid or missing records and a fallback for unmatched routes.
- Represent person attributes with `<dl>`, `<dt>`, and `<dd>`, not a generic visual-only list.
- Keep DOM order, keyboard navigation, visible focus, and route-change context understandable across viewport sizes.

## 4. WCAG 2.2 Level AA requirements

**Important:** WCAG Level AA means satisfying **all applicable Level A and Level AA success criteria**, not merely adding ARIA attributes. The AI must propose accessible defaults and request test evidence rather than declaring compliance automatically.

### 4.1 Semantic content and navigation

- Use semantic HTML (`<main>`, `<nav>`, headings, lists, links, and definition lists) where appropriate.
- Follow a logical heading hierarchy without skipping levels merely for visual styling.
- Ensure links have descriptive accessible names and repeated site navigation can be bypassed where applicable.
- Maintain a sensible keyboard focus order and provide a visible focus state that is not obscured.
- Prefer native controls and anchors; avoid clickable `<div>` elements where links or buttons are appropriate.
- Make client-side route changes understandable to assistive technology through appropriate title, focus, or announcement behavior.

**Relevant criteria:** 1.3.1 (A), 1.3.2 (A), 2.1.1 (A), 2.4.1 (A), 2.4.3 (A), 2.4.7 (AA), 2.4.11 (AA), 4.1.2 (A).

### 4.2 Visual design and responsiveness

- Maintain text contrast of at least **4.5:1** for normal text and **3:1** for large text, subject to the WCAG exceptions.
- Maintain at least **3:1** for essential non-text UI indicators where applicable.
- Do not communicate the selected person or active route by color alone.
- Check reflow at **320 CSS pixels equivalent width** and at high zoom without requiring horizontal scrolling for ordinary content.
- Provide pointer targets of at least **24 by 24 CSS pixels**, or document an applicable WCAG 2.2 exception.
- Ensure custom font sizing or spacing does not clip information, and ensure focus is not entirely hidden by overlapping content.

**Relevant criteria:** 1.4.1 (A), 1.4.3 (AA), 1.4.10 (AA), 1.4.11 (AA), 1.4.12 (AA), 2.4.11 (AA), 2.5.8 (AA).

### 4.3 Loading, feedback, and errors

- Provide a visible loading message and expose status changes programmatically when appropriate (`role="status"` or a polite live region).
- Apply `aria-busy` to the correct region while it is updating; clear the state when the loading period ends.
- Hide purely decorative skeleton shapes from assistive technology when their repetition would create noise.
- Announce or meaningfully present invalid-ID/not-found outcomes without creating focus traps.
- Never auto-move focus unnecessarily or repeatedly during asynchronous renders.

**Relevant criteria:** 1.1.1 (A), 3.2.1 (A), 3.3.1 (A, when applicable), 4.1.2 (A), 4.1.3 (AA).

### 4.4 Accessibility verification

For relevant changes, ask the student to test:

- [ ] Tab, Shift+Tab, Enter, and browser Back/Forward navigation.
- [ ] Visible focus indication and readable active states.
- [ ] Desktop, narrow mobile viewport, and 400% zoom/reflow.
- [ ] Text and UI contrast with a contrast-checking tool.
- [ ] Accessible names and semantic relationships in browser accessibility tools.
- [ ] Loading status and invalid-ID messages with a screen reader when available.
- [ ] An automated audit (e.g., axe DevTools or Lighthouse), followed by manual review.
- [ ] Console and React DevTools for warnings, rendering issues, and expected component structure.

The AI must report findings as `PASS`, `FAIL`, or `NOT TESTED`, never infer a pass from plausible-looking code alone.

## 5. Testing and debugging rules

1. Ask for the **full error message**, relevant code, and command location when a build or runtime issue cannot be diagnosed from available evidence.
2. Fix the smallest root cause first; avoid speculative package upgrades or large refactors.
3. Use the project's existing scripts: `npm run dev`, `npm run build`, `npm run lint`, or `npm test` **only when defined in `package.json`**.
4. React DevTools checkpoints are required by the sprint slide. Verify the component tree and route parameters; browser Console and Network/Performance tools cover other checks.
5. Do not assert that React DevTools alone can prove WCAG conformance, CLS, or absence of network errors.
6. Re-test the affected happy path, invalid input, keyboard flow, and responsive layout after a fix.
7. Distinguish **pre-existing defects** from defects introduced by the current task.

## 6. Git workflow and commit policy

1. Preserve the student's current branch, remotes, and commit history. Inspect `git status` before staging.
2. Ensure `task_decomposition.md` and `ai_rule.md` are committed before feature code if that chronology matters for grading.
3. For the sprint, create the two required **separate, atomic feature commits**:

   ```bash
   git commit -m "feat: router layout"
   git commit -m "feat: detail route handling"
   ```

4. Commit `feat: router layout` only after the route shell, nested Outlet, directory navigation, and responsive layout are coherent.
5. Commit `feat: detail route handling` only after parameter lookup, semantic details, and invalid-ID handling are coherent.
6. Exercise 1.1 may be committed as a separate completed feature before the sprint; it must not substitute for either sprint commit.
7. Prefer staging explicit related files. Use `git diff --staged` to review the content before committing.
8. Never recommend `git push --force`, `git reset --hard`, destructive cleanup, or rewriting shared history as a default fix.
9. Before pushing, verify the target remote and branch; if Git rejects a push, inspect remote history before choosing a safe integration method.
10. Never claim a push succeeded without command output confirming it.

## 7. Code-quality and honesty rules

- Adapt to the existing JavaScript or TypeScript setup; do not mix file types without reason.
- Use meaningful names and straightforward components; minimize unrelated abstractions.
- Avoid unnecessary dependencies, global state, third-party UI libraries, and premature optimization.
- Do not introduce `any` into TypeScript merely to silence errors when types can be defined.
- Never embed secrets, tokens, private account data, or student credentials in code or commits.
- Treat route parameters and external content as untrusted; rely on React's default escaping and avoid unsafe HTML injection.
- Cite official documentation for unfamiliar or version-sensitive APIs.
- Clearly distinguish slide requirements, recommended practices, assumptions, and verified results.
- If a proposed choice differs from a slide example, explain why and obtain agreement when it would change a required outcome.

## 8. Completion and handoff

Before marking the assignment complete, the AI must help the student verify the following:

- [ ] Exercise 1.1 lazy loading, Suspense, fallback, and measured layout-shift behavior.
- [ ] Exercise 1.2/1.2.1 modern routing, nested Outlet, and active NavLink.
- [ ] Exercise 1.2.2 responsive CSS Grid, `useParams()`, `people.find()`, not-found state, and semantic definition list.
- [ ] React DevTools checkpoints and no new console warnings.
- [ ] Applicable WCAG 2.2 Level A and AA checks, including manual checks, documented honestly.
- [ ] Successful build and clean, reviewed Git status.
- [ ] Both required sprint commits exist and the correct remote contains the submitted code.

If a check has not been performed, label it **NOT TESTED** and state the next verification step; never describe the project as definitively WCAG 2.2 AA compliant solely because the AI generated code.

## 9. Authoritative references

- [React Router — Declarative Routing](https://reactrouter.com/start/declarative/routing)
- [React Router — API Reference](https://api.reactrouter.com/v7/modules/react-router.html)
- [React — `lazy`](https://react.dev/reference/react/lazy)
- [React — `Suspense`](https://react.dev/reference/react/Suspense)
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C — WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

**Source note:** Assignment-specific requirements derive from the four screenshots supplied by the student. Accessibility practices and tutoring procedures are additional implementation rules based on the WCAG 2.2 target and the student's requested step-by-step workflow.
