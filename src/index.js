import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux'
import store, { fetchMovies } from './store';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import Movies from './components/Movies'
import MovieDetails from './components/MovieDetails';

const App = connect(
  state => state,
  dispatch => {
    return {
      loadData: ()=> {
        dispatch(fetchMovies())
      }
    }
  }
)(class App extends Component {
  componentDidMount(){
    this.props.loadData()
  }
  componentDidUpdate(){
    this.props.loadData()

  }
  render(){
    const {movies} = this.props
    return(
      <>
        <h1>MOVIES({movies.length})</h1>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route  path='/movies' element={<Movies />} />
          <Route  path='/movies/:id' element={<MovieDetails/>} />
        </Routes>
      </>
    )
  }
}
)

const root = createRoot(document.querySelector('#root'));
root.render(
  <HashRouter>
    <Provider store={store}> 
      <App />
    </Provider>
  </HashRouter>
);
