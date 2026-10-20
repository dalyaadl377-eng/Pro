
import { useState } from "react";
import "../styles/MainPresentation.css";

const navItems = [
  ["welcome", "HOME"],
  ["counting", "COUNTING RULES"],
  ["examples", "EXAMPLES"],
  ["conditional", "CONDITIONAL PROBABILITY"],
  ["summary", "SUMMARY"],
  ["team", "PROJECT TEAM"],
];

function Section({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`content-section ${className}`}>
      <div className="section-inner">
        <div className="section-heading">
          <span className="section-number">
            {number} / PROBABILITY LAB
          </span>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          <div className="heading-line" />
        </div>
        {children}
      </div>
    </section>
  );
}

function InfoCard({
  number,
  title,
  children,
  accent = "purple",
}) {
  return (
    <article className={`info-card ${accent}`}>
      <span className="card-number">{number}</span>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function Formula({ children }) {
  return <div className="formula-box">{children}</div>;
}

export default function MainPresentation() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);

  const questions = [
    {
      question:
        "A bag contains 3 red balls and 5 blue balls. What is P(red)?",
      options: ["1/8", "3/8", "5/8", "3/5"],
      correct: 1,
    },
    {
      question:
        "If P(A ∩ B) = 0.2 and P(B) = 0.5, what is P(A | B)?",
      options: ["0.1", "0.2", "0.4", "0.7"],
      correct: 2,
    },
    {
      question:
        "How many ways can you arrange 3 objects selected from 5?",
      options: ["10", "15", "20", "60"],
      correct: 3,
    },
    {
      question: "If A and B are independent, then:",
      options: [
        "P(A ∩ B) = P(A) + P(B)",
        "P(A ∩ B) = P(A) × P(B)",
        "P(A) = P(B)",
        "P(A | B) = 0",
      ],
      correct: 1,
    },
  ];

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.correct ? 1 : 0),
    0
  );

  // Handle selecting an answer
  const handleAnswer = (questionIndex, optionIndex) => {
    const isCorrect =
      questions[questionIndex].correct === optionIndex;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    setFeedback((previous) => ({
      ...previous,
      [questionIndex]: isCorrect ? "correct" : "incorrect",
    }));

    setChecked(false);

    if (isCorrect) {
      setCelebrationKey((previous) => previous + 1);
      setShowConfetti(true);

      window.setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
    }
  };

  // Clear the selected answer and feedback for one question
  const handleRetry = (questionIndex) => {
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[questionIndex];
      return updated;
    });

    setFeedback((previous) => {
      const updated = { ...previous };
      delete updated[questionIndex];
      return updated;
    });

    setChecked(false);
  };

  return (
    <main className="probability-site">
      {/* FULL-SCREEN CONFETTI */}
      {showConfetti && (
        <div
          key={celebrationKey}
          className="confetti-overlay"
          aria-hidden="true"
        >
          {Array.from({ length: 100 }, (_, i) => (
            <span
              key={`${celebrationKey}-${i}`}
              className="confetti-piece"
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 20) * 0.06}s`,
                animationDuration: `${1.5 + (i % 10) * 0.12}s`,
                backgroundColor: [
                  "#22d3ee",
                  "#a855f7",
                  "#f472b6",
                  "#facc15",
                  "#ffffff",
                ][i % 5],
                "--drift": `${((i * 17) % 180) - 90}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* NAVIGATION */}
      <header className="top-nav">
        <a href="#welcome" className="nav-brand">
          <span className="brand-icon">∑</span>
          <span>
            PROBABILITY
            <span className="brand-highlight">LAB</span>
            <small>MATHEMATICS · LOGIC · INSIGHT</small>
          </span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`top-links ${menuOpen ? "menu-open" : ""}`}>
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section id="welcome" className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow glow-purple" />
        <div className="hero-glow glow-cyan" />

        <div className="hero-copy">
          <span className="hero-kicker">
            <span className="status-dot" />
            AN INTERACTIVE MATHEMATICAL EXPERIENCE
          </span>

          <h1>
            <span className="probability-word">Probability</span>
            <br />
            <span>&amp; Statistics</span>
          </h1>

          <div className="hero-subtitle">
            Counting Rules
            <span> × </span>
            Conditional Probability
          </div>

          <p>
            Discover the mathematics behind uncertainty. Explore counting
            techniques, understand conditional probability, and connect
            mathematical ideas to real-world decisions.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#counting">
              EXPLORE THE CONCEPTS <span>↗</span>
            </a>
            <a className="secondary-button" href="#quiz">
              TEST YOUR KNOWLEDGE
            </a>
          </div>

          <div className="hero-meta">
            <span>01 — COUNTING</span>
            <span>02 — PROBABILITY</span>
            <span>03 — APPLICATIONS</span>
          </div>
        </div>

        {/* HERO ILLUSTRATION */}
        <div
          className="hero-art"
          aria-label="Animated probability illustration"
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />

          <div className="hero-core">
            <span>P</span>
            <div>PROBABILITY</div>
          </div>

          <div className="math-float math-top">
            P(A | B) = <span>P(A ∩ B)</span> / P(B)
          </div>

          <div className="math-float math-left">
            n! / (n − r)!
          </div>

          <div className="math-float math-right">
            P(A ∩ B)
          </div>

          <div className="orbit-point point-purple" />
          <div className="orbit-point point-cyan" />
          <div className="orbit-point point-white" />

          <div className="hero-caption">
            <span className="caption-line" />
            <span className="caption-text">
              THE SCIENCE OF POSSIBILITIES
            </span>
            <span className="caption-line" />
          </div>
        </div>

        <a href="#counting" className="scroll-indicator">
          <span />
          SCROLL TO EXPLORE
        </a>
      </section>

      {/* OVERVIEW */}
      <section className="overview-strip">
        <div>
          <span>01</span>
          <p>COUNTING RULES</p>
        </div>
        <div>
          <span>02</span>
          <p>REAL-WORLD EXAMPLES</p>
        </div>
        <div>
          <span>03</span>
          <p>CONDITIONAL PROBABILITY</p>
        </div>
        <div>
          <span>04</span>
          <p>KNOWLEDGE CHECK</p>
        </div>
      </section>

      {/* SECTION 01: COUNTING RULES */}
      <Section
        id="counting"
        number="01"
        eyebrow="THE FUNDAMENTALS"
        title="Counting Rules"
        subtitle="A systematic way to count possible outcomes."
      >
        <div className="concept-grid">
          <InfoCard number="01" title="Addition Rule">
            <p>
              For mutually exclusive alternatives, add the number of
              possible outcomes.
            </p>
            <Formula>n(A ∪ B) = n(A) + n(B)</Formula>
            <span className="card-note">
              WHEN YOU CHOOSE A OR B
            </span>
          </InfoCard>

          <InfoCard
            number="02"
            title="Multiplication Rule"
            accent="cyan"
          >
            <p>
              When a process has successive choices, multiply the number
              of options at each step.
            </p>
            <Formula>n = n₁ × n₂ × ... × nₖ</Formula>
            <span className="card-note">
              WHEN STEPS ARE COMBINED
            </span>
          </InfoCard>

          <InfoCard number="03" title="Permutation">
            <p>
              Count arrangements of distinct objects when the order
              matters.
            </p>
            <Formula>P(n,r) = n! / (n − r)!</Formula>
            <span className="card-note">ORDER MATTERS</span>
          </InfoCard>

          <InfoCard
            number="04"
            title="Combination"
            accent="cyan"
          >
            <p>
              Count selections of distinct objects when the order
              does not matter.
            </p>
            <Formula>C(n,r) = n! / [r!(n − r)!]</Formula>
            <span className="card-note">
              ORDER DOES NOT MATTER
            </span>
          </InfoCard>
        </div>

        <div className="insight-banner">
          <div className="insight-symbol">∑</div>
          <div>
            <span>THE KEY QUESTION</span>
            <h3>Does the order of selection matter?</h3>
            <p>
              If yes, consider permutations. If no, consider combinations.
              Always identify the conditions before selecting a rule.
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION 02: EXAMPLES */}
      <Section
        id="examples"
        number="02"
        eyebrow="LEARN BY DOING"
        title="Counting Rules in Action"
        subtitle="See how the formulas translate into practical calculations."
        className="section-alt"
      >
        <div className="example-grid">
          <InfoCard number="EXAMPLE 01" title="The Addition Rule">
            <p>
              A bag contains 3 red balls and 5 blue balls. How many balls
              are red or blue?
            </p>

            <div className="ball-illustration">
              <span className="red-ball" />
              <span className="red-ball" />
              <span className="red-ball" />
              <span className="blue-ball" />
              <span className="blue-ball" />
              <span className="blue-ball" />
              <span className="blue-ball" />
              <span className="blue-ball" />
            </div>

            <Formula>3 + 5 = 8 balls</Formula>
          </InfoCard>

          <InfoCard
            number="EXAMPLE 02"
            title="The Multiplication Rule"
            accent="cyan"
          >
            <p>
              An outfit uses one shirt, one pair of pants, and one pair
              of shoes. There are 3 shirts, 2 pants, and 2 shoes.
            </p>

            <div className="choice-visual">
              <span>3 SHIRTS</span>
              <b>×</b>
              <span>2 PANTS</span>
              <b>×</b>
              <span>2 SHOES</span>
            </div>

            <Formula>3 × 2 × 2 = 12 outfits</Formula>
          </InfoCard>

          <InfoCard number="EXAMPLE 03" title="The Permutation Rule">
            <p>
              How many ways can four letters A, B, C, and D be arranged?
            </p>

            <div className="letter-illustration">
              {["A", "B", "C", "D"].map((letter) => (
                <span key={letter}>{letter}</span>
              ))}
            </div>

            <Formula>4! = 4 × 3 × 2 × 1 = 24</Formula>
          </InfoCard>

          <InfoCard
            number="EXAMPLE 04"
            title="Selecting Students"
            accent="cyan"
          >
            <p>
              A class has 10 boys and 6 girls. Four students are selected.
              What is the probability all four are boys?
            </p>

            <Formula>P = C(10,4) / C(16,4)</Formula>
            <Formula>210 / 1820 ≈ 0.115</Formula>

            <span className="card-note">
              APPROXIMATELY 11.5%
            </span>
          </InfoCard>
        </div>
      </Section>

      {/* SECTION 03: CONDITIONAL PROBABILITY */}
      <Section
        id="conditional"
        number="03"
        eyebrow="PROBABILITY GIVEN INFORMATION"
        title="Conditional Probability"
        subtitle="How does new information change the probability of an event?"
      >
        <div className="conditional-layout">
          <div className="conditional-main">
            <span className="formula-label">
              THE FUNDAMENTAL FORMULA
            </span>

            <Formula>P(A | B) = P(A ∩ B) / P(B)</Formula>

            <p className="formula-footnote">
              Provided that P(B) &gt; 0
            </p>

            <div className="venn">
              <div className="venn-circle venn-a">A</div>
              <div className="venn-circle venn-b">B</div>
              <span className="venn-label">A ∩ B</span>
            </div>
          </div>

          <div className="conditional-details">
            <article>
              <span>01</span>
              <div>
                <h3>Restrict the sample space</h3>
                <p>
                  Event B becomes the condition we know to be true.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h3>Find the overlap</h3>
                <p>
                  Determine the probability of both A and B occurring.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h3>Update the probability</h3>
                <p>
                  Divide the intersection probability by P(B).
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="insight-banner cyan-banner">
          <div className="insight-symbol">↗</div>
          <div>
            <span>REMEMBER</span>
            <h3>New information can change what is likely.</h3>
            <p>
              Conditional probability is useful in medical testing,
              weather forecasting, and everyday decision-making.
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION 04: CONDITIONAL PROBABILITY EXAMPLES */}
      <Section
        id="conditional-examples"
        number="04"
        eyebrow="FROM THEORY TO REAL LIFE"
        title="Conditional Probability — Examples"
        subtitle="Apply the concept to cards, tests, and everyday situations."
        className="section-alt"
      >
        <div className="example-grid">
          <InfoCard number="CASE STUDY 01" title="Drawing Cards">
            <p>
              A card is drawn from a standard 52-card deck. Given that
              the card is a heart, what is the probability it is a king?
            </p>

            <div className="card-suit">
              K<span>♥</span>
            </div>

            <Formula>P(K | H) = 1 / 13</Formula>

            <span className="card-note">
              ONE KING OF HEARTS · 13 HEARTS
            </span>
          </InfoCard>

          <InfoCard
            number="CASE STUDY 02"
            title="Medical Testing"
            accent="cyan"
          >
            <p>
              A positive test result provides information, but does not
              automatically mean a person has a disease.
            </p>

            <div className="medical-symbol">+</div>

            <Formula>P(D | +) = P(D ∩ +) / P(+)</Formula>

            <span className="card-note">
              THE RESULT DEPENDS ON THE RELEVANT TEST DATA
            </span>
          </InfoCard>

          <InfoCard number="CASE STUDY 03" title="Two Dice">
            <p>
              Two dice are rolled. Given that the first die shows 3,
              what is the probability that their sum is 7?
            </p>

            <div className="dice-illustration">
              <span>⚂</span>
              <span>?</span>
            </div>

            <Formula>
              P(sum = 7 | first = 3) = 1 / 6
            </Formula>
          </InfoCard>

          <InfoCard
            number="CASE STUDY 04"
            title="Independent Events"
            accent="cyan"
          >
            <p>
              For independent events, knowing that B occurred does not
              change the probability of A.
            </p>

            <Formula>P(A | B) = P(A)</Formula>
            <Formula>P(A ∩ B) = P(A)P(B)</Formula>
          </InfoCard>
        </div>
      </Section>

      {/* SECTION 05: SUMMARY */}
      <Section
        id="summary"
        number="05"
        eyebrow="THE ESSENTIALS"
        title="Everything Connected"
        subtitle="The concepts to take away from this lesson."
      >
        <div className="summary-grid">
          <article className="summary-card">
            <span>01 / COUNTING</span>
            <h3>Choose the right rule</h3>
            <p>
              Addition, multiplication, permutations, or combinations.
            </p>
            <div className="summary-equation">
              n! · P(n,r) · C(n,r)
            </div>
          </article>

          <article className="summary-card">
            <span>02 / PROBABILITY</span>
            <h3>Define your events</h3>
            <p>
              Understand the sample space and identify possible outcomes.
            </p>
            <div className="summary-equation">
              0 ≤ P(A) ≤ 1
            </div>
          </article>

          <article className="summary-card">
            <span>03 / CONDITIONING</span>
            <h3>Use what you know</h3>
            <p>
              Update probabilities when new information becomes available.
            </p>
            <div className="summary-equation">P(A | B)</div>
          </article>
        </div>

        <div className="final-quote">
          <span>“</span>
          More information leads to better decisions.
          <span>”</span>
        </div>
      </Section>
      {/* SECTION 07: PROJECT TEAM */}
      <Section
        id="team"
        number="07"
        eyebrow="THE PEOPLE BEHIND THE PROJECT"
        title="Meet Our Team"
        subtitle="Seven minds. One project. A shared passion for learning."
        className="section-alt team-section"
      >
        <div className="team-grid">
          {[
            "Ziad Shalash",
            "Sarah Dahi",
            "Dina Hamdy",
            "Rowaida Mohe",
            "Rahma Mahmoud",
            "Rashed mohamed",
            "Zeinab Tawap",
          ].map((name, index) => (
            <article className="team-card" key={name}>
              <div className="team-avatar">
                <span>
                  {name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <div className="team-avatar-glow" />
              </div>

              <span className="team-member-number">
                TEAM MEMBER {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{name}</h3>

              <div className="team-card-line" />
            </article>
          ))}
        </div>

        <div className="team-closing">
          <span className="team-closing-symbol">∑</span>
          <p>Different talents, one shared vision.</p>
          <span>PROBABILITY LAB · PROJECT TEAM</span>
        </div>
      </Section>

      {/* FOOTER */}
      <footer id="contact" className="final-section">
        <div className="footer-orb">∑</div>

        <span className="section-eyebrow">
          END OF PRESENTATION
        </span>

        <h2>
          Thank You
          <br />
          <span>For Listening.</span>
        </h2>

        <p>Explore. Learn. Apply.</p>

        <a href="#welcome" className="primary-button">
          BACK TO THE BEGINNING ↑
        </a>

        <div className="footer-bottom">
          <span>PROBABILITY &amp; STATISTICS</span>
          <span>
            COUNTING RULES &amp; CONDITIONAL PROBABILITY
          </span>
        </div>
      </footer>
    </main>
  );
}
