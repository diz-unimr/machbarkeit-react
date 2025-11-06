/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import Card from "../../components/layout/Card";
import OntologyButton from "../../components/ui/buttons/OntologyButton";
import InputTextField from "../../components/ui/inputs/InputTextField";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import type { Criterion } from "../ontology/type";

export default const FeasibilityBuilder = (toggleOntologyButton: () => void) {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleTextChange = (text: string | number) => {
    setTextInput(text as string);
  };

  return (
    <section>
      <Card header="Einschlusskriterien">
        <div className="h-full flex flex-col gap-4">
          <div className="flex gap-3 w-full h-full justify-between items-center">
            <OntologyButton
              onClick={() => toggleOntologyButton()
              }
            />
            <div className="flex w-full max-w-[92%]">
              <InputTextField
                id="search-text"
                label="Code oder Suchbegriff eingeben"
                value={textInput}
                type="search"
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div></div>
        </div>
      </Card>
    </section>
  );
}
