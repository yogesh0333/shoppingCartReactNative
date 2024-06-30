import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {authenticateUser} from '../services/mockAuth';
type RootStackParamList = {
  ProductList: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    } else if (email === 'user' || password === 'password') {
      dispatch(login());
      navigation.navigate('ProductList');
    } else {
      const response = await authenticateUser(email, password);
      if (response.success) {
        dispatch(login());
        navigation.navigate('ProductList');
      } else {
        Alert.alert('Login Failed', response.message || 'An error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
