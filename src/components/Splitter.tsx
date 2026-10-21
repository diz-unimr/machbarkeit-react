/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type handlePanelProps = {
  toggleLeftPanel: (isToggle: boolean) => void;
};

type SplitterProps = {
  leftChild: (handleLeftPanel: handlePanelProps) => ReactNode;
  rightChild: ReactNode;
  startLeftPercent?: number;
};

const Splitter = ({
  leftChild,
  rightChild,
  startLeftPercent = 40,
}: SplitterProps) => {
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const currentWidth = e.clientX;
    setLeftWidth(currentWidth);
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  return (
    <div ref={containerRef} className="flex w-full h-screen overflow-hidden">
      {/* Left Panel */}
      <div
        className="h-full bg-white flex flex-col overflow-x-auto"
        style={{
          width: isExpanded
            ? (leftWidth ?? `${startLeftPercent}%`)
            : "fit-content",
          minWidth: isExpanded ? "35%" : undefined,
          maxWidth: "min(45%,1000px)",
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
      <div className="flex flex-col flex-1 h-full min-w-0 bg-gray-100 overflow-x-auto">
        <div className="min-w-[300px] h-full">{rightChild}</div>
      </div>
    </div>
  );
};
export default Splitter;
