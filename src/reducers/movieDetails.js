import {TypeKeys} from '../actions/movieDetails/actions';
import {ApiRequestStatus} from '../Models/model';

export class InitialState {
  movieDetail = {};
  movieData = {};
  movieDetailLoadingStatus = ApiRequestStatus.PENDING;
}

export default (state = new InitialState(), action) => {
  switch (action.type) {
    case TypeKeys.SET_MOVIE_DETAIL: {
      const {movieDetail} = action;
      return Object.assign({}, state, {movieDetail});
    }
    case TypeKeys.SET_MOVIE_DETAIL_LOADING_STATUS: {
      const {movieDetailLoadingStatus} = action;
      return Object.assign({}, state, {movieDetailLoadingStatus});
    }
    case TypeKeys.SET_MOVIE_CAST_CREW_DURATION: {
      const {movieData} = action;
      return Object.assign({}, state, {movieData});
    }
    case TypeKeys.RESET_MOVIE_CAST_CREW_DURATION: {
      return Object.assign({}, state, {movieData: {}});
    }
    default:
      return state;
  }
};
