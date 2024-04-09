import Layout from "@/layout";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoading from "@/components/pageLoading";

const Landing = lazy(() => import("@/pages/landing"));
const NoMatch = lazy(() => import("@/pages/noMatch"));
const Callback = lazy(() => import("@/pages/callback"));
const AppMain = lazy(() => import("@/pages/app"));
const AppShare = lazy(() => import("@/pages/share"));
const AppMine = lazy(() => import("@/pages/mine"));

export const Router = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="/callback" element={<Callback />} />

        <Route path="/" element={<Layout />}>
          <Route path="/app" element={<AppMain />} />
          <Route path="/share" element={<AppShare />} />
          <Route path="/mine" element={<AppMine />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
