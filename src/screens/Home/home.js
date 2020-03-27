import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {strings, appConstants} from '../../constants';
import SearchBar from '../../components/SearchBar';
import Card from '../../components/Card';
import {ApiRequestStatus} from '../../Models/model';
import {Colors} from '../../Theme/colors';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
    };
  }

  componentDidMount() {
    this.props.initializeApp();
  }

  renderItem = item => {
    const {title = '', vote_average, overview = '', poster_path} = item;
    return (
      <Card
        onPress={() => this.props.navigateToMovieDetail(item)}
        title={title}
        imageUrl={`${appConstants.imageUrl}${poster_path}`}
        rating={vote_average}
        description={overview}
      />
    );
  };

  render() {
    const {movieLoadingStatus, movieList} = this.props;
    if (movieLoadingStatus === ApiRequestStatus.PENDING) {
      return (
        <View style={styles.normalContainer}>
          <Text style={styles.marginBottom}>
            {strings.loading_data_message}
          </Text>
          <ActivityIndicator color={Colors.blue} />
        </View>
      );
    }
    if (movieLoadingStatus === ApiRequestStatus.FAILED) {
      return (
        <View style={styles.normalContainer}>
          <Text style={styles.marginBottom}>
            {strings.failed_loading_data_message}
          </Text>
        </View>
      );
    }
    return (
      <SafeAreaView>
        <ScrollView
          onScrollEndDrag={() => this.props.getMoreMovies()}
          showsVerticalScrollIndicator={false}>
          <View style={styles.flexStyle}>
            <SearchBar />
            <View style={styles.cardContainer}>
              <FlatList
                numColumns={2}
                data={movieList}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => this.renderItem(item)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  normalContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flexStyle: {flex: 1},
  cardContainer: {padding: 4, backgroundColor: Colors.white},
  marginBottom: {marginBottom: 16},
});
