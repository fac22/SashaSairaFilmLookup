// -- MovieDB API section --
// // -- First MovieDB Search


const APIKey = "095c02248bac24e95cec5fc2ad4d586d";
const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  output.innerHTML = "";
  const tmdbformData = new FormData(form);
  const filmName = tmdbformData.get("film");

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${filmName}&page=1`,
    { method: "GET" }
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => data.results)
    .then((results) => {
      const heading = document.createElement("h2");
      heading.textContent = filmName; //
      output.append(heading);
      const introtext = document.createElement("p");
      heading.textContent = "Please choose from the following films:";
      output.append(introtext);
      const listmain = document.createElement("ul");
      results.forEach((film) => {
        console.log(film);
        console.log(
          `oh, wowser! looks it's ${film.poster_path} for ${film.title}`
        );
        let listitem = document.createElement("li");
        listitem.textContent = film.title;

        let image = document.createElement("img");
        imagepath = film.poster_path;
        image.src = `https://www.themoviedb.org/t/p/w220_and_h330_face/${film.poster_path}`;
        image.alt = "image probs, could not retrieve image";
        output.append(listitem, image);
      });
    })
    .catch((error) => {
      console.error(error);
      if (error.message === "404") {
        output.textContent = `Could not find "${filmName}"`;
      } else {
        output.textContent = "Another kind of error.";
      }
    });
});

// Second MovieDB Search @Saira - I need to work on this more - SB
// const filmSearch = (id) => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=41d1b7ae08dbbe368bc25603c8e9b829&language=en-US`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       movieOutput.innerHTML = ''
//       console.log(data) // This is where all the info should go, below is just an example
//       const filmTitle = document.createElement('h2')
//       filmTitle.innerText = data.title
//       movieOutput.append(filmTitle)
//     })
// }

// -- Guardian API section -- (Note to self - work on this last, it's the weakest part)
const guardianForm = document.querySelector('#guardianForm')
const outputg = document.querySelector('#guardianOutput')
guardianForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const guardianData = new FormData(guardianForm)
  const filmTitle = guardianData.get('guardianTitle')
  guardianSearch(filmTitle)
  /*
   */
})
const guardianSearch = (title) => {
  outputg.innerHTML = ''
  console.log(title.replace(/[^a-z0-9 ,.?!]/gi, ''))
  fetch(
    `https://content.guardianapis.com/search?section=film&q=${title.replace(
      /[^a-z0-9 ,.?!]/gi,
      ''
    )}&tag=film/film,tone/reviews&show-fields=starRating,headline,thumbnail&order-by=oldest&api-key=499957d7-a42f-4251-8a85-d0635062790f`
  )
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.status)
        throw error
      } else {
        return response.json()
      }
    })
    .then((response) => response.response.results)
    .then((results) => {
      console.log(results)
      const articleResults = document.createElement('ul')
      results.forEach((a) => {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.href = a.webUrl
        link.target = '_blank'
        link.innerText = a.webTitle
        li.append(link)
        articleResults.append(li)
      })
      outputg.append(articleResults)
    })
}
