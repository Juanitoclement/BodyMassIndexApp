import React, {useState} from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import styled from 'styled-components/native';

import Layout from "./Layout/index,js";
import IconButton from "../components/IconButton";
import {isPositiveInteger} from "../helper/number";

const Button = styled.TouchableOpacity`
  font-size: 20;
  background-color: #2563EB;
  border-radius: 6;
  height: 50;
  width: 70%;
  justify-content: center;
  margin-bottom: 20;
  margin-top: 20;
`;

const TextMessage = styled.Text`
  font-size: ${(props) => (props.size ? props.size : 35)};;
  font-weight: ${(props) => (props.bold ? 700 : 400)};;
  margin-bottom: 8;
  color: ${(props) => (props.color ? props.color : 'black')};
  align-self: center;
`;

export default function HomeScreen() {
  const [mass, setMass] = useState('');
  const [height, setHeight] = useState('');
  const [weightType, setWeightType] = useState();
  const [bmiNumber, setBmiNumber] = useState();
  const [error, setError] = useState();
  
  const calculateBMI = () => {
    
    if(!mass || !height) {
      setError('Please enter Weight and Height')
      
      return
    }
    
    if(isPositiveInteger(mass) && (isPositiveInteger(height))) {
      setError();
      
      let value = (mass / ((height * height)
        / 10000)).toFixed(2);
  
      setBmiNumber(value)
  
      if (value < 18.5) {
        setWeightType('Under Weight')
      } else if (value >= 18.5 && value < 25) {
        setWeightType('Normal Weight')
      } else if (value >= 25 && value < 30) {
        setWeightType('Over Weight')
      } else {
        setWeightType('Obesity')
      }
      
      return
    }
  }
  
  const onHeightChange = height => {
    if(isPositiveInteger(height)) {
      setHeight(height)
    }
  }
  
  const onWeightChange = weight => {
    if(isPositiveInteger(weight)) {
      setMass(weight)
    }
  }
  
  const handleReset = () => {
    setMass('');
    setHeight('')
    setWeightType()
    setBmiNumber()
    setError()
  }
  
  return (
    <Layout title="Body Mass Index Calculator">
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={onWeightChange}
          value={mass}
          placeholder="Weight (kg)"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onHeightChange}
          value={height}
          placeholder="Height (cm)"
          keyboardType="numeric"
        />
        {error && (
          <TextMessage color="red" size={15}>{error}</TextMessage>
        )}
      </View>
      {weightType && bmiNumber && !error && (
        <View style={styles.resultContainer}>
          <TextMessage bold>{bmiNumber}</TextMessage>
          <TextMessage color="red" bold>{weightType}</TextMessage>
        </View>
      )}
      <Button onPress={calculateBMI}>
        <Text style={styles.text}>Calculate BMI</Text>
      </Button>
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
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#94A3B8',
    borderRadius: 6
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
  }
});
