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
  if (document.title !== "Camryn O'Donnell") {
    addHeader();
  }
  // Insert footer
  addFooter();
}

// * Modal
const toggleModal = (event) => {
  console.log("Hover detected");
  toggleClass(modal, "visible", "invisible");
};

modalButton.addEventListener("mouseover", toggleModal);

// * Theme Button
//console.log(window.matchMedia("(prefers-color-scheme:dark)"));

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

/**
 * Add header element to page
 * @returns HTML Element
 */
function addHeader() {
  addClasses(
    header,
    "sticky top-0 z-10 flex bg-white px-10 pb-6 pt-8 md:px-20 dark:bg-black w-full",
  );

  var folder = ".";
  if (url.indexOf("portfolio/") > -1) {
    folder = "..";
    header.classList.remove("sticky");
  }

  header.innerHTML = `
<nav id="nav-bar" class="w-full flex items-end justify-end gap-4 md:gap-8 xl:gap-12">
  <a id="link-landing-page" class="group mr-auto flex gap-4 text-4xl" href="/" tabindex="0"
    aria-label="Back to Landing Page">
    <span id="cam-od-logo"
      class="logo group-hover:animate-glint group-hover:bg-transparent h-10 w-10 bg-black dark:bg-white"></span>
    <p aria-hidden="true" id="camod-name"
      class="h-0 w-0 overflow-hidden bg-clip-text !pl-0 text-white md:h-fit md:w-fit">
      Camryn O'Donnell
    </p>
  </a>
  <a id="link-about-me" class="hover:underline focus:underline" href="${folder}/about.html" tabindex="0">about</a>
  <a id="link-portfolio" class="hover:underline" href="${folder}/portfolio.html" tabindex="0">portfolio</a>
  <a id="link-contact" class="hover:underline" href="${folder}/contact.html" tabindex="0">contact</a>
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
  addClasses(
    footer,
    "flex h-fit w-full justify-end px-10 pb-10 pt-20 md:px-20 mt-auto",
  );

  footer.innerHTML = `
<p class="text-right opacity-60">
  Designed & Developed by Camryn O'Donnell
</p>
`;
}
