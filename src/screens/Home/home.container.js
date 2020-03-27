import Home from './home';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {
  initializeApp,
  getMoreMovies,
  getMovies,
} from '../../actions/baseApp/actionCreators';
import {navigateToMovieDetail} from '../../actions/movieDetails/actionCreators';
const mapStateToProps = state => ({
  movieList: get(state, 'baseApp.movieList', []),
  movieLoadingStatus: get(state, 'baseApp.movieLoadingStatus'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initializeApp: () => dispatch(initializeApp()),
  getMoreMovies: () => dispatch(getMoreMovies()),
  getMovies: () => dispatch(getMovies()),
  navigateToMovieDetail: movieDetail =>
    dispatch(navigateToMovieDetail(movieDetail, ownProps.navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
