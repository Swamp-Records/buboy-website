import styles from "./styles/PressKitWindow.module.css";

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
    url: "https://demomagazine.ca/2026/02/06/saturation-red/",
    image: "/press-kit/Demo.png",
    title: "SATURATION: RED"
  },
  {
    url: "https://atwoodmagazine.com/wr-roundup-2025-02-05/",
    image: "/press-kit/atwoode.png",
    title: "Atwood Magazine’s Weekly Roundup: February 5, 2025"
  },
  {
    url: "https://offtherecordpress.com/interviews/2025/11/13/buboy-hits-the-big-leagues-on-a-sold-out-nyc-debut-a-shifting-sound-and-the-power-of-poc-representation-in-indie-music",
    image: "/press-kit/offtherecord.png",
    title: "Buboy Hits the Big Leagues: On a Sold-Out NYC Debut,..."
  },
  {
    url: "https://www.gainesville.com/videos/news/2026/04/13/view-of-buboys-performance-at-big-culture-arts-festival-gainesville/89593977007/",
    image: "/press-kit/gainesvillesun.png",
    title: "Stage view of Buboy's performance at Big: Culture & Arts Festival"
  }
];

const contactEmail = "mgmt@buboymusic.com";

const description = "“Wearing sneakers is boyish. Froot Loops are kind of boyish.” Small, nostalgic mementos piece together the world of Buboy, the 21-year-old artist who has vitalized the Florida music scene with his restless presence, glimmering guitars, and daydreamy storytelling. The young singer-songwriter and producer blends bedroom indie rock with sharp lyrical instinct, refreshed by the unique perspective of a minority outcast born in the American South. Building a buzzy live reputation playing with his tightknit band of high school friends, Buboy has gone coast to coast ​​joining bills and festival lineups alongside the likes of beabadoobee, Roar and flipturn. From headlining in LA to sold out nights in New York City, Buboy is making a name for himself as one of Florida’s most exciting emerging voices."

// Press Kit Window Component
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
          <p className={styles.description}>{description}</p>
        </section>

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
              <li key={item.url} className={styles.coverageTile}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.coverageLink}
                >
                  <img
                    src={item.image}
                    alt="Press coverage"
                    className={styles.coverageImage}
                  />
                </a>
                <p className={styles.coverageTitle}>{item.title}</p>
              </li>
            ))}
          </ul>
          <iframe 
            data-testid="embed-iframe" 
            style={{borderRadius: "12px", marginTop: "20px"}}
            src="https://open.spotify.com/embed/episode/6y2lhfqLkDaeC5pUQqnlDD?utm_source=generator&theme=0&si=a8902febadb64f89" 
            width="70%" 
            height="100" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
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