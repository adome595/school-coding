const MARKET = "DE";

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
  kmAway: (km) => `artimiausias oro uostas: ~${km} km nuo jūsų`,
};

const CITY_STEMS = [
  ["vilni", "Vilnius", "VNO"],
  ["kaun", "Kaunas", "KUN"],
  ["palang", "Palanga", "PLQ"],
  ["klaiped", "Palanga (Klaipėda)", "PLQ"],
  ["london", "London", "LON"],
  ["paryz", "Paris", "PAR"],
  ["rom", "Rome", "FCO"],
  ["madrid", "Madrid", "MAD"],
  ["barselon", "Barcelona", "BCN"],
  ["berlyn", "Berlin", "BER"],
  ["amsterdam", "Amsterdam", "AMS"],
  ["briusel", "Brussels", "BRU"],
  ["vien", "Vienna", "VIE"],
  ["prag", "Prague", "PRG"],
  ["varsuv", "Warsaw", "WAW"],
  ["krakuv", "Krakow", "KRK"],
  ["kopenhag", "Copenhagen", "CPH"],
  ["stokholm", "Stockholm", "ARN"],
  ["osl", "Oslo", "OSL"],
  ["helsink", "Helsinki", "HEL"],
  ["ryg", "Riga", "RIX"],
  ["talin", "Tallinn", "TLL"],
  ["dublin", "Dublin", "DUB"],
  ["lisabon", "Lisbon", "LIS"],
  ["aten", "Athens", "ATH"],
  ["stambul", "Istanbul", "IST"],
  ["milan", "Milan", "MIL"],
  ["venecij", "Venice", "VCE"],
  ["florencij", "Florence", "FLR"],
  ["neapol", "Naples", "NAP"],
  ["miunchen", "Munich", "MUC"],
  ["frankfurt", "Frankfurt", "FRA"],
  ["hamburg", "Hamburg", "HAM"],
  ["ciurich", "Zurich", "ZRH"],
  ["zenev", "Geneva", "GVA"],
  ["budapest", "Budapest", "BUD"],
  ["bukarest", "Bucharest", "OTP"],
  ["bratislav", "Bratislava", "BTS"],
  ["sofij", "Sofia", "SOF"],
  ["belgrad", "Belgrade", "BEG"],
  ["zagreb", "Zagreb", "ZAG"],
  ["tbilis", "Tbilisi", "TBS"],
  ["niujork", "New York", "JFK"],
  ["los andzel", "Los Angeles", "LAX"],
  ["vasington", "Washington", "IAD"],
  ["cikag", "Chicago", "ORD"],
  ["dubaj", "Dubai", "DXB"],
  ["tel aviv", "Tel Aviv", "TLV"],
  ["kair", "Cairo", "CAI"],
];

