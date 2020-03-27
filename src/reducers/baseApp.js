import {TypeKeys} from '../actions/baseApp/actions';

export class InitialState {
  movieLoadingStatus = 'SUCCESS';
  movieList = [];
  pageNo = 1;
  totalPageNo = 10;
}

export default (state = new InitialState(), action) => {
  switch (action.type) {
    case TypeKeys.SET_MOVIES_LOADING_STATUS: {
      const {movieLoadingStatus} = action;
      return Object.assign({}, state, {movieLoadingStatus});
    }
    case TypeKeys.SET_MOVIES: {
      const {movieList} = action;
      return Object.assign({}, state, {movieList});
    }
    case TypeKeys.SET_PAGE_NO: {
      const {pageNo} = action;
      return Object.assign({}, state, {pageNo});
    }
    case TypeKeys.SET_TOTAL_PAGE_NO: {
      const {totalPageNo} = action;
      return Object.assign({}, state, {totalPageNo});
    }
    default:
      return state;
  }
};
