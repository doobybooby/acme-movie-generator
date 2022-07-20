const express = require('express');
const app = express();
const path = require('path');
const { send } = require('process');
const db = require('./db')
const { Movie } = db

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/movies', async(req,res,next)=>{
  try{
    res.send(await Movie.findAll({
      order:[
        ['starRating', 'DESC']
      ]
    }))
  }
  catch(er){
    next(er)
  }
})

app.post('/api/movies', async(req,res,next)=>{
  try{
    res.send(await Movie.create(req.body))
  }
  catch(er){
    next(er)
  }
})

app.put('/api/movies/:id/decrement', async(req,res,next)=> {
  try{
    const movie = await Movie.findByPk(req.params.id)
    await movie.decrement('starRating', {by: 1})
    res.status(204).send(movie)
  }
  catch(er){
    next(er)
  }
})

app.put('/api/movies/:id/increment', async(req,res,next)=> {
  try{
    const movie = await Movie.findByPk(req.params.id)
    await movie.increment('starRating', {by: 1})
    res.status(204).send(movie)
  }
  catch(er){
    next(er)
  }
})

app.delete('/api/movies/:id', async(req,res,next)=>{
  try{
    const movie = await Movie.findByPk(req.params.id)
    await movie.destroy()
    res.sendStatus(204).redirect('/')
  }
  catch(er){
    next(er)
  }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});



const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
