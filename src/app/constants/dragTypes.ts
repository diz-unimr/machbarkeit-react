/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export const DRAG_DATA_FORMATS = {
	CRITERION: "application/ontology-criterion",
	ATTRIBUTE: "application/attribute",
} as const;

export type DragDataFormat =
	(typeof DRAG_DATA_FORMATS)[keyof typeof DRAG_DATA_FORMATS];
