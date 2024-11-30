import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '@/styles/onboarding/onboard'
import { router } from 'expo-router'

export default function OnBoardingScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if(!fontsLoaded  && !fontError) {
        return null;
    }
    return (
        <LinearGradient colors={["E5ECF", "F6F7F9"]} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.firstContainer}>
                <View>
                    <Image
                        source={require('@/assets/images/lms-logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View
                    style={styles.titleWrapper}
                >
                    <Text style={[styles.titleText, {fontFamily: "Raleway_700Bold"}]}>
                        Start Learing With
                    </Text>
                </View>
                <View>
                    <Text style={[styles.titleText2, {fontFamily: "Raleway_700Bold"}]}>
                        Dhikademy
                    </Text>
                </View>
                <View style={styles.dscpWrapper}>
                    <Text style={[styles.dscpText, {fontFamily: "Nunito_400Regular"}]}>
                        Explore a variety of interactive lesson
                    </Text>
                    <Text style= {[styles.dscpText, {fontFamily: "Nunito_400Regular"}]}>
                        video, quizze & assignment
                    </Text>
                </View>
                <TouchableOpacity
                    style= {styles.buttonWrapper}
                    onPress={() => router.push("/(routes)/welcome-intro")}
                >
                    <Text style= {[styles.buttonText, {fontFamily: "Nunito_700Bold"}]}>
                        Getting Started
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
  )
}

