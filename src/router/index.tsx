import Layout from "@/layout";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/components/global";

const Landing = lazy(() => import("@/pages/landing"));
const NoMatch = lazy(() => import("@/pages/noMatch"));
const Callback = lazy(() => import("@/pages/callback"));
const AppAuth = lazy(() => import("@/pages/auth"));
const AppMain = lazy(() => import("@/pages/app"));
const AppShare = lazy(() => import("@/pages/share"));
const AppMine = lazy(() => import("@/pages/mine"));

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="/auth" element={<AppAuth />} />
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
