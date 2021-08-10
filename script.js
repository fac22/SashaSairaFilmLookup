// -- MovieDB API section --
const movieForm = document.querySelector('#movieForm')
const movieOutput = document.querySelector('#movieOutput')

// -- First MovieDB Search
movieForm.addEventListener('submit', (event) => {
  event.preventDefault()
  movieOutput.innerHTML = ''
  const movieData = new FormData(movieForm)
  const movieName = movieData.get('movieName')
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=41d1b7ae08dbbe368bc25603c8e9b829&language=en-US&query=${movieName}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response) => response.results.slice(0, 6))
    .then((results) => {
      console.log(results)
      results.forEach((a) => {
        const div = document.createElement('div')
        const poster = document.createElement('img')
        const title = document.createElement('span')
        title.innerText = a.title
        if (a.poster_path === null) {
          poster.src = 'media/question.png'
          poster.alt = 'no poster found'
        } else {
          poster.src = `https://image.tmdb.org/t/p/w154/${a.poster_path}`
          poster.alt = `${a.title} movie poster`
        }
        div.append(poster, title)

        div.classList.add('movie')
        div.id = a.id
        div.addEventListener('click', () => filmSearch(div.id))
        movieOutput.append(div)
      })
    })
})

// Second MovieDB Search @Saira
const filmSearch = (id) => {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=41d1b7ae08dbbe368bc25603c8e9b829&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const filmTitle = data.title
      console.log(filmTitle)
    })
}

// -- Guardian API section -- (Note to self - work on this last, it's the weakest part)
const guardianForm = document.querySelector('#guardianForm')
const output = document.querySelector('#guardianOutput')
guardianForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const guardianData = new FormData(guardianForm)
  const filmTitle = guardianData.get('guardianTitle')
  guardianSearch(filmTitle)
  /*
   */
})
const guardianSearch = (title) => {
  output.innerHTML = ''
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
      output.append(articleResults)
    })
}
