"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/gallery", label: "gallery" },
  { href: "/shop", label: "shop" },
  { href: "/pressKit", label: "press kit" },
  { href: "/video", label: "video" },
  { href: "/tickets", label: "tickets" },
  { href: "/blog", label: "blog!" },
];

export default function DraggableWindowNav() {
  const dockRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);

  const clampToViewport = (x: number, y: number) => {
    const dockEl = dockRef.current;
    if (!dockEl) {
      return { x, y };
    }

    const width = dockEl.offsetWidth;
    const height = dockEl.offsetHeight;
    const maxX = Math.max(8, window.innerWidth - width - 8);
    const maxY = Math.max(8, window.innerHeight - height - 8);

    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY),
    };
  };

  useEffect(() => {
    const dockEl = dockRef.current;
    if (!dockEl) {
      return;
    }

    const width = dockEl.offsetWidth;
    const height = dockEl.offsetHeight;
    const centeredX = (window.innerWidth - width) / 2;
    const bottomY = window.innerHeight - height - 16;
    setPosition(clampToViewport(centeredX, bottomY));

    const handleResize = () => {
      setPosition((current) => clampToViewport(current.x, current.y));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    dragRef.current.isDragging = true;
    dragRef.current.offsetX = event.clientX - position.x;
    dragRef.current.offsetY = event.clientY - position.y;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    const nextX = event.clientX - dragRef.current.offsetX;
    const nextY = event.clientY - dragRef.current.offsetY;
    setPosition(clampToViewport(nextX, nextY));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    dragRef.current.isDragging = false;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={dockRef}
      className={`desktop-dock${dragging ? " is-dragging" : ""}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="desktop-window">
        <div
          className="desktop-titlebar"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Drag window"
        >
          <div className="window-controls" aria-hidden="true">
            <span className="control control-min">-</span>
            <span className="control control-max">+</span>
          </div>
        </div>
        <div className="window-content">
          <nav className="nav-grid" aria-label="Primary">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-item">
                <span className="folder-icon" aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
