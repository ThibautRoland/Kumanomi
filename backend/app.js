const express = require('express')
const app = express()
const port = 3000
const sessionsController = require('./controller/sessionsController');  


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use('/sessions', sessionsController);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})