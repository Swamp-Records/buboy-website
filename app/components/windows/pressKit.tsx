import styles from "./PressKitWindow.module.css";

// Replace the "#" hrefs with your real links, and drop the matching
// image files into /public/press-kit/ (see the paths below).
const streamingLinks = [
  { name: "SoundCloud", href: "https://soundcloud.com/user-271627521", icon: "/press-kit/icons/soundcloud.png" },
  { name: "YouTube", href: "https://music.youtube.com/channel/UCVqaPh-3DHCl0QUV7_oA9vg", icon: "/press-kit/icons/youtube.png" },
  { name: "Spotify", href: "https://open.spotify.com/artist/4xUjK4i8SLrp8zXmLrgk2Z", icon: "/press-kit/icons/spotify.png" },
  { name: "Apple Music", href: "https://music.apple.com/us/artist/buboy/1593696179", icon: "/press-kit/icons/apple-music.png" },
  { name: "Pandora", href: "https://www.pandora.com/artist/buboy/ARmjn6xcPlxxx7V", icon: "/press-kit/icons/pandora.png" },
  { name: "TikTok", href: "https://www.tiktok.com/@buboymusic", icon: "/press-kit/icons/tiktok.png" },
  { name: "Instagram", href: "https://www.instagram.com/buboy.con/", icon: "/press-kit/icons/instagram.png" },
];

const pressCoverage = [
  {
    image: "/press-kit/coverage-01.png",
    title: "WMNF SOTD Darling by Buboy [premiere]",
    href: "#",
  },
  {
    image: "/press-kit/coverage-02.png",
    title: "Wasted Fridays feature",
    href: "#",
  },
  {
    image: "/press-kit/coverage-03.png",
    title: "Spotify monthly listeners feature",
    href: "#",
  },
];

const contactEmail = "mgmt@buboymusic.com";

export default function PressKitWindow() {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <img
          src="/press-kit/widelogo.png"
          alt="Buboy logo"
          className={styles.logo}
        />

        <section>
          <h3 className={styles.heading}>[ streaming platforms ]</h3>
          <ul className={styles.icons}>
            {streamingLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className={styles.iconLink}
                >
                  <img src={link.icon} alt="" className={styles.icon} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className={styles.heading}>[ press coverage ]</h3>
          <ul className={styles.coverage}>
            {pressCoverage.map((item) => (
              <li key={item.image}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.coverageCard}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.coverageImage}
                  />
                  <span className={styles.coverageTitle}>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className={styles.side}>
        <img
          src="buboy1.jpg"
          alt="Buboy press photo"
          className={styles.photo}
        />
        <div className={styles.contact}>
          <h3 className={styles.heading}>[ contact ]</h3>
          <a className={styles.contactLink} href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </aside>
    </div>
  );
}