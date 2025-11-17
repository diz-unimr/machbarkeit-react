/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useRef, useState, type ReactNode } from "react";

type handlePanelProps = {
  toggleLeftPanel: (isToggle: boolean) => void;
};

type SplitterProps = {
  leftChild: (handleLeftPanel: handlePanelProps) => ReactNode;
  rightChild: ReactNode;
  startLeftPercent?: number;
};

export default function Splitter({
  leftChild,
  rightChild,
  startLeftPercent = 50,
}: SplitterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [leftWidth, setLeftWidth] = useState<number | null>(null);

  const toggleLeftPanel = (isToggle: boolean) => {
    setIsExpanded(isToggle);
  };

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;
    const currentWidth = e.clientX;
    setLeftWidth(currentWidth);
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", stopResizing);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setLeftWidth(width / 2);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex w-full h-full">
      {/* Left Panel */}
      <div
        className="h-full bg-white w-[50%]"
        style={{
          width: isExpanded
            ? (leftWidth ?? `${startLeftPercent}%`)
            : "fit-content",
          minWidth: isExpanded ? "300px" : undefined,
          maxWidth: "50%",
          transition: isResizing.current ? "none" : "width 0.3s ease",
        }}
      >
        {leftChild({ toggleLeftPanel })}
      </div>
      {/* Splitter */}
      <div
        className={
          isExpanded
            ? "w-[4px] border-r-2 border-gray-300 bg-[var(--color-border)] hover:bg-gray-300 cursor-col-resize"
            : "border-r-[1.5px] border-[var(--color-border)]"
        }
        onMouseDown={isExpanded ? startResizing : undefined}
      ></div>
      {/* Right Panel */}
      <div className="flex-1 h-full bg-gray-100">{rightChild}</div>
    </div>
  );
}
