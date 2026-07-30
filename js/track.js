/**
 * track.js
 * ------------------------------------------------------------------
 * Replaces the old PHP + MySQL + $_SESSION tracking flow.
 *
 * How it works now:
 *   1. On the homepage, the tracking form doesn't POST to a server.
 *      It just redirects the browser to track/view.html?tn=<number>
 *   2. track/view.html, fullview.html and history.html all read the
 *      "tn" value from the page URL and look it up in TRACKING_DATA
 *      (see js/data.js). Nothing is stored on a server anywhere.
 * ------------------------------------------------------------------
 */

// Reads "?tn=XXXX" from the current page's URL.
function getTrackingNumberFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("tn") || "";
}

// Wires up the search form on the homepage (id="track-form").
function initTrackingForm() {
  const form = document.getElementById("track-form");
  if (!form) return;

  const errorEl = document.getElementById("track-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector('[name="track"]');
    const value = input.value.trim();

    if (!value) {
      errorEl.textContent = "Tracking number not found";
      return;
    }

    const shipment = findShipment(value);
    if (!shipment) {
      errorEl.textContent = "Tracking number not found";
      return;
    }

    errorEl.textContent = "";
    window.location.href = "track/view.html?tn=" + encodeURIComponent(shipment.tracking_number);
  });
}

// Renders the summary table on track/view.html
function renderTrackView() {
  const tn = getTrackingNumberFromURL();
  const shipment = findShipment(tn);
  const container = document.getElementById("track-view-body");
  if (!container) return;

  if (!shipment) {
    container.innerHTML = `<tr><td colspan="4">No shipment found for tracking number "${escapeHTML(tn)}". <a href="../index.html">Go back and try again</a>.</td></tr>`;
    return;
  }

  container.innerHTML = `
    <tr>
        <td scope="row">${escapeHTML(shipment.tracking_number)}</td>
        <td>From ${escapeHTML(shipment.origin_port)} to ${escapeHTML(shipment.destination_port)}</td>
        <td>${escapeHTML(shipment.status)}</td>
        <td><button class="btn btn-primary"><a href="fullview.html?tn=${encodeURIComponent(shipment.tracking_number)}" class="text-white">SEE FULL DETAILS</a></button></td>
    </tr>`;
}

// Renders the barcode + tracking number under the logo/company name
// header on the fullview and history pages. Uses the JsBarcode library
// (loaded via CDN in those pages) to generate a real scannable barcode
// from the shipment's tracking number.
function renderBarcodeHeader(trackingNumber, numberElId) {
  const numberEl = document.getElementById(numberElId);
  const barcodeSvg = document.getElementById("barcode");

  if (numberEl) numberEl.textContent = trackingNumber || "—";

  if (!trackingNumber || !barcodeSvg) return;

  if (typeof JsBarcode === "undefined") {
    // Barcode library didn't load (e.g. no internet connection, or a
    // blocked/broken CDN link) — show the tracking number as plain
    // text instead of silently rendering nothing.
    barcodeSvg.outerHTML = `<div style="font-family: monospace; font-size: 1.1rem; letter-spacing: 3px;">${escapeHTML(trackingNumber)}</div>`;
    return;
  }

  try {
    JsBarcode(barcodeSvg, trackingNumber, {
      format: "CODE128",
      displayValue: false,
      height: 50,
      width: 2,
      margin: 0,
    });
  } catch (err) {
    // Some characters aren't valid for CODE128 — hide the empty svg.
    barcodeSvg.style.display = "none";
  }
}

// Renders the full details table on track/fullview.html
function renderTrackFullView() {
  const tn = getTrackingNumberFromURL();
  const shipment = findShipment(tn);
  const container = document.getElementById("track-fullview-body");
  const historyLink = document.getElementById("history-link");
  if (!container) return;

  if (!shipment) {
    container.innerHTML = `<tr><td colspan="2">No shipment found for tracking number "${escapeHTML(tn)}". <a href="../index.html">Go back and try again</a>.</td></tr>`;
    if (historyLink) historyLink.style.display = "none";
    return;
  }

  renderBarcodeHeader(shipment.tracking_number, "barcode-number");

  container.innerHTML = `
    <tr><th scope="row">Tracking Number</th><td>${escapeHTML(shipment.tracking_number)}</td></tr>
    <tr><th scope="row">Sender</th><td>${escapeHTML(shipment.sender)}</td></tr>
    <tr><th scope="row">Receiver Name</th><td>${escapeHTML(shipment.receiver_name)}</td></tr>
    <tr><th scope="row">Receiver Address</th><td>${escapeHTML(shipment.receiver_address)}</td></tr>
    <tr><th scope="row">Port of Origin</th><td>${escapeHTML(shipment.origin_port)}</td></tr>
    <tr><th scope="row">Port of Destination</th><td>${escapeHTML(shipment.destination_port)}</td></tr>
    <tr><th scope="row">Mode of Transport</th><td>${escapeHTML(shipment.transport)}</td></tr>
    <tr><th scope="row">Product</th><td>${escapeHTML(shipment.product)}</td></tr>
    <tr><th scope="row">Quantity</th><td>${escapeHTML(shipment.quantity)}</td></tr>
    <tr><th scope="row">Weight</th><td>${escapeHTML(shipment.weight)}</td></tr>
    <tr><th scope="row">Status</th><td>${escapeHTML(shipment.status)}</td></tr>
    <tr><th scope="row">Payment Method</th><td>${escapeHTML(shipment.payment_method)}</td></tr>
    <tr><th scope="row">Picked-up Time</th><td>${escapeHTML(shipment.pickup_time)}</td></tr>
    <tr><th scope="row">Departed Time</th><td>${escapeHTML(shipment.departure_time)}</td></tr>
    <tr><th scope="row">Estimated Delivery Date</th><td>${escapeHTML(shipment.delivery_date)}</td></tr>`;

  if (historyLink) {
    historyLink.href = "history.html?tn=" + encodeURIComponent(shipment.tracking_number);
  }

  const copyBtn = document.getElementById("copy-tn-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(shipment.tracking_number)
        .then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
        })
        .catch(() => {
          copyBtn.textContent = "Couldn't copy";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
        });
    });
  }
}

// Renders the history table on track/history.html
function renderTrackHistory() {
  const tn = getTrackingNumberFromURL();
  const shipment = findShipment(tn);
  const container = document.getElementById("track-history-body");
  const backLink = document.getElementById("history-back-link");

  renderBarcodeHeader(tn, "history-tn-label");
  if (backLink) backLink.href = "fullview.html?tn=" + encodeURIComponent(tn);

  if (!container) return;

  if (!shipment || !shipment.history || shipment.history.length === 0) {
    container.innerHTML = `<tr><td colspan="3">No history found for this tracking number.</td></tr>`;
    return;
  }

  container.innerHTML = shipment.history
    .map(
      (event) => `
    <tr>
        <td>${escapeHTML(event.date_time)}</td>
        <td>${escapeHTML(event.status)}</td>
        <td>${escapeHTML(event.location)}</td>
    </tr>`
    )
    .join("");
}

// Basic HTML-escaping so shipment data can't break page markup.
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = String(str ?? "");
  return div.innerHTML;
}
