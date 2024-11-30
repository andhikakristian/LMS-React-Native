// components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "link";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    variant === "link" && styles.linkButton,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === "link" && styles.linkText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "white" : "#2467EC"}
        />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2467EC",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkButton: {
    backgroundColor: "transparent",
    padding: 0,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
  },
  linkText: {
    color: "#2467EC",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
});
