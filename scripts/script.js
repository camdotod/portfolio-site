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

/**
 * Add header element to page
 * @returns HTML Element
 */
function addHeader() {
  addClasses(header, "bg-bg-color sticky md:relative top-0 z-10 w-full");

  var folder = ".";
  if (url.indexOf("portfolio/") > -1) {
    folder = "..";
    header.classList.remove("sticky");
  }

  header.innerHTML = `
  <nav id="nav-bar"
  class="relative inline-block w-full gap-4 lg:flex lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-12">
    <div id="nav-header" class="flex self-stretch px-6 pt-8 pb-6 md:pr-60 md:pl-60 lg:pr-0">
      <a id="link-landing-page" class="mr-auto flex gap-4 text-4xl active:opacity-80 rounded-xl overflow-clip" href="/"
        tabindex="0" aria-label="Back to home page">
        <img src="/assets/CO-logo.png" class="aspect-square h-10 w-10 shrink-0 " aria-hidden />
      </a>
      <button id="menu-button" class="active:bg-fg-color/10 h-10 w-10 rounded-2xl active:opacity-80 lg:hidden"
        aria-label="Open Menu">
        <span id="menu-button-icon" class="material-symbols-outlined align-middle">menu</span>
      </button>
    </div>
    <div id="nav-links"
      class="bg-bg-color z-20 font-display absolute w-full flex-col border-t border-b px-6 py-6 md:pr-60 md:pl-60 lg:relative lg:flex lg:w-auto lg:flex-row lg:gap-6 lg:border-0 lg:py-0 lg:pb-6 lg:pl-0 hidden">
      <a id="link-portfolio"
        class="focus-visible:outline-fg-color flex h-10 w-fit items-center underline underline-offset-2 decoration-fg-color/50 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-solid active:opacity-80 hover:decoration-fg-color focus-visible:decoration-fg-color rounded-xl active:decoration-fg-color"
        href="${folder}/portfolio.html" tabindex="0"><span>portfolio</span></a>
      <a id="link-about"
        class="focus-visible:outline-fg-color flex h-10 w-fit items-center underline underline-offset-2 decoration-fg-color/50 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-solid active:opacity-80 hover:decoration-fg-color focus-visible:decoration-fg-color rounded-xl active:decoration-fg-color"
        href="${folder}/about.html" tabindex="0"><span>about</span></a>
    </div>
</nav>
`;

  if (url.indexOf("portfolio.html") > -1) {
    addClasses(document.getElementById("link-portfolio"), "opacity-70");
  } else if (url.indexOf("about.html") > -1) {
    addClasses(document.getElementById("link-about"), "opacity-70");
  } else if (url.indexOf("process.html") > -1) {
    addClasses(document.getElementById("link-process"), "opacity-70");
  }
}

/**
 * Add footer element to page
 * @returns HTML Element
 */
function addFooter() {
  addClasses(
    footer,
    "flex flex-col gap-6 px-6 border-t mt-10 py-10 md:px-60 relative",
  );

  footer.innerHTML = `
    <div id="footer-text" class="flex flex-col gap-4">
      <h2 class="text-xl font-display">Contact Me</h2>
      <p class="text-sm opacity-80">Interested in my work?</p>
    </div>
    <div id="social-buttons" class="flex gap-20 flex-wrap gap-y-4">
      <a
        href="https://mailto:camryn.odonnell@gmail.com"
        id="email-button"
        role="button"
        tabindex="0"
        target="_blank"
        class="text-fresh-600 dark:text-fresh-400 flex items-center gap-2 hover:bg-fresh-100 pl-2 pr-3 py-2 -mx-2 rounded-2xl active:bg-fresh-100/50 dark:active:bg-fresh-900/50 dark:hover:bg-fresh-900"
      >
        <span aria-hidden="true" class="material-symbols-outlined">alternate_email</span>
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
            class="text-calm-600 dark:text-calm-400 flex items-center gap-2 hover:bg-calm-100 pl-2 pr-3 py-2 -mx-2 rounded-2xl active:bg-calm-100/50 dark:active:bg-calm-900/50 dark:hover:bg-calm-900"
        >
          <span aria-hidden="true" class="material-symbols-outlined">work</span>
          <p class="font-bold underline decoration-2 underline-offset-2">
              LinkedIn
          </p>
        </a>
        <a
            href="https://github.com/camdotod"
            class="text-vigor-600 dark:text-vigor-400 flex items-center gap-2 hover:bg-vigor-100 pl-2 pr-3 py-2 -mx-2 rounded-2xl active:bg-vigor-100/50 dark:active:bg-vigor-900/50 dark:hover:bg-vigor-900"
            id="github-button"
            role="button"
            target="_blank"
            tabindex="0"
        >
            <p aria-hidden="true" class="material-symbols-outlined">deployed_code</p>
            <p class="font-bold underline decoration-2 underline-offset-2">
              GitHub
            </p>
        </a>
    
        </div>
    
    <a href="https://github.com/camdotod/portfolio-site" class="mt-10 text-right underline-offset-2 decoration-fg-color/50 hover:decoration-fg-color active:decoration-fg-color underline text-sm opacity-70 w-fit self-end" aria-label="GitHub repository for this website">
    Designed & Developed by Camryn O'Donnell
    </a>
`;
}

// * Menu Button
const menuButton = document.querySelector("#menu-button");
const menuButtonIcon = document.getElementById("menu-button-icon");
const menuLinks = document.querySelector("#nav-links");

menuButton.addEventListener("click", (event) => {
  toggleClass(menuLinks, "block", "hidden");

  if (menuLinks.classList.contains("block")) {
    menuButtonIcon.innerText = "chevron_line_up";
  } else {
    menuButtonIcon.innerText = "menu";
  }
});
