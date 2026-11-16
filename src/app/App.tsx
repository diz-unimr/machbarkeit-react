/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import login from "./services/loginService";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Header from "@/components/layout/AppHeader";
import QueryOverview from "@/features/QueryOverview";
import FeasibilityQuery from "@/features/FeasibilityQuery";

function App() {
  const [isFeasibilityOpen, setIsFeasibilityOpen] = useState(false);

  useEffect(() => {
    login().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      <Toaster position="top-right" richColors />
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
