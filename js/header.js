class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="ubea-loader"></div>
    <div id="page">
    <nav class="ubea-nav" role="navigation">
      <div class="ubea-container">
        <div class="row">
          <div class="col-sm-2 col-xs-12">
            <div id="ubea-logo"><a href="/"><img src="https://commixproject.com/images/logo.png" width=250 height=auto></a>
            </div>
          </div>
          <div class="col-xs-20 text-right main-nav menu-1 fixed">
            <ul>
              <li><a href="about" data-nav-section="about">ABOUT</a><font color="red"> | </font></li>
              <li><a href="faq" data-nav-section="faq">FAQ</a><font color="red"> | </font></li>
              <li><a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=UGBDUDJRW8U4E" class="external">DONATE</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    `;
  }
}

customElements.define('header-component', Header);
