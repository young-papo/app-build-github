import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

// Icônes
const SignAtSolid = ({ color = '#000000', size = 22, ...props }) => (
  <Svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <Path fill={color} fillRule="evenodd" d="M25.033 1.5C12.255 1.5 1.5 11.425 1.5 24.66c0 11.79 8.7 21.84 20.614 21.84c2.703 0 4.601-.352 5.753-1.13c.98-.63 1.482-1.515 1.618-2.475c.133-.944-.09-1.931-.5-2.805c-.277-.59-.908-.854-1.488-.772c-1.632.228-3.218.42-4.844.42c-8.563 0-14.391-7.497-14.391-15.079c0-8.64 7.63-16.442 16.77-16.442c4.6 0 8.274 1.46 10.793 3.805c2.518 2.343 3.913 5.596 3.913 9.247c0 2.589-.785 4.855-2 6.2c-.604.667-1.303 1.097-2.059 1.25c-.665.136-1.411.065-2.224-.294l1.32-8.578c.338-1.794-.472-3.545-1.906-4.586l-.004-.002c-2.291-1.63-5.002-2.306-7.743-2.306c-6.885 0-11.859 5.227-11.859 12.036c0 2.82.975 5.269 2.687 7.015c1.713 1.747 4.135 2.76 6.972 2.76c1.896 0 3.89-.363 5.604-1.327C30.309 34.516 32.42 35 34.461 35c4.007 0 7.039-1.562 9.058-4.09c2.007-2.514 2.981-5.942 2.981-9.64C46.5 9.262 36.041 1.5 25.033 1.5M22.82 21.39c.635-.804 1.38-1.175 2.257-1.175c.551 0 1.103.06 1.537.252l-.622 6.787c-.496.319-1.08.484-1.768.484c-.847 0-1.415-.308-1.784-.773c-.381-.48-.59-1.183-.59-2.023c0-1.635.348-2.79.965-3.545z" clipRule="evenodd" />
  </Svg>
);

const ProfileFill = ({ color = '#000000', size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill={color} fillRule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5H8Z" clipRule="evenodd" />
  </Svg>
);

const Calendar = ({ color = '#000000', size = 22, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512" {...props}>
    <Path fill={color} d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Zm0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24Z" />
  </Svg>
);

const MailRounded = ({ color = '#000000', size = 22, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.313t.1-.412q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037Z" />
  </Svg>
);

const Lock = ({ color = '#000000', size = 22, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M17 9V7c0-2.8-2.2-5-5-5S7 4.2 7 7v2c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3zM9 7c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V7z" />
  </Svg>
);

const Google = ({ color = '#000000', size = 22, ...props }) => (
  <Svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <G fill="none" fillRule="evenodd" clipRule="evenodd">
      <Path fill="#F44336" d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86" opacity=".987" />
      <Path fill="#FFC107" d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92" opacity=".997" />
      <Path fill="#448AFF" d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49" opacity=".999" />
      <Path fill="#43A047" d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z" opacity=".993" />
    </G>
  </Svg>
);

// Composant InputField
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  error,
  success,
  secureTextEntry,
  toggleSecure,
  keyboardType,
  accessibilityLabel,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const colors = {
    background: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    textSecondary: isDarkMode ? '#BDBDBD' : '#666666',
    inputBg: isDarkMode ? '#1A1A1A' : '#F2F2F2',
    inputBorder: isDarkMode ? '#333333' : '#E0E0E0',
    placeholder: '#BDBDBD',
    error: '#FF6B6B',
    success: '#22C55E',
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <View style={styles.labelWithIcon}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          {props.required && <Text style={styles.required}>*</Text>}
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.inputBg,
            borderColor: error ? colors.error : colors.inputBorder,
          },
        ]}
      >
        <Icon color={colors.textSecondary} size={22} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel={accessibilityLabel}
          {...props}
        />
        {toggleSecure && (
          <TouchableOpacity onPress={toggleSecure}>
            <Ionicons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="close-circle" size={14} color={colors.error} />
          <Text style={[styles.errorMessage, { color: colors.error }]}>{error}</Text>
        </View>
      )}
      {success && (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={14} color={colors.success} />
          <Text style={[styles.successMessage, { color: colors.success }]}>{success}</Text>
        </View>
      )}
    </Animated.View>
  );
};

