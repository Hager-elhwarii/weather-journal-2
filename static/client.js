import './styles.css'

const entryHolder = document.querySelector('#entryHolder')
const weatherForm = document.getElementById('weather-form')
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')
const loader = document.getElementById('loader')
const backBtn = document.getElementById('back_btn')
const error = document.getElementById('error')

// @ts-ignore
entryHolder.style.display = 'none'
// @ts-ignore
loader.style.display = 'none'

weatherForm.addEventListener('submit', (e) => {
  const body = { zip: zip.value, feelings: feelings.value }
  console.log({ body })
  e.preventDefault()
  // console.log('submitted')
  showLoader()
  fetch('http://localhost:4000/data', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      if (response.status === 'error') {
        showError()
        hideLoader()
      } else {
        fetch('http://localhost:4000/data')
          .then((response) => response.json())
          .then((response) => {
            hideLoader()
            getResults(response)
            updateUI()
          })
      }
    })
    .catch((error) => console.log(error))
})

function getResults(response) {
  document.querySelector('.result__zip').innerHTML = `Zip:${response.zip}`
  document.querySelector(
    '.result__feeling'
  ).innerHTML = `Feeling:${response.feelings}`

  document.querySelector('.result__temp').innerHTML = `Temperature:${Math.floor(
    response.temp
  )} C
  `
  document.querySelector('.result__date').innerHTML = `Today:${new Date(
    response.date
  ).toDateString()}`
  document.querySelector('.result__desc').innerHTML = response.description
  document.querySelector(
    '.result__location'
  ).innerHTML = `Location:${response.city},${response.country}`

  document
    .querySelector('.result__weather-state')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${response.icon}@2x.png`
    )
}

backBtn.addEventListener('click', () => {
  // @ts-ignore
  entryHolder.style.display = 'none'
  weatherForm.style.display = 'flex'
  backBtn.style.display = 'none'
  zip.value = ''
  feelings.value = ''
})

function updateUI() {
  // @ts-ignore
  entryHolder.style.display = 'block'
  weatherForm.style.display = 'none'
  backBtn.style.display = 'block'
}
function showLoader() {
  loader.style.display = 'block'
  weatherForm.style.display = 'none'
}
function hideLoader() {
  loader.style.display = 'none'
  weatherForm.style.display = 'flex'
}
function showError() {
  weatherForm.style.display = 'flex'
  error.style.display = 'block'
  setTimeout(() => {
    error.style.display = 'none'
  }, 2000)
}
