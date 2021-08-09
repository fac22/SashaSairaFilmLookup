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
