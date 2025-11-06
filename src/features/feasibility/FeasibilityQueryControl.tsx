/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "../../components/ui/buttons/Button";
import ButtonContainer from "../../components/ui/buttons/ฺButtonContainer";

export default function FeasibilityQueryControl() {
  return (
    <section
      id="query-controls"
      className="flex w-full justify-between items-center"
    >
      <div className="flex h-[50px] border border-[#9ea9b3] rounded-md w-[45%] items-center px-4">
        <p>
          Anzahl der Patienten: <span>-</span>
        </p>
      </div>
      <ButtonContainer>
        <Button
          id="load-query"
          type="primary"
          label="ZURÜCKSETZEN"
          isActive={true}
        />
        <Button
          id="save-query"
          type="primary"
          label="ABFRAGE STARTEN"
          isActive={false}
        />
      </ButtonContainer>
    </section>
  );
}
