// LoginScreen.tsx

import React, { useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import { Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { sanitizeInput } from "@/utils/security";
import { initialState, loginReducer } from "@/reducer/loginReducer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoginActionTypes } from "@/types/auth.types";
import { LoginForm } from "./components.tsx/LoginForm";
import { Header } from "./components.tsx/Header";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_VALIDATIONS = [
  {
    test: /(?=.*[!@#$&*])/,
    message: "Include at least one special character",
  },
  {
    test: /(?=.*[0-9])/,
    message: "Include at least one number",
  },
  {
    test: /(?=.{6,})/,
    message: "Must be at least 6 characters",
  },
] as const;

export default function LoginScreen() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  // Menggunakan versi baru dari useNetworkStatus
  const { checkConnection } = useNetworkStatus();

  const [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_600SemiBold,
  });

  const validateEmail = useCallback((email: string): boolean => {
    return EMAIL_REGEX.test(email);
  }, []);

  const handleEmailChange = useCallback(
    (value: string) => {
      const sanitizedEmail = sanitizeInput(value);
      dispatch({
        type: LoginActionTypes.SET_EMAIL,
        payload: sanitizedEmail,
      });

      if (!validateEmail(sanitizedEmail)) {
        dispatch({
          type: LoginActionTypes.SET_ERROR,
          payload: { email: "Invalid email format" },
        });
      } else {
        dispatch({
          type: LoginActionTypes.CLEAR_ERROR,
          payload: "email",
        });
      }
    },
    [validateEmail]
  );

  const handlePasswordChange = useCallback((value: string) => {
    const sanitizedPassword = sanitizeInput(value);
    dispatch({
      type: LoginActionTypes.SET_PASSWORD,
      payload: sanitizedPassword,
    });

    for (const validation of PASSWORD_VALIDATIONS) {
      if (!validation.test.test(sanitizedPassword)) {
        dispatch({
          type: LoginActionTypes.SET_ERROR,
          payload: { password: validation.message },
        });
        return;
      }
    }

    dispatch({
      type: LoginActionTypes.CLEAR_ERROR,
      payload: "password",
    });
  }, []);

  const handleSignIn = useCallback(async () => {
    try {
      Keyboard.dismiss();

      // Check connection
      const isConnected = await checkConnection();
      if (!isConnected) {
        Toast.show(
          "Unable to connect to server. Please check your connection.",
          {
            type: "error",
            placement: "top",
            duration: 3000,
          }
        );
        return;
      }

      if (!state.email || !state.password) {
        Toast.show("Please fill in all fields", {
          type: "warning",
          placement: "top",
          duration: 3000,
        });
        return;
      }

      if (state.errors.email || state.errors.password) {
        Toast.show("Please fix all errors before submitting", {
          type: "warning",
        });
        return;
      }

      setIsLoading(true);

      const response = await axios.post<LoginResponse>(
        `${SERVER_URI}/login`,
        {
          email: state.email,
          password: state.password,
        },
        {
          timeout: 10000,
        }
      );

      await Promise.all([
        AsyncStorage.setItem("access_token", response.data.accessToken),
        AsyncStorage.setItem("refresh_token", response.data.refreshToken),
        AsyncStorage.setItem("user", JSON.stringify(response.data.user)),
      ]);

      Toast.show("Login successful!", {
        type: "success",
        placement: "top",
        duration: 2000,
      });

      router.replace("/(tabs)" as never);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  }, [state, checkConnection]);

  const handleLoginError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        Toast.show("Request timeout. Please try again.", {
          type: "error",
          placement: "top",
          duration: 3000,
        });
      } else if (error.response?.status === 401) {
        Toast.show("Invalid email or password", {
          type: "error",
          placement: "top",
          duration: 3000,
        });
      } else {
        Toast.show(error.response?.data?.message || "An error occurred", {
          type: "error",
          placement: "top",
          duration: 3000,
        });
      }
    } else {
      Toast.show("An unexpected error occurred", {
        type: "error",
        placement: "top",
        duration: 3000,
      });
    }
    console.error("Login error:", error);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.gradient}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Header />
              <LoginForm
                state={state}
                dispatch={dispatch}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleSignIn={handleSignIn}
                isLoading={isLoading}
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F7F9",
  },
});
