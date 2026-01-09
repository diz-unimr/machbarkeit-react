/*
	SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later
*/

export async function login() {
  const loginUrl = `${import.meta.env.VITE_BACKEND_API_BASE}/login?next=${import.meta.env.VITE_BASE_URL}`;
  const res = await fetch(loginUrl, {
    credentials: "include",
    redirect: "manual",
  });

  if (res.type === "opaqueredirect") {
    window.location.href = res.url;
  }
}
