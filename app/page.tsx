
export default function Home() {
  return (
    <div className="home-photos font-sans">
      <a
        href="https://linktr.ee/buboymusic"
        className="chew-out-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        chew out now!
      </a>

      <div className="home-photos-row">
        <img
          src="/buboy1.jpg"
          alt="Buboy photo 1"
          className="home-photo"
        />
        <img
          src="/buboy2.jpg"
          alt="Buboy photo 2"
          className="home-photo"
        />
        <img
          src="/buboy3.jpg"
          alt="Buboy photo 3"
          className="home-photo"
        />
      </div>

      <p className="bio-blurb">
        Buboy is a Filipino-American indie rock artist who drinks a lot of milk
        and goes to the movie theater alone (separate activities, rarely
        together).
      </p>
      <img src="music.gif" alt="Music gif" className="music-gif"/>
    </div>
  );
}