/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import login from "./services/loginService";
import { useEffect, useState } from "react";
import Header from "@/components/layout/AppHeader";
import QueryOverview from "@/features/QueryOverview";
import FeasibilityQuery from "@/features/FeasibilityQuery";
import { Toaster } from "sonner";

function App() {
  const [isFeasibilityOpen, setIsFeasibilityOpen] = useState(false);

  useEffect(() => {
    login().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "flex items-start gap-3 w-[360px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
            title: "text-sm font-semibold text-gray-800",
            description: "text-xs text-gray-500 mt-1",
            success:
              "!bg-green-50 !border !border-green-200 [&_svg]:!text-green-600",
            error: "!bg-red-50 !border !border-red-200 [&_svg]:!text-red-600",
          },
        }}
      />
      <Header />
      <main className="flex flex-1 h-full overflow-hidden">
        {isFeasibilityOpen ? (
          <FeasibilityQuery
            onBack={() => {
              setIsFeasibilityOpen(false);
            }}
          />
        ) : (
          <QueryOverview onFeasibility={() => setIsFeasibilityOpen(true)} />
        )}
      </main>
    </div>
  );
}

export default App;
