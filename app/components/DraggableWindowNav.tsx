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
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const galleryDragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);
  const [galleryPosition, setGalleryPosition] = useState({ x: 120, y: 120 });
  const [galleryDragging, setGalleryDragging] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const stopDockDrag = () => {
    dragRef.current.isDragging = false;
    setDragging(false);
    window.removeEventListener("pointermove", handleDockWindowMove);
    window.removeEventListener("pointerup", handleDockWindowUp);
  };

  const stopGalleryDrag = () => {
    galleryDragRef.current.isDragging = false;
    setGalleryDragging(false);
    window.removeEventListener("pointermove", handleGalleryWindowMove);
    window.removeEventListener("pointerup", handleGalleryWindowUp);
  };

  const handleDockWindowMove = (event: PointerEvent) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    const nextX = event.clientX - dragRef.current.offsetX;
    const nextY = event.clientY - dragRef.current.offsetY;
    setPosition(clampToViewport(nextX, nextY));
  };

  const handleDockWindowUp = () => {
    if (!dragRef.current.isDragging) {
      return;
    }

    stopDockDrag();
  };

  const handleGalleryWindowMove = (event: PointerEvent) => {
    if (!galleryDragRef.current.isDragging) {
      return;
    }

    const nextX = event.clientX - galleryDragRef.current.offsetX;
    const nextY = event.clientY - galleryDragRef.current.offsetY;
    setGalleryPosition(clampGalleryToViewport(nextX, nextY));
  };

  const handleGalleryWindowUp = () => {
    if (!galleryDragRef.current.isDragging) {
      return;
    }

    stopGalleryDrag();
  };

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

  const clampGalleryToViewport = (x: number, y: number) => {
    const galleryEl = galleryRef.current;
    if (!galleryEl) {
      return { x, y };
    }

    const width = galleryEl.offsetWidth;
    const height = galleryEl.offsetHeight;
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

  useEffect(() => {
    const dockEl = dockRef.current;
    if (!dockEl) {
      return;
    }

    const observer = new ResizeObserver(() => {
      if (dragRef.current.isDragging) {
        return;
      }

      const width = dockEl.offsetWidth;
      const height = dockEl.offsetHeight;
      const centeredX = (window.innerWidth - width) / 2;
      const bottomY = window.innerHeight - height - 16;
      setPosition(clampToViewport(centeredX, bottomY));
    });

    observer.observe(dockEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!galleryOpen) {
      return;
    }

    const galleryEl = galleryRef.current;
    if (!galleryEl) {
      return;
    }

    const width = galleryEl.offsetWidth;
    const centeredX = (window.innerWidth - width) / 2;
    setGalleryPosition(clampGalleryToViewport(centeredX, 120));
  }, [galleryOpen]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    dragRef.current.isDragging = true;
    dragRef.current.offsetX = event.clientX - position.x;
    dragRef.current.offsetY = event.clientY - position.y;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handleDockWindowMove);
    window.addEventListener("pointerup", handleDockWindowUp);
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

    event.preventDefault();
    dragRef.current.isDragging = false;
    setDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    window.removeEventListener("pointermove", handleDockWindowMove);
    window.removeEventListener("pointerup", handleDockWindowUp);
  };

  const handleGalleryPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    galleryDragRef.current.isDragging = true;
    galleryDragRef.current.offsetX = event.clientX - galleryPosition.x;
    galleryDragRef.current.offsetY = event.clientY - galleryPosition.y;
    setGalleryDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handleGalleryWindowMove);
    window.addEventListener("pointerup", handleGalleryWindowUp);
  };

  const handleGalleryPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!galleryDragRef.current.isDragging) {
      return;
    }

    event.preventDefault();
    const nextX = event.clientX - galleryDragRef.current.offsetX;
    const nextY = event.clientY - galleryDragRef.current.offsetY;
    setGalleryPosition(clampGalleryToViewport(nextX, nextY));
  };

  const handleGalleryPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!galleryDragRef.current.isDragging) {
      return;
    }

    event.preventDefault();
    galleryDragRef.current.isDragging = false;
    setGalleryDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    window.removeEventListener("pointermove", handleGalleryWindowMove);
    window.removeEventListener("pointerup", handleGalleryWindowUp);
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
            {navItems.map((item) =>
              item.href === "/gallery" ? (
                <button
                  key={item.href}
                  type="button"
                  className="nav-item nav-button"
                  onClick={() => setGalleryOpen(true)}
                >
                  <span className="folder-icon" aria-hidden="true" />
                  <span className="nav-label">{item.label}</span>
                </button>
              ) : (
                <Link key={item.href} href={item.href} className="nav-item">
                  <span className="folder-icon" aria-hidden="true" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
      {galleryOpen ? (
        <div
          ref={galleryRef}
          className={`desktop-window gallery-window${
            galleryDragging ? " is-dragging" : ""
          }`}
          style={{ left: galleryPosition.x, top: galleryPosition.y }}
        >
          <div
            className="desktop-titlebar"
            onPointerDown={handleGalleryPointerDown}
            onPointerMove={handleGalleryPointerMove}
            onPointerUp={handleGalleryPointerUp}
            onPointerCancel={handleGalleryPointerUp}
            aria-label="Drag gallery window"
          >
            <div className="window-controls" aria-hidden="true">
              <span className="control control-min">-</span>
              <span className="control control-max">+</span>
            </div>
            <button
              type="button"
              className="window-close"
              onPointerDown={(event) => event.stopPropagation()}
              onPointerUp={(event) => event.stopPropagation()}
              onClick={() => setGalleryOpen(false)}
              aria-label="Close gallery window"
            >
              x
            </button>
          </div>
          <div className="window-content gallery-content" />
        </div>
      ) : null}
    </div>
  );
}
