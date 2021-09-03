require ('dotenv').config();
const express = require('express');
const app = express();
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const genresRoutes = require('./routes/genres')
const indexRoutes = require('./routes/index')

app.use(express.json())
app.set('view engine', 'pug')
app.set('views', './views')


startupDebugger('starting the app..')
dbDebugger('connecting to the database...')

app.use('/', indexRoutes)
app.use('/api/genres', genresRoutes)


const port = process.env.PORT || 3000 
app.listen(port, ()=> console.log(`listening on port ${port}`))