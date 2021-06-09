require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('isomorphic-fetch')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('dist'))

let projectData = {}
const key = process.env.API_KEY

app.post('/data', postData)

function postData(req, res) {
  let { zip, feelings } = req.body
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=${key}`

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      projectData = {
        zip,
        feelings,
        temp: response.main.temp,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        city: response.name,
        country: response.sys.country,
        date: Date.now(),
      }
      res.send({ status: 'success' })
    })
    .catch(() => res.send({ status: 'error' }))
}

app.get('/', (_, res) => {
  res.sendFile(path.resolve('./dist/index.html'))
})

app.get('/data', getData)

function getData(req, res) {
  res.send(projectData)

}


app.listen('4000', () => {
  console.log('server is running on port 4000')
})
