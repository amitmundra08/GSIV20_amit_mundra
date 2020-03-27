import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../Theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Button = props => {
  const {text, onPress = () => {}, style = {}, textStyle = {}} = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orchid,
    padding: 16,
    marginHorizontal: 16,
  },
});

export default Button;
