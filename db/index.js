const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/acme_movie_generator')

const Movie = db.define('movie', {
  name: {
    type:Sequelize.STRING,
    allowNull:false,
    unique: true,
  },
  starRating: {
    type:Sequelize.INTEGER,
    defaultValue: 3
  }
})

const seed = async()=> {
  try{
    await db.sync({force:true})
    const movies = await Promise.all([
      Movie.create({name:'DISPICABLE ME'}),
      Movie.create({name:'MISSION IMPOSSIBLE'}),
    ])
  }
  catch(er){
    console.log(er)
  }
}
seed()
module.exports = {
  db,
  Movie
}