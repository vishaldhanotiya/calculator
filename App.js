import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [storedValue, setStoredValue] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleNumberPress = (num) => {
    if (showResult) {
      // Starting a new calculation after result was shown
      setOperation('');
      setShowResult(false);
    }
    
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num.toString());
    }
  };

  const handleOperatorPress = (operator) => {
    if (showResult) {
      // Use the result as the first number for new operation
      setStoredValue(parseFloat(display));
      setOperation(`${display} ${operator}`);
      setCurrentOperator(operator);
      setShowResult(false);
      setShouldResetDisplay(true);
      return;
    }

    const inputValue = parseFloat(display);
    
    if (storedValue === null) {
      setStoredValue(inputValue);
      setOperation(`${inputValue} ${operator}`);
    } else if (currentOperator) {
      const result = calculate(storedValue, inputValue, currentOperator);
      setDisplay(result.toString());
      setStoredValue(result);
      setOperation(`${result} ${operator}`);
    }
    
    setCurrentOperator(operator);
    setShouldResetDisplay(true);
  };

  const calculate = (num1, num2, operator) => {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '×':
        return num1 * num2;
      case '÷':
        return num1 / num2;
      default:
        return num2;
    }
  };

  const handleEquals = () => {
    if (currentOperator === null || storedValue === null) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(storedValue, inputValue, currentOperator);
    
    setOperation(`${storedValue} ${currentOperator} ${inputValue}`);
    setDisplay(result.toString());
    setStoredValue(result);
    setShowResult(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation('');
    setStoredValue(null);
    setCurrentOperator(null);
    setShowResult(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display) * -1;
    setDisplay(value.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.operationText} numberOfLines={1}>
          {operation}
        </Text>
        <Text style={styles.resultText} numberOfLines={1}>
          {display}
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={handleClear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={handlePlusMinus}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={handlePercentage}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => handleOperatorPress('÷')}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(7)}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(8)}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(9)}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => handleOperatorPress('×')}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(4)}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(5)}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(6)}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => handleOperatorPress('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(1)}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(2)}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(3)}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => handleOperatorPress('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handleNumberPress(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDecimal}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={handleEquals}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  operationText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 30,
    marginBottom: 10,
  },
  resultText: {
    color: '#fff',
    fontSize: 60,
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  zeroButton: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
});

export default App;