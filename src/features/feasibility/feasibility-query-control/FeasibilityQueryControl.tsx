/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@components/ui/buttons/Button";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";

export default function FeasibilityQueryControl() {
  return (
    <div className="flex h-[60px] bg-white border-b-[1.5px] border-[var(--color-border)]">
      <div className="flex w-full max-w-[960px] justify-between m-auto px-8">
        <div className="flex w-full h-[50px] items-center px-2">
          <p>
            Anzahl der Patienten: <span>-</span>
          </p>
        </div>
        <ButtonContainer className="p-0">
          <Button
            id="reset-query"
            type="secondary"
            label="ZURÜCKSETZEN"
            isActive={true}
          />
          <Button
            id="save-query"
            type="primary"
            label="ABFRAGE STARTEN"
            isActive={true}
          />
        </ButtonContainer>
      </div>
    </div>
  );
}
