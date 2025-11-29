# Adventi Kalendárium PWA - Fejlesztési Prompt

## Projekt áttekintés
Készíts egy adventi kalendárium Progressive Web Application-t (PWA) React + TypeScript + Vite stack használatával. Az alkalmazás egy interaktív adventi naptár, amely 2025. november 30-tól december 24-ig tartalmaz megnyitható ablakokat, mindegyikben egy személyes fényképpel és adventi idézettel.

## Időszak specifikáció
- **Kezdő nap**: 2025. november 30. (vasárnap) - Advent első vasárnapja
- **Befejező nap**: 2025. december 24. (szerda) - Szenteste
- **Összesen**: 25 nap
- **Adventi vasárnapok** (arany színnel kiemelve):
  - November 30. (1. adventi vasárnap)
  - December 7. (2. adventi vasárnap)
  - December 14. (3. adventi vasárnap)
  - December 21. (4. adventi vasárnap)

## Technológiai stack
```
- React 18 + TypeScript
- Vite
- Tailwind CSS (pasztell karácsonyi színpaletta)
- Framer Motion (animációk)
- date-fns (dátumkezelés)
- PWA konfiguráció (vite-plugin-pwa)
```

## Fájlstruktúra
```
advent-calendar/
├── public/
│   ├── photos/           # IDE TÖLTÖM FEL A KÉPEKET (1.jpg - 25.jpg)
│   ├── logo/            # IDE TÖLTÖM FEL A FEHÉR LOGÓT (logo.png vagy logo.svg)
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── DayWindow.tsx
│   │   ├── PhotoModal.tsx
│   │   └── ChristmasMessage.tsx
│   ├── data/
│   │   └── quotes.ts     # 25 MAGYAR adventi/karácsonyi idézet
│   ├── utils/
│   │   └── dateUtils.ts
│   ├── App.tsx
│   └── main.tsx
├── netlify.toml
└── package.json
```

## Funkcionális követelmények

### 1. Naptár rács (Calendar.tsx)
- 25 ablakocska 5x5-ös vagy flexbox grid elrendezésben
- Minden ablak tartalmazza a nap számát (1-25)
- Csak az aktuális és korábbi napok kattinthatók
- Jövőbeli napok: opacity-50, cursor-not-allowed, disabled state
- Vasárnapok: arany/gold árnyalatú háttér
- Hétköznapi napok: karácsonyi pasztell színek (piros, zöld, kék árnyalatok)

### 2. Nap ablak logika (DayWindow.tsx)
```typescript
interface DayProps {
  dayNumber: number;
  date: Date;
  isClickable: boolean;
  isSunday: boolean;
  onOpen: () => void;
}
```
- Hover effect: scale(1.05) + árnyék
- Kattintáskor csak akkor nyitható, ha `isClickable === true`
- 3D flip animáció a megnyitásnál (Framer Motion)

### 3. Fotó modal (PhotoModal.tsx)
- Teljes képernyős overlay (rgba háttér)
- Középen: fénykép + alatta MAGYAR NYELVŰ idézet
- Smooth fade-in + scale animáció (duration: 500ms)
- Kattintásra vagy ESC-re bezárás
- Fénykép path: `/photos/${dayNumber}.jpg`

### 4. Dátumkezelés (dateUtils.ts)
```typescript
export const ADVENT_START = new Date(2025, 10, 30); // Nov 30
export const ADVENT_END = new Date(2025, 11, 24);   // Dec 24
export const CHRISTMAS_START = new Date(2025, 11, 25); // Dec 25
export const CHRISTMAS_END = new Date(2025, 11, 26);   // Dec 26

export function isDateUnlocked(dayNumber: number): boolean {
  const today = new Date();
  const targetDate = addDays(ADVENT_START, dayNumber - 1);
  return isBefore(targetDate, today) || isSameDay(targetDate, today);
}

export function isSunday(dayNumber: number): boolean {
  // Vasárnapok: 1, 8, 15, 22 (nov 30, dec 7, 14, 21)
  return [1, 8, 15, 22].includes(dayNumber);
}

export function isChristmas(): boolean {
  const today = new Date();
  return (isSameDay(today, CHRISTMAS_START) || isSameDay(today, CHRISTMAS_END));
}
```

### 5. Karácsonyi üzenet (ChristmasMessage.tsx)
- **December 25-26-án** az egész alkalmazás helyett egyetlen üzenet:
  ```
  "Áldott, békés karácsonyt kíván a ForestMarkt!"
  ```
- **FONTOS - Logo megjelenítés**:
  - A szöveg mögött középen a `/logo/logo.png` vagy `/logo/logo.svg` fehér logó
  - Logo stílusok:
    - `opacity: 0.15-0.25` (erősen áttetsző, elmosódott)
    - `filter: blur(3px)` (elmosódás effekt)
    - Pozíció: absolute, center, a szöveg mögött (z-index alacsonyabb)
    - Méret: nagy (50-70% viewport width/height, de ne takarja ki teljesen a szöveget)
- Animált csillogó háttér, központi szöveg
- Havazás effekt (CSS vagy canvas)
- Színpaletta: advent.cream háttér, advent.darkRed szöveg

**ChristmasMessage.tsx példa struktúra:**
```typescript
<div className="relative min-h-screen flex items-center justify-center bg-advent-cream">
  {/* Logo háttérben - ELMOSÓDVA */}
  <img 
    src="/logo/logo.png" 
    alt="ForestMarkt Logo"
    className="absolute inset-0 m-auto w-2/3 h-auto opacity-20 blur-md pointer-events-none"
    style={{ filter: 'blur(3px)' }}
  />
  
  {/* Karácsonyi üzenet előtérben */}
  <h1 className="relative z-10 text-5xl font-bold text-advent-darkRed text-center px-8">
    Áldott, békés karácsonyt kíván a ForestMarkt!
  </h1>
  
  {/* Havazás effekt */}
</div>
```

## Design követelmények

### Színpaletta (Tailwind config)
```javascript
colors: {
  advent: {
    gold: '#D4AF37',
    red: '#E8B4B8',      // pasztell piros
    green: '#B8D4B8',    // pasztell zöld
    blue: '#B4D4E8',     // pasztell kék
    cream: '#FAF3E0',    // krém háttér
    darkRed: '#8B4545',  // sötét bordó (szöveg)
  }
}
```

### Tipográfia
- Fejléc: "Áldott adventi időszakot!" - cursive/serif font (pl. 'Playfair Display')
- Napok számai: bold, 2xl
- Idézetek: italic, lg
- **KRITIKUS**: UTF-8 encoding minden fájlban, ékezetes karakterek helyes megjelenítése

### Animációk (Framer Motion)
```typescript
// Ablak nyitás
const windowVariants = {
  closed: { rotateY: 0 },
  open: { rotateY: 180, transition: { duration: 0.6 } }
};

// Modal megjelenés
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Logo fade-in karácsonykor
const logoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 0.2, 
    scale: 1, 
    transition: { duration: 2, ease: "easeOut" } 
  }
};
```

## PWA konfiguráció

### manifest.json
```json
{
  "name": "ForestMarkt Adventi Kalendárium",
  "short_name": "Advent 2025",
  "description": "Adventi naptár a ForestMarkt csapatától",
  "lang": "hu",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF3E0",
  "theme_color": "#8B4545",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Vite PWA plugin
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['photos/*.jpg', 'logo/*', 'icons/*'],
  manifest: {
    name: 'ForestMarkt Adventi Kalendárium',
    short_name: 'Advent 2025',
    lang: 'hu',
    // ... további beállítások
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,jpg,png,svg}']
  }
})
```

## MAGYAR NYELVŰ IDÉZETEK - KRITIKUS KÖVETELMÉNYEK

**FONTOS**: Keress fel az interneten 25 MAGYAR NYELVŰ adventi/karácsonyi idézetet a következő követelményekkel:

### Nyelvi követelmények:
- ✅ **100% magyar nyelv** - NEM angol, NEM latinul
- ✅ **Magyar helyesírás szabályai szerint** (ékezetes betűk: á, é, í, ó, ö, ő, ú, ü, ű)
- ✅ **Helyes tipográfia**: idézőjelek („..."), gondolatjel (–), nagykötőjel
- ✅ **Karakterkódolás**: UTF-8 minden fájlban

### Tartalmi követelmények:
Keress idézeteket a következő témákban:
- Várakozás, reménység, advent ideje
- Szeretet, békesség, békességet hozó karácsony
- Családi együttlét, otthon melegsége
- Természet télen, havas táj, csillagok
- Magyar karácsonyi hagyományok
- Jézus születése (nem túl vallásos, inkább költői, spirituális)
- Ajándékozás, adakozás, jóság
- Fény a sötétségben (advent szimbolikája)

### Idézetek forrásai (példák):
- Magyar költők: Ady Endre, József Attila, Kosztolányi Dezső, Dsida Jenő, Reményik Sándor
- Magyar írók: Wass Albert, Móricz Zsigmond
- Bibliai részletek magyar fordításban
- Népköltészet, magyar karácsonyi dalok szövegei
- Kortárs magyar szerzők

### quotes.ts fájl formátum:
```typescript
// src/data/quotes.ts
export const adventQuotes: string[] = [
  "Az advent a várakozás ünnepe, amikor a szív csendben készül az ünnepre.",
  "Karácsonykor a szív hazatér, ahol szeretet és béke vár.",
  "A csillagok fénye mutatja az utat, az advent fénye melegíti a lelket.",
  "A téli éjszaka csendjében megszületik a remény.",
  "Az advent négy gyertyája négy hét várakozás, négy hét szeretet.",
  // ... 20 további MAGYAR idézet
];

// MINDEN idézet:
// - Magyar nyelven
// - Ékezetes betűkkel helyesen
// - Magyar helyesírás szerint
// - UTF-8 kódolással
```

## Fejlesztési lépések

### 1. Alapstruktúra létrehozása
```bash
npm create vite@latest advent-calendar -- --template react-ts
cd advent-calendar
npm install tailwindcss framer-motion date-fns vite-plugin-pwa
npx tailwindcss init -p
```

### 2. UTF-8 konfiguráció
- `index.html`: `<meta charset="UTF-8">`
- `vite.config.ts`: megfelelő encoding beállítások
- Minden `.ts/.tsx` fájl UTF-8 kódolással

### 3. Mappák létrehozása
- Hozd létre: `public/photos/` (placeholder képek 1-25.jpg)
- Hozd létre: `public/logo/` (placeholder logo.png)
- Hozd létre: `public/icons/` (PWA ikonok)

**Megjegyzés**: Ezekbe a mappákba később feltöltöm a tényleges tartalmakat:
- `public/photos/`: 1.jpg - 25.jpg fényképek
- `public/logo/`: fehér ForestMarkt logó (PNG vagy SVG)

### 4. MAGYAR idézetek kutatása - ELSŐ LÉPÉS!
**KRITIKUS**: A kódolás megkezdése előtt:
1. Használd a `web_search` eszközt
2. Keress magyar adventi idézeteket
3. Keress magyar karácsonyi idézeteket
4. Keress magyar költők karácsonyi verseit
5. Válassz 25 legszebbeket
6. Mentsd őket `src/data/quotes.ts` fájlba HELYES magyar ékezetekkel

Példa keresések:
- "magyar adventi idézetek"
- "karácsonyi idézetek magyar költőktől"
- "Dsida Jenő karácsony"
- "Reményik Sándor advent"
- "magyar karácsonyi bölcsességek"

### 5. Komponensek fejlesztése (sorrend)
1. `src/utils/dateUtils.ts` - Dátum logika
2. `src/data/quotes.ts` - MAGYAR idézetek (25 db)
3. `src/components/DayWindow.tsx` - Egyetlen nap ablak
4. `src/components/Calendar.tsx` - 25 ablak rács
5. `src/components/PhotoModal.tsx` - Fénykép + idézet megjelenítő
6. `src/components/ChristmasMessage.tsx` - Karácsonyi üzenet LOGÓVAL
7. `src/App.tsx` - Routing logika (dec 25-26 = ChristmasMessage, egyébként Calendar)

### 6. Stílusok és design
- Tailwind config kiterjesztése (advent színpaletta)
- Google Fonts betöltése: 'Playfair Display' magyar ékezetekkel
- Responsive breakpoints tesztelése
- Framer Motion animációk finomhangolása

### 7. Logo integráció (ChristmasMessage.tsx)
```typescript
// Logo pozícionálás példa
<div className="relative w-full h-screen overflow-hidden bg-advent-cream">
  {/* Elmosódott logo háttérben */}
  <motion.img
    src="/logo/logo.png"
    alt=""
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 2 }}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-2/3 max-w-4xl opacity-20 blur-md pointer-events-none"
    style={{ filter: 'blur(3px)' }}
  />
  
  {/* Üzenet előtérben */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="relative z-10 flex items-center justify-center h-full"
  >
    <h1 className="text-4xl md:text-6xl font-serif text-advent-darkRed text-center px-8 leading-relaxed">
      Áldott, békés karácsonyt kíván a ForestMarkt!
    </h1>
  </motion.div>
</div>
```

### 8. PWA konfiguráció
- `manifest.json` elkészítése (lang: "hu")
- Service worker setup (Vite PWA plugin)
- Offline működés tesztelése
- Install prompt tesztelése mobilon

### 9. Testing checklist
- [ ] Magyar ékezetek helyesen jelennek meg minden eszközön
- [ ] November 30 előtt minden nap zárolva
- [ ] Csak feloldott napok kattinthatók
- [ ] Vasárnapok arany színűek (1, 8, 15, 22)
- [ ] Modal animációk smooth-ok
- [ ] December 25-26-án karácsonyi üzenet LOGÓVAL megjelenik
- [ ] Logo elmosódott, áttetsző, nem takarja ki a szöveget
- [ ] PWA telepíthető Android/iOS-re
- [ ] Offline működés (cache-elt képek)
- [ ] Responsive 320px - 2560px

### 10. Deployment (Netlify)
```bash
npm run build
netlify deploy --prod
```

## Netlify konfiguráció

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    Content-Type = "text/html; charset=UTF-8"
    X-Content-Type-Options = "nosniff"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Speciális követelmények

### Accessibility
- ARIA labels magyar nyelven minden interaktív elemen
- Keyboard navigation (Tab, Enter, Escape)
- Focus states láthatók
- Alt text képekhez magyarul

### Performance
- Lazy loading képekhez (React.lazy vagy natív loading="lazy")
- Képek optimalizálása build során
- Service Worker cache stratégia
- Lighthouse score: 90+ minden kategóriában

### Error Handling
Ha hiányzik egy kép:
```typescript
<img 
  src={`/photos/${dayNumber}.jpg`}
  alt={`${dayNumber}. nap fotója`}
  onError={(e) => {
    e.currentTarget.src = '/photos/placeholder.jpg';
  }}
/>
```

Hibaüzenetek magyarul:
- "Kép nem található"
- "Később próbáld újra"
- stb.

### UTF-8 mindenhol
- `package.json`: Nincs szükség charset-re
- `index.html`: `<meta charset="UTF-8">`
- Minden `.ts/.tsx` fájl: UTF-8 encoding
- `quotes.ts`: UTF-8 with BOM (opcionális, de biztonságosabb)

## Sikerkritériumok

### Funkcionális
- ✅ 25 nap látszik november 30-tól december 24-ig
- ✅ Csak feloldott napok nyithatók (ma és múlt)
- ✅ Vasárnapok arany színűek (1, 8, 15, 22)
- ✅ Smooth animációk (Framer Motion)
- ✅ PWA telepíthető mobilra
- ✅ December 25-26-án karácsonyi üzenet

### Tartalmi
- ✅ **25 MAGYAR nyelvű idézet helyes ékezetekkel**
- ✅ **Magyar helyesírás minden szövegnél**
- ✅ **ForestMarkt fehér logó elmosódva a karácsonyi üzenetnél**
- ✅ UTF-8 encoding mindenhol
- ✅ Minden UI elem magyarul

### Technikai
- ✅ React 18 + TypeScript + Vite
- ✅ Tailwind CSS egyedi színpalettával
- ✅ Framer Motion animációk
- ✅ PWA manifest (lang: "hu")
- ✅ Offline működés
- ✅ Responsive design
- ✅ Lighthouse 90+ score

### Design
- ✅ Pasztell karácsonyi színek
- ✅ Arany vasárnapok
- ✅ Playfair Display vagy hasonló serif font
- ✅ Havazás effekt karácsonykor
- ✅ Logo áttetszően elmosódva (opacity: 0.2, blur: 3px)

## KRITIKUS ELSŐ LÉPÉSEK - PONTOS SORREND

1. **Projekt inicializálás** (Vite + React + TypeScript)
2. **Függőségek telepítése** (Tailwind, Framer Motion, date-fns, PWA)
3. **WEB SEARCH - MAGYAR IDÉZETEK KUTATÁSA** ⚠️ NE HAGYD KI!
4. **Mappák létrehozása** (photos/, logo/, icons/)
5. **quotes.ts létrehozása** - 25 magyar idézettel
6. **dateUtils.ts** - Dátum logika
7. **Komponensek építése** - DayWindow → Calendar → PhotoModal → ChristmasMessage
8. **Logo integráció** - ChristmasMessage.tsx-ben
9. **Styling** - Tailwind config, színek, animációk
10. **PWA setup** - Manifest, service worker
11. **Testing** - Minden funkcionalitás
12. **Deployment** - Netlify

## FONTOS MEGJEGYZÉSEK

### Ne használj:
- ❌ Külső API-kat (minden statikus)
- ❌ Supabase-t (nincs backend szükség)
- ❌ Angol szövegeket
- ❌ Lorem ipsum placeholder-eket

### Használj:
- ✅ Lokális képtárolás (`/public/photos/`)
- ✅ Lokális logo tárolás (`/public/logo/`)
- ✅ Web search-öt magyar idézetekhez
- ✅ UTF-8 encoding-ot mindenhol
- ✅ Magyar helyesírást
- ✅ Framer Motion-t animációkhoz
- ✅ Tailwind-et egyedi színpalettával

### Feltöltendő fájlok (a fejlesztő által):
1. `/public/photos/1.jpg` - `/public/photos/25.jpg` (25 személyes fénykép)
2. `/public/logo/logo.png` vagy `/public/logo/logo.svg` (fehér ForestMarkt logó)

---

## KEZDD EL A FEJLESZTÉST!

**Első lépés**: Használd a `web_search` eszközt, és kutass fel 25 MAGYAR nyelvű adventi/karácsonyi idézetet!

**Második lépés**: Hozd létre a projekt alapstruktúráját.

**Harmadik lépés**: Implementáld a komponenseket a fenti specifikáció szerint.

🎄 Áldott adventi időszakot és sikeres fejlesztést! 🎄
