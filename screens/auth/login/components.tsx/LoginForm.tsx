// src/screens/auth/login/components/LoginForm.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { SocialLogin } from "@/components/SocialLogin";
import { SignUpRedirect } from "@/components/SignUpRedirect";
import { LoginActionTypes } from "@/types/auth.types";

interface LoginFormProps {
  state: {
    email: string;
    password: string;
    showPassword: boolean;
    errors: {
      email?: string;
      password?: string;
    };
  };
  dispatch: React.Dispatch<any>;
  handleEmailChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSignIn: () => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  state,
  dispatch,
  handleEmailChange,
  handlePasswordChange,
  handleSignIn,
  isLoading,
}) => (
  <View style={styles.form}>
    <InputField
      value={state.email}
      onChangeText={handleEmailChange}
      placeholder="Email"
      keyboardType="email-address"
      error={state.errors.email}
      iconType="email"
      autoCapitalize="none"
    />

    <InputField
      value={state.password}
      onChangeText={handlePasswordChange}
      placeholder="Password"
      secureTextEntry={!state.showPassword}
      error={state.errors.password}
      iconType="password"
      togglePassword={() =>
        dispatch({ type: LoginActionTypes.TOGGLE_PASSWORD })
      }
      showPassword={state.showPassword}
    />

    <Button
      onPress={() => router.push("/(routes)/forgot-password" as never)}
      variant="link"
      style={styles.forgotPassword}
    >
      Forgot Password?
    </Button>

    <Button
      onPress={handleSignIn}
      loading={isLoading}
      disabled={!!state.errors.email || !!state.errors.password}
      style={styles.signInButton}
    >
      Sign In
    </Button>

    <SocialLogin />
    <SignUpRedirect />
  </View>
);

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  signInButton: {
    marginTop: 10,
  },
});
