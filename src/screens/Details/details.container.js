import Details from './details';
import {connect} from 'react-redux';
import get from 'lodash/get';
import {
  resetMovieCastCrewAndDuration,
  getMovieDetails,
} from '../../actions/movieDetails/actionCreators';

const mapStateToProps = state => ({
  movieDetail: get(state, 'movieDetails.movieDetail', {}),
  movieDetailLoadingStatus: get(state, 'movieDetails.movieDetailLoadingStatus'),
  movieData: get(state, 'movieDetails.movieData'),
});

const mapDispatchToProps = dispatch => ({
  resetMovieCastCrewAndDuration: () =>
    dispatch(resetMovieCastCrewAndDuration()),
  getMovieDetails: id => dispatch(getMovieDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
