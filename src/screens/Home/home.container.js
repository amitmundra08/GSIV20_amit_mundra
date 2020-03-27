import Home from './home';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {
  initializeApp,
  getMoreMovies,
  getMovies,
  searchMovieByName,
  setSearchTerm,
} from '../../actions/baseApp/actionCreators';
import {navigateToMovieDetail} from '../../actions/movieDetails/actionCreators';
const mapStateToProps = state => ({
  movieList: get(state, 'baseApp.movieList', []),
  movieLoadingStatus: get(state, 'baseApp.movieLoadingStatus'),
  searchTerm: get(state, 'baseApp.searchTerm'),
  atleastOnceSearched: get(state, 'baseApp.atleastOnceSearched'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initializeApp: () => dispatch(initializeApp()),
  getMoreMovies: () => dispatch(getMoreMovies()),
  getMovies: () => dispatch(getMovies()),
  navigateToMovieDetail: movieDetail =>
    dispatch(navigateToMovieDetail(movieDetail, ownProps.navigation)),
  searchMovieByName: () => dispatch(searchMovieByName()),
  setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm)),
  setAtleastOnceSearched: atleastOnceSearched =>
    dispatch(setAtleastOnceSearched(atleastOnceSearched)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
