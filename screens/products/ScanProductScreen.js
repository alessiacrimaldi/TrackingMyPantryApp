import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { useSelector } from 'react-redux'
import { CustomTextButton } from '../../components/UI/Buttons'
import DefaultText from '../../components/UI/DefaultText'
import BarCodeScan from '../../components/products/BarCodeScanner'


const modeColors = mode => {
    switch (mode) {
        case 'light':
            return { color: '#ccc', textColor: 'black' }
        case 'dark':
            return { color: '#888', textColor: 'white' }
    }
}

const ScanProductScreen = () => {
    const currentMode = useSelector(state => state.mode.theme)
    const [isScanning, setIsScanning] = useState(false)
    const [barcode, setBarcode] = useState('')
    const [barcodeTaken, setBarcodeTaken] = useState('')

    /* per vedere se l'oggetto è vuoto */
    // const pickedProduct = useSelector(state => state.products.pickedProduct)
    // (if Object.values(pickedProduct).length === 0)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <DefaultText style={styles.title}>Scan or Insert the product barcode</DefaultText>
                <FontAwesome5 name="barcode" size={180} color={modeColors(currentMode).textColor} />

                <TextInput
                    style={{ ...styles.input, borderBottomColor: modeColors(currentMode).color, color: modeColors(currentMode).textColor }}
                    value={barcode}
                    onChangeText={code => setBarcode(code)}
                    placeholder="Insert barcode"
                    placeholderTextColor={modeColors(currentMode).color}
                    keyboardType='decimal-pad'
                />
                <View style={styles.button}>
                    <CustomTextButton
                        color={modeColors(currentMode).textColor}
                        style={{ fontSize: 17 }}
                        isDisabled={barcode.length !== 13 ? true : false}
                        onPress={() => setBarcodeTaken(barcode)}
                    >OK
                    </CustomTextButton>
                </View>

                <View style={{ ...styles.scan, borderColor: modeColors(currentMode).color }}>
                    {!isScanning &&
                        <Entypo
                            name="camera"
                            size={35}
                            color={modeColors(currentMode).color}
                            onPress={() => { setIsScanning(true) }}
                        />
                    }
                    {isScanning && <BarCodeScan onBarcodeTaken={setBarcodeTaken} />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 40,
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    },
    input: {
        width: 180,
        paddingBottom: 3,
        borderBottomWidth: 1,
        fontSize: 17
    },
    button: {
        marginTop: 15
    },
    scan: {
        width: '80%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 30
    }
})

export default ScanProductScreen