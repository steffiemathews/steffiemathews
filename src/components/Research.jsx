import Timeline from "./Timeline";
import { quality, research, business } from "../data";

export default function Research() {
  return (
    <div className="pt-4">
      <Timeline title="Pharmaceutical Quality" items={quality} />
      <Timeline title="Research Experience" items={research} />
      <Timeline title="Business & Analysis" items={business} />
    </div>
  );
}
