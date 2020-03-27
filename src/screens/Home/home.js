import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {strings} from '../../constants';
import SearchBar from '../../components/SearchBar';
import Card from '../../components/Card';

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
        imageUrl={`https://image.tmdb.org/t/p/w500${poster_path}`}
        rating={vote_average}
        description={overview}
      />
    );
  };

  render() {
    const {movieLoadingStatus, movieList} = this.props;
    if (movieLoadingStatus === 'PENDING') {
      return (
        <View style={styles.normalContainer}>
          <Text style={{marginBottom: 16}}>{strings.loading_data_message}</Text>
          <ActivityIndicator color="blue" />
        </View>
      );
    }
    if (movieLoadingStatus === 'FAILED') {
      return (
        <View style={styles.normalContainer}>
          <Text style={{marginBottom: 16}}>
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
          <View style={{flex: 1}}>
            <SearchBar />
            <View style={{padding: 4, backgroundColor: 'white'}}>
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
});
