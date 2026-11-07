import Card from "./ui/Card";
import Tag from "./ui/Tag";
import SectionTitle from "./ui/SectionTitle";

function Item({ item }) {
  return (
    <div className="relative pl-5 sm:pl-8 mb-10">
      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent-solid border-4 border-page" />
      <Card>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="italic text-fg-2">{item.role}</p>
        <p className="text-sm text-muted mt-1 mb-4">
          {item.date}{item.place ? ` • ${item.place}` : ""}
        </p>

        {item.thesis && <p className="mb-3 font-medium text-accent">Thesis: {item.thesis}</p>}

        <ul className="list-disc pl-5 space-y-1.5 mb-5 text-fg-2">
          {item.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>

        {item.links && (
          <div className="flex flex-wrap gap-4 mb-4">
            {item.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 className="text-sm font-semibold underline underline-offset-4 hover:opacity-75 text-accent">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-wrap">
          {item.tags.map((t) => <Tag key={t} size="xs">{t}</Tag>)}
        </div>
      </Card>
    </div>
  );
}

export default function Timeline({ title, items }) {
  return (
    <section className="max-w-[760px] mx-auto mb-14">
      <SectionTitle className="mb-10">{title}</SectionTitle>
      <div className="border-l-2 border-timeline">
        {items.map((item) => <Item key={item.title} item={item} />)}
      </div>
    </section>
  );
}
