// components/InputField.tsx
import React, { memo } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface InputFieldProps extends TextInputProps {
  error?: string;
  iconType: "email" | "password";
  togglePassword?: () => void;
  showPassword?: boolean;
}

export const InputField = memo(
  ({
    error,
    iconType,
    togglePassword,
    showPassword,
    ...props
  }: InputFieldProps) => {
    const renderIcon = () => {
      switch (iconType) {
        case "email":
          return (
            <Fontisto
              name="email"
              size={20}
              color="#A1A1A1"
              style={styles.icon}
            />
          );
        case "password":
          return (
            <Fontisto
              name="key"
              size={20}
              color="#A1A1A1"
              style={styles.icon}
            />
          );
        default:
          return null;
      }
    };

    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, error ? styles.inputError : null]}>
          {renderIcon()}
          <TextInput
            style={styles.input}
            placeholderTextColor="#A1A1A1"
            {...props}
          />
          {togglePassword && (
            <TouchableOpacity
              onPress={togglePassword}
              style={styles.toggleButton}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={23}
                color="#747474"
              />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  toggleButton: {
    padding: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 15,
  },
});
