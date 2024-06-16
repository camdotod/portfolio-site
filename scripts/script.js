//Handle Portfolio Items
const toggleClass = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
};

const toggleModal = (event) => {
  console.log("Hover detected");
  toggleClass(modal, "visible", "invisible");
};

modalButton.addEventListener("mouseover", toggleModal);
modalButton.addEventListener("mouseleave", toggleModal);

// Handle Theme Button
const toggleThemeButton = document.getElementById("toggle-theme");
const html = document.documentElement;
("toggle-theme");

console.log(window.matchMedia("(prefers-color-scheme:dark)"));

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

//Contact Scroll Animation
(function () {
  let contactSection;
  let windowHeight;

  function init() {
    contactSection = document.getElementById("contact");
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    let positionFromTop = contactSection.getBoundingClientRect().top;

    if (positionFromTop - windowHeight <= 0) {
      contactSection.classList.add("body--section_contact");
      contactSection.classList.remove("body--section_contact_hidden");
    }
  }

  window.addEventListener("scroll", checkPosition);
  window.addEventListener("resize", init);

  init();
  checkPosition();
})();
