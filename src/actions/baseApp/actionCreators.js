import {TypeKeys} from './actions';
import axios from 'axios';

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
    if (pageNo <= totalPageNo) {
      try {
        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pageNo}&api_key=4d10d9a80e5603250cb04d50ddb9608c`,
          )
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

export const getMovies = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const pageNo = state.baseApp.pageNo;
    dispatch(setMovieLoadingStatus('PENDING'));
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pageNo}&api_key=4d10d9a80e5603250cb04d50ddb9608c`,
        )
        .then(response => {
          const totalPageNumber = response.data.total_pages || 10;
          const movieList = response.data.results;
          dispatch(setMovies(movieList));
          dispatch(setMovieLoadingStatus('SUCCESS'));
          dispatch(setTotalPageNumber(totalPageNumber));
          dispatch(setPageNumber(pageNo + 1));
        })
        .catch(err => {
          dispatch(setMovieLoadingStatus('FAILED'));
        });
    } catch (err) {
      dispatch(setMovieLoadingStatus('FAILED'));
    }
  };
};

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
