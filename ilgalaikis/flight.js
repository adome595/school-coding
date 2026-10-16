const STRINGS = {
  enterBoth: "Įveskite miestą ir datą.",
  searching: "Ieškoma...",
  locationFailed: "Nepavyko nustatyti jūsų vietos. Įveskite išvykimo miestą laukelyje „Iš“.",
  airportNotFound: (city) => `Oro uostas nerastas: „${city}“`,
  requestFailed: (status) => `Užklausa nepavyko (${status})`,
  noFlights:
    "Skrydžių nerasta. Pabandykite kitą datą arba įveskite didesnį netoliese esantį miestą laukelyje „Iš“.",
  direct: "Tiesioginis",
  unverified: "nepatvirtinta",
};

const CITY_STEMS = [
  ["london", "London"],
  ["paryz", "Paris"],
  ["rom", "Rome"],
  ["madrid", "Madrid"],
  ["barselon", "Barcelona"],
  ["berlyn", "Berlin"],
  ["amsterdam", "Amsterdam"],
  ["briusel", "Brussels"],
  ["vien", "Vienna"],
  ["prag", "Prague"],
  ["varsuv", "Warsaw"],
  ["krakuv", "Krakow"],
  ["kopenhag", "Copenhagen"],
  ["stokholm", "Stockholm"],
  ["osl", "Oslo"],
  ["helsink", "Helsinki"],
  ["ryg", "Riga"],
  ["talin", "Tallinn"],
  ["dublin", "Dublin"],
  ["lisabon", "Lisbon"],
  ["aten", "Athens"],
  ["stambul", "Istanbul"],
  ["milan", "Milan"],
  ["venecij", "Venice"],
  ["florencij", "Florence"],
  ["neapol", "Naples"],
  ["miunchen", "Munich"],
  ["frankfurt", "Frankfurt"],
  ["hamburg", "Hamburg"],
  ["ciurich", "Zurich"],
  ["zenev", "Geneva"],
  ["budapest", "Budapest"],
  ["bukarest", "Bucharest"],
  ["sofij", "Sofia"],
  ["belgrad", "Belgrade"],
  ["zagreb", "Zagreb"],
  ["kijev", "Kyiv"],
  ["tbilis", "Tbilisi"],
  ["niujork", "New York"],
  ["los andzel", "Los Angeles"],
  ["vasington", "Washington"],
  ["cikag", "Chicago"],
  ["dubaj", "Dubai"],
  ["tel aviv", "Tel Aviv"],
  ["kair", "Cairo"],
];

function normalize(text) {
  return text
    .trim()
    .toLocaleLowerCase("lt")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ");
}

function lithuanianToEnglish(input) {
  const n = normalize(input);
  for (const [stem, english] of CITY_STEMS) {
    if (n.startsWith(stem) && n.length - stem.length <= 4) return english;
  }
  return null;
}

async function getUserCity() {
  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
    );
    const { latitude, longitude } = pos.coords;
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const d = await res.json();
    const city = d.city || d.locality;
    if (city) return city;
  } catch {}
  const res = await fetch("https://ipwho.is/");
  const d = await res.json();
  if (!d.success || !d.city) throw new Error(STRINGS.locationFailed);
  return d.city;
}

async function api(path, options) {
  const res = await fetch(path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || STRINGS.requestFailed(res.status));
  return data;
}

async function cityToAirport(city) {
  const candidates = [...new Set([lithuanianToEnglish(city), normalize(city), city.trim()])].filter(
    (c) => c && c.length >= 2
  );
  for (const query of candidates) {
    const list = await api(`/api/airports?q=${encodeURIComponent(query)}&limit=5`);
    if (list.length) return list[0];
  }
  throw new Error(STRINGS.airportNotFound(city.trim()));
}

function searchFlights(origin, destination, date) {
  return api("/api/fares/one-way", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destination, departure_date: date }),
  });
}

async function findFlights(destCity, date, originOverride) {
  const originCity = originOverride || (await getUserCity());
  const [origin, dest] = await Promise.all([cityToAirport(originCity), cityToAirport(destCity)]);
  const result = await searchFlights(origin.code, dest.code, date);
  return { origin, dest, itineraries: result.itineraries || [] };
}

function fmtDuration(mins) {
  return `${Math.floor(mins / 60)} val. ${mins % 60} min.`;
}

function fmtTime(iso) {
  return iso.replace("T", " ").slice(0, 16);
}

function fmtStops(n) {
  if (n === 0) return STRINGS.direct;
  const word =
    n % 10 === 1 && n % 100 !== 11
      ? "persėdimas"
      : n % 10 === 0 || (n % 100 >= 11 && n % 100 <= 19)
      ? "persėdimų"
      : "persėdimai";
  return `${n} ${word}`;
}

function renderResults({ origin, dest, itineraries }, out) {
  out.textContent = "";
  const header = document.createElement("p");
  header.textContent = `${origin.name} (${origin.code}) → ${dest.name} (${dest.code})`;
  out.appendChild(header);

  const usable = itineraries
    .filter((it) => it.price && it.price.amount > 0 && it.outbound?.segments?.length)
    .sort((a, b) => a.price.amount - b.price.amount)
    .slice(0, 10);

  if (!usable.length) {
    const none = document.createElement("p");
    none.textContent = STRINGS.noFlights;
    out.appendChild(none);
    return;
  }

  for (const it of usable) {
    const seg = it.outbound.segments;
    const first = seg[0];
    const last = seg[seg.length - 1];
    const row = document.createElement("div");
    row.className = "offer";
    row.textContent =
      `${it.price.amount} ${it.price.currency}` +
      (it.price.status === "unverified" ? ` (${STRINGS.unverified})` : "") +
      ` | ${fmtTime(first.departure_time_local)} → ${fmtTime(last.arrival_time_local)}` +
      ` | ${it.outbound.duration_minutes ? fmtDuration(it.outbound.duration_minutes) : ""}` +
      ` | ${fmtStops(seg.length - 1)}` +
      ` | ${it.outbound.carrier || first.marketing_carrier_code}`;
    out.appendChild(row);
  }
}

document.getElementById("search").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const date = document.getElementById("date").value;
  const originInput = document.getElementById("origin");
  const originOverride = originInput ? originInput.value.trim() : "";
  const out = document.getElementById("results");

  if (!city || !date) {
    out.textContent = STRINGS.enterBoth;
    return;
  }
  out.textContent = STRINGS.searching;
  try {
    renderResults(await findFlights(city, date, originOverride), out);
  } catch (err) {
    out.textContent = err.message;
  }
});