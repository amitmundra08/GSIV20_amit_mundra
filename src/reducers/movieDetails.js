import {TypeKeys} from '../actions/movieDetails/actions';

export class InitialState {
  movieDetail = {};
}

export default (state = new InitialState(), action) => {
  switch (action.type) {
    case TypeKeys.SET_MOVIE_DETAIL: {
      const {movieDetail} = action;
      return Object.assign({}, state, {movieDetail});
    }
    default:
      return state;
  }
};
