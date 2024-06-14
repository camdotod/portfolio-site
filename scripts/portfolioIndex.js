import {projects} from "./projects.js";

let dateSortBtn = document.getElementById("date-sort");
let nameSortBtn = document.getElementById("name-sort");
let tagsSortBtn = document.getElementById("tags-sort");
let projectList = document.getElementById("project-list");
let categoryNames = [];
let categoryList = document.getElementsByClassName("category-list");

const popCategories = (categoryArr) => {
   //Clear projectList
   projectList.innerHTML = ``;

   //Create categories and name headings after
   categoryArr.forEach((name, index) => {
      projectList.innerHTML += `
    <div class="flex flex-col gap-8">
       <h2 class="font-semibold">${name}</h2>
       <ul id="${name}-category-${index}" class="category-list list-none grid md:grid-cols-2 gap-5 md:gap-x-10 gap-y-5">
       </ul>
    </div>
       `;
   });
}

const addProject = (project, index) => {
   categoryList[index].innerHTML += `
      <li><a class="after:content-[''] hover:after:content-arrow hover:underline" href="./portfolio/${project.name.replaceAll(" ", "-")}.html">${project.name}</a></li>
   `;
}

const setSort = (sort) => {

   if (sort === "name-sort") {
      //Get project names through each project's name
      let projectNames = projects.map(project => project.name);
      console.log(projectNames);

      //Make category names
      categoryNames = projectNames.map(name => name.charAt(0));
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

      console.log("Sorted:");
      console.log(categoryNames);

      popCategories(categoryNames);

      for (let i = 0; i < categoryNames.length; i++) {
         projects.forEach((project) => {
            if (project.name.charAt(0) === categoryNames[i]) {
               addProject(project, i);
            }
         });
      };

   }

   else if (sort === "tags-sort") {
      categoryNames = ["UX/UI Design", "Design Research", "Industrial Design"];

      popCategories(categoryNames);

      for (let i = 0; i < categoryNames.length; i++) {
         projects.forEach((project) => {
            if (project.tags.indexOf(categoryNames[i]) > -1) {
               addProject(project, i);
            }
         });
      };

   }

   else {
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

      popCategories(categoryNames);

      for (let i = 0; i < categoryNames.length; i++) {
         projects.forEach((project) => {
            if (project.year === categoryNames[i]) {
               addProject(project, i);
            }
         });
      };

   }

};

setSort("tags-sort");

//Detect which button is pushed
dateSortBtn.addEventListener('click', (e) => setSort(e.target.id));
nameSortBtn.addEventListener('click', (e) => setSort(e.target.id));
tagsSortBtn.addEventListener('click', (e) => setSort(e.target.id));
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