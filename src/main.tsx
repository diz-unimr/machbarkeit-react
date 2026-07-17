/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@app/App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(<BrowserRouter><App /></BrowserRouter>);
