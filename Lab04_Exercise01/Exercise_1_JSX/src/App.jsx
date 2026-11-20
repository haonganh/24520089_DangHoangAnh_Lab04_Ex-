import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import PeopleLayout from "./layouts/PeopleLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import PersonDetailSkeleton from "./components/PersonDetailSkeleton";

import "./App.css";

// Lazy loading
const PersonDetail = lazy(() =>
  import("./components/PersonDetail")
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PeopleLayout />}>
        <Route element={<Home />}>
          <Route
            index
            element={<p>Select a person to view their details.</p>}
          />

          <Route
            path="people/:id"
            element={
              <Suspense fallback={<PersonDetailSkeleton />}>
                <PersonDetail />
              </Suspense>
            }
          />
        </Route>

        <Route path="about" element={<About />} />

        <Route
          path="*"
          element={<h2>404 - Page Not Found</h2>}
        />
      </Route>
    </Routes>
  );
}