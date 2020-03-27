import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors} from '../Theme/colors';
import {stringCutter} from '../utils/stringEditor';

const Card = props => {
  const title = stringCutter(props.title, 18);
  const description = stringCutter(props.description, 50);
  const {onPress = () => {}, imageUrl, rating} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.imageContainer} />
      <View style={styles.dataContainer}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.titleTextStyle}>{title}</Text>
          </View>
          <View>
            <Text style={styles.ratingTextStyle}>({rating})</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.desctiptionTextStyle} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: Colors.greyWithOpacity,
    zIndex: 1,
    elevation: 1,
    margin: 8,
    shadowOffset: {width: 2, height: 0},
    shadowColor: Colors.lightGreyWithOpacity,
    shadowOpacity: 1.0,
    shadowRadius: 5,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  dataContainer: {padding: 6},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: {color: Colors.blue, fontSize: 12},
  ratingTextStyle: {color: Colors.textdarkgray, fontSize: 12},
  descriptionContainer: {marginVertical: 8},
  descriptionTextStyle: {color: Colors.textdarkgray, fontSize: 10},
});

export default Card;
