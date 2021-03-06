import {TypeKeys} from '../actions/baseApp/actions';
import {ApiRequestStatus} from '../Models/model';

export class InitialState {
  movieLoadingStatus = ApiRequestStatus.PENDING;
  movieList = [];
  pageNo = 1;
  totalPageNo = 10;
  searchTerm = '';
  atleastOnceSearched = false;
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
    case TypeKeys.SET_SEARCH_TERM: {
      const {searchTerm} = action;
      return Object.assign({}, state, {searchTerm});
    }
    case TypeKeys.SET_ATLEAST_ONCE_SEARCHED: {
      const {atleastOnceSearched} = action;
      return Object.assign({}, state, {atleastOnceSearched});
    }
    default:
      return state;
  }
};
