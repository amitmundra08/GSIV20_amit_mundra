import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {strings, appConstants} from '../../constants';
import {Colors} from '../../Theme/colors';
import moment from 'moment';
import get from 'lodash/get';
import {ApiRequestStatus} from '../../Models/model';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = navigationScreenProps => ({
    headerStyle: styles.headerStyle,
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeftContainer}
        onPress={() => navigationScreenProps.navigation.goBack()}>
        <Icon name="arrow-left" color={Colors.black} size={20} />
        <Text style={styles.headeerLeftTextStyle}>Back</Text>
      </TouchableOpacity>
    ),
  });

  componentWillUnmount() {
    this.props.resetMovieCastCrewAndDuration();
  }

  componentDidMount() {}

  render() {
    const {movieDetail = {}, movieDetailLoadingStatus, movieData} = this.props;
    const {
      title = '',
      vote_average,
      overview = '',
      poster_path,
      release_date,
    } = movieDetail;
    const year = moment(release_date).format('YYYY');
    const runtime = get(movieData, 'runtime');
    const cast = get(movieData, 'cast', []);
    const crew = get(movieData, 'crew', {});
    const director = get(crew, 'name');
    const commaSeperatedCast = cast.join(', ');
    const duration = runtime ? moment(runtime).format('HH:MM') : '';
    if (movieDetailLoadingStatus === ApiRequestStatus.PENDING) {
      return (
        <View style={styles.normalContainer}>
          <Text style={styles.marginBottom}>
            {strings.loading_movie_details_message}
          </Text>
          <ActivityIndicator color={Colors.blue} />
        </View>
      );
    }
    if (movieDetailLoadingStatus === ApiRequestStatus.FAILED) {
      return (
        <View style={styles.failedContainer}>
          <Text style={[styles.marginBottom, styles.centeredText]}>
            {strings.failed_loading_movie_details_message}
          </Text>
          <Button
            onPress={() =>
              this.props.getMovieDetails(this.props.movieDetail.id)
            }
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            text={strings.retry}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Image
              source={{uri: `${appConstants.imageUrl}${poster_path}`}}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.movieTitleContainer}>
            <Text style={styles.primaryTextStyle}>
              {title}
              <Text style={styles.secondaryTextStyle}> ({vote_average})</Text>
            </Text>
          </View>
          <View style={styles.movieDetailsContainer}>
            <Text style={styles.hexFontSize}>
              <Text>{year}</Text>
              {duration ? <Text> | {duration}</Text> : <Text />}
              {!!director ? <Text> | {director}</Text> : <Text />}
            </Text>
          </View>
          {cast.length > 0 ? (
            <View style={styles.castContainer}>
              <Text style={styles.hexFontSize}>
                {strings.cast}: {commaSeperatedCast}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.descriptionContainer}>
            <Text style={styles.hexFontSize}>
              {strings.description}: {overview}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  normalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  marginBottom: {marginBottom: 16, fontSize: 16},
  container: {flex: 1, padding: 16},
  imageStyle: {width: '100%', height: 300},
  movieTitleContainer: {marginTop: 16},
  primaryTextStyle: {color: Colors.black, fontSize: 18},
  secondaryTextStyle: {color: Colors.grey},
  movieDetailsContainer: {marginTop: 16},
  castContainer: {marginTop: 4},
  descriptionContainer: {marginTop: 16},
  hexFontSize: {fontSize: 16, color: Colors.secondaryTextColor},
  failedContainer: {flex: 1, justifyContent: 'center'},
  centeredText: {textAlign: 'center'},
  buttonStyle: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: Colors.blue,
  },
  buttonTextStyle: {color: Colors.white, textAlign: 'center'},
  headerStyle: {
    backgroundColor: Colors.gray,
    shadowOffset: {width: 2, height: 0},
    shadowColor: Colors.gray,
    shadowOpacity: 1.0,
    shadowRadius: 2,
  },
  headerLeftContainer: {flexDirection: 'row', padding: 8, alignItems: 'center'},
  headeerLeftTextStyle: {marginLeft: 8, fontSize: 16},
});
