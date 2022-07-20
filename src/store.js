import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import { faker } from '@faker-js/faker'

const movieReducer = (state = [], action ) => {
  switch(action.type){
    case 'SET_MOVIES':
      return action.movies
    case 'ADD_MOVIE':
      return [...state, action.movie]
    default: return state
  }
}

const rootReducer = combineReducers({
  movies: movieReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export const fetchMovies = ()=> {
  return async(dispatch)=> {
    const movies = (await axios.get('/api/movies')).data
    dispatch({type: 'SET_MOVIES', movies})
  }
}

export const incrementRating = (id) => {
  return async(dispatch)=> {
    const movie = (await axios.put(`/api/movies/${id}`)).data
    dispatch({type: 'INCREMENT_RATING', movie})
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

export default store