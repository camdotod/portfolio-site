import { projects } from "./projects.js";

let dateSortBtn = document.getElementById("date-sort");
let nameSortBtn = document.getElementById("name-sort");
let tagsSortBtn = document.getElementById("tags-sort");
const radiogroup = document.querySelectorAll('[name="sort"]');
let dateSortLabel = document.getElementById("date-sort-label");
let nameSortLabel = document.getElementById("name-sort-label");
let tagsSortLabel = document.getElementById("tags-sort-label");
let projectList = document.getElementById("project-list");
let categoryNames = [];
let categoryList = document.getElementsByClassName("category-list");

/**
 * Populate Categories based on Sort
 * @param {Array} categoryArr - List of categories
 * @returns HTML Elements
 */
const popCategories = (categoryArr, sort) => {
  //Clear projectList
  let sortName = sort.split("-").shift();

  projectList.innerHTML = `<div class="sr-only" aria-role="region" aria-live="polite">Projects sorted by ${sortName}.</div>`;

  //Create categories and name headings after
  categoryArr.forEach((name, index) => {
    projectList.innerHTML += `
    <div class="flex flex-col gap-5 w-full">
       <h2 class="text-xl font-semibold">${name}</h2>
       <ul id="${name}-category-${index}"w-full class="category-list list-none grid w-full md:grid-cols-2 gap-4 md:gap-x-20 md:gap-y-5">
       </ul>
    </div>
       `;
  });
};

const addProject = (project, index) => {
  categoryList[index].innerHTML += `
      <li><a class="after:content-[''] hover:after:content-arrow hover:underline after:absolute after:pl-1 after:transition-transform hover:after:translate-x-2" href="./portfolio/${project.name.replaceAll(" ", "-")}.html" tabindex="0">${project.name}</a></li>
   `;
};

/**
 * Sort the projects in the index
 * @param {string} sort - ID of input element being pressed
 */
const setSort = (sort) => {
  if (sort === "name-sort") {
    //Get project names through each project's name
    let projectNames = projects.map((project) => project.name);
    console.log(projectNames);

    //Make category names
    categoryNames = projectNames.map((name) => name.charAt(0));
    console.log(categoryNames);

    //Remove repeated letters
    categoryNames = [...new Set(categoryNames)];

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

    popCategories(categoryNames, sort);

    for (let i = 0; i < categoryNames.length; i++) {
      projects.forEach((project) => {
        if (project.name.charAt(0) === categoryNames[i]) {
          addProject(project, i);
        }
      });
    }
  } else if (sort === "tags-sort") {
    categoryNames = ["UX/UI Design", "Design Research", "Industrial Design"];

    popCategories(categoryNames, sort);

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

    popCategories(categoryNames, sort);

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

setSort("tags-sort");
tagsSortBtn.setAttribute("checked", true);

//Detect which button is pushed
tagsSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log(tagsSortBtn.checked);
  console.log(nameSortBtn.checked);
  console.log(dateSortBtn.checked);
});
tagsSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
nameSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log(tagsSortBtn.checked);
  console.log(nameSortBtn.checked);
  console.log(dateSortBtn.checked);
});
nameSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
dateSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log(tagsSortBtn.checked);
  console.log(nameSortBtn.checked);
  console.log(dateSortBtn.checked);
});
dateSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);

//Create category containers

//Fill category containers with projects

/*projectList.innerHTML = `
   <div id="sortName-category-0"class="flex flex-col gap-8">
      <h2 class="font-semibold"></h2>
   </div>
   `;

<div class="grid md:grid-cols-2 gap-5 md:gap-x-10 gap-y-5">
   <a href="">${projects[0].name}</a>
</div>*/
