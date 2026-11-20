# Lab 4 — Exercise 1: Task Decomposition

**Project:** Multi-Route Single-Page Application (SPA) Architecture  
**Exercises:** 1.1, 1.2, 1.2.1, and 1.2.2  
**Sprint:** Responsive Master–Detail Directory & Case Dossier Router  
**Implementation target:** React + React Router v7 (Declarative Mode), JavaScript/JSX or TypeScript/TSX to match the starter project  
**Accessibility target:** WCAG 2.2 Level AA  
**Status:** Planning document; implementation and conformance still require verification

## 1. Scope and source requirements

This task plan follows the four provided Lab 4 slides.

### Exercise 1.1 — Performance and resilience

- Use route-level code splitting with dynamic imports through `React.lazy()`.
- Wrap lazy route content with a `<Suspense>` boundary and a meaningful fallback.
- Build a dimension-matched skeleton/loading UI to minimize layout shift, targeting **CLS = 0 for the affected loading transition** under the test conditions.
- Include accessible loading semantics such as `aria-busy="true"` and an appropriate polite live status (`aria-live="polite"` or `role="status"`).

### Exercises 1.2 and 1.2.1 — React Router v7

- Replace legacy `<Switch>` with `<Routes>`.
- Define route UI using the `element` prop, for example `element={<PeopleLayout />}`.
- Use a parent layout route and `<Outlet />` for nested content.
- Use `<NavLink>` with a function-valued `className` to show active navigation state.
- Use the React Router v7 Declarative Mode API; import router primitives from `react-router` unless the existing project has a justified, compatible alternative.

### Exercise 1.2.2 — Master–detail page

- Implement a responsive two-column master–detail layout using CSS Grid, initially `grid-template-columns: minmax(280px, 1fr) 2fr`.
- Extract the selected person ID with `useParams()` from a dynamic route segment.
- Find the record using `people.find()` (with type-consistent ID comparison).
- Render an explicit not-found state if the ID does not match a record.
- Display attribute/value pairs with semantic `<dl>`, `<dt>`, and `<dd>` elements.

### Sprint 1 — Required deliverables

- Fulfill the `PeopleLayout.jsx` and `PersonDetail.jsx` component contracts, or equivalent `.tsx` files if the starter uses TypeScript.
- Use React Router v7 `<Outlet />` and `useParams()` correctly.
- Produce **two atomic feature commits** for the sprint: `feat: router layout` and `feat: detail route handling`.
- Complete React DevTools checkpoints: no console warnings and clean URL parameter parsing.
- The slide suggests an in-class timebox of **40–75 minutes**; use this as a prioritization guide, not as a strict runtime prediction.

## 2. Execution rules

1. Work sequentially: **T0 → T1 → T2 → T3 → T4 → T5 → T6 → T7 → T8**.
2. Do not assume the starter project's folder names, package manager, dataset, routes, or language. Inspect them before editing.
3. Keep each change small and testable. Record `PASS`, `FAIL`, or `NOT TESTED` for each checkpoint.
4. Do not mark accessibility or CLS as compliant without testing.
5. Preserve the starter project's naming and formatting conventions whenever possible.
6. Commit documentation **before** feature implementation if required by the instructor. The sprint still needs its two distinct atomic feature commits.

## 3. Task breakdown

### T0 — Inspect starter and establish a baseline

**Goal:** Understand the existing React application before modifying it.

**Steps**

- [ ] T0.1 — Open the project root in VS Code and identify `package.json`, `src/`, `main.jsx`/`main.tsx`, and the current app component.
- [ ] T0.2 — Inspect installed React, React Router, and build-tool versions; determine JSX versus TSX.
- [ ] T0.3 — Locate any existing `people` dataset, people list component, detail component, routing code, and CSS.
- [ ] T0.4 — Check Git status and remote without overwriting or discarding existing work.
- [ ] T0.5 — Run the existing development server and, when supported, the project's build/test scripts.
- [ ] T0.6 — Write down the baseline routes and any pre-existing errors or warnings.

**Done when:** The app can be inspected and baseline failures (if any) are identified separately from new work.

**Checkpoint:** `git status`; `npm run dev`; `npm run build` if defined.

### T1 — Add planning and AI-assistance documents

**Goal:** Establish the implementation plan before feature commits.

**Steps**

- [ ] T1.1 — Save `task_decomposition.md` and `ai_rule.md` in the instructor-required location (otherwise the repository root).
- [ ] T1.2 — Verify both files use accessible Markdown: one H1, nested heading order, meaningful link text, and language-labeled code blocks.
- [ ] T1.3 — Review the files against all four slides and adjust only confirmed project-specific paths or details.
- [ ] T1.4 — Commit and push the documents **before feature implementation**, if the instructor expects a visible Git history.

**Suggested documentation commit:**

```bash
git add task_decomposition.md ai_rule.md
git commit -m "docs: plan Lab 4 exercise 1 and accessibility checks"
```

**Done when:** The files exist in the repository and the documentation commit is recorded.

### T2 — Exercise 1.1: Lazy-load route components

**Goal:** Avoid bundling all route UI into the first render.

**Steps**

- [ ] T2.1 — Identify which top-level route component(s) can be lazy-loaded without breaking existing exports.
- [ ] T2.2 — Use `React.lazy(() => import('./...'))` with a valid default component export.
- [ ] T2.3 — Add `<Suspense fallback={...}>` around the lazy-loaded route element(s).
- [ ] T2.4 — Keep shared navigation and other persistent layout elements outside unnecessarily broad loading boundaries.
- [ ] T2.5 — Verify that the route still renders after direct entry, in-app navigation, and browser refresh (with an appropriate SPA development-server fallback).

**Done when:** Lazy components load and display correctly, and a visible fallback appears during delayed loading.

**Checkpoint:** Browser DevTools Network tab shows the relevant asynchronously loaded JavaScript chunk after production build or when the dev environment exposes chunk loading; no missing default-export errors.

### T3 — Exercise 1.1: Stable and accessible loading fallback

**Goal:** Present a resilient loading state that does not unexpectedly move surrounding content.

**Steps**

- [ ] T3.1 — Create a `Skeleton` fallback that resembles the final detail region's dimensions and structure.
- [ ] T3.2 — Reserve sufficient space using layout or sizing rules; avoid introducing a different column width during loading.
- [ ] T3.3 — Associate `aria-busy="true"` with the region actually loading; ensure it returns to `false` or the busy region is replaced after load.
- [ ] T3.4 — Provide a short, non-repeating, perceivable status such as `Loading person details…` through `role="status"` / `aria-live="polite"`. Do not give decorative skeleton bars redundant spoken labels.
- [ ] T3.5 — Simulate slow loading with network throttling and inspect the Layout Shift/Performance tools when available.
- [ ] T3.6 — Honor `prefers-reduced-motion` if the skeleton animates.

**Done when:** Loading is perceivable, assistive technology can identify the status, and the measured loading transition does not show an unintended layout shift (target CLS contribution: 0 in the checked scenario).

**Checkpoint:** Keyboard, screen-reader or accessibility-tree inspection, responsive layout, and a recorded layout-shift observation.

**Optional feature commit outside Sprint 1:**

```bash
git add src
git commit -m "feat: add lazy-loaded routes and accessible skeleton"
```

Stage only files actually related to this feature, and skip the commit if the code is not complete.

### T4 — Exercises 1.2/1.2.1: Set up React Router v7 layout

**Goal:** Establish modern nested routing and the master list container.

**Steps**

- [ ] T4.1 — Verify React Router v7 is installed; install the matching project dependency only if absent.
- [ ] T4.2 — Use one top-level router provider (`<BrowserRouter>` in Declarative Mode) if one is not already provided.
- [ ] T4.3 — Replace legacy `<Switch>` with `<Routes>` and use `<Route element={...}>`.
- [ ] T4.4 — Introduce a parent people route rendering `PeopleLayout` and a child area through `<Outlet />`.
- [ ] T4.5 — Add an index state (for example, “Select a person”) and a dynamic detail child route (for example, `:id`).
- [ ] T4.6 — Render the list with semantic navigation and stable, valid links to person-detail URLs.
- [ ] T4.7 — Apply the desktop CSS Grid layout and responsive single-column breakpoint before committing the router layout.
- [ ] T4.8 — Use `<NavLink className={({ isActive }) => ...}>` for visible active state; avoid expressing selection with color alone. Preserve active semantics such as `aria-current="page"` when available from `NavLink`.
- [ ] T4.9 — Ensure unmatched top-level URLs have a useful fallback route.

**Done when:** Navigation switches the child content without a full-page refresh and all route declarations use the current API.

**Sprint Git commit 1 — required:**

```bash
git add src
git commit -m "feat: router layout"
```

**Checkpoint:** Check home/index route, detail route shell, Back/Forward, active link styling, and keyboard focus visibility. Do not include unfinished `PersonDetail` handling in this commit.

### T5 — Exercise 1.2.2: Implement routed person detail

**Goal:** Display a single person based on the URL.

**Steps**

