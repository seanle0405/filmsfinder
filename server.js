const express = require('express')
const app = express()
const PORT = 3003

app.use(express.json())

app.get('/', (req, res) => {
  res.send('get / route')
})

app.listen(PORT, () => {
  console.log('now listening on backend port: 3003 ');
})
