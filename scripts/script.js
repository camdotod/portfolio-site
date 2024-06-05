//Handle Portfolio Items
let details = document.getElementsByClassName("portfolio-item");
let accBtn = document.getElementsByClassName("portfolio-item--accordion-button");

for (let i = 0; i < details.length; i++) {
  details[i].addEventListener("toggle", (event) => {
    console.log(accBtn[i]);
    if (details[i].open){
      accBtn[i].classList.add("portfolio-item--accordion-button_active");
      details[i].ariaLabel= "Expanded";
      console.log("Change to X");
    }

    else{
      accBtn[i].classList.remove("portfolio-item--accordion-button_active");
      details[i].ariaLabel= "Collapsed";
      console.log("Change to +");
    }

  });
}

//Handle Tool Tips
const tooltips = document.querySelectorAll('.tool-tip');
const tooltipsText = document.querySelectorAll('.tool-tip-text')

for (let i = 0; i < tooltips.length; i++) {
  tooltips[i].addEventListener("mouseover", (event) => {
    console.log("Mouseover Detected");
    console.log(event.clientX + " " + event.clientY);
    var x = (event.clientX) + 'px',
      y = (event.clientY) + 'px';

    tooltipsText[i].style.top = y;
    tooltipsText[i].style.left = x;
  });
}
window.onmousemove = function (e) {
  for (var i = 0; i < tooltips.length; i++) {
  }
};

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