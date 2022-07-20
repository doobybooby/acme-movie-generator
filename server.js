const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const { Movie } = db

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/movies', async(req,res,next)=>{
  try{
    res.send(await Movie.findAll())
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

app.delete('/api/movies/:id', async(req,res,next)=>{
  try{
    const movie = await Movie.findByPk(req.params.id)
    movie.destroy()
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
