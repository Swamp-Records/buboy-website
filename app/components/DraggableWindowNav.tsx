"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "gallery", label: "gallery" },
  { id: "shop", label: "shop" },
  { id: "press-kit", label: "press kit" },
  { id: "video", label: "video" },
  { id: "tickets", label: "tickets" },
  { id: "blog", label: "blog!" },
];

const galleryImages = [
  "/gallery/01.png",
  "/gallery/02.png",
  "/gallery/03.png",
  "/gallery/04.jpg",
  "/gallery/05.png",
  "/gallery/06.png",
  "/gallery/07.png",
  "/gallery/08.png",
];

const videoItems = [
  { id: "pGNpv_9DWAE", title: "Buboy - Chew (Official Lyric Video)" },
  { id: "qM9MkEQw8xc", title: "Buboy - Movie Star (Official Music Video)" },
  { id: "HjW16Yq34is", title: "Buboy - Too Late (Official Music Video)" },
  { id: "WU9xOrcP_Vw", title: "Buboy - Wasted Fridays (Official Music Video)" },
  { id: "M_zxEUAUHgQ", title: "Buboy - Cherry Tree (Official Video)" },
];

export default function DraggableWindowNav() {
  const dockRef = useRef<HTMLDivElement | null>(null);
  const windowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const windowDragRef = useRef({ id: "", offsetX: 0, offsetY: 0 });
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [windowPositions, setWindowPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [draggingWindowId, setDraggingWindowId] = useState<string | null>(null);

  const stopDockDrag = () => {
    dragRef.current.isDragging = false;
    setDragging(false);
    window.removeEventListener("pointermove", handleDockWindowMove);
    window.removeEventListener("pointerup", handleDockWindowUp);
  };

  const stopWindowDrag = () => {
    setDraggingWindowId(null);
    windowDragRef.current.id = "";
    window.removeEventListener("pointermove", handleWindowMove);
    window.removeEventListener("pointerup", handleWindowUp);
  };

  const getScale = () => {
    if (typeof window === "undefined") {
      return 1;
    }

    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--site-scale")
      .trim();
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  };

  const handleDockWindowMove = (event: PointerEvent) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    const scale = getScale();
    const nextX = event.clientX / scale - dragRef.current.offsetX;
    const nextY = event.clientY / scale - dragRef.current.offsetY;
    setPosition(clampToViewport(nextX, nextY));
  };

  const handleDockWindowUp = () => {
    if (!dragRef.current.isDragging) {
      return;
    }

    stopDockDrag();
  };

  const handleWindowMove = (event: PointerEvent) => {
    if (!windowDragRef.current.id) {
      return;
    }

    const scale = getScale();
    const nextX = event.clientX / scale - windowDragRef.current.offsetX;
    const nextY = event.clientY / scale - windowDragRef.current.offsetY;
    setWindowPositions((current) => ({
      ...current,
      [windowDragRef.current.id]: clampWindowToViewport(
        windowDragRef.current.id,
        nextX,
        nextY
      ),
    }));
  };

  const handleWindowUp = () => {
    if (!windowDragRef.current.id) {
      return;
    }

    stopWindowDrag();
  };

  const clampToViewport = (x: number, y: number) => {
    const dockEl = dockRef.current;
    if (!dockEl) {
      return { x, y };
    }

    const width = dockEl.offsetWidth;
    const height = dockEl.offsetHeight;
    const scale = getScale();
    const viewportWidth = window.innerWidth / scale;
    const viewportHeight = window.innerHeight / scale;
    const maxX = Math.max(8, viewportWidth - width - 8);
    const maxY = Math.max(8, viewportHeight - height - 8);

    return {
      x: Math.min(Math.max(8, x), maxX),
      y: Math.min(Math.max(8, y), maxY),
    };
  };

  const clampWindowToViewport = (id: string, x: number, y: number) => {
    const windowEl = windowRefs.current[id];
    if (!windowEl) {
      return { x, y };
    }

    const width = windowEl.offsetWidth;
    const height = windowEl.offsetHeight;
    const scale = getScale();
    const viewportWidth = window.innerWidth / scale;
    const viewportHeight = window.innerHeight / scale;
    const maxX = Math.max(8, viewportWidth - width - 8);
    const maxY = Math.max(8, viewportHeight - height - 8);

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
    const scale = getScale();
    const viewportWidth = window.innerWidth / scale;
    const viewportHeight = window.innerHeight / scale;
    const centeredX = (viewportWidth - width) / 2;
    const bottomY = viewportHeight - height - 90;
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
      const scale = getScale();
      const viewportWidth = window.innerWidth / scale;
      const viewportHeight = window.innerHeight / scale;
      const centeredX = (viewportWidth - width) / 2;
      const bottomY = viewportHeight - height - 70;
      setPosition(clampToViewport(centeredX, bottomY));
    });

    observer.observe(dockEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openWindows.length) {
      return;
    }

    setWindowPositions((current) => {
      let next = current;

      openWindows.forEach((id) => {
        if (current[id]) {
          return;
        }

        const windowEl = windowRefs.current[id];
        const width = windowEl?.offsetWidth ?? 900;
        const scale = getScale();
        const viewportWidth = window.innerWidth / scale;
        const centeredX = (viewportWidth - width) / 2;
        const position = clampWindowToViewport(id, centeredX, 120);
        next = { ...next, [id]: position };
      });

      return next;
    });
  }, [openWindows]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    const scale = getScale();
    dragRef.current.isDragging = true;
    dragRef.current.offsetX = event.clientX / scale - position.x;
    dragRef.current.offsetY = event.clientY / scale - position.y;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handleDockWindowMove);
    window.addEventListener("pointerup", handleDockWindowUp);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    const scale = getScale();
    const nextX = event.clientX / scale - dragRef.current.offsetX;
    const nextY = event.clientY / scale - dragRef.current.offsetY;
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

  const handleWindowPointerDown = (
    id: string,
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const position = windowPositions[id] ?? { x: 0, y: 0 };
    const scale = getScale();
    windowDragRef.current.id = id;
    windowDragRef.current.offsetX = event.clientX / scale - position.x;
    windowDragRef.current.offsetY = event.clientY / scale - position.y;
    setDraggingWindowId(id);
    event.currentTarget.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handleWindowMove);
    window.addEventListener("pointerup", handleWindowUp);
  };

  const handleWindowPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!windowDragRef.current.id) {
      return;
    }

    event.preventDefault();
    stopWindowDrag();
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const openWindow = (id: string) => {
    setOpenWindows((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const closeWindow = (id: string) => {
    setOpenWindows((current) => current.filter((entry) => entry !== id));
    setWindowPositions((current) => {
      const { [id]: _, ...rest } = current;
      return rest;
    });
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
              <button
                key={item.id}
                type="button"
                className="nav-item nav-button"
                onClick={() => openWindow(item.id)}
              >
                <span className="folder-icon" aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {openWindows.map((id) => (
        <div
          key={id}
          ref={(node) => {
            windowRefs.current[id] = node;
          }}
          className={`desktop-window app-window${
            draggingWindowId === id ? " is-dragging" : ""
          }`}
          style={{
            left: windowPositions[id]?.x ?? 120,
            top: windowPositions[id]?.y ?? 120,
          }}
        >
          <div
            className="desktop-titlebar"
            onPointerDown={(event) => handleWindowPointerDown(id, event)}
            onPointerUp={handleWindowPointerUp}
            onPointerCancel={handleWindowPointerUp}
            aria-label={`Drag ${id} window`}
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
              onClick={() => closeWindow(id)}
              aria-label={`Close ${id} window`}
            >
              x
            </button>
          </div>
          <div className="window-title-row">[ {id} ]</div>
          <div
            className={`window-content app-window-content${
              id === "video" ? " video-window-content" : ""
            }`}
          >
            {id === "gallery" ? (
              <div className="gallery-grid">
                {galleryImages.map((src, index) => (
                  <div key={src} className="gallery-tile">
                    <img
                      src={src}
                      alt={`Gallery photo ${index + 1}`}
                      className="gallery-image"
                    />
                    <div className="gallery-caption">photo by: photo taker</div>
                  </div>
                ))}
              </div>
            ) : null}
            {id === "video" ? (
              <div className="video-grid" aria-label="Video gallery">
                {videoItems.map((video) => (
                  <a
                    key={video.id}
                    className="video-card"
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="video-thumb">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                      />
                      <span className="video-play" aria-hidden="true">
                        ▶
                      </span>
                    </div>
                    <div className="video-title">{video.title}</div>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
