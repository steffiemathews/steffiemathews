// Handwritten signature, top left (like Ben-geo's): one continuous pen stroke that is drawn
// after the loading screen and again on hover, then an accent underline flourish.
// Links home. Colours: --fg (ink) and --accent-solid (flourish).
import { Link } from "react-router-dom";

const SIGNATURE =
  "M22 11C16 3 5 8 9 16C12 22 24 24 21 32C19 38 8 38 7 31C14 36 20 33 26 27" + // S
  "C29 22 31 12 33 7C33 16 32 26 34 31C35 35 40 35 45 29" +                      // t
  "C49 27 53 20 57 22C61 25 52 29 49 30C47 31 49 35 54 34C58 33 60 30 63 28" +    // e
  "C66 18 72 3 78 4C83 6 77 16 73 28C70 38 68 48 72 47C76 46 78 38 81 31" +       // f
  "C85 22 91 3 96 4C101 6 94 16 90 28C87 38 85 48 89 47C93 46 95 38 98 31" +      // f
  "C99 26 101 24 103 25C104 30 103 33 106 33" +                                  // i
  "C108 31 110 27 114 24C118 22 120 26 116 28C112 30 110 31 111 33C113 36 119 33 123 29"; // e

const T_CROSS = "M25 17C29 15 35 15 40 16";   // crossbar of the t
const I_DOT = "M103 16.5L103.4 17";           // dot of the i
const FLOURISH = "M12 43C40 47 90 46 124 38";

export default function Signature() {
  return (
    <Link to="/" aria-label="Home" className="signature hidden sm:block">
      <svg viewBox="0 0 130 52" width="104" height="42" overflow="visible" aria-hidden="true">
        <path d={SIGNATURE} pathLength="1" className="sig-ink" />
        <path d={T_CROSS} pathLength="1" className="sig-ink sig-late" />
        <path d={I_DOT} pathLength="1" className="sig-ink sig-dot" />
        <path d={FLOURISH} pathLength="1" className="sig-flourish" />
      </svg>
    </Link>
  );
}
