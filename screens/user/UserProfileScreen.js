import React from 'react'
import { StyleSheet, Platform, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'
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
    const username = useSelector(state => state.auth.userName)
    const email = useSelector(state => state.auth.userEmail)
    const dispatch = useDispatch()

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
            <View style={styles.userInfo}>
                <MainText style={{ fontSize: 19, color: modeColor(currentMode), marginBottom: 15 }}>{username ? username.toUpperCase() : 'USER'}</MainText>
                <Ionicons
                    name={Platform.OS === 'android' ? "person-circle-outline" : "person-outline"}
                    size={120}
                    color={modeColor(currentMode)}
                />
                <DefaultText style={{ fontSize: 15, color: modeColor(currentMode) }}>{email ? email : 'no email'}</DefaultText>
            </View>
            <View style={styles.touchable}>
                <TouchableComponent
                    onPress={() => {
                        dispatch(logout())
                    }}
                >
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
            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 120
    },
    touchable: {
        borderRadius: 6,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.26,
        shadowRadius: 5,
        elevation: 8
    },
    logoutButton: {
        width: 100,
        height: 50,
        paddingLeft: 8,
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default UserProfileScreen