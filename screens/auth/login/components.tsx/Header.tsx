// src/screens/auth/login/components/Header.tsx
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Image
      style={styles.logo}
      source={require("@/assets/sign-in/sign_in.png")}
      resizeMode="contain"
    />
    <Text style={styles.title}>Welcome Back!</Text>
    <Text style={styles.subtitle}>
      Login to your existing account of Becodemy
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: "60%",
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#575757",
    textAlign: "center",
    marginTop: 5,
    fontFamily: "Nunito_600SemiBold",
  },
});
