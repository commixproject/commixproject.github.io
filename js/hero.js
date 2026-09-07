/* The hero slider and the stats band beneath it, shared by every page. The counts and the current
   version are filled in by main.js once the repository answers. */
class Hero extends HTMLElement {
  connectedCallback() {
    const slides = [
      {
        heading: "Get the latest release.",
        href: "https://github.com/commixproject/commix",
        icon: "fab fa-github",
        label: "View the source.",
      },
      {
        heading: "Stay in the loop.",
        href: "https://twitter.com/commixproject",
        icon: "fa-brands fa-x-twitter",
        label: "Follow the project.",
      },
      {
        heading: "Practice before you target.",
        href: "https://hub.docker.com/r/commixproject/commix-testbed",
        icon: "fab fa-docker",
        label: "Pull the Docker image.",
      },
    ];

    /* A count with a path is a link to the GitHub page listing what it counts; the rest are read
       only figures. */
    const repo = "https://github.com/commixproject/commix";
    const counts = [
      { icon: "fa-star",      stat: "stars",    fallback: "5.8k", label: "stars" },
      { icon: "fa-code-fork", stat: "forks",    fallback: "940",  label: "forks", path: "/forks" },
      { icon: "fa-eye",       stat: "watching", fallback: "157",  label: "watching" },
    ];

    const countPill = (c) => {
      const inner = `<i class="fa-solid ${c.icon}" aria-hidden="true"></i> <b data-stat="${c.stat}">${c.fallback}</b> ${c.label}`;
      const pill = c.path
        ? `<a class="pill" href="${repo}${c.path}" target="_blank" rel="noopener noreferrer">${inner}</a>`
        : `<span class="pill">${inner}</span>`;
      return `
            <li>${pill}</li>`;
    };

    const slide = (s) => `
            <li style="background-image: url(/images/background.png);">
              <div class="overlay"></div>
              <div class="container">
                <div class="col-md-10 col-md-offset-1 text-center js-fullheight slider-text">
                  <div class="slider-text-inner">
                    <h2>${s.heading}</h2>
                    <p><a href="${s.href}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg"><i class="${s.icon}"></i> ${s.label}</a></p>
                  </div>
                </div>
              </div>
            </li>`;

    this.innerHTML = `
      <div id="ubea-hero" class="js-fullheight" data-section="home">
        <div class="flexslider js-fullheight">
          <ul class="slides">${slides.map(slide).join("")}
          </ul>
        </div>
      </div>

      <section id="ubea-stats" aria-label="Project at a glance">
        <div class="ubea-container">
          <ul class="stats-pills">
            ${counts.map(countPill).join("")}
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define("hero-component", Hero);
