
import { useEffect, useState } from "react";
import "../styles/Splash.css";

export default function Splash({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  const enterSite = () => {
    if (exiting) return;

    setExiting(true);

    window.setTimeout(() => {
      onEnter?.();
    }, 750);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        enterSite();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exiting]);

  return (
    <main className={`splash-screen ${exiting ? "is-exiting" : ""}`}>
      <div className="space-background" />
      <div className="space-stars" />
      <div className="nebula nebula-purple" />
      <div className="nebula nebula-blue" />

      <div className="space-scene" aria-hidden="true">
        <div className="galaxy-core" />

        <div className="galaxy-orbit orbit-one" />
        <div className="galaxy-orbit orbit-two" />
        <div className="galaxy-orbit orbit-three" />

        <div className="planet planet-large" />
        <div className="planet planet-small" />
        <div className="planet planet-blue" />
        <div className="planet planet-pink" />

        <div className="shooting-star shooting-one" />
        <div className="shooting-star shooting-two" />
      </div>

      <header className="splash-top">
        <div className="top-topics">
          <span>Math.</span>
          <i />
          <span>Logic.</span>
          <i />
          <span>Probability.</span>
          <i />
          <span>Real Life.</span>
        </div>

        <span className="edition-label">
          LECTURE 04 · NEON EDITION
        </span>
      </header>

      <section className="splash-center">
        <div className="splash-kicker">
          <span className="kicker-line" />
          EXPLORE THE MATHEMATICS OF CHANCE
          <span className="kicker-line" />
        </div>

        <h1 className="splash-heading">
          Probability <span>&amp;</span>
          <br />
          <strong>Statistics</strong>
        </h1>

        <p className="splash-subheading">
          Counting Rules &amp;
          <br className="mobile-break" />
          {" "}Conditional Probability
        </p>

        <div className="splash-equation">
          <span>P(A | B)</span>
          <span className="equation-dot">·</span>
          <span>nPr</span>
          <span className="equation-dot">·</span>
          <span>nCr</span>
        </div>

        <p className="splash-tagline">
          Better Decisions <span>·</span> Through <span>·</span>{" "}
          Probability
        </p>

        <button
          className="enter-button"
          onClick={enterSite}
          disabled={exiting}
        >
          <span>ENTER THE EXPERIENCE</span>
          <span className="enter-arrow">→</span>
        </button>

        <div className="splash-loading">
          <span />
        </div>
      </section>

      <footer className="splash-bottom">
        <div className="splash-credit">
          <span>Probability &amp; Statistics</span>
          <span>Interactive Learning Experience</span>
        </div>

        <span className="splash-bottom-center">
          DESIGNED FOR CURIOSITY
        </span>

        <a
          href="#enter"
          className="splash-explore"
          onClick={(event) => {
            event.preventDefault();
            enterSite();
          }}
        >
          Explore <span>·</span> Learn <span>·</span> Apply
        </a>
      </footer>
    </main>
  );
}
