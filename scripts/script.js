//Handle Portfolio Items
const portfolioItem = document.getElementsByClassName("portfolio-item");
const details = document.getElementsByClassName("details");
const accBtn = document.getElementsByClassName("portfolio-item--accordion-button");

for (let i = 0; i < portfolioItem.length; i++) {
  portfolioItem[i].addEventListener("toggle", (event) => {
    console.log(accBtn[i]);
    if (portfolioItem[i].open) {
      accBtn[i].classList.add("portfolio-item--accordion-button_active");
      portfolioItem[i].ariaLabel = "Expanded";
      console.log("Change to X");
      toggleClass(details[i], 'portfolio-item--details', 'portfolio-item--details_collapsed');
    }

    else {
      toggleClass(details[i], 'portfolio-item--details', 'portfolio-item--details_collapsed');
      accBtn[i].classList.remove("portfolio-item--accordion-button_active");
      portfolioItem[i].ariaLabel = "Collapsed";
      console.log("Change to +");
      //portfolioItem[i].style.animationIterationCount= parseInt(portfolioItem[i].style.animationIterationCount) + 1;
      //console.log(portfolioItem[i].style.animationIterationCount);
    }

  });
}

// Handle Theme Button
const toggleThemeButton = document.getElementById("toggle-theme");
const html = document.documentElement;
("toggle-theme");

if (window.matchMedia('(prefers-color-scheme:dark)')) {
  html.classList.add("dark");
  toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">light_mode</span>
  `;
}
else {
  html.classList.add("light");
  toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">dark_mode</span>
  `;
}

const toggleClass = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
  console.log("Class is toggled");
}

toggleThemeButton.addEventListener("click", (event) => {
  toggleClass(html, 'light', 'dark');

  if (html.classList.contains("dark")) {
    toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">light_mode</span>
  `;
  }
  else {
    toggleThemeButton.innerHTML = `
  <span class="material-icons" aria-hidden="true">dark_mode</span>
  `;
  }
});

//Style Tag Colours
const tags = document.getElementsByClassName('portfolio-item--tag');

for (let i = 0; i < tags.length; i++) {
  console.log(tags[i])
  if (tags[i].innerHTML === "UX/UI Design") {
    tags[i].classList.add("green");
  }
  else if (tags[i].innerHTML === "Product Design") {
    console.log("Changing tag color to red");
    tags[i].classList.add("red");
  }
  else if (tags[i].innerHTML === "Design Research") {
    console.log("Changing tag color to blue");
    tags[i].classList.add("blue");
  }
}

//Contact Scroll Animation
(function () {
  let contactSection;
  let windowHeight;

  function init() {
    contactSection = document.getElementById('contact');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    console.log(contactSection);
    console.log(contactSection.getBoundingClientRect());

    let positionFromTop = contactSection.getBoundingClientRect().top;

    
    if (positionFromTop - windowHeight <= 0) {
      contactSection.classList.add('body--section_contact');
      contactSection.classList.remove('body--section_contact_hidden');
    }

  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();