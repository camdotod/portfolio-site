import { projects } from "./projects.js";
//Get container to insert elements into
const projectContainer = document.getElementsByClassName("portfolio-item");
console.log(projectContainer[0].id);
const pageName = projectContainer[0].id.replaceAll("-", " ");

const projectNames = projects.map((project) => project.name);
const projectIndex = projectNames.indexOf(pageName);
const projectTags = projects[projectIndex].tags.split(",");
//
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
function createProject() {
  console.log("Making the Project...");
  projectContainer[0].innerHTML += `
<div id="${projectContainer[0].id}" class="w-full flex flex-col gap-10">

   <!--Project Title & Info-->
   <div class="w-full h-fit gap-10 md:gap-20 md:flex-row flex flex-col-reverse">
      <div id="${projectContainer[0].id}_details" class="w-full md:w-1/6 flex flex-col justify-start items-start gap-6 md:gap-10">
         <div class="self-stretch flex-col md:flex-col justify-start items-start gap-4 md:gap-6 flex">
            <h1 id="${projectContainer.id}_title" class="text-5xl">${projects[projectIndex].name}<span
                  class="sr-only">.</span>
            </h1>
            <div id="${projectContainer[0].id}_tags" class="flex flex-col justify-start items-start gap-4">
               <span class="sr-only">Tags:</span>
               <p class="w-fit tag p-2 text-xl border border-solid">${projectTags[0]}</p>
               <span class="sr-only">,</span>
               <p class="w-fit text-xl tag p-2 border">${projectTags[1]}</p>
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
      <img id="${projectContainer[0].id}_hero" class="flex-1 min-w-0 self-stretch object-cover" src="${projects[projectIndex].heroimg}"
         alt="${projects[projectIndex].heroalt}">
   </div>

   <!--Summary-->
   <div id="${projectContainer[0].id}_summary" class="flex flex-col justify-start items-start gap-4">
      <h2 class="font-bold text-xl">Summary</h2>
      <p>${projects[projectIndex].summary}</p>
   </div>
   <hr id="process-anchor">
   
   <!--Content Block--------->
   <div id="process" class="flex flex-col relative">
   <div class="absolute -left-5 h-full">
   <a href="#process-anchor" class="sticky flex justify-center text-xl items-center top-10 w-10 h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black z-10">↑</a>
   </div>
   </div>
</div>
   `;
}

function createPanel(index) {
  const panelContainer = document.getElementById("process");
  console.log("Creating Panel");

  if (index === 4 && projects[projectIndex].panel5media === "video") {
    console.log("Creating Video");
    panelContainer.innerHTML += `
         <figure class="pl-5 md:pl-20 pb-20 border-l-2 flex-col justify-start items-start gap-6 inline-flex">
            <h2 class="text-xl md:text-2xl">${projects[projectIndex].panel5title}</h2>   
            <iframe class="aspect-video" width="100%" height="100%" src="${projects[projectIndex].panel5video}"
               title="YouTube video player" frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <figcaption class="portfolio-item--description_figure">
               <p class="opacity-70">${projects[projectIndex].panel5text}</p>
            </figcaption>
         </figure>
         `;
  } else {
    panelContainer.innerHTML += `
      <figure id="${projectContainer[0].id}_panel-${index}"
         class="pl-5 md:pl-20 pb-20 border-l-2 flex-col justify-start items-start gap-6 inline-flex">
         <h2 class="text-xl md:text-2xl">${projects[projectIndex].figtitle[index]}</h2>
         <img class="aspect-square md:aspect-video opacity-80 object-cover" src="${projects[projectIndex].figimg[index]}" alt="${projects[projectIndex].figalt[index]}">
         <figcaption class="">
            <details class="group flex flex-col gap-6">
               <summary class="flex flex-col gap-6 items-start">
                  <p class="">${projects[projectIndex].figtext[index]}</p>
                  <p class=" group-open:hidden group-hover:underline opacity-70 hover:underline cursor-pointer">Show More...</p>
                  <p class=" hidden group-open:block group-hover:underline opacity-70 hover:underline cursor-pointer">...Show Less</p>
               </summary>
               <h3 class="text-2xl pt-6 ">Iterations:</h3>
               <div class="flex gap-10">
                  <p class="">Details Details Details</p>
                  <p class="">Details Details Details</p>
                  <p class="">Details Details Details</p>
               </div>
            </details>
         </figcaption>
      </figure>`;
  }
}

if (projectIndex > -1) {
  createProject();
  createPanel(0);
  createPanel(1);
  createPanel(2);
  createPanel(3);
  createPanel(4);
}
//Style Tag Colours
const tags = document.getElementsByClassName("tag");

for (let i = 0; i < tags.length; i++) {
  if (tags[i].innerHTML === "UX/UI Design") {
    tags[i].classList.add("text-green");
    tags[i].classList.add("border-green");
  } else if (tags[i].innerHTML === "Product Design") {
    tags[i].classList.add("text-red");
    tags[i].classList.add("border-red");
  } else if (tags[i].innerHTML === "Design Research") {
    tags[i].classList.add("text-blue");
    tags[i].classList.add("border-blue");
  } else {
  }
}
