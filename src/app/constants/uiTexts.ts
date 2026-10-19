/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export const buttonLabels = {
  saveQuery: "Abfrage speichern",
  save: "Speichern",
  confirm: "Bestätigen",
  cancel: "Abbrechen",
  delete: "Löschen",
  edit: "Bearbeiten",
  reset: "Zurücksetzen",
  startQuery: "Abfrage Starten",
  stopQuery: "Abfrage Stoppen",
  setFilter: "Filter setzen",
  replaceAllFilters: "Alle Filter ersetzen",
  updateGlobalFilter: "Nur globale Filter aktualisieren",
  setGlobalFilter: "Globaler Filter setzen",
  resetToGlobalFilter: "Auf globalen Filter zurücksetzen",
  setLocalFilter: "Lokaler Filter setzen",
  editLocalFilter: "Lokaler Filter bearbeiten",
} as const;

export const titleTexts = {
  deleteGlobalFilter: "Globalen Filter löschen",
  applyGlobalFilter: "Globalen Filter anwenden",
  saveQuery: "Aktuelle Abfrage speichern",
} as const;

export const validationMessages = {
  minGreaterThanMax:
    "Der minimale Wert muss kleiner als der maximale Wert sein.",
  minSelection: "Bitte wählen Sie mindestens einen Wert aus.",
} as const;

export const warningMessages = {
  incompletedFilterCount: "Nicht bestätigte Filter: ",
  incompletedFilterAction: "Bitte bestätigen Sie den Filter",
  noTimeReference:
    "Für die ausgewählten Kriterien ist kein Zeitbezug verfügbar.",
} as const;

export const confirmationMessages = {
  deleteGlobalFilter:
    "Sind Sie sicher, dass Sie den globalen Filter löschen möchten? \n" +
    "Die für die betroffenen Kriterien festgelegten Zeiträume werden ebenfalls gelöscht.",
  updateOrReplaceFilters:
    "Einige Kriterien verwenden derzeit lokale Filter. Möchten Sie nur bestehende globale Filter aktualisieren oder alle Filter ersetzen?",
  applyGlobalFilterToAll:
    "Möchten Sie den neuen globalen Filter auf alle Kriterien anwenden?",
} as const;

export const placeholderTexts = {
  searchInput: "Code oder Suchbegriff eingeben",
  fileName: "Dateiname",
} as const;

export const resultTexts = {
  patientCount: "Anzahl der Patienten: ",
  insufficientResult: "Das Ergebnis ist zu klein",
} as const;

export const commonTexts = {
  inclusionCriteria: "Einschlusskriterien",
  exclusionCriteria: "Ausschlusskriterien",
  globalTimeRange: "Globaler Zeitraum: ",
  noFilter: "Kein Filter",
  noData: "Keine Daten",
  loading: "Laden...",
  value: "wert",
  max: "max",
  min: "min",
  from: "von",
  to: "bis",
} as const;
