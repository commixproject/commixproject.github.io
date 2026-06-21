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
                      width="250"
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
                    <span class="nav-divider">|</span>
                  </li>

                  <li>
                    <a href="#faq" data-nav-section="faq">
                      FAQ
                    </a>
                    <span class="nav-divider">|</span>
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
                  </li>

                </ul>
              </div>

            </div>
          </div>
        </nav>
      </div>
    `;
  }
}

customElements.define('header-component', Header);