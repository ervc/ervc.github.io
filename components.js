class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="header">
        <p class="title"><a href="index.html">Eric Van Clepper</a></p>
        <ul>
          <li><a href="index.html">HOME</a></li>
          <li><a href="research.html">RESEARCH</a></li>
          <li><a href="software.html">SOFTWARE</a></li>
          <li><a href="files/vanclepper_cv.pdf">CV</a></li>
          <li><a href="forfun.html">OTHER</a></li>
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
        <p class="copyright">&copy; 2026 Eric Van Clepper</p>
        <ul>
          <li><a href="https://www.linkedin.com/in/eric-van-camp/">LinkedIn</a></li>
          <li><a href="https://github.com/ervc">GitHub</a></li>
        </ul>
      </div>
    `;
  }
}

customElements.define('footer-component', Footer);
