// components/SocialLogin.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const SocialLogin: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={30} color="#DB4437" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="github" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  socialButton: {
    padding: 10,
  },
});
