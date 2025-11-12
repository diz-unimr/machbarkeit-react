/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useRef, useState, type ReactNode } from "react";

type handlePanelProps = {
  toggleLeftPanel: (isToggle: boolean) => void;
  isMinWidthReached: boolean;
};

type SplitterProps = {
  leftChild: (handleLeftPanel: handlePanelProps) => ReactNode;
  rightChild: ReactNode;
  minLeftPercent?: number;
  maxLeftPercent?: number;
};

export default function Splitter({
  leftChild,
  rightChild,
  minLeftPercent = 5,
  maxLeftPercent = 50,
}: SplitterProps) {
  const [leftPercent, setLeftPercent] = useState<number>(maxLeftPercent);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMinWidthReached, setIsMinWidthReached] = useState<boolean>(false);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const toggleLeftPanel = (isToggle: boolean) => {
    setIsExpanded(isToggle);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const newPercent = Math.min(
        maxLeftPercent,
        Math.max(minLeftPercent, (relativeX / rect.width) * 100)
      );

      // throttle animation frame not re-render all times
      requestAnimationFrame(() => {
        setLeftPercent(newPercent);
      });

      if (newPercent === minLeftPercent) {
        setIsMinWidthReached(true);
        setIsExpanded(false);
      }
    };

    const stopResizing = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [minLeftPercent, maxLeftPercent]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full overflow-hidden"
    >
      {/* Left Panel */}
      {String(isExpanded)}
      <div
        className="h-full border-r border-gray-300 bg-white"
        style={{
          width: isExpanded
            ? leftPercent === minLeftPercent
              ? `${maxLeftPercent}%`
              : `${leftPercent}%`
            : `${minLeftPercent}%`,
          transition: isResizing.current ? "none" : "width 0.3s ease",
        }}
      >
        {leftChild({ toggleLeftPanel, isMinWidthReached })}
      </div>

      {/* Splitter */}
      {isExpanded && (
        <div
          className="w-[1.5px] bg-[var(--color-border)] hover:bg-gray-300 cursor-col-resize"
          onMouseDown={startResizing}
        ></div>
      )}

      {/* Right Panel */}
      <div className="flex-1 h-full bg-gray-100">{rightChild}</div>
    </div>
  );
}
