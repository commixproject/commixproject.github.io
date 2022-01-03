class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer id="ubea-footer" role="contentinfo">
      <div class="ubea-container">
        <div class="row copyright">
          <div class="col-md-12">
            <p class="pull-left">
              <small class="block">
                <br>
                Made in Greece with <font size="2" color="grey"><b> <i class="fa fa-coffee"></b></i></font> and <font size="2" color="red"><b><i class="fa fa-heart"></i></b></font></font> by <a href="https://github.com/stasinopoulos" target="_blank">Anastasios Stasinopoulos</a>.
                <br>
                <a href="https://github.com/commixproject/" target="_blank">Commix Project</a> is licensed under the <a href="https://github.com/commixproject/commix/wiki/License" target="_blank">GPLv3 License</a> © 2014-2022.
              </small>
            </p>
            <p class="pull-right">
              <br>
            	<a href="https://www.obrela.com?utm_source=commixproject&utm_medium=banner&utm_campaign=clickthrough" target="_blank"><img src="https://commixproject.com/images/OSI_Logo_SPONSORED.png" width=250 height=auto></a> 
            </p>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}
customElements.define('footer-component', Footer);
