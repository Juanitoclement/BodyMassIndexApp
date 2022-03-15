import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View} from "react-native";
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';

import Layout from "./Layout/index,js";
import IconButton from "../components/IconButton";

export default function FindScreen() {
  const dummyArr = [5408, 6604, 32158, 84984, 8774, 34871]
  const [selectedValue, setSelectedValue] = useState()
  const [result, setResult] = useState()
  
  useEffect(() => {
    searchNumber()
  },[selectedValue])
  
  const searchNumber = () => {
    dummyArr.sort((a,b) => a-b);
    setResult(dummyArr[selectedValue - 1])
  }
  
  const handleReset = () => {
    setResult('')
    setSelectedValue()
  }
  
  return (
    <Layout title="Find nth smallest number">
      <View style={styles.body}>
        <Text style={styles.text}>{`Given Number : ${dummyArr.join(', ')}`}</Text>
      </View>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={styles.selectDropDown}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {dummyArr.map((_, idx) => {
            const val = idx + 1
            return (
              <Picker.Item key={idx} label={`${val}`} value={val} />
            )
          })}
        </Picker>
        <Text style={styles.result}>{result}</Text>
      </View>
      <IconButton name="Reset" onPress={handleReset}/>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  body: {
    marginBottom: 20,
    justifyContent: 'center',
    width: '80%'
  },
  text: {
    marginBottom: 20,
    alignSelf: 'center'
  },
  result: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 50,
    color: 'red',
    fontWeight: 'bold'
  },
  selectDropDown: {
    height: 50,
    width: 150,
    backgroundColor: '#94A3B8',
    marginBottom: 20
  }
});
