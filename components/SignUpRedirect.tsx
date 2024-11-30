// components/SignUpRedirect.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export const SignUpRedirect: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => router.push("/(routes)/sign-up" as never)}
      >
        <Text style={styles.link}>Sign Up</Text>
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
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Raleway_600SemiBold",
  },
  link: {
    fontSize: 18,
    fontFamily: "Raleway_600SemiBold",
    color: "#2467EC",
    marginLeft: 5,
  },
});
