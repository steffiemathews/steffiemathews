import { Link } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { profile, stats, education, awards } from "../../data";
import WorldMap from "./WorldMap";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

const SECTION = "max-w-[760px] mx-auto mb-16";

export default function Home() {
  return (
    <div>
      {/* Map banner, with the hero pulled up over its faded bottom */}
      <section className="home-top max-w-[760px] mx-auto">
        <WorldMap />

        <header className="hero">
          <div>
            <h1>{profile.name}</h1>
            <p className="tagline">{profile.tagline}</p>
            <p className="meta">
              <span><FaMapMarkerAlt /> {profile.location}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p className="lede">{profile.intro}</p>
            <div className="icons">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={36} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope size={36} /></a>
            </div>
          </div>
          <img className="avatar" src={`${import.meta.env.BASE_URL}profile.jpeg`} alt={profile.name} />
        </header>
      </section>

      <section className={SECTION}>
        <SectionTitle>About Me</SectionTitle>
        {profile.about.map((p) => (
          <p key={p} className="text-base md:text-lg mb-4 leading-relaxed text-fg-2">{p}</p>
        ))}
      </section>

      <section className={`${SECTION} grid grid-cols-2 md:grid-cols-4 gap-4`}>
        {stats.map((s) => (
          <Card key={s.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
            <div className="text-sm mt-1 text-muted">{s.label}</div>
          </Card>
        ))}
      </section>

      <section className={SECTION}>
        <SectionTitle>Education</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <Card key={e.title}>
              <h3 className="text-lg font-semibold">{e.title}</h3>
              <p className="italic text-fg-2 mt-1">{e.role}</p>
              <p className="text-sm mt-2 text-fg-2">{e.detail}</p>
              <p className="text-sm mt-3 text-muted">{e.date} • {e.place}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={SECTION}>
        <SectionTitle>Awards &amp; Recognition</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {awards.map((a) => (
            <Card key={a.title}>
              <h3 className="text-lg font-semibold">🏆 {a.title}</h3>
              <p className="text-fg-2 mt-1">{a.org}</p>
              <p className="text-sm mt-2 text-muted">{a.note}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link to="/research" className="font-semibold underline underline-offset-4 hover:opacity-75 text-accent">
          See my research &amp; project experience →
        </Link>
      </div>
    </div>
  );
}