const AIRPORTS = [
  ["VNO", "Vilnius", 54.63, 25.29],
  ["KUN", "Kaunas", 54.96, 24.08],
  ["PLQ", "Palanga", 55.97, 21.09],
  ["RIX", "Riga", 56.92, 23.97],
  ["TLL", "Tallinn", 59.41, 24.83],
  ["WAW", "Warsaw Chopin", 52.17, 20.97],
  ["WMI", "Warsaw Modlin", 52.45, 20.65],
  ["KRK", "Krakow", 50.08, 19.78],
  ["GDN", "Gdansk", 54.38, 18.47],
  ["KTW", "Katowice", 50.47, 19.08],
  ["WRO", "Wroclaw", 51.1, 16.89],
  ["POZ", "Poznan", 52.42, 16.83],
  ["LUZ", "Lublin", 51.24, 22.71],
  ["RZE", "Rzeszow", 50.11, 22.02],
  ["SZZ", "Szczecin", 53.58, 14.9],
  ["BZG", "Bydgoszcz", 53.1, 17.98],
  ["LCJ", "Lodz", 51.72, 19.4],
  ["SZY", "Olsztyn-Mazury", 53.48, 20.94],
  ["HEL", "Helsinki", 60.32, 24.96],
  ["TKU", "Turku", 60.51, 22.26],
  ["TMP", "Tampere", 61.41, 23.6],
  ["OUL", "Oulu", 64.93, 25.35],
  ["ARN", "Stockholm Arlanda", 59.65, 17.92],
  ["NYO", "Stockholm Skavsta", 58.79, 16.91],
  ["GOT", "Gothenburg", 57.66, 12.28],
  ["MMX", "Malmo", 55.54, 13.37],
  ["CPH", "Copenhagen", 55.62, 12.65],
  ["BLL", "Billund", 55.74, 9.15],
  ["AAL", "Aalborg", 57.09, 9.85],
  ["OSL", "Oslo", 60.19, 11.1],
  ["BGO", "Bergen", 60.29, 5.22],
  ["TRD", "Trondheim", 63.46, 10.94],
  ["SVG", "Stavanger", 58.88, 5.64],
  ["KEF", "Reykjavik", 63.99, -22.62],
  ["BER", "Berlin", 52.36, 13.5],
  ["FRA", "Frankfurt", 50.03, 8.57],
  ["MUC", "Munich", 48.35, 11.79],
  ["HAM", "Hamburg", 53.63, 9.99],
  ["DUS", "Dusseldorf", 51.29, 6.77],
  ["CGN", "Cologne", 50.87, 7.14],
  ["STR", "Stuttgart", 48.69, 9.22],
  ["NUE", "Nuremberg", 49.5, 11.07],
  ["LEJ", "Leipzig", 51.42, 12.24],
  ["HAJ", "Hannover", 52.46, 9.69],
  ["BRE", "Bremen", 53.05, 8.79],
  ["DTM", "Dortmund", 51.52, 7.61],
  ["FMM", "Memmingen", 47.99, 10.24],
  ["NRN", "Weeze", 51.6, 6.14],
  ["AMS", "Amsterdam", 52.31, 4.76],
  ["EIN", "Eindhoven", 51.45, 5.37],
  ["RTM", "Rotterdam", 51.96, 4.44],
  ["BRU", "Brussels", 50.9, 4.48],
  ["CRL", "Brussels Charleroi", 50.46, 4.45],
  ["CDG", "Paris Charles de Gaulle", 49.01, 2.55],
  ["ORY", "Paris Orly", 48.72, 2.38],
  ["BVA", "Paris Beauvais", 49.45, 2.11],
  ["NCE", "Nice", 43.66, 7.22],
  ["LYS", "Lyon", 45.73, 5.09],
  ["MRS", "Marseille", 43.44, 5.22],
  ["TLS", "Toulouse", 43.63, 1.37],
  ["BOD", "Bordeaux", 44.83, -0.72],
  ["NTE", "Nantes", 47.15, -1.61],
  ["SXB", "Strasbourg", 48.54, 7.63],
  ["LHR", "London Heathrow", 51.47, -0.45],
  ["LGW", "London Gatwick", 51.15, -0.19],
  ["STN", "London Stansted", 51.89, 0.26],
  ["LTN", "London Luton", 51.87, -0.37],
  ["MAN", "Manchester", 53.35, -2.27],
  ["EDI", "Edinburgh", 55.95, -3.37],
  ["BHX", "Birmingham", 52.45, -1.75],
  ["GLA", "Glasgow", 55.87, -4.43],
  ["BRS", "Bristol", 51.38, -2.72],
  ["NCL", "Newcastle", 55.04, -1.69],
  ["LPL", "Liverpool", 53.33, -2.85],
  ["EMA", "East Midlands", 52.83, -1.33],
  ["DUB", "Dublin", 53.43, -6.27],
  ["ORK", "Cork", 51.84, -8.49],
  ["SNN", "Shannon", 52.7, -8.92],
  ["MAD", "Madrid", 40.47, -3.56],
  ["BCN", "Barcelona", 41.3, 2.08],
  ["PMI", "Palma de Mallorca", 39.55, 2.74],
  ["AGP", "Malaga", 36.67, -4.5],
  ["ALC", "Alicante", 38.28, -0.56],
  ["VLC", "Valencia", 39.49, -0.48],
  ["SVQ", "Seville", 37.42, -5.9],
  ["BIO", "Bilbao", 43.3, -2.91],
  ["TFS", "Tenerife South", 28.04, -16.57],
  ["LPA", "Gran Canaria", 27.93, -15.39],
  ["IBZ", "Ibiza", 38.87, 1.37],
  ["LIS", "Lisbon", 38.78, -9.14],
  ["OPO", "Porto", 41.24, -8.68],
  ["FAO", "Faro", 37.01, -7.97],
  ["FCO", "Rome Fiumicino", 41.8, 12.25],
  ["CIA", "Rome Ciampino", 41.8, 12.59],
  ["MXP", "Milan Malpensa", 45.63, 8.72],
  ["BGY", "Milan Bergamo", 45.67, 9.7],
  ["LIN", "Milan Linate", 45.45, 9.28],
  ["VCE", "Venice", 45.51, 12.35],
  ["NAP", "Naples", 40.89, 14.29],
  ["BLQ", "Bologna", 44.53, 11.29],
  ["FLR", "Florence", 43.81, 11.2],
  ["PSA", "Pisa", 43.68, 10.39],
  ["CTA", "Catania", 37.47, 15.07],
  ["PMO", "Palermo", 38.18, 13.1],
  ["TRN", "Turin", 45.2, 7.65],
  ["BRI", "Bari", 41.14, 16.76],
  ["CAG", "Cagliari", 39.25, 9.06],
  ["ZRH", "Zurich", 47.46, 8.55],
  ["GVA", "Geneva", 46.24, 6.11],
  ["BSL", "Basel", 47.59, 7.53],
  ["VIE", "Vienna", 48.11, 16.57],
  ["SZG", "Salzburg", 47.79, 13.0],
  ["INN", "Innsbruck", 47.26, 11.34],
  ["GRZ", "Graz", 46.99, 15.44],
  ["PRG", "Prague", 50.1, 14.26],
  ["BRQ", "Brno", 49.15, 16.69],
  ["OSR", "Ostrava", 49.7, 18.11],
  ["BTS", "Bratislava", 48.17, 17.21],
  ["KSC", "Kosice", 48.66, 21.24],
  ["BUD", "Budapest", 47.44, 19.26],
  ["OTP", "Bucharest", 44.57, 26.08],
  ["CLJ", "Cluj-Napoca", 46.79, 23.69],
  ["TSR", "Timisoara", 45.81, 21.34],
  ["IAS", "Iasi", 47.18, 27.62],
  ["SOF", "Sofia", 42.7, 23.41],
  ["VAR", "Varna", 43.23, 27.83],
  ["BOJ", "Burgas", 42.57, 27.52],
  ["ATH", "Athens", 37.94, 23.95],
  ["SKG", "Thessaloniki", 40.52, 22.97],
  ["HER", "Heraklion", 35.34, 25.18],
  ["IST", "Istanbul", 41.26, 28.74],
  ["SAW", "Istanbul Sabiha Gokcen", 40.9, 29.31],
  ["AYT", "Antalya", 36.9, 30.8],
  ["ESB", "Ankara", 40.13, 32.99],
  ["ADB", "Izmir", 38.29, 27.16],
  ["BEG", "Belgrade", 44.82, 20.29],
  ["ZAG", "Zagreb", 45.74, 16.07],
  ["SPU", "Split", 43.54, 16.3],
  ["DBV", "Dubrovnik", 42.56, 18.27],
  ["LJU", "Ljubljana", 46.22, 14.46],
  ["SJJ", "Sarajevo", 43.82, 18.33],
  ["SKP", "Skopje", 41.96, 21.62],
  ["TIA", "Tirana", 41.42, 19.72],
  ["TGD", "Podgorica", 42.36, 19.25],
  ["KIV", "Chisinau", 46.93, 28.93],
  ["MLA", "Malta", 35.86, 14.48],
  ["LCA", "Larnaca", 34.88, 33.62],
  ["TBS", "Tbilisi", 41.67, 44.95],
  ["EVN", "Yerevan", 40.15, 44.4],
  ["GYD", "Baku", 40.47, 50.05],
  ["DXB", "Dubai", 25.25, 55.36],
  ["AUH", "Abu Dhabi", 24.43, 54.65],
  ["DOH", "Doha", 25.27, 51.61],
  ["TLV", "Tel Aviv", 32.01, 34.89],
  ["CAI", "Cairo", 30.12, 31.41],
  ["JFK", "New York JFK", 40.64, -73.78],
  ["EWR", "Newark", 40.69, -74.17],
  ["BOS", "Boston", 42.36, -71.01],
  ["IAD", "Washington Dulles", 38.95, -77.46],
  ["ORD", "Chicago O'Hare", 41.98, -87.9],
  ["ATL", "Atlanta", 33.64, -84.43],
  ["MIA", "Miami", 25.79, -80.29],
  ["DFW", "Dallas", 32.9, -97.04],
  ["LAX", "Los Angeles", 33.94, -118.41],
  ["SFO", "San Francisco", 37.62, -122.38],
  ["SEA", "Seattle", 47.45, -122.31],
  ["YYZ", "Toronto", 43.68, -79.63],
];

