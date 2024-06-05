//Handle Portfolio Items
let details = document.getElementsByClassName("portfolio-item");
let accBtn = document.getElementsByClassName("portfolio-item--accordion-button");

for (let i = 0; i < details.length; i++) {
  details[i].addEventListener("toggle", (event) => {
    console.log(accBtn[i]);
    if (details[i].open) {
      accBtn[i].classList.add("portfolio-item--accordion-button_active");
      details[i].ariaLabel = "Expanded";
      console.log("Change to X");
    }

    else {
      accBtn[i].classList.remove("portfolio-item--accordion-button_active");
      details[i].ariaLabel = "Collapsed";
      console.log("Change to +");
    }

  });
}


const toggleThemeButton = document.getElementById("toggle-theme");
const html = document.documentElement;
("toggle-theme");

if (window.matchMedia('(prefers-color-scheme:dark)')) {
  html.classList.add("dark");
  toggleThemeButton.innerHTML = `
  <span class="material-icons">light_mode</span>
  `;
}
else {
  html.classList.add("light");
  toggleThemeButton.innerHTML = `
  <span class="material-icons">dark_mode</span>
  `;
}

const toggleTheme = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
}

toggleThemeButton.addEventListener("click", (event) => {
  toggleTheme(html, 'light', 'dark');

  if (html.classList.contains("dark")) {
    toggleThemeButton.innerHTML = `
  <span class="material-icons">light_mode</span>
  `;
  }
  else {
    toggleThemeButton.innerHTML = `
  <span class="material-icons">dark_mode</span>
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