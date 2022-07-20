import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class MovieDetails extends Component{
  constructor(props) {
    super(props)
    this.deleteMovie = this.deleteMovie.bind(this)
  }
  
  async deleteMovie(){
    console.log(this.props)
    // await axios.delete(`/api/movies/${id}`)
  }
  
  render(){
    const { movies } = this.props
    const { deleteMovie } = this

    return (
      <>
        <button onClick={deleteMovie}>DELETE THIS MOVIE</button>
        
      </>
    )

  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      createMovie: ()=> {
        dispatch(deleteMovie())
      }
    }
  }
)(MovieDetails)