import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {deleteMovie } from '../store'

function MovieDetails ({movies, deleteMovie}){
  const navigate = useNavigate()
  const params = useParams()
  const movie = movies.filter( movie => movie.id === params.id*1 )

  return (
    <>
      <button onClick={()=>{
        deleteMovie(params.id)
        console.log('delete, than navigate')
        }} >REMOVE FROM LIST</button>
      <div>
        <h3>{ movie[0] ? movie[0].name : 'loading name'}</h3>  
        <h3>{ movie[0] ? movie[0].starRating : 'loading rating'}</h3>  
      </div>  
    </>
  )
}

export default connect(
  state => state,
  dispatch => {
    return {
      deleteMovie: ()=> {
        dispatch(deleteMovie())
      }
    }
  }
)(MovieDetails)