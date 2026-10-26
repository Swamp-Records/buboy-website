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

export default function GalleryWindow() {
  return (
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
  );
}