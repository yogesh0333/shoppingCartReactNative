import * as Keychain from 'react-native-keychain';

// Store mock user credentials securely
export const signupUser = async (email: string, password: string) => {
  try {
    // Check if the user already exists
    const existingCredentials = await Keychain.getGenericPassword();
    if (existingCredentials && existingCredentials.username === email) {
      return {success: false, message: 'User already exists'};
    }

    // Store new user credentials securely
    await Keychain.setGenericPassword(email, password);
    return {success: true};
  } catch (error) {
    console.error('Failed to save credentials', error);
    return {success: false, message: 'An error occurred'};
  }
};

// Authenticate user credentials against stored credentials
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
