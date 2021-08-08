// -- MovieDB API section --
const movieForm = document.querySelector('#movieForm')
const movieOutput = document.querySelector('#movieOutput')
movieForm.addEventListener('submit', (event) => {
  event.preventDefault()
  movieOutput.innerHTML = ''
  const movieData = new FormData(movieForm)
  const movieName = movieData.get('movieName')
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=41d1b7ae08dbbe368bc25603c8e9b829&language=en-US&query=${movieName}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .then((response) => response.results.slice(0, 5))
    .then((results) => {
      console.log(results)
      results.forEach((a) => {
        const div = document.createElement('div')
        const poster = document.createElement('img')
        const title = document.createElement('a')
        title.innerText = a.title
        if (a.poster_path === null) {
          poster.src = 'media/question.png'
        } else {
          poster.src = `https://image.tmdb.org/t/p/w154/${a.poster_path}`
        }
        div.append(poster, title)
        movieOutput.append(div)
      })
    })
})

// -- Guardian API section --
const guardianForm = document.querySelector('#guardianForm')
const output = document.querySelector('#guardianOutput')
guardianForm.addEventListener('submit', (event) => {
  event.preventDefault()
  output.innerHTML = ''
  const guardianData = new FormData(guardianForm)
  const filmTitle = guardianData.get('guardianTitle')
  fetch(
    `https://content.guardianapis.com/search?section=film&q=${filmTitle}&api-key=499957d7-a42f-4251-8a85-d0635062790f`
  )
    .then((response) => response.json())
    .then((response) => response.response.results)
    .then((results) => {
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
})
