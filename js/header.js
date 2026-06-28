class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ubea-loader"></div>

      <div id="page">
        <nav class="ubea-nav" role="navigation" aria-label="Main Navigation">
          <div class="ubea-container">
            <div class="row">

              <div class="col-sm-2 col-xs-12">
                <div id="ubea-logo">
                  <a href="/" aria-label="Commix Homepage">
                    <img
                      src="https://commixproject.com/images/logo.png"
                      width="270"
                      alt="Commix Project Logo"
                    >
                  </a>
                </div>
              </div>
      
              <div class="col-sm-10 col-xs-12 text-right main-nav menu-1 fixed">
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
                    <a href="#" id="spreadTrigger" class="external">
                      SPREAD
                    </a>
                  </li>

                </ul>
              </div>

            </div>
          </div>
        </nav>
      </div>

      <!-- MODAL -->
      <div class="modal fade" id="spreadModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="max-width:920px;">
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
                From screen to street!
              </h4>
             <h3 class="modal-title">
                Print it. Stick it. Spread it.
              </h3>
            </div>

          </div>
        </div>
      </div>
    `;

    // bind event AFTER render
    setTimeout(() => {
      const trigger = this.querySelector("#spreadTrigger");

      if (trigger) {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();

          // Bootstrap modal (needs jQuery + bootstrap.js)
          if (window.jQuery) {
            $("#spreadModal").modal("show");
          } else {
            // fallback if no bootstrap
            const modal = this.querySelector("#spreadModal");
            if (modal) modal.style.display = "block";
          }
        });
      }
    }, 0);
  }
}

customElements.define('header-component', Header);