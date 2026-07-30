# ShipSphere Logistics — Static HTML/CSS/JS Version

This is your original PHP + MySQL site converted to plain **HTML, CSS, and
JavaScript** — no server, no database, no PHP required. You can open
`index.html` directly in a browser or host it on any static host
(GitHub Pages, Netlify, S3, etc.).

## What changed

| Original (PHP) | Now (HTML/CSS/JS) |
|---|---|
| MySQL `tracking_table` / `history_table` | `js/data.js` — a plain JS array you edit by hand |
| `$_SESSION` used to pass tracking result between pages | A `?tn=<tracking number>` URL parameter |
| `index.php`, `about.php`, etc. | `index.html`, `about.html`, etc. |
| `include "footer.php"` / navbar duplicated per page | `js/partials.js` — shared navbar/footer, injected once per page |
| Contact form / newsletter form (`mail()`, file writes) | Forms still show in the UI, but submitting just shows an alert — **nothing is actually sent anywhere** (see "Contact form" below) |
| Admin panel (login + add/edit/delete shipments) | **Removed**, per your request. Manage shipments by editing `js/data.js` directly. |

## How tracking now works

1. Visitor types a tracking number into the form on the homepage.
2. `js/track.js` looks it up in `TRACKING_DATA` (in `js/data.js`).
3. If found, the browser is redirected to `track/view.html?tn=<number>`.
4. `view.html`, `fullview.html`, and `history.html` all read `tn` from
   the URL and pull the matching record from `js/data.js` — no server
   round-trip, no database.

## How to add/edit/remove a shipment

Open `js/data.js`. Each shipment is one object in the `TRACKING_DATA`
array, e.g.:

```js
{
  tracking_number: "1234567892121",
  sender: "Jason",
  receiver_name: "Mark",
  receiver_address: "237 Thomas Ave, New York, NY 10127",
  origin_port: "New York",
  destination_port: "Dubai",
  transport: "Air",
  quantity: "5",
  weight: "90",
  status: "In transit",
  delivery_date: "2022-04-22",
  history: [
    { date_time: "04/10/2022 09:00 am", status: "In possession", location: "NEW YORK" },
    ...
  ]
}
```

Just add a new object (comma-separated) to add a shipment, edit any
field to update it, or delete the object to remove it. Save the file
— that's it, no rebuild step.

**Note on history data:** your original SQL dump didn't actually
include a `history_table` (only `admin_table` and `tracking_table`),
so I wrote in plausible sample history events for the 3 existing
shipments. Replace them with your real history data whenever you have it.

## Admin panel

You asked to drop this rather than rebuild it client-side (the honest
reason: without a real server, "admin login" in the browser can't
actually keep anyone out — anyone can open dev tools and bypass it).
If you ever want real shipment management (a real login, a real
database), that needs an actual backend again — just a much smaller,
modern one (e.g. a simple Node/Express + SQLite/Postgres API) rather
than reverting to the old PHP setup.

## Contact form / newsletter form

These still render, but since there's no server, submitting just
shows an alert saying nothing was sent — no emails will go out. When
you're ready to make them work, the easiest options are:
- A free form backend like [Formspree](https://formspree.io) (add
  their `action` URL and `data-*` attributes to the `<form>` tags in
  `index.html` and `js/partials.js` — no code needed on your end).
- Or a `mailto:` link, if you're fine with opening the visitor's own
  email client instead of a proper contact form.

## Recent additions

- **`404.html`** — a custom "page not found" page. Most static hosts
  (GitHub Pages, Netlify, S3+CloudFront, etc.) let you configure this
  as the 404 response — check your host's docs for how to point to it.
- **`robots.txt` / `sitemap.xml`** — basic SEO plumbing. **Replace
  `YOUR-DOMAIN-HERE.com` with your real domain** once you know where
  this will be hosted. Tracking result pages are deliberately left out
  of the sitemap and marked `noindex` since they show data tied to a
  URL parameter, not content you'd want search engines indexing.
- **SEO/social meta tags** — `<meta name="description">` and Open
  Graph tags (`og:title`, `og:description`, `og:image`) added to every
  main page, so shared links show a proper preview.
- **`terms.html`** — the newsletter form's "terms & conditions" link
  now goes somewhere instead of nowhere. It's placeholder text —
  replace it with real terms before launch.
- **Inline form feedback** — submitting the contact/newsletter forms
  now shows a small message under the form instead of a browser
  `alert()` popup. Still doesn't send anything (see "Contact form"
  above) — just less jarring UX until you wire up a real backend.
- **Copy button** — a "Copy" button next to the tracking number on
  the full details page (`track/fullview.html`), using
  `navigator.clipboard`.
- **Print stylesheet** — a `@media print` block in `styles.css` hides
  the nav/footer/buttons when printing, plus a "Print" button on the
  full details page.
- **Pruned unused images** — removed leftover logo/favicon files from
  an earlier brand (`covlogo.png`, `gomlogo.png`, `gdsfav.ico`, etc.)
  that weren't referenced anywhere in the site.

- **New logo applied** — `images/shipsphere-logo.png` is your full logo
  (with tagline). Since it's wide with small text, the navbar uses a
  cropped icon-only version (`images/shipsphere-icon.png`) next to a
  styled "ShipSphere" text wordmark instead of shrinking the whole
  logo down — the full tagline version is there if you want to use it
  somewhere with more room (e.g. the About page). Favicon
  (`shipsphere-fav.ico`) and Apple touch icon
  (`shipsphere-touch-icon.png`) were generated from the icon crop too.

- **Footer updated** — the full logo (`shipsphere-logo.png`) is now
  shown in the footer next to the contact info. Location changed from
  Tokyo, Japan to **Milan, Italy** (a placeholder city — swap for your
  real office location), including the embedded map and the phone
  number format (was Japan-style `+81...`, now Italy-style
  `+39 02 1234 5678` — replace with your real number).

- **Shipping-label style header** on `track/fullview.html` and
  `track/history.html` — logo, company name, and a real scannable
  barcode (via the [JsBarcode](https://github.com/lindell/JsBarcode)
  library, loaded from a CDN) generated from each shipment's actual
  tracking number, with the number printed underneath it. Since it's
  generated in the browser from `js/data.js`, it automatically works
  for any tracking number you add — no separate barcode images to
  create or manage.

## File structure

```
index.html            Homepage (hero, about, services, tracking search, contact)
about.html
services.html
services/air.html
services/ocean.html
services/cars.html
track/view.html        Tracking summary result
track/fullview.html     Full shipment details (+ copy button, print button)
track/history.html      Shipment history events
404.html               Custom "page not found" page
terms.html             Placeholder terms & conditions page
robots.txt             SEO — replace YOUR-DOMAIN-HERE.com with your real domain
sitemap.xml            SEO — replace YOUR-DOMAIN-HERE.com with your real domain
styles.css              (includes new @media print rules)
main.js                 (unchanged from original — scroll-to-top, counters)
js/data.js              Shipment "database" — EDIT THIS to manage data
js/partials.js          Shared navbar + footer template (+ inline form feedback)
js/track.js             Tracking lookup + rendering logic (+ copy-to-clipboard)
images/                 (pruned unused leftover branding assets)
```

## Running it

You can just double-click `index.html` to open it in a browser — no
server needed for any of this to work, since everything is now plain
HTML/CSS/JS with no fetch()/CORS dependencies.
