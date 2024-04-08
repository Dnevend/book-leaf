import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("@/pages/landing"));
const NoMatch = lazy(() => import("@/pages/noMatch"));
const AppMain = lazy(() => import("@/pages/app"));

export const Router = () => {
  return (
    <Suspense fallback={"loading..."}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/app" element={<AppMain />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
};
