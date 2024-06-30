import * as Keychain from 'react-native-keychain';

export const signupUser = async (email: string, password: string) => {
  try {
    const existingCredentials = await Keychain.getGenericPassword();
    if (existingCredentials && existingCredentials.username === email) {
      return {success: false, message: 'User already exists'};
    }

    await Keychain.setGenericPassword(email, password);
    return {success: true};
  } catch (error) {
    console.error('Failed to save credentials', error);
    return {success: false, message: 'An error occurred'};
  }
};

export const authenticateUser = async (email: string, password: string) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (
      credentials &&
      credentials.username === email &&
      credentials.password === password
    ) {
      return {success: true};
    } else {
      return {success: false, message: 'Invalid email or password'};
    }
  } catch (error) {
    console.error('Failed to retrieve credentials', error);
    return {success: false, message: 'An error occurred'};
  }
};
