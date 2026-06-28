class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        #ubea-footer {
          left: 0;
          bottom: 0;
          width: 100%;

          background: rgba(243, 243, 243, 0.95);
          backdrop-filter: blur(3px);
        }
      </style>

      <footer id="ubea-footer" role="contentinfo">
        <div class="ubea-container">
          <div class="row copyright">
            <div class="col-md-12">

              <p class="pull-left">
                <small class="block">
                  <br>
                  Made in Greece with
                  <i class="fa fa-coffee text-muted" aria-hidden="true"></i>
                  and
                  <i class="fa fa-heart text-danger" aria-hidden="true"></i>
                  by
                  <a href="https://github.com/stasinopoulos" target="_blank" rel="noopener noreferrer">
                    Anastasios Stasinopoulos
                  </a>.
                  <br>

                  <a href="https://github.com/commixproject/" target="_blank" rel="noopener noreferrer">
                    Commix Project
                  </a>
                  is licensed under the
                  <a href="https://github.com/commixproject/commix/wiki/License" target="_blank" rel="noopener noreferrer">
                    GPLv3 License
                  </a>
                  © 2014-2026.
                </small>
              </p>
              <p class="pull-right">
                <br>
                <a href="https://www.obrela.com?utm_source=commixproject&utm_medium=banner&utm_campaign=clickthrough"
                   target="_blank"
                   rel="sponsored noopener noreferrer">
                  <img src="https://commixproject.com/images/OSI_Logo_SPONSORED.png"
                       width="250"
                       alt="Obrela"
                       loading="lazy">
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);