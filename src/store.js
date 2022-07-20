import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import { faker } from '@faker-js/faker'
import logger from "redux-logger";

const movieReducer = (state = [], action ) => {
  switch(action.type){
    case 'SET_MOVIES':
      return action.movies
    case 'ADD_MOVIE':
      return [...state, action.movie]
    case 'DELETE_MOVIE':
      return state.filter(movie => movie.id !== action.id)
    case 'ADD_RATING':
      return state.map(movie => {
        if(movie.id === action.id){
          movie.starRating += 1
        }
        return movie
      })
    case 'SUBTRACT_RATING':
      return state.map(movie => {
        if(movie.id === action.id){
          movie.starRating -= 1
        }
        return movie
      })
    default: return state
  }
}

const rootReducer = combineReducers({
  movies: movieReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export const fetchMovies = ()=> {
  return async(dispatch)=> {
    const movies = (await axios.get('/api/movies')).data
    dispatch({type: 'SET_MOVIES', movies})
  }
}

export const createMovie = () => {
  return async(dispatch)=> {
    const randomName = faker.commerce.productName()
    const movie = await axios.post('/api/movies', {
      name: randomName
    })
    dispatch({type: 'ADD_MOVIE', movie})
  }
}

export const deleteMovie = (id) => {
  return async(dispatch)=> {
    await axios.delete(`/api/movies/${id}`)
    dispatch({type: 'DELETE_MOVIE', id})
  }
}

export const incrementRating = (id) => {
  return async(dispatch) => {
    await axios.put(`/api/movies/${id}/increment`)
    dispatch({type:'ADD_RATING', id})
  }
}

export const decrementRating = (id) => {
  return async(dispatch) => {
    await axios.put(`/api/movies/${id}/decrement`)
    dispatch({type:'SUBTRACT_RATING', id})
  }
}
export default store