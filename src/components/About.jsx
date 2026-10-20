import "../styles/about.css";

function About() {
  return (
    <section className="about">

      {/* =========================
          LEFT CONTENT
      ========================== */}

      <div className="about__content">

        <h1 className="about__title">
          Airmax
          <br />
          Nike
          <br />
          270
        </h1>

        <p className="about__description">
          The Nike Air Max 270 combines the
          <br />
          exaggerated tongue from the Air Max 180 and
          <br />
          classic elements from the Air Max 93. It
          <br />
          features Nike's biggest heel Air unit yet for a
          <br />
          soft ride that feels as impossible as it looks.
        </p>

        <button className="about__button">
          Buy now
        </button>

      </div>


      {/* =========================
          BOTTOM LEFT LINES
      ========================== */}

      <div className="about__lines">

        <div className="about__line">
          <span></span>
        </div>

        <div className="about__line">
          <span></span>
        </div>

      </div>


      {/* =========================
          BOTTOM RIGHT LABEL
      ========================== */}

      <div className="about__label">
        AIR MAX
      </div>

    </section>
  );
}

export default About;