import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Colors} from '../Theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {strings} from '../constants';

const SearchBar = props => {
  const {
    onChangeText = () => {},
    value,
    clearSearchTerm = () => {},
    searchMovieByName = () => {},
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="search" size={18} color={Colors.lightGreyWithOpacity} />
      </View>
      <TextInput
        onChangeText={text => onChangeText(text)}
        style={styles.textInput}
        underlineColorAndroid={false}
        placeholder={strings.search}
        placeholderTextColor={Colors.lightGreyWithOpacity}
        onSubmitEditing={() => searchMovieByName()}
        value={value}
      />
      {!!value && (
        <TouchableOpacity style={styles.closeIcons} onPress={clearSearchTerm}>
          <Icon name="times" size={18} color={Colors.lightGreyWithOpacity} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyWithOpacity,
    flex: 1,
    width: '100%',
    padding: 8,
    paddingHorizontal: 12,
    zIndex: 1,
    elevation: 1,
    shadowOffset: {width: 2, height: 0},
    shadowColor: Colors.greyWithOpacity,
    shadowOpacity: 1.0,
    shadowRadius: 2,
  },
  textInput: {
    backgroundColor: Colors.lightestgray,
    height: 36,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.lightestgray,
    paddingHorizontal: 8,
    paddingLeft: 30,
  },
  iconContainer: {position: 'absolute', left: 18, top: 16},
  closeIcons: {position: 'absolute', right: 18, top: 18},
});

export default SearchBar;