- [ ] T5.1 — Implement `PersonDetail.jsx` or `PersonDetail.tsx` using `useParams()`.
- [ ] T5.2 — Read the route parameter (`id`) and find the matching entry with `people.find()`; align ID types before comparison without assuming all IDs are numeric.
- [ ] T5.3 — Render a clear not-found message when the ID is missing or does not match a person.
- [ ] T5.4 — Use one meaningful detail heading and `<dl><dt>…</dt><dd>…</dd></dl>` for fields such as Name and Role (based on actual dataset fields).
- [ ] T5.5 — Provide a keyboard-accessible link back to the directory when useful.
- [ ] T5.6 — Keep route parameters and displayed data escaped by React; do not use `dangerouslySetInnerHTML` for untrusted values.
- [ ] T5.7 — Check valid, invalid, malformed, and direct-entry URLs.

**Done when:** Valid URLs show the correct record and invalid IDs show a controlled not-found state with no runtime error.

**Sprint Git commit 2 — required:**

```bash
git add src
git commit -m "feat: detail route handling"
```

**Checkpoint:** Verify `useParams()` values and the selected record with React DevTools; confirm console is warning-free.

### T6 — Exercise 1.2.2: Responsive CSS Grid polish

**Goal:** Make the directory and detail panel usable on desktop and mobile.

**Steps**

- [ ] T6.1 — Apply the slide's desktop grid: `grid-template-columns: minmax(280px, 1fr) 2fr`.
- [ ] T6.2 — Add a smaller-screen breakpoint that changes to one column and maintains logical reading order.
- [ ] T6.3 — Check 320 CSS px width, 400% zoom, and enlarged text for unintended horizontal scrolling.
- [ ] T6.4 — Ensure responsive resizing does not obscure focus indicators or route content.
- [ ] T6.5 — Confirm text, links, controls, and selected/hover/focus states remain distinguishable in both layouts.

**Done when:** The master list and detail content remain usable in narrow and wide viewports, including keyboard navigation.

**Commit rule:** If this styling is needed for the router-layout contract, implement and commit it within **Sprint commit 1 (T4)** rather than as a later unrelated sprint commit. T6 is a final validation/polish checkpoint; substantive uncommitted fixes must be included in the relevant atomic commit before final submission (use a new corrective commit only if the course workflow permits).

### T7 — WCAG 2.2 AA and React DevTools validation

**Goal:** Collect test evidence instead of assuming compliance.

**Functional test matrix**

- [ ] T7.1 — Index/list route works.
- [ ] T7.2 — Valid person IDs resolve to the correct details.
- [ ] T7.3 — Unknown IDs show a not-found state; unknown paths are handled.
- [ ] T7.4 — Direct URL entry, refresh, Back, and Forward work.
- [ ] T7.5 — Lazy loading and fallback work under throttled conditions.
- [ ] T7.6 — React DevTools component tree shows expected `PeopleLayout`, `Outlet`, and `PersonDetail`; inspect `useParams()` behavior.
- [ ] T7.7 — Browser console contains no new errors or warnings.

**Accessibility test matrix (WCAG 2.2, Level A + AA)**

- [ ] T7.8 — **1.1.1 Non-text Content (A):** Non-decorative imagery has alternatives; decorative skeleton visuals are not redundantly announced.
- [ ] T7.9 — **1.3.1 Info and Relationships (A):** Semantic landmarks, headings, lists, and definition lists represent the visual structure.
- [ ] T7.10 — **1.3.2 Meaningful Sequence (A):** The DOM reading order remains logical when CSS Grid collapses.
- [ ] T7.11 — **1.4.3 Contrast (Minimum) (AA):** Normal text >= 4.5:1; large text >= 3:1, except documented WCAG exceptions.
- [ ] T7.12 — **1.4.10 Reflow (AA):** At 320 CSS px equivalent width, no two-dimensional scrolling is needed for ordinary content.
- [ ] T7.13 — **1.4.11 Non-text Contrast (AA):** Essential UI indicators and states >= 3:1 against adjacent colors where applicable.
- [ ] T7.14 — **2.1.1 Keyboard (A):** All route links and controls are operable from the keyboard.
- [ ] T7.15 — **2.4.1 Bypass Blocks (A), where applicable:** Provide an efficient way to skip repeated navigation (such as a skip link).
- [ ] T7.16 — **2.4.3 Focus Order (A):** Keyboard focus follows a meaningful order on navigation and route changes.
- [ ] T7.17 — **2.4.7 Focus Visible (AA):** Visible focus indication is preserved.
- [ ] T7.18 — **2.4.11 Focus Not Obscured (Minimum) (AA):** Focus is not entirely hidden by author-created content.
- [ ] T7.19 — **2.5.8 Target Size (Minimum) (AA):** Pointer targets are at least 24 x 24 CSS px or satisfy a documented exception.
- [ ] T7.20 — **3.2.3 Consistent Navigation (AA):** Repeated navigation has a consistent relative order.
- [ ] T7.21 — **4.1.2 Name, Role, Value (A):** Custom interactive UI exposes programmatic semantics.
- [ ] T7.22 — **4.1.3 Status Messages (AA):** Loading and not-found statuses are perceivable without forcibly moving focus when they qualify as status messages.
- [ ] T7.23 — Test with Tab, Shift+Tab, Enter, and a screen reader when available; inspect the accessibility tree.
- [ ] T7.24 — Run an automated accessibility check (such as axe DevTools or Lighthouse); manually review any applicable issues that automation cannot decide.
- [ ] T7.25 — Check the effect of client-side navigation on title, focus, and context; implement an appropriate route-change announcement/focus strategy if needed.

