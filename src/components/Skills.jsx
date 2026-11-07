import { skills } from "../data";
import Card from "./ui/Card";
import Tag from "./ui/Tag";
import SectionTitle from "./ui/SectionTitle";

export default function Skills() {
  return (
    <section className="max-w-[760px] mx-auto pt-4">
      <SectionTitle className="mb-10">Technical Skills</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((s) => (
          <Card key={s.group}>
            <h3 className="text-lg font-semibold mb-3 text-accent">{s.group}</h3>
            <div className="flex flex-wrap">
              {s.items.map((i) => <Tag key={i}>{i}</Tag>)}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
