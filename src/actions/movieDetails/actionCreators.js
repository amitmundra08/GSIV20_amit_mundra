import {TypeKeys} from './actions';

export const navigateToMovieDetail = (movieDetail, navigation) => {
  return async dispatch => {
    dispatch(setMovieDetail(movieDetail));
    navigation.navigate('Details');
  };
};

export const setMovieDetail = movieDetail => ({
  type: TypeKeys.SET_MOVIE_DETAIL,
  movieDetail,
});
