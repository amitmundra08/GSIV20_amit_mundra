import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {strings} from '../../constants';
import {Colors} from '../../Theme/colors';
import moment from 'moment';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      headerStyle: {backgroundColor: Colors.greyWithOpacity},
    };
  };

  componentDidMount() {}

  render() {
    const {movieDetail = {}} = this.props;
    const {
      title = '',
      vote_average,
      overview = '',
      poster_path,
      release_date,
    } = movieDetail;
    const year = moment(release_date).format('YYYY');
    console.log('movieDetail', movieDetail);
    return (
      <View style={{flex: 1, padding: 16}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Image
              source={{uri: `https://image.tmdb.org/t/p/w500${poster_path}`}}
              style={{width: '100%', height: 300}}
            />
          </View>
          <View style={{marginTop: 16}}>
            <Text>
              {title}
              <Text> ({vote_average})</Text>
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            <Text>{year} | Length | Director</Text>
          </View>
          <View style={{marginTop: 8}}>
            <Text>Cast:</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