**Done when:** Each applicable criterion and functional test has recorded evidence; failures are fixed or listed transparently.

### T8 — Build, repository review, and submission

**Goal:** Prepare a reproducible final submission.

**Steps**

- [ ] T8.1 — Run the project build (`npm run build` if the package defines it) and any provided tests or lint scripts.
- [ ] T8.2 — Re-test the production preview if the project supports it.
- [ ] T8.3 — Confirm the two sprint feature commits exist with the required messages and represent distinct work.
- [ ] T8.4 — Inspect `git diff`, `git status`, and `git log --oneline` for uncommitted files, accidental secrets, generated artifacts, and unrelated changes.
- [ ] T8.5 — Push to the correct instructor-designated remote and branch after verifying the destination.
- [ ] T8.6 — Record final validation results and the repository URL for submission.

**Done when:** Build succeeds, required history is present, no unresolved critical issue is hidden, and the intended remote contains the submission.

## 4. Suggested implementation structure (adapt to the starter)

```text
src/
  App.jsx                 # Routes and route-level Suspense, if appropriate
  main.jsx                # Router provider, if not already elsewhere
  components/
    Skeleton.jsx          # Accessible loading fallback
    PeopleLayout.jsx      # Directory navigation + Outlet
    PersonDetail.jsx      # useParams + people.find + semantic details
    NotFoundState.jsx     # Reusable fallback for missing records/routes
  data/
    people.js             # Only if no provided dataset exists
  styles/
    ...                   # Project-consistent CSS
```

If the existing app is TypeScript, keep the same structure with `.tsx` / `.ts` extensions and typed data. Do not create duplicate components solely to match this illustrative tree.

## 5. Sprint commit and test gates

| Gate | Required evidence | Git checkpoint |
| --- | --- | --- |
| Documentation | Both Markdown files in repository before feature work | `docs: plan Lab 4 exercise 1 and accessibility checks` |
| Exercise 1.1 | Lazy route loads, fallback appears, accessibility and layout shift inspected | Optional separate pre-sprint performance commit |
| Sprint: layout | `<Routes>`, `element`, nested `<Outlet />`, navigable responsive directory | `feat: router layout` |
| Sprint: detail | `useParams()`, `people.find()`, semantic detail, invalid-ID fallback | `feat: detail route handling` |
| Final quality | DevTools, console, mobile/zoom, accessibility, build, Git review | Record results; fixes must be accounted for |

**Sprint interpretation:** The two `feat:` commits are specifically required for Sprint 1. A preceding documentation commit and an optional Exercise 1.1 performance commit do not replace either of those two commits.

## 6. Definition of Done

The exercise is ready to submit only when all of the following are verified:

- [ ] Exercise 1.1 code splitting, Suspense, stable skeleton fallback, and accessible loading state are implemented.
- [ ] React Router v7 route definitions, nested layout, Outlet, and active navigation work.
- [ ] Master–detail layout responds appropriately to viewport and zoom changes.
- [ ] `useParams()` detail lookup succeeds for valid IDs and fails gracefully for invalid IDs.
- [ ] Person fields are presented with semantic definition-list markup.
- [ ] No newly introduced console errors or warnings; React DevTools and URL checks pass.
- [ ] Relevant WCAG 2.2 A and AA tests have actual PASS/FAIL evidence; no unsupported conformance claim is made.
- [ ] The required two sprint atomic feature commits exist and the final build is successful.

## 7. Primary references

- [React Router — Declarative Routing](https://reactrouter.com/start/declarative/routing)
- [React Router — Declarative Mode](https://reactrouter.com/start/modes)
- [React — lazy](https://react.dev/reference/react/lazy)
- [React — Suspense](https://react.dev/reference/react/Suspense)
- [W3C — WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/)
- [W3C — How to Meet WCAG 2.2 (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)

**Source note:** The functional requirements and the two specified sprint commits come from the four supplied slide images. The detailed testing checkpoints and WCAG success-criterion mapping are implementation guidance added to support verifiable Level AA work; they are not claims printed on the slides.
