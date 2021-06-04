require('dotenv').config()
const express = require('express')
const cors = require('cors')

const fetch = require('isomorphic-fetch')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

let data = {}
const key = process.env.API_KEY

app.get('/data', (_, res) => {
  res.send(data)
})

app.post('/data', (req, res) => {
  let { zip, feelings } = req.body
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=${key}`

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      data = {
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
})

app.listen('4000', () => {
  console.log('server is running on port 4000')
})