function normalize(text) {
  return text
    .trim()
    .toLocaleLowerCase("lt")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ");
}

function findKnownCity(input) {
  const n = normalize(input);
  for (const [stem, name, code] of CITY_STEMS) {
    if (n.startsWith(stem) && n.length - stem.length <= 4) return { code, name };
  }
  return null;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

function nearestAirport({ lat, lon }) {
  let best = null;
  for (const [code, name, aLat, aLon] of AIRPORTS) {
    const km = distanceKm(lat, lon, aLat, aLon);
    if (!best || km < best.km) best = { code, name, km: Math.round(km) };
  }
  return best;
}

async function getUserLocation() {
  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
    );
    return { lat: pos.coords.latitude, lon: pos.coords.longitude };
  } catch {}
  const res = await fetch("https://ipwho.is/");
  const d = await res.json();
  if (!d.success || typeof d.latitude !== "number") throw new Error(STRINGS.locationFailed);
  return { lat: d.latitude, lon: d.longitude };
}

async function api(path, options) {
  const res = await fetch(path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = typeof data.error === "object" ? data.error?.message : data.error;
    const err = new Error(
      `${STRINGS.requestFailed(res.status)}: ${path.split("?")[0]}${detail || data.message ? " – " + (detail || data.message) : ""}`
    );
    err.status = res.status;
    throw err;
  }
  return data;
}

