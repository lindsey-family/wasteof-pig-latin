const express = require('express')
const app = express()
const path = require('path')
var piglatin = require('piglatin');
const WasteOfSession = require("wasteof-client")
const password = process.env['password']
const port = 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
})

app.post('/api/pig-latin', async (req, res) => {
  const content = req.body.content
  const piglatincontent = piglatin(content)
  let wasteof = new WasteOfSession("pig", password)
  wasteof.login()
  .then(async function() {
    try {
      const d = await wasteof.post(piglatincontent, null)
      res.send({'piggified': piglatincontent, 'msg': 'ok', 'data': d})
    } catch (error) {
      res.send({'msg': 'bad'})
    }
  })
})

app.listen(port, () => {
  console.log(`listening`)
})
