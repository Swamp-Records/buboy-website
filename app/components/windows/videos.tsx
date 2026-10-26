const videoItems = [
  { id: "pGNpv_9DWAE", title: "Buboy - Chew (Official Lyric Video)" },
  { id: "qM9MkEQw8xc", title: "Buboy - Movie Star (Official Music Video)" },
  { id: "HjW16Yq34is", title: "Buboy - Too Late (Official Music Video)" },
  { id: "WU9xOrcP_Vw", title: "Buboy - Wasted Fridays (Official Music Video)" },
  { id: "M_zxEUAUHgQ", title: "Buboy - Cherry Tree (Official Video)" },
];

export default function VideoWindow() {
  return (
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
  );
}