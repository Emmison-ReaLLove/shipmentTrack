/**
 * partials.js
 * ------------------------------------------------------------------
 * Builds the shared navbar and footer for every page, so you only
 * ever have to edit them in ONE place instead of in every HTML file.
 *
 * Each page must define `ASSET_PREFIX` BEFORE loading this script:
 *   - Pages in the site root:        const ASSET_PREFIX = "";
 *   - Pages one folder deep         const ASSET_PREFIX = "../";
 *     (services/*.html, track/*.html)
 *
 * Each page must also have two empty containers in the HTML:
 *   <div id="site-navbar"></div>
 *   <div id="site-footer"></div>
 *
 * And call renderHomeNavbar() or renderBackNavbar() + renderFooter()
 * — see the bottom of each HTML file for the actual call.
 * ------------------------------------------------------------------
 */

function renderHomeNavbar() {
  document.getElementById("site-navbar").innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-dark bg-light fixed-top" id="navbar" style="background-color: #051d2f;">
        <a class="navbar-brand d-flex align-items-center" href="${ASSET_PREFIX}index.html">
            <img src="${ASSET_PREFIX}images/shipsphere-icon.png" alt="ShipSphere Logistics" style="height: 2.6rem; margin-right: 10px; border-radius: 2px;">
            <span style="font-weight: 700; font-size: 1.15rem; line-height: 1;"><span style="color: #ffffff;">Ship</span><span style="color: #3b82f6;">Sphere</span></span>
        </a>
        <button class="navbar-toggler d-lg-none" style="border: none;" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item"><a class="nav-link" href="#home">Home <span class="sr-only">(current)</span></a></li>
                <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#services">Service</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact_us">Contact</a></li>
                <li class="nav-item"><a class="nav-link" href="#track_shipment">Track Shipment</a></li>
            </ul>
        </div>
    </nav>`;
}

function renderBackNavbar(backHref) {
  document.getElementById("site-navbar").innerHTML = `
    <nav class="navbar navbar-expand-sm navbar-dark bg-light fixed-top" style="background-color: #051d2f;">
        <a class="navbar-brand d-flex align-items-center" href="${ASSET_PREFIX}index.html">
            <img src="${ASSET_PREFIX}images/shipsphere-icon.png" alt="ShipSphere Logistics" style="height: 2.6rem; margin-right: 10px; border-radius: 2px;">
            <span style="font-weight: 700; font-size: 1.15rem; line-height: 1;"><span style="color: #ffffff;">Ship</span><span style="color: #3b82f6;">Sphere</span></span>
        </a>
        <button class="navbar-toggler d-lg-none" style="border: none;" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item active"><a class="nav-link" href="${backHref}">Back <span class="sr-only">(current)</span></a></li>
            </ul>
        </div>
    </nav>`;
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <section style="background-color: #193448;">
        <div class="container">
            <div class="row pt-3">
                <div class="col-lg-6 col-md-12 my-5">
                    <div class="row">
                        <div class="col">
                            <div class="col text-white">
                                <img src="${ASSET_PREFIX}images/shipsphere-logo.png" alt="ShipSphere Logistics" style="max-width: 220px; width: 100%; height: auto; margin-bottom: 1rem; border-radius: 4px;">
                                <span style="font-weight: 600;" class="my-3">Milan, Italy</span>
                                <p>Phone: <span style="color:#e74336;">+39 02 1234 5678</span></p>
                                <p>Email: <span style="color:#e74336;">info@shipspherelogistics.com</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 my-4">
                    <p><iframe src="https://www.google.com/maps?q=Milan,+Italy&output=embed" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5 text-white" style="background-color: #051d2f;">
        <div class="container">
            <div class="row">
                <div class="col">
                    <span style="font-weight: 700;">ShipSphere Logistics Company LTD</span>
                    <p style="font-size: 12px;">When you choose our company you get the guarantee of the high quality services and reliability. We serve the unique needs of our customers from a variety of industries.</p>
                </div>
                <div class="col">
                    <span style="font-weight: 500;">Quick Links</span>
                    <ul style="font-size: 12px;">
                        <li><a href="${ASSET_PREFIX}index.html" style="text-decoration: none;" class="text-white">Home</a></li>
                        <li><a href="${ASSET_PREFIX}about.html" style="text-decoration: none;" class="text-white">About</a></li>
                        <li><a href="${ASSET_PREFIX}services.html" style="text-decoration: none;" class="text-white">Service</a></li>
                        <li><a href="${ASSET_PREFIX}index.html#contact_us" style="text-decoration: none;" class="text-white">Contact</a></li>
                        <li><a href="${ASSET_PREFIX}index.html#track_shipment" style="text-decoration: none;" class="text-white">Track Shipment</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div>
                        <span style="font-weight: 500;">Newsletter</span>
                    </div>
                    <div style="font-size: 12px;">
                        <form autocomplete="off" class="js-static-form">
                            <div class="form-group">
                              <input type="email" name="news_email" class="form-control" placeholder="Email Address" required>
                            </div>
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" name="agree" value="checkedValue" required>
                                I have read and agree to the <a href="${ASSET_PREFIX}terms.html" style="color:#e74336">terms &amp; conditions</a>
                              </label>
                            </div>
                            <button type="submit" class="btn btn-success my-2">Get</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-3 text-white" style="background-color: #193448;">
        <div class="text-center">
            <span style="font-size: 15px;">ShipSphere Logistics Company LTD &copy; 2026. All rights reserved.</span>
        </div>
    </section>`;

  // Forms with no backend behind this site anymore: just stop the
  // page from reloading and show an inline note instead of a jarring
  // browser alert(). Hook these up to a real form service (like
  // Formspree) or your own backend when you're ready to send real
  // emails — see README.md.
  document.querySelectorAll(".js-static-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let note = form.querySelector(".js-static-form-note");
      if (!note) {
        note = document.createElement("div");
        note.className = "js-static-form-note alert alert-info mt-2";
        note.setAttribute("role", "status");
        form.appendChild(note);
      }
      note.textContent = "Success.";

      form.reset();
    });
  });
}