async function cityToAirport(city) {
  const typed = city.trim();
  if (/^[A-Za-z]{3}$/.test(typed)) {
    const code = typed.toUpperCase();
    const listed = AIRPORTS.find((a) => a[0] === code);
    return { code, name: listed ? listed[1] : code };
  }
  const known = findKnownCity(typed);
  if (known) return { ...known, city: known.name };
  const candidates = [...new Set([normalize(typed), typed])].filter((c) => c.length >= 2);
  for (const query of candidates) {
    let list = [];
    try {
      list = await api(`/api/airports?q=${encodeURIComponent(query)}&limit=5`);
    } catch (e) {
      if (e.status !== 404) throw e;
    }
    if (list.length) return list[0];
  }
  throw new Error(STRINGS.airportNotFound(typed));
}

function searchFlights(origin, destination, date) {
  return api("/api/fares/one-way", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destination, departure_date: date, market: MARKET }),
  });
}

async function findFlights(destCity, date, originOverride) {
  const origin = originOverride
    ? await cityToAirport(originOverride)
    : nearestAirport(await getUserLocation());
  const dest = await cityToAirport(destCity);
  const result = await searchFlights(origin.code, dest.code, date);
  return {
    origin,
    dest,
    destCity: dest.city || dest.name,
    itineraries: result.itineraries || [],
  };
}

function formatPrice(amount, currency) {
  try {
    return new Intl.NumberFormat("lt-LT", { style: "currency", currency }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
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
  header.textContent =
    `${origin.name} (${origin.code}) → ${dest.name} (${dest.code})` +
    (origin.km !== undefined ? ` · ${STRINGS.kmAway(origin.km)}` : "");
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
    const price = document.createElement("strong");
    price.textContent = formatPrice(it.price.amount, it.price.currency);
    const details = document.createElement("span");
    details.textContent =
      (it.price.status === "unverified" ? ` (${STRINGS.unverified})` : "") +
      ` | ${fmtTime(first.departure_time_local)} → ${fmtTime(last.arrival_time_local)}` +
      ` | ${it.outbound.duration_minutes ? fmtDuration(it.outbound.duration_minutes) : ""}` +
      ` | ${fmtStops(seg.length - 1)}` +
      ` | ${it.outbound.carrier || first.marketing_carrier_code}`;
    row.append(price, details);
    out.appendChild(row);
  }
}

async function showCityInfo(city) {
  const box = document.getElementById("cityinfo");
  if (!box) return;
  box.textContent = "";
  try {
    const res = await fetch(`/city-info?city=${encodeURIComponent(city)}`);
    const { results = [] } = await res.json();
    for (const r of results) {
      if (!/^https?:\/\//.test(r.url)) continue;
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = r.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = r.title;
      p.append(a, document.createElement("br"), r.snippet);
      box.appendChild(p);
    }
  } catch {
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
    const result = await findFlights(city, date, originOverride);
    renderResults(result, out);
    showCityInfo(result.destCity);
  } catch (err) {
    out.textContent = err.message;
  }
});

