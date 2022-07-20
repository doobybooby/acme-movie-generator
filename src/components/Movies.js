import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMovie } from '../store'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom'

class Movies extends Component{
  constructor(props) {
    super(props)
    this.addMovie = this.addMovie.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  async addMovie(){
    // createMovie()
    const randomName = faker.commerce.productName()
    await axios.post('/api/movies', {
      name: randomName
    })
  }
  
  async deleteMovie(){
    const randomName = faker.commerce.productName()
    await axios.delete('/api/movies', {
      name: randomName
    })
  }

  async handleClick(){
    createMovie()
    console.log('create a mopvie')
  }

  render(){
    const { movies } = this.props
    const { addMovie, handleClick, deleteMovie } = this

    return (
      <>
        <button onClick={addMovie}>ADD A MOVIE TO THE LIST</button>
        <ul>
          {
            movies.map(movie => 
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
                <h5>{movie.starRating}</h5>
                <button >-</button>
                <button >+</button>
                <button onClick={deleteMovie}>X</button>
              </li>
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
      }
    }
  }
)(Movies)