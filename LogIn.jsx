// app/LogIn.jsx - FIXED VERSION

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { signIn } from '../utils/auth'; // Make sure this path is correct

const { width } = Dimensions.get('window');

const responsiveFontSize = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

const responsiveSize = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

const CustomTextInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPassword = false,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={icon} size={responsiveFontSize(20)} color="#a0a0a0" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {onTogglePassword && (
          <TouchableOpacity style={styles.eyeIcon} onPress={onTogglePassword}>
            <MaterialCommunityIcons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={responsiveFontSize(20)} 
              color="#a0a0a0" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const LoginModal = ({ visible, onClose, onShowSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Login successful!');
      onClose();
      router.push('./HomePage'); // Using router directly, not useRouter()
    } else {
      Alert.alert('Login Failed', result.error);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.overlayBackground} 
        onPress={onClose}
        activeOpacity={1}
      />
      
      <View style={styles.loginModal}>
        <LinearGradient
          colors={['#0A423F', '#19A8A0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBackground}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.loginContainer}>
              <Text style={styles.loginTitle}>Login</Text>
              
              <CustomTextInput
                icon="email"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <CustomTextInput
                icon="lock"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.signUpContainer} onPress={onShowSignUp}>
                <Text style={styles.signUpText}>
                  Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loginModal: {
    height: '55%',
    width: '100%',
    borderTopLeftRadius: responsiveSize(20),
    borderTopRightRadius: responsiveSize(20),
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: width * 0.08,
    paddingTop: responsiveSize(40),
    paddingBottom: responsiveSize(30),
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: responsiveSize(15),
    right: responsiveSize(20),
    width: responsiveSize(30),
    height: responsiveSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(15),
    zIndex: 10,
  },
  closeText: {
    color: 'white',
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  loginContainer: {
    width: '100%',
    maxWidth: width * 0.85,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: responsiveFontSize(30),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: responsiveSize(30),
    alignSelf: 'flex-start',
    paddingLeft: width * 0.02,
  },
  inputContainer: {
    marginBottom: responsiveSize(15),
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: responsiveSize(25),
    paddingHorizontal: width * 0.05,
    height: responsiveSize(70),
    minHeight: 55,
  },
  icon: {
    marginRight: responsiveSize(15),
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: responsiveFontSize(16),
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: responsiveSize(5),
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: responsiveSize(20),
    paddingLeft: width * 0.02,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontSize: responsiveFontSize(14),
  },
  loginButton: {
    backgroundColor: '#d32f2f',
    borderRadius: responsiveSize(15),
    height: responsiveSize(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(15),
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  signUpContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signUpText: {
    color: '#a0d8d8',
    fontSize: responsiveFontSize(14),
    textAlign: 'center',
    marginBottom: responsiveSize(40),
  },
  signUpLink: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginModal;