import {TypeKeys} from './actions';
import axios from 'axios';
import {ApiRequestStatus} from '../../Models/model';

export const initializeApp = () => {
  return async dispatch => {
    dispatch(getMovies());
  };
};

export const getMoreMovies = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const oldMovieList = state.baseApp.movieList;
    const pageNo = state.baseApp.pageNo;
    const totalPageNo = state.baseApp.totalPageNo;
    const searchTerm = state.baseApp.searchTerm;
    const atleastOnceSearched = state.baseApp.atleastOnceSearched;
    const url =
      !!searchTerm && atleastOnceSearched
        ? `https://api.themoviedb.org/3/search/movie?api_key=4d10d9a80e5603250cb04d50ddb9608c&query=${searchTerm}`
        : `https://api.themoviedb.org/3/discover/movie?latest&page=${pageNo}&api_key=4d10d9a80e5603250cb04d50ddb9608c`;
    if (pageNo <= totalPageNo) {
      try {
        axios
          .get(url)
          .then(response => {
            const totalPageNumber = response.data.total_pages || 10;
            const movieList = response.data.results;
            const allMovies = [...oldMovieList, ...movieList];
            dispatch(setTotalPageNumber(totalPageNumber));
            dispatch(setMovies(allMovies));
            dispatch(setPageNumber(pageNo + 1));
          })
          .catch(err => {});
      } catch (err) {}
    }
  };
};

export const searchMovieByName = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const searchTerm = state.baseApp.searchTerm;
    dispatch(setAtleastOnceSearched(true));
    dispatch(setMovieLoadingStatus(ApiRequestStatus.PENDING));
    dispatch(setPageNumber(1));
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=4d10d9a80e5603250cb04d50ddb9608c&query=${searchTerm}`,
        )
        .then(response => {
          const movieList = response.data.results;
          dispatch(setMovies(movieList));
          dispatch(setMovieLoadingStatus(ApiRequestStatus.SUCCESS));
        })
        .catch(err => {
          dispatch(setMovieLoadingStatus(ApiRequestStatus.FAILED));
        });
    } catch (error) {
      dispatch(setMovieLoadingStatus(ApiRequestStatus.FAILED));
    }
  };
};

export const getMovies = () => {
  return async dispatch => {
    const pageNo = 1;
    dispatch(setMovieLoadingStatus(ApiRequestStatus.PENDING));
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?latest&page=${pageNo}&api_key=4d10d9a80e5603250cb04d50ddb9608c`,
        )
        .then(response => {
          const totalPageNumber = response.data.total_pages || 10;
          const movieList = response.data.results;
          dispatch(setMovies(movieList));
          dispatch(setMovieLoadingStatus(ApiRequestStatus.SUCCESS));
          dispatch(setTotalPageNumber(totalPageNumber));
          dispatch(setPageNumber(pageNo + 1));
        })
        .catch(err => {
          dispatch(setMovieLoadingStatus(ApiRequestStatus.FAILED));
        });
    } catch (err) {
      dispatch(setMovieLoadingStatus(ApiRequestStatus.FAILED));
    }
  };
};

export const setSearchTerm = searchTerm => ({
  type: TypeKeys.SET_SEARCH_TERM,
  searchTerm,
});

export const setAtleastOnceSearched = atleastOnceSearched => ({
  type: TypeKeys.SET_ATLEAST_ONCE_SEARCHED,
  atleastOnceSearched,
});

export const setMovieLoadingStatus = movieLoadingStatus => ({
  type: TypeKeys.SET_MOVIES_LOADING_STATUS,
  movieLoadingStatus,
});

export const setMovies = movieList => ({
  type: TypeKeys.SET_MOVIES,
  movieList,
});

export const setPageNumber = pageNo => ({
  type: TypeKeys.SET_PAGE_NO,
  pageNo,
});

export const setTotalPageNumber = totalPageNo => ({
  type: TypeKeys.SET_TOTAL_PAGE_NO,
  totalPageNo,
});
