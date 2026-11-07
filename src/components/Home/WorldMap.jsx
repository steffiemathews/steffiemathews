// Flat world map banner (Ben-geo style band, but a real map, not a globe).
// - graticule shows only over the oceans (land is drawn on top of it)
// - visited countries are filled with the accent, each with a white dot and a
//   label always drawn beside it (so tiny ones like Bahrain still read)
// - the current city pulses, labelled with a "Now" line underneath
// Colours/fonts: theme/theme.css. Layout: styles/home.css (.band).
// Label placement per country (side, dy): data.js.
import { useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-50m.json";
import { visited, home } from "../../data";

const W = 960, H = 560;
const TOP_LAT = 84; // latitude placed near the top edge of the band
const TOTAL_COUNTRIES = 195;
const visitedNames = new Set(visited.map((v) => v.name));
const labelOf = (v) => v.label || v.name;

function Label({ x, y, side = 1, dy = 0, text, sub }) {
  const tx = x + side * 10;
  const anchor = side > 0 ? "start" : "end";
  return (
    <>
      <text x={tx} y={y + dy + 4.5} textAnchor={anchor} className="lbl">{text}</text>
      {sub && <text x={tx} y={y + dy + 20} textAnchor={anchor} className="lbl-sub">{sub}</text>}
    </>
  );
}

export default function WorldMap() {
  const { sphere, grid, countries, dots, homeDot } = useMemo(() => {
    const projection = geoNaturalEarth1().fitWidth(W, { type: "Sphere" });
    // slide the map up so the band starts near TOP_LAT (the far south is cropped/faded)
    const [, yTop] = projection([0, TOP_LAT]);
    const [tx, ty] = projection.translate();
    projection.translate([tx, ty - yTop + 40]); // room above for the corner chips and nav pill
    const path = geoPath(projection);

    const feats = feature(world, world.objects.countries).features
      .filter((f) => f.properties.name !== "Antarctica");

    const at = (lonlat) => { const [x, y] = projection(lonlat); return { x, y }; };
    return {
      sphere: path({ type: "Sphere" }),
      grid: path(geoGraticule10()),
      countries: feats.map((f) => ({ name: f.properties.name, d: path(f) })),
      dots: visited.map((v, i) => ({ ...v, ...at(v.at), i, text: labelOf(v) })),
      homeDot: { ...home, ...at(home.at) },
    };
  }, []);

  return (
    <div className="band">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" role="img"
           aria-label={`World map: ${visited.length} countries visited — ${visited.map(labelOf).join(", ")}. Now in ${home.label}.`}>
        <defs>
          <clipPath id="map-sphere"><path d={sphere} /></clipPath>
        </defs>

        {/* grid first, then land on top, so the grid only shows over water */}
        <path d={grid} className="map-grid" clipPath="url(#map-sphere)" />
        <g className="map-land">
          {countries.map((c) => (
            <path key={c.name} d={c.d} className={visitedNames.has(c.name) ? "visited" : undefined} />
          ))}
        </g>
        <path d={sphere} className="map-edge" />

        {/* dots, then labels on top of everything */}
        <g className="map-dots">
          {dots.map((d) => (
            <circle key={d.name} cx={d.x} cy={d.y} r="4.2" className="dot" style={{ "--i": d.i }} />
          ))}
          <g transform={`translate(${homeDot.x} ${homeDot.y})`} className="home">
            <circle r="5" className="pulse" />
            <circle r="5" className="core" />
          </g>
        </g>
        <g className="map-labels">
          {dots.map((d) => <Label key={d.name} {...d} />)}
          <Label {...homeDot} text={homeDot.label} />
        </g>
      </svg>

      <div className="band-chips">
        <span className="band-chip"><b>{visited.length}</b> / {TOTAL_COUNTRIES} countries</span>
        <span className="band-chip"><i /> Now in <b>{home.label}</b></span>
      </div>
    </div>
  );
}
