import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../Theme/colors';

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
