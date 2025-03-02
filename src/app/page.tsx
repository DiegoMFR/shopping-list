import { Suspense } from "react";
import Dashboard from "./components/dashboard";
import DashboardSkeleton from "./components/dashboardSkeleton";


export default async function Home() {

  return (
    <div className="col-span-8 md:col-start-2 md:col-span-6">
      <h1 className="text-2xl p-2 pb-4 text-indigo-300">
        Your lists:
      </h1>
      <Suspense fallback={<DashboardSkeleton/>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
