import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import styled from 'styled-components/native';
import PropTypes from "prop-types";

const Header = styled.Text`
  font-size: 25;
  color: ${(props) => (props.color ? props.color : 'black')};
  margin-bottom: 50;
`;

export default function Layout(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header>{props.title}</Header>
      {props.children}
    </SafeAreaView>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};


Layout.defaultProps = {
  title: '',
  children: <View />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    width: '100%',
  }
});
