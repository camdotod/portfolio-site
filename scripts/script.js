// * Variables
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const modalButton = document.getElementById("modal-button");
const toggleThemeButton = document.getElementById("toggle-theme");
const html = document.documentElement;
const url = window.location.href;

// * Utility Functions
/**
 * Toggle between two classes
 * @param {HTMLElement} element - Element the class is on
 * @param {string} class0 - First class name
 * @param {string} class1 - Second class name
 */
const toggleClass = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
};

/**
 * Add list of classes to an HTML element
 * @param {HTMLElement} element - Selected element
 * @param {string} classArr - list of classes separated by spaces
 */
const addClasses = (element, classes) => {
  let classArr = classes.split(" ");
  classArr.forEach((className) => element.classList.add(className));
};

// * Construct Page
setLayout();

function setLayout() {
  // Insert header
  addHeader();

  // Insert footer
  addFooter();
}

// * Modal
const toggleModal = (event) => {
  console.log("Hover detected");
  toggleClass(modal, "md:hidden", "md:flex");
};

if (modalButton) {
  modalButton.addEventListener("mouseover", toggleModal);
  modalButton.addEventListener("mouseleave", toggleModal);
}

// * Theme Button
//console.log(window.matchMedia("(prefers-color-scheme:dark)"));
if (toggleThemeButton) {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches === true) {
    html.classList.add("dark");
    toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">light_mode</span>
  `;
  } else {
    html.classList.add("light");
    toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">dark_mode</span>
  `;
  }

  toggleThemeButton.addEventListener("click", (event) => {
    toggleClass(html, "light", "dark");

    if (html.classList.contains("dark")) {
      toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">light_mode</span>
  `;
    } else {
      toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">dark_mode</span>
  `;
    }
  });
}

/**
 * Add header element to page
 * @returns HTML Element
 */
function addHeader() {
  addClasses(
    header,
    "sticky top-0 z-10 flex bg-bg-color px-6 pb-6 pt-8 md:px-60 w-full",
  );

  var folder = ".";
  if (url.indexOf("portfolio/") > -1) {
    folder = "..";
    header.classList.remove("sticky");
  }

  header.innerHTML = `
<nav id="nav-bar" class="w-full flex items-end justify-end gap-4 md:gap-8 xl:gap-12">
  <a id="link-landing-page" class="mr-auto flex gap-4 text-4xl active:opacity-80" href="/" tabindex="0"
    aria-label="Back to home page">
    <img src="assets/Logo-P22.png" class="h-10 rounded-xl" aria-hidden>
  </a>
  <a id="link-portfolio" class="underline focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-fg-color" href="${folder}/portfolio.html" tabindex="0">projects</a>
  <a id="link-portfolio" class="underline focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-fg-color" href="${folder}/process.html" tabindex="0">design process</a>
  <a id="link-about-me" class="underline focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-fg-color" href="${folder}/about.html" tabindex="0">about</a>
</nav>
`;

  if (url.indexOf("portfolio.html") > -1) {
    addClasses(
      document.getElementById("link-portfolio"),
      "opacity-70 underline",
    );
  } else if (url.indexOf("about.html") > -1) {
    addClasses(
      document.getElementById("link-about-me"),
      "opacity-70 underline",
    );
  } else if (url.indexOf("contact.html") > -1) {
    addClasses(document.getElementById("link-contact"), "opacity-70 underline");
  }
}

/**
 * Add footer element to page
 * @returns HTML Element
 */
function addFooter() {
  addClasses(footer, "flex flex-col gap-6 px-6 border-t mt-10 py-10 md:px-60");

  footer.innerHTML = `
    <div id="footer-text" class="flex flex-col gap-4">
          <h2 class="text-xl">Contact Me</h2>
          <p class="text-sm opacity-80">Interested in my work?</p>
        </div>
        <div id="social-buttons" class="flex gap-20 flex-wrap gap-y-4">
          <a
            href="https://mailto:camryn.odonnell@gmail.com"
            id="email-button"
            role="button"
            tabindex="0"
            target="_blank"
            class="text-green flex items-center gap-2"
          >
            <span aria-hidden="true" class="material-icons">alternate_email</span>
            <p class="font-bold underline decoration-2 underline-offset-2">
              Email
            </p>
          </a>
          <a
            href="https://www.linkedin.com/in/camryn-odonnell/"
            id="linkedin-button"
            role="button"
            tabindex="0"
            target="_blank"
            class="text-blue flex items-center gap-2"
          >
            <span aria-hidden="true" class="material-icons">work</span>
            <p class="font-bold underline decoration-2 underline-offset-2">
              LinkedIn
            </p>
          </a>
          <a
            href="https://github.com/camdotod"
            class="text-red flex items-center gap-2"
            id="github-button"
            role="button"
            target="_blank"
            tabindex="0"
          >
            <p aria-hidden="true" class="material-icons">code</p>
            <p class="font-bold underline decoration-2 underline-offset-2">
              GitHub
            </p>
          </a>
    
        </div>
        <a href="https://github.com/camdotod/portfolio-site" class="text-right self-stretch underline text-sm opacity-70">
    Designed & Developed by Camryn O'Donnell
    </a>
`;
}
