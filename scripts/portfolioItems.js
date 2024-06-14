import {projects} from "./projects.js";
//Get container to insert elements into
const projectContainer = document.getElementById("portfolio-content");

//Create Project Elements
projects.forEach((project) => {
   const tags = project.tags.split(",");
   const id = project.name.toLowerCase().replaceAll(" ", "-");

   projectContainer.innerHTML += `

   <details id="${id}" class="portfolio-item">

   <!--Project Title & Info-->
   <summary id="${id}_summary" class="portfolio-item--header">
      <h3 id="${id}_title" class="portfolio-item--name">${project.name}<span class="sr-only">.</span>
      </h3>
      <p id="${id}_date" class="portfolio-item--date"><span class="sr-only">Date: </span>${project.date}<span class="sr-only">.</span>
      </p>
      <div id="${id}_tags" class="portfolio-item--taglist">
         <span class="sr-only">Tags:</span>
         <p class="portfolio-item--tag">${tags[0]}</p>
         <span class="sr-only">,</span>
         <p class="portfolio-item--tag">${tags[1]}</p>
      </div>
      <span id="${id}_toggle-button" class="material-icons md-36 portfolio-item--accordion-button"
         aria-hidden="true">expand_more</span>
   </summary>

   <!--Content Block--------->
   <div class="details portfolio-item--details_collapsed">

      <!--Hero Image-->
      <img id="${id}_hero" class="portfolio-item--image_hero" src="${project.heroimg}" alt="${project.heroalt}">

      <!--Objective & Summary-->

      <div id="${id}_introduction" class="portfolio-item--container_rows">
         <div id="${id}_objective" class="portfolio-item--description_objective">
            <h4 class="figure--heading heading3">Objective</h4>
            <p class="figure--text objective-desc">${project.objective}</p>
         </div>
         <div id="${id}_summary" class="portfolio-item--description_summary">
            <h4 class="figure--heading heading3">Summary</h4>
            <p class="figure--text objective-desc summary-desc">${project.summary}</p>
         </div>
      </div>

      <!--Panels-->

      <div class="portfolio-item--container_responsive-grid">
         <figure id="${id}_panel-1" class="portfolio-item--figure figure">
            <img class="figure--image" src="${project.panel1img}" alt="${project.panel1alt}">
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel1title}</h4>
               <p class="figure--text">${project.panel1text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-2" class="portfolio-item--figure figure">
            <img class="figure--image" src="${project.panel2img}" alt="${project.panel2alt}">
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel2title}</h4>
               <p class="figure--text">${project.panel2text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-3" class="portfolio-item--figure figure">
            <img class=" figure--image" src="${project.panel3img}" alt="${project.panel3alt}">
            <figcaption class="portfolio-item--description_figure">
               <h4 class=" figure--heading">${project.panel3title}</h4>
               <p class="figure--text">${project.panel3text}</p>
            </figcaption>
         </figure>
         <figure id="${id}_panel-4" class="portfolio-item--figure figure">
            <img class="figure--image" src="${project.panel4img}" alt="${project.panel4alt}">
            <figcaption class="portfolio-item--description_figure">
               <h4 class="figure--heading">${project.panel4title}</h4>
               <p class="figure--text">${project.panel4text}</p>
            </figcaption>
         </figure>
      </div>
      <figure id="${id}_panel-5" class="portfolio-item--figure figure">
      </figure>
   </div>
</details>
   `;

   const panel5 = document.getElementById(`${id}_panel-5`);

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
   }
   else {
      panel5.innerHTML += `
         <img class="portfolio-item--description_figure" src="${project.panel5img}" alt="${project.panel5alt}">
         <figcaption class="portfolio-item--description_figure">
            <h4 class="figure--heading">${project.panel5title}</h4>
            <p class="figure--text">${project.panel5text}</p>
         </figcaption>
            `;
   }
});