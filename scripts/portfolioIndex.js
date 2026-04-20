import { projects } from "./projects.js";

// Get page URL
// const baseUrl = new URL(window.location.href);
// console.log(baseUrl);

// const basePathname = baseUrl.pathname;
// console.log(basePathname);

// let state = { modal: false };

// history.replaceState(state, "", baseUrl);

const dateSortBtn = document.getElementById("date-sort");
const nameSortBtn = document.getElementById("name-sort");
const tagsSortBtn = document.getElementById("tags-sort");
const radiogroup = document.querySelectorAll('[name="sort"]');
const dateSortLabel = document.getElementById("date-sort-label");
const nameSortLabel = document.getElementById("name-sort-label");
const tagsSortLabel = document.getElementById("tags-sort-label");
let projectList = document.getElementById("project-list");

const modal = document.querySelector("#project-modal-overlay");

const projectTitle = document.getElementById("project-title");
const projectYr = document.getElementById("project-yr");
const projectTags = document.getElementById("project-tags");
const projectDesc = document.getElementById("project-desc");
const projectImage1 = document.getElementById("project-img-1");
const modalCarousel = document.getElementById("project-carousel");
const caseStudyLink = document.getElementById("case-study-link");

const modalCloseButton = document.querySelector("#close-button");

let categoryNames = [];

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
 * Populate Categories based on Sort
 * @param {Array} categoryArr - List of categories
 * @returns HTML Elements
 */
const popCategory = (sort) => {
  //Clear projectList
  let sortName = sort.split("_").shift();

  projectList.innerHTML = `
    <div class="sr-only" aria-role="region" aria-live="polite">Projects sorted by ${sortName}.</div>
    `;
};

const addProject = (project, index) => {
  projectList.innerHTML += `
    <li id="portfolio-item-${index}" class="group flex flex-col divide-y divide-fg-color/50 border hover:bg-fg-color/5 active:bg-fg-color/5 hover:border-double hover:border-4 active:border-double active:border-3" tabindex="0" data-name="${project.name}">
        <div
          id="project-details-${index}"
          class="flex items-baseline gap-3 divide-x divide-fg-color/20 px-3"
        >
          <p class="grow py-2 text-sm">${project.tags}</p>
          <p class="text-sm">${project.year}</p>
        </div>
        <div id="project-title${index}" class="flex items-center px-3 py-3 text-2xl">
          <h2 class="grow font-display group-hover:font-medium group-active:font-medium">${project.name}</h2>
          <span class="material-symbols-outlined">expand_content</span>
        </div>
        <div id="project-preview${index}" class="group-hover:opacity-80 group-active:opacity-80 flex flex-1 self-stretch">
          <img
            src="${project.heroimg}"
            alt="${project.heroalt}"
            class="object-cover"
          />
        </div>
    </li>
   `;
};

/**
 * Sort the projects in the index
 * @param {string} sort - ID of input element being pressed
 */
const setSort = (sort) => {
  console.log("Sorting...");

  popCategory(sort);

  if (sort === "name-sort") {
    //Get project names through each project's name
    let projectNames = projects.map((project) => project.name);

    //Make category names
    categoryNames = projectNames.map((name) => name);

    //Sort alphabetically
    categoryNames.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    //Add Projects
    for (let i = 0; i < categoryNames.length; i++) {
      projects.forEach((project) => {
        if (project.name === categoryNames[i]) {
          addProject(project, i);
        }
      });
    }
  } else if (sort === "tags-sort") {
    categoryNames = [
      "UX/UI Design",
      "Design Research",
      "Industrial Design",
      "Design Anthropology",
    ];

    for (let i = 0; i < categoryNames.length; i++) {
      projects.forEach((project) => {
        if (project.tags.indexOf(categoryNames[i]) > -1) {
          addProject(project, i);
        }
      });
    }
  } else {
    categoryNames = projects.map((project) => project.year);

    categoryNames.sort(function (a, b) {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });
    //Remove repeated letters
    categoryNames = [...new Set(categoryNames)];

    for (let i = 0; i < categoryNames.length; i++) {
      projects.forEach((project) => {
        if (project.year === categoryNames[i]) {
          addProject(project, i);
        }
      });
    }
  }
};

const handleKeyDown = (key, sort) => {
  if (key === "Space" || key === "Enter") {
    let buttonName = sort.replace("-label", "");
    setSort(buttonName);
    // Set radio buttons
    radiogroup.forEach((input) => {
      input.id === buttonName
        ? (input.checked = true)
        : (input.checked = false);
    });
  }
};

setSort("date-sort");
dateSortBtn.setAttribute("checked", true);
watchTiles();

//Detect which button is pushed
tagsSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by tag");
});
tagsSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
nameSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by name");
});
nameSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
dateSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by date");
});
dateSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);

// Modal
const observer = new MutationObserver(() => {
  console.log("A mutation has been observed..");
  watchTiles();
});

observer.observe(projectList, { subtree: true, childList: true });

modalCloseButton.addEventListener("click", (event) => {
  console.log("Closing modal...");

  // Reset interactions
  modalCarousel.scrollTo(0, 0);

  // Reset the radio button
  document.querySelector("#caption-1 > label > input").checked = true;

  //Reset URL

  // state.modal = false;
  // history.replaceState(state, "", baseUrl);

  // Close modal
  toggleClass(modal, "hidden", "flex");
});

function watchTiles() {
  const projectTiles = document.querySelectorAll("li");

  projectTiles.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      let projectName = tile.getAttribute("data-name");
      console.log("Clicked " + projectName);

      toggleClass(modal, "hidden", "flex");

      // state.modal = true;
      // let newUrl = baseUrl + "/" + projectName.replace(" ", "_");
      // history.pushState(state, "", newUrl);
      let clickedProject = projects.filter((prj) => {
        return prj.name === projectName;
      });

      if (projectName == "LiUNA Dues Dashboard") {
        caseStudyLink.classList.remove("hidden");
        caseStudyLink.classList.add("flex");
      } else {
        caseStudyLink.classList.remove("flex");
        caseStudyLink.classList.add("hidden");
      }

      projectTitle.innerText = projectName;
      projectYr.innerText = clickedProject[0].year;
      projectTags.innerText = clickedProject[0].tags;
      projectDesc.innerText = clickedProject[0].summary;

      projectImage1.setAttribute("src", clickedProject[0].heroimg);
      projectImage1.setAttribute("alt", clickedProject[0].heroalt);
    });
  });
}
// window.addEventListener("popstate", (event) => {
//   console.log("popstate triggered");
//   if (event.state) {
//     console.log(event.state);
//     if (event.state.modal == false) {
//       toggleClass(modal, "hidden", "flex");
//     }
//   } else {
//     console.log("skipped");
//   }
// });
