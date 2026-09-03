class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ubea-loader"></div>

      <div id="page">
        <nav class="ubea-nav" role="navigation" aria-label="Main Navigation">
          <div class="ubea-nav-inner">

              <div id="ubea-logo">
                <a href="/" aria-label="Commix Homepage">
                  <img
                    src="https://commixproject.com/images/logo.png"
                    width="220"
                    height="45"
                    alt="Commix Project Logo"
                  >
                </a>
              </div>

              <div class="text-right main-nav menu-1 fixed">
                <ul>
                  <li>
                    <a href="#about" data-nav-section="about">
                      ABOUT
                    </a>
                    <span class="nav-divider"> | </span>
                  </li>

                  <li>
                    <a
                      href="https://www.paypal.com/donate/?hosted_button_id=UGBDUDJRW8U4E"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="external"
                    >
                      DONATE
                    </a>
                    <span class="nav-divider"> | </span>
                  </li>

                  <li>
                    <a href="#" class="external js-spread-trigger">
                      SPREAD
                    </a>
                  </li>

                </ul>
              </div>

          </div>
        </nav>
      </div>

      <!-- MODAL -->
      <div class="modal fade" id="spreadModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="max-width:950px;">
          <div class="modal-content">

            <div class="modal-header" style="border-bottom:none;">
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body text-center" style="padding:20px;">
              <img src="https://commixproject.com/images/official_commix_sticker.png"
                   class="img-responsive"
                   style="margin:auto;width:70%;max-width:90%">
             <br>
             <h4 class="modal-title">
                From screen to street.
              </h4>
             <h3 class="modal-title">
                Print it. Stick it. Spread it.
              </h3>
            </div>

          </div>
        </div>
      </div>
    `;

    // delegated: the nav is cloned into the mobile off-canvas menu
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".js-spread-trigger");
      if (!trigger) return;

      e.preventDefault();

      // close the mobile off-canvas menu, if open
      document.body.classList.remove("offcanvas");
      document.querySelectorAll(".js-ubea-nav-toggle")
        .forEach((el) => el.classList.remove("active"));

      // Bootstrap modal (needs jQuery + bootstrap.js)
      if (window.jQuery) {
        window.jQuery("#spreadModal").modal("show");
      } else {
        // fallback if no bootstrap
        const modal = this.querySelector("#spreadModal");
        if (modal) modal.style.display = "block";
      }
    });
  }
}

customElements.define('header-component', Header);