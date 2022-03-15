import React from "react";
import {StyleSheet, Image, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

export default function IconButton(props) {
  const { name, onPress } = props;
  if(name === 'Home') {
    return (
      <Image style={styles.tinyLogo} source={require('./ic-home.png')} />
    )
  } else if(name === 'Find'){
    return (
      <Image style={styles.tinyLogo} source={require('./ic-find.png')} />
    )
  } else if(name === 'Reset'){
    return (
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.tinyLogo} source={require('./ic-reset.png')} />
      </TouchableOpacity>
    )
  }
  
  return <Image style={styles.tinyLogo} source={require('./ic-home.png')} />
}

IconButton.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func
};


IconButton.defaultProps = {
  name: 'Home',
  onPress: () => {}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});
