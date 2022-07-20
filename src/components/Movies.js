import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMovie, decrementRating, deleteMovie, incrementRating } from '../store'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Movies extends Component{
  constructor(props) {
    super(props)
  }
  
  componentDidUpdate(prevProps){
    console.log(' can we perform compoentdidupdate here? ', prevProps.movies, this.props.movies.sort((a,b)=> b.starRating-a.starRating))
  }

  render(){
    const { movies, createMovie, deleteMovie, incrementRating, decrementRating } = this.props

    return (
      <>
        <button onClick={createMovie}>ADD A MOVIE TO THE LIST</button>
        <ul>
          {
            movies.map(movie => 
              movie?
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
                <h5>RATING:{movie.starRating}</h5>
                <button onClick={async()=>{
                  incrementRating(movie.id)
                  // await axios.put(`/api/movies/${movie.id}`)
                }}>+</button>
                <button onClick={()=> {
                  decrementRating(movie.id)
                }}>-</button>
                <button onClick={()=>{
                    deleteMovie(movie.id)
                  }}>x</button>
              </li>:
              <h1>loading</h1>
            )
          }
        </ul>
      </>
    )

  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      createMovie: ()=> {
        dispatch(createMovie())
      },
      deleteMovie: (id)=> {
        dispatch(deleteMovie(id))
      },
      incrementRating: (id)=> {
        dispatch(incrementRating(id))
      },
      decrementRating: (id) => {
        dispatch(decrementRating(id))
      }
    }
  }
)(Movies)