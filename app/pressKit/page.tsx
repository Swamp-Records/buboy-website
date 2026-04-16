
export default function PressKit() {
    return (
        <div className="press-kit">
            <div className="press-kit-inner">
                <div className="press-kit-header">[ press kit ]</div>
                <div className="press-kit-grid">
                    <section className="press-kit-left">
                        <div className="press-kit-logo" aria-label="Buboy logo">
                            buboy
                        </div>
                        <p className="press-kit-bio">
                            bio space; Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex.
                        </p>

                        <div className="press-kit-block">
                            <div className="press-kit-label">[ streaming platforms ]</div>
                            <div className="press-kit-icons" aria-label="Streaming icons">
                                {[
                                    "soundcloud",
                                    "youtube",
                                    "spotify",
                                    "apple",
                                    "bandcamp",
                                    "tiktok",
                                    "instagram",
                                ].map((label) => (
                                    <span key={label} className="press-kit-icon">
                                        {label.slice(0, 1)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="press-kit-block">
                            <div className="press-kit-label">[ press coverage ]</div>
                            <div className="press-kit-coverage">
                                {[
                                    "WMNF SOTD Darling by Buboy",
                                    "Feature interview preview",
                                    "Playlist add highlight",
                                ].map((title, index) => (
                                    <article key={title} className="press-kit-card">
                                        <div className="press-kit-card-image" />
                                        <div className="press-kit-card-body">
                                            <div className="press-kit-card-title">{title}</div>
                                            <div className="press-kit-card-note">
                                                [{index === 0 ? "premiere" : "press"}]
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className="press-kit-right">
                        <div className="press-kit-photo" aria-hidden="true" />
                        <div className="press-kit-contact">
                            <div className="press-kit-label">[ contact ]</div>
                            <a className="press-kit-email" href="mailto:mgmt@buboymusic.com">
                                mgmt@buboymusic.com
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}