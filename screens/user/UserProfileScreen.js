import React from 'react'
import { StyleSheet, Platform, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import MainText from '../../components/UI/MainText'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return 'white'
        case 'dark':
            return 'black'
    }
}

const UserProfileScreen = () => {
    const currentMode = useSelector(state => state.mode.theme)

    let TouchableComponent = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <LinearGradient
            start={{ x: 0.1, y: 0.1 }} end={{ x: 0.5, y: 1.0 }}
            locations={[0.05, 0.5, 1]}
            colors={[Colors.primary, Colors.secondary, Colors.ternary]}
            style={styles.linearGradient}
        >
            <MainText style={{ fontSize: 19, color: modeColor(currentMode), marginBottom: 15 }}>{`Username`.toUpperCase()}</MainText>
            <Ionicons
                name={Platform.OS === 'android' ? "person-circle-outline" : "person-outline"}
                size={120}
                color={modeColor(currentMode)}
            />
            <DefaultText style={{ fontSize: 15, color: modeColor(currentMode) }}>test@test.it</DefaultText>
            <TouchableComponent activeOpacity={0.6}>
                <View style={styles.logoutButton}>
                    <MainText style={{ color: 'black', fontSize: 16 }}>Logout</MainText>
                    {Platform.OS === 'android'
                        ? (
                            <MaterialCommunityIcons
                                name="logout"
                                size={24}
                                color='black'
                            />
                        )
                        : (
                            <AntDesign
                                name="logout"
                                size={22}
                                color='black'
                            />
                        )
                    }
                </View>
            </TouchableComponent>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        width: 120,
        height: 75,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.26,
        shadowRadius: 5,
        elevation: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 120
    }
})

export default UserProfileScreen