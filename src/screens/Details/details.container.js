import Details from './details';
import {connect} from 'react-redux';
import get from 'lodash/get';

const mapStateToProps = state => ({
  movieDetail: get(state, 'movieDetails.movieDetail', {}),
});

export default connect(mapStateToProps, undefined)(Details);
