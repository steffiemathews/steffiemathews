import Timeline from "./Timeline";
import { leadership } from "../data";

export default function Leadership() {
  return (
    <div className="pt-4">
      <Timeline title="Leadership & Involvement" items={leadership} />
    </div>
  );
}
