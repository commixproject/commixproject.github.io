class Header extends HTMLElement {
  connectedCallback() {
    // The same four items on every page. ABOUT points at the front page's section by id, so it
    // works as a plain link from /news.html and 404.html; on the front page the scroll handler
    // takes the click before the browser does.
    const items = [
      `<a href="/#ubea-about" data-nav-section="about">OVERVIEW</a>`,
      `<a href="/news.html">NEWS</a>`,
      `<a href="https://github.com/commixproject/commix/wiki" target="_blank" rel="noopener noreferrer" class="external">DOCS</a>`,
      `<a href="https://www.paypal.com/donate/?hosted_button_id=UGBDUDJRW8U4E" target="_blank" rel="noopener noreferrer" class="external">DONATE</a>`,
    ];

    this.innerHTML = `
      <div class="ubea-loader"></div>

      <div id="page">
        <nav class="ubea-nav" role="navigation" aria-label="Main Navigation">
          <div class="ubea-nav-inner">

              <div id="ubea-logo">
                <a href="/" aria-label="Commix Homepage">
                  <img
                    src="/images/logo-header.png"
                    width="2080"
                    height="350"
                    alt="Commix Project Logo"
                  >
                </a>
              </div>

              <div class="text-right main-nav menu-1 fixed">
                <ul>
                  ${items.map((item) => `<li>${item}</li>`).join("\n                  ")}
                </ul>
              </div>

          </div>
        </nav>
      </div>
    `;
  }
}

customElements.define('header-component', Header);
