const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');

const app = express()
app.use(express.static(path.join(__dirname,'client/build')))

app.use(express.json({extended:true}))
//Регистрация роутов
app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/link', require('./routes/link.routes'))

app.use('/t',require('./routes/redirect.routes'))
 





  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname,"client/build/index.html"))
    })
  
  
  const PORT = process.env.PORT || 5000

async function start (){
 try {
     await mongoose.connect(config.get('mongoUri'),{ 
         useNewUrlParser: true,
         useUnifiedTopology:true,
         useCreateIndex:true
     })
     app.listen(PORT, ()=> console.log(`app has been started on ${PORT} \n vse ok`)); //передача порта и колбэк

 } catch (e) {
     console.log(`Server error--- ${e.message}`,'nihuya ne rabotaet');
     process.exit(1)
 }
}
start()
