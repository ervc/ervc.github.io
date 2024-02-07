class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="header">
        <p class="title">Eric Van Clepper</p>
        <ul>
          <li><a href="index.html">HOME</a></li>
          <li><a href="research.html">RESEARCH</a></li>
          <li><a href="software.html">SOFTWARE</a></li>
          </ul>
      </div>
    `;
  }
}

customElements.define('header-component', Header);

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="footer">
        <p class="copyright">&copy; 2024 Eric Van Clepper</p>
        <ul>
          <li><a href="https://www.linkedin.com/in/eric-van-camp/">LinkedIn</a></li>
          <li><a href="https://twitter.com/Astro_EVC">Twitter</a></li>
          <li><a href="https://github.com/ervc">GitHub</a></li>
        </ul>
      </div>
    `;
  }
}

customElements.define('footer-component', Footer);
