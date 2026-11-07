// Loading screen: a pipette draws from a reservoir and dispenses 10 µL into each
// well of an 8-well strip, one by one, then the page rises in underneath.
// Click anywhere to skip. Styles: styles/intro.css.
import { useEffect, useRef } from "react";

const WELLS = 8;
const DOSE = 10; // µL per well
const PITCH = 20; // spacing between wells
const wellX = (i) => (i - (WELLS - 1) / 2) * PITCH; // centred on the plate (x = 0)
const TROUGH_X = -117;
const UP = -6, IN_TROUGH = 30, OVER_WELL = 6; // tip heights

function Pipette() {
  return (
    <g className="pipette">
      <g className="plunger">
        <rect x="-1.2" y="-54" width="2.4" height="9" />
        <rect x="-4.5" y="-59" width="9" height="5" rx="1.5" />
      </g>
      <rect className="barrel" x="-5" y="-46" width="10" height="27" rx="2.5" />
      <rect className="collar" x="-3.5" y="-19.5" width="7" height="4" rx="1" />
      <polygon className="tip" points="0,0 -2.4,-16 2.4,-16" />
      <polygon className="tip-liquid" points="0,-1.2 -1.7,-12 1.7,-12" />
    </g>
  );
}

export default function Intro({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const ov = ref.current;
    const timers = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      ov.classList.add("clear");
      onDone();
      timers.push(setTimeout(() => { ov.style.display = "none"; }, 450));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ov.style.display = "none";
      onDone();
      return;
    }

    const $ = (s) => ov.querySelector(s);
    const $$ = (s) => ov.querySelectorAll(s);
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const pip = $(".pipette"), liquid = $(".tip-liquid"), plunger = $(".plunger");

    const moveTo = (x, y) => { pip.style.transform = `translate(${x}px, ${y}px)`; };
    const setTip = (level) => { liquid.style.transform = `scaleY(${level})`; };
    const press = () => {
      plunger.classList.add("press");
      at(140, () => plunger.classList.remove("press"));
    };
    // little mono read-outs that float up from the pipette tip
    const say = (html) => {
      const tip = pip.querySelector(".tip").getBoundingClientRect();
      const box = ov.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "op";
      s.innerHTML = html;
      s.style.left = `${tip.left - box.left + 34}px`; // beside the pipette, not behind it
      s.style.top = `${tip.top - box.top - 60}px`;
      ov.append(s);
      at(1000, () => s.remove());
    };

    moveTo(TROUGH_X, UP);
    setTip(0);
    ov.addEventListener("click", finish, { once: true });

    // 1) aspirate from the reservoir
    at(250, () => moveTo(TROUGH_X, IN_TROUGH));
    at(560, () => {
      setTip(1);
      $(".trough-liquid").classList.add("drawn");
      say(`aspirate <b>${WELLS * DOSE} µL</b>`);
    });
    at(900, () => moveTo(TROUGH_X, UP));

    // 2) dispense into each well
    const STEP = 240, START = 1150;
    for (let i = 0; i < WELLS; i++) {
      const t = START + i * STEP;
      at(t, () => moveTo(wellX(i), OVER_WELL));
      at(t + 130, () => {
        press();
        setTip(1 - (i + 1) / WELLS);
        $$(".drop")[i].classList.add("fall");
        if (i % 3 === 1) say(`A${i + 1} · <b>${DOSE} µL</b>`);
      });
      at(t + 300, () => $$(".well-fill")[i].classList.add("on"));
    }

    // 3) plate done: lift the pipette away, the wells glow, the page rises in
    const END = START + WELLS * STEP + 200;
    at(END, () => { pip.classList.add("away"); $(".plate").classList.add("done"); });
    at(END + 450, finish);

    return () => timers.forEach(clearTimeout);
    // runs once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <svg viewBox="-140 -40 280 150">
        {/* reservoir */}
        <rect className="trough" x="-130" y="16" width="26" height="26" rx="3" />
        <rect className="trough-liquid" x="-127.5" y="24" width="21" height="15.5" rx="1.5" />

        {/* 8-well strip */}
        <g className="plate">
          <rect className="plate-body" x="-86" y="16" width="172" height="30" rx="5" />
          {Array.from({ length: WELLS }, (_, i) => (
            <g key={i} transform={`translate(${wellX(i)} 31)`}>
              <circle className="well" r="8" />
              <circle className="well-fill" r="6.4" style={{ "--i": i }} />
              <text className="well-lbl" y="24" textAnchor="middle">A{i + 1}</text>
            </g>
          ))}
        </g>

        {/* drops, one per well */}
        {Array.from({ length: WELLS }, (_, i) => (
          <circle key={i} className="drop" cx={wellX(i)} cy={OVER_WELL + 2} r="1.7" />
        ))}

        <Pipette />
      </svg>
    </div>
  );
}