// Composant SexeSelector
const SexeSelector = ({ value, onChange, colors }) => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.fieldContainer}>
    <View style={styles.labelRow}>
      <View style={styles.labelWithIcon}>
        <Text style={[styles.label, { color: colors.text }]}>Sexe</Text>
        <Text style={styles.required}>*</Text>
      </View>
    </View>
    <View style={styles.sexeContainer}>
      {['Homme', 'Femme'].map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.sexeOption}
          onPress={() => onChange(option.toLowerCase())}
          activeOpacity={0.7}
          accessibilityLabel={`Sélectionner ${option}`}
        >
          <View
            style={[
              styles.customCheckbox,
              {
                backgroundColor: value === option.toLowerCase() ? colors.checkbox : colors.checkboxUnchecked,
                borderColor: value === option.toLowerCase() ? colors.checkbox : colors.checkboxUnchecked,
              },
            ]}
          >
            {value === option.toLowerCase() && (
              <Ionicons name="checkmark" size={16} color={colors.checkboxText} />
            )}
          </View>
          <Text style={[styles.sexeLabel, { color: colors.text }]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </Animated.View>
);

export default function SignupScreen({ navigation }) {
  const [pseudo, setPseudo] = useState('');
  const [pseudoError, setPseudoError] = useState('');
  const [pseudoAvailable, setPseudoAvailable] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateError, setDateError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const colors = {
    background: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    textSecondary: isDarkMode ? '#BDBDBD' : '#666666',
    inputBg: isDarkMode ? '#1A1A1A' : '#F2F2F2',
    inputBorder: isDarkMode ? '#333333' : '#E0E0E0',
    placeholder: '#BDBDBD',
    error: '#FF6B6B',
    success: '#22C55E',
    button: isDarkMode ? '#FFFFFF' : '#000000',
    buttonText: isDarkMode ? '#000000' : '#FFFFFF',
    buttonDisabled: '#D3D3D3',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    checkbox: isDarkMode ? '#FFFFFF' : '#000000',
    checkboxUnchecked: isDarkMode ? '#333333' : '#E0E0E0',
    checkboxText: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const takenPseudos = ['john', 'marie', 'alex', 'luxe', 'sport', 'fashion'];

  const validatePseudo = useCallback(
    (text) => {
      if (text.length === 0) {
        setPseudoError('');
        setPseudoAvailable(null);
        return;
      }
      if (text.length < 3) {
        setPseudoError('Au minimum 3 caractères');
        setPseudoAvailable(null);
        return;
      }
      const pseudoRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!pseudoRegex.test(text)) {
        setPseudoError('Lettres, chiffres et underscore (_) uniquement');
        setPseudoAvailable(null);
        return;
      }
      const isTaken = takenPseudos.includes(text.toLowerCase());
      if (isTaken) {
        setPseudoError('Ce pseudo est déjà pris');
        setPseudoAvailable(false);
      } else {
        setPseudoError('');
        setPseudoAvailable(true);
      }
    },
    [takenPseudos]
  );

  const handlePseudoChange = (text) => {
    setPseudo(text);
    validatePseudo(text);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateNaissance(selectedDate);
      validateDate(selectedDate);
    }
  };

  const validateDate = useCallback((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      setDateError('La date ne peut pas être dans le futur');
      return;
    }

    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    let calculatedAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    if (calculatedAge < 13) {
      setDateError('Vous devez avoir au moins 13 ans');
      return;
    }

    setDateError('');
  }, []);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateEmail = useCallback((text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }, []);

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.length > 0 && !validateEmail(text)) {
      setEmailError('Email invalide');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = useCallback((text) => {
    const errors = [];
    if (text.length < 8) errors.push('Au moins 8 caractères');
    if (!/[A-Z]/.test(text)) errors.push('Une majuscule');
    if (!/[0-9]/.test(text)) errors.push('Un chiffre');
    setPasswordErrors(errors);
  }, []);

  const handlePasswordChange = (text) => {
    setPassword(text);
    validatePassword(text);
    if (confirmPassword.length > 0 && text !== confirmPassword) {
      setPasswordMismatch('Les mots de passe ne correspondent pas');
    } else {
      setPasswordMismatch('');
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text.length > 0 && password !== text) {
      setPasswordMismatch('Les mots de passe ne correspondent pas');
    } else {
      setPasswordMismatch('');
    }
  };

  const isFormValid = useCallback(() => {
    return (
      pseudo.length >= 3 &&
      pseudoAvailable === true &&
      pseudoError === '' &&
      nom !== '' &&
      prenom !== '' &&
      sexe !== '' &&
      dateError === '' &&
      email !== '' &&
      emailError === '' &&
      password !== '' &&
      passwordErrors.length === 0 &&
      confirmPassword !== '' &&
      passwordMismatch === '' &&
      agreeTerms === true
    );
  }, [
    pseudo,
    pseudoAvailable,
    pseudoError,
    nom,
    prenom,
    sexe,
    dateError,
    email,
    emailError,
    password,
    passwordErrors,
    confirmPassword,
    passwordMismatch,
    agreeTerms,
  ]);

  const handleSignup = () => {
    if (!isFormValid()) {
      navigation.navigate('ErrorModal', { message: 'Veuillez remplir correctement tous les champs obligatoires' });
      return;
    }
    navigation.navigate('Welcome', { pseudo });
  };

  const handleGoogleSignup = () => {
    navigation.navigate('AuthModal', { provider: 'Google' });
  };

  const handleAppleSignup = () => {
    navigation.navigate('AuthModal', { provider: 'Apple' });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleTermsPress = () => {
    navigation.navigate('Terms');
  };

  const handlePrivacyPress = () => {
    navigation.navigate('Privacy');
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: colors.background }]}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
              <Text style={[styles.title, { color: colors.text }]}>WOY</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>S'inscrire</Text>

              <InputField
                label="Pseudo"
                value={pseudo}
                onChangeText={handlePseudoChange}
                placeholder="Pseudo"
                icon={SignAtSolid}
                error={pseudoError}
                success={pseudoAvailable && 'Disponible'}
                required
                accessibilityLabel="Entrer votre pseudo"
              />

              <InputField
                label="Nom"
                value={nom}
                onChangeText={setNom}
                placeholder="Nom"
                icon={ProfileFill}
                required
                accessibilityLabel="Entrer votre nom"
              />

              <InputField
                label="Prénom"
                value={prenom}
                onChangeText={setPrenom}
                placeholder="Prénom"
                icon={ProfileFill}
                required
                accessibilityLabel="Entrer votre prénom"
              />

              <SexeSelector value={sexe} onChange={setSexe} colors={colors} />

              <Animated.View entering={FadeIn.duration(300)} style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <View style={styles.labelWithIcon}>
                    <Text style={[styles.label, { color: colors.text }]}>Date de naissance</Text>
                    <Text style={styles.required}>*</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: colors.inputBg,
                      borderColor: dateError ? colors.error : colors.inputBorder,
                    },
                  ]}
                  accessibilityLabel="Sélectionner la date de naissance"
                >
                  <Calendar color={colors.textSecondary} size={22} />
                  <Text style={[styles.dateText, { color: colors.text }]}>Date de naissance: {formatDate(dateNaissance)}</Text>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateNaissance}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                  {dateError ? (
                    <Text style={[styles.errorMessage, { color: colors.error }]}>{dateError}</Text>
                  ) : null}
                </TouchableOpacity>
              </Animated.View>

              <InputField
                label="Email"
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Entrez votre email"
                icon={MailRounded}
                error={emailError}
                required
                accessibilityLabel="Entrer votre email"
              />

              <InputField
                label="Mot de passe"
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Entrez votre mot de passe"
                icon={Lock}
                secureTextEntry={!showPassword}
                toggleSecure={() => setShowPassword(!showPassword)}
                error={passwordErrors.join('\n')}
                required
                accessibilityLabel="Entrer votre mot de passe"
              />

              <InputField
                label="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirmer le mot de passe"
                icon={Lock}
                secureTextEntry={!showConfirmPassword}
                toggleSecure={() => setShowConfirmPassword(!showConfirmPassword)}
                error={passwordMismatch}
                required
                accessibilityLabel="Confirmer le mot de passe"
              />

              <TouchableOpacity onPress={handleSignup} style={[styles.button, { backgroundColor: colors.button }]}> 
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>S'inscrire</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                style={{ marginTop: 20 }}
                accessibilityLabel="Se connecter"
              >
                <Text style={{ color: colors.text }}>Déjà un compte ? Se connecter</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 24,
  },
  required: {
    color: 'red',
  },
  fieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
  },
  successContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 12,
  },
  sexeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sexeOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customCheckbox: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  sexeLabel: {
    fontSize: 16,
  },
  dateText: {
    paddingLeft: 10,
  },
});