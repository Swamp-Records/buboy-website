"use client";

import { useState } from "react";

const videoItems = [
  { id: "pGNpv_9DWAE", title: "Buboy - Chew (Official Lyric Video)" },
  { id: "qM9MkEQw8xc", title: "Buboy - Movie Star (Official Music Video)" },
  { id: "HjW16Yq34is", title: "Buboy - Too Late (Official Music Video)" },
  { id: "WU9xOrcP_Vw", title: "Buboy - Wasted Fridays (Official Music Video)" },
  { id: "M_zxEUAUHgQ", title: "Buboy - Cherry Tree (Official Video)" },
];

export default function VideoWindow() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = videoItems.find((video) => video.id === activeVideoId);

  if (activeVideo) {
    return (
      <div className="video-player-view">
        <div className="video-player-bar">
          <button
            type="button"
            className="video-back"
            onClick={() => setActiveVideoId(null)}
          >
            ← back
          </button>
          <a
            className="video-external"
            href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
            target="_blank"
            rel="noreferrer"
          >
            watch on youtube
          </a>
        </div>
        <div className="video-player">
          <iframe
            key={activeVideo.id}
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
            title={activeVideo.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="video-title">{activeVideo.title}</div>
      </div>
    );
  }

  return (
    <div className="video-grid" aria-label="Video gallery">
      {videoItems.map((video) => (
        <button
          key={video.id}
          type="button"
          className="video-card"
          onClick={() => setActiveVideoId(video.id)}
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
        </button>
      ))}
    </div>
  );
}