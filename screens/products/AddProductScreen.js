import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { CustomButton } from '../../components/UI/Buttons'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return 'black'
        case 'dark':
            return 'white'
    }
}

const AddProductScreen = () => {
    const currentMode = useSelector(state => state.mode.theme)

    return (
        <View style={styles.screen}>
            <DefaultText style={styles.title}>Scan the product barcode</DefaultText>
            <FontAwesome5 name="barcode" size={200} color={modeColor(currentMode)} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 100,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    }
})

export default AddProductScreen