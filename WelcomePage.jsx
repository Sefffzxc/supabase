import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginModal from './LogIn';
import SignUpModal from './SignUp';

const { width, height } = Dimensions.get('window');

// Responsive font size function
const responsiveFontSize = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

// Responsive spacing function
const responsiveSize = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

const WelcomeScreen = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up state
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  const handleShowSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setFirstname('');
    setSurname('');
    setRole('');
    setUsername('');
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
  };

  const handleShowLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image 
          source={require('../assets/LogoImage.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>All-in-One App for</Text>
        <Text style={styles.title}>Your College</Text>
        
        <Text style={styles.subtitle}>Find a Group that fit your Role</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomSection}>
        <Image 
          source={require('../assets/GetStartedBG.png')} 
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </View>

      <LoginModal
        visible={showLoginModal}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onClose={handleCloseLoginModal}
        onShowSignUp={handleShowSignUp}
      />

      <SignUpModal
        visible={showSignUpModal}
        Firstname={firstname}
        Surname={surname}
        Role={role}
        email={signupEmail}
        Username={username}
        password={signupPassword}
        confirmPassword={confirmPassword}
        onFirstnameChange={setFirstname}
        onSurnameChange={setSurname}
        onRoleChange={setRole}
        onEmailChange={setSignupEmail}
        onUsernameChange={setUsername}
        onPasswordChange={setSignupPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onClose={handleCloseSignUpModal}
        onShowLogin={handleShowLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: responsiveSize(28),
  },
  logoImage: {
    width: width * 0.21,
    height: width * 0.21,
    marginBottom: responsiveSize(40),
    maxWidth: 100,
    maxHeight: 100,
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: responsiveFontSize(34),
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: '#666666',
    textAlign: 'center',
    marginTop: responsiveSize(10),
    marginBottom: responsiveSize(40),
    paddingHorizontal: width * 0.1,
  },
  button: {
    backgroundColor: '#cc0000',
    paddingHorizontal: width * 0.16,
    paddingVertical: responsiveSize(15),
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: responsiveSize(50),
    minWidth: width * 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomImage: {
    width: width,
    height: height * 0.25,
  },
});

export default WelcomeScreen;