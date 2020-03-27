import {TypeKeys} from './actions';
import axios from 'axios';
import get from 'lodash/get';
import {ApiRequestStatus, CrewRole} from '../../Models/model';

export const navigateToMovieDetail = (movieDetail, navigation) => {
  return async dispatch => {
    dispatch(setMovieDetailLoadingStatus(ApiRequestStatus.PENDING));
    dispatch(setMovieDetail(movieDetail));
    navigation.navigate('Details');
    dispatch(getMovieDetails(movieDetail.id));
  };
};

export const getMovieDetails = id => {
  return async dispatch => {
    dispatch(setMovieDetailLoadingStatus(ApiRequestStatus.PENDING));
    try {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4d10d9a80e5603250cb04d50ddb9608c`,
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4d10d9a80e5603250cb04d50ddb9608c`,
        ),
      ]);
      const runtime = get(secondResponse, 'data.runtime');
      const castObjectArray = get(firstResponse, 'data.cast');
      const crewObjectArray = get(firstResponse, 'data.crew');
      const cast = castObjectArray.map(singleData => singleData.name);
      const crew = crewObjectArray.find(singleData => {
        if (singleData.job === CrewRole.DIRECTOR) {
          return singleData;
        }
      });

      dispatch(setMovieCastCrewAndDuration({runtime, cast, crew}));
      dispatch(setMovieDetailLoadingStatus(ApiRequestStatus.SUCCESS));
    } catch (error) {
      dispatch(setMovieDetailLoadingStatus(ApiRequestStatus.FAILED));
    }
  };
};

export const setMovieCastCrewAndDuration = movieData => ({
  type: TypeKeys.SET_MOVIE_CAST_CREW_DURATION,
  movieData,
});

export const setMovieDetailLoadingStatus = movieDetailLoadingStatus => ({
  type: TypeKeys.SET_MOVIE_DETAIL_LOADING_STATUS,
  movieDetailLoadingStatus,
});

export const setMovieDetail = movieDetail => ({
  type: TypeKeys.SET_MOVIE_DETAIL,
  movieDetail,
});

export const resetMovieCastCrewAndDuration = () => ({
  type: TypeKeys.RESET_MOVIE_CAST_CREW_DURATION,
});
