import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);

  const handlePress = (value) => {
    switch (value) {
      case 'C':
        setInput('');
        setResult('');
        break;

      case '=':
        try {
          const evalResult = eval(input);
          setResult(evalResult.toString());
        } catch (error) {
          setResult('Error');
        }
        break;

      case '%':
        try {
          const percentResult = eval(input) / 100;
          setResult(percentResult.toString());
        } catch (error) {
          setResult('Error');
        }
        break;

      case 'MC':
        setMemory(0);
        break;

      case 'MR':
        setInput(input + memory.toString());
        break;

      case 'M+':
        try {
          const current = eval(input || '0');
          setMemory(memory + current);
        } catch (error) {
          setMemory(memory);
        }
        break;

      case 'M-':
        try {
          const current = eval(input || '0');
          setMemory(memory - current);
        } catch (error) {
          setMemory(memory);
        }
        break;

      default:
        setInput(input + value);
    }
  };

  const buttons = [
    ['MC', 'MR', 'M+', 'M-'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '%', '+'],
    ['C', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.memoryText}>Memory: {memory}</Text>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  button === '=' ? styles.equalsButton : null,
                  button === 'C' ? styles.clearButton : null,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'flex-end',
  },
  resultContainer: {
    padding: 20,
    alignItems: 'flex-end',
  },
  memoryText: {
    fontSize: 16,
    color: '#888',
  },
  inputText: {
    fontSize: 30,
    color: '#fff',
    marginTop: 5,
  },
  resultText: {
    fontSize: 40,
    color: '#0f0',
    marginTop: 10,
  },
  buttonsContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    margin: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  equalsButton: {
    backgroundColor: '#0a84ff',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
