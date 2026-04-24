//Project "Database"
import { projects } from "./projects.js";

//Testing
//Get container to insert elements into
const projectContainer = document.getElementsByClassName("portfolio-item");
//console.log(projectContainer[0].id);
const pageName = projectContainer[0].id.replaceAll("_", " ");

const projectNames = projects.map((project) => project.name);
const projectIndex = projectNames.indexOf(pageName);
const projectTags = projects[projectIndex].tags.split(",");

/*const portfolioItem = document.getElementsByClassName("portfolio-item");
const details = document.getElementsByClassName("details");
const accBtn = document.getElementsByClassName("portfolio-item--accordion-button");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modal-button");

for (let i = 0; i < portfolioItem.length; i++) {
   portfolioItem[i].addEventListener("toggle", (event) => {
      if (portfolioItem[i].open) {
         accBtn[i].classList.add("portfolio-item--accordion-button_active");
         portfolioItem[i].ariaLabel = "Expanded";
         toggleClass(details[i], 'portfolio-item--details', 'portfolio-item--details_collapsed');
      }

      else {
         toggleClass(details[i], 'portfolio-item--details', 'portfolio-item--details_collapsed');
         accBtn[i].classList.remove("portfolio-item--accordion-button_active");
         portfolioItem[i].ariaLabel = "Collapsed";
      }

   });
}*/

/**
 * Create main layout and container for the page
 * @returns HTML Elements
 */
function createProject() {
  //console.log("Making the Project...");
  projectContainer[0].innerHTML += `
<div id="${projectContainer[0].id}" class="w-full flex flex-col gap-10">

   <!--Project Title & Info-->
   <div class="w-full h-fit gap-10 md:gap-20 md:flex-row flex flex-col-reverse">
      <div id="${projectContainer[0].id}_details"
         class="w-full md:w-1/6 flex flex-col justify-start items-start gap-6 md:gap-10">
         <div class="self-stretch flex-col md:flex-col justify-start items-start gap-4 md:gap-6 flex">
            <h1 id="${projectContainer.id}_title" class="text-5xl">${projects[projectIndex].name}<span
                  class="sr-only">.</span>
            </h1>
            <div id="${projectContainer[0].id}_tags" class="flex flex-col justify-start items-start gap-4">
               <span class="sr-only">Tags:</span>
               <p class="w-fit tag p-2 text-xl border border-solid">${projectTags[0]}</p>
               <span class="sr-only">,</span>
               ${projectTags[1] ? `<p class="w-fit text-xl tag p-2 border">${projectTags[1]}</p>` : ""}
            </div>
            <p id="${projectContainer[0].id}_date" class="opacity-70"><span class="sr-only">Date:
               </span>${projects[projectIndex].date}<span class="sr-only">.</span>
            </p>
         </div>
         <div id="${projectContainer[0].id}_objective" class="flex flex-col justify-start items-start gap-4">
            <h2 class="font-bold text-xl">Objective</h2>
            <p class="">${projects[projectIndex].objective}</p>
         </div>
         <div class="flex flex-col justify-start items-start gap-4">
            <h2 class="font-bold text-xl">Tools</h2>
            <p class="">${projects[projectIndex].tools}</p>
         </div>
      </div>
      <!--Hero Image-->
      <img id="${projectContainer[0].id}_hero" class="flex-1 min-w-0 self-stretch object-cover"
         src="${projects[projectIndex].heroimg}" alt="${projects[projectIndex].heroalt}">
   </div>

      <!--Panels-->

      <div class="portfolio-item--container_responsive-grid">
         <figure id="${id}_panel-1" class="portfolio-item--figure figure">
            <a href="${project.panel1img}" target="_blank" title="Open Image in New Tab"><img class="figure--image" src="${project.panel1img}" alt="${project.panel1alt}"></a>
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel1title}</h4>
               <p class="figure--text">${project.panel1text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-2" class="portfolio-item--figure figure">
            <a href="${project.panel1img}" target="_blank" title="Open Image in New Tab"><img class="figure--image" src="${project.panel2img}" alt="${project.panel2alt}"></a>
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel2title}</h4>
               <p class="figure--text">${project.panel2text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-3" class="portfolio-item--figure figure">
           <a href="${project.panel1img}" target="_blank" title="Open Image in New Tab"><img class=" figure--image" src="${project.panel3img}" alt="${project.panel3alt}"></a>
            <figcaption class="portfolio-item--description_figure">
               <h4 class=" figure--heading">${project.panel3title}</h4>
               <p class="figure--text">${project.panel3text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-4" class="portfolio-item--figure figure">
            <a href="${project.panel1img}" target="_blank" title="Open Image in New Tab"><img class="figure--image" src="${project.panel4img}" alt="${project.panel4alt}"></a>
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel4title}</h4>
               <p class="figure--text">${project.panel4text}</p>
            </figcaption>
         </figure>
      </div>
   </div>
</div>
   `;
}

/**<!--Next/Previous Page------>
   <div class="flex justify-between">
      <a href="" class="underline" tabindex="0" ><< Previous Project</a>
      <a href="" class="underline" tabindex="0">Next Project >></a>
   </div> */

function createPanel(index) {
  const panelContainer = document.getElementById("process");
  //console.log("Creating Panel");

   if (project.panel5media === "video") {
      panel5.innerHTML += `
      <iframe class="figure--video" width="100%" height="100%" src="${project.panel5video}" title="YouTube video player"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <figcaption class="portfolio-item--description_figure">
         <h4 class="figure--heading">${project.panel5title}</h4>
         <p class="figure--text">${project.panel5text}</p>
      </figcaption>
      `;
   } else {
      panel5.innerHTML += `
         <a href="${project.panel1img}" target="_blank" title="Open Image in New Tab"><img class="portfolio-item--description_figure" src="${project.panel5img}" alt="${project.panel5alt}"></a>
         <figcaption class="portfolio-item--description_figure">
            <h4 class="figure--heading">${project.panel5title}</h4>
            <p class="figure--text">${project.panel5text}</p>
         </figcaption>
            `;
   }
});

//Style Tag Colours
const tags = document.getElementsByClassName("portfolio-item--tag");

for (let i = 0; i < tags.length; i++) {
   if (tags[i].innerHTML === "UX/UI Design") {
      tags[i].classList.add("green");
   } else if (tags[i].innerHTML === "Product Design") {
      tags[i].classList.add("red");
   } else if (tags[i].innerHTML === "Design Research") {
      tags[i].classList.add("blue");
   }
}

//Handle Portfolio Items
const portfolioItem = document.getElementsByClassName("portfolio-item");
const details = document.getElementsByClassName("details");
const accBtn = document.getElementsByClassName(
   "portfolio-item--accordion-button"
);

for (let i = 0; i < portfolioItem.length; i++) {
   portfolioItem[i].addEventListener("toggle", (event) => {
      if (portfolioItem[i].open) {
         accBtn[i].classList.add("portfolio-item--accordion-button_active");
         portfolioItem[i].ariaLabel = "Expanded";
         toggleClass(
            details[i],
            "portfolio-item--details",
            "portfolio-item--details_collapsed"
         );
      } else {
         toggleClass(
            details[i],
            "portfolio-item--details",
            "portfolio-item--details_collapsed"
         );
         accBtn[i].classList.remove("portfolio-item--accordion-button_active");
         portfolioItem[i].ariaLabel = "Collapsed";
      }
   });
}
