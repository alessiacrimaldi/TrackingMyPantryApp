import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getProductByBarcode } from '../../store/actions/products'
import { CustomButton, CustomTextButton } from '../../components/UI/Buttons'
import Colors from '../../constants/Colors'
import MainText from '../../components/UI/MainText'
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

const ScanProductScreen = ({ navigation }) => {
    const currentMode = useSelector(state => state.mode.theme)
    const [productMode, setProductMode] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [barcode, setBarcode] = useState('')
    const [barcodeTaken, setBarcodeTaken] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            Alert.alert('Something went wrong!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const searchProduct = async () => {
        setError(null)
        setIsLoading(true)
        try {
            const mode = await dispatch(getProductByBarcode(barcodeTaken))
            setProductMode(mode)
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    let conditionalMode
    if (!productMode) {
        conditionalMode = (
            <View>
                {isLoading
                    ? <ActivityIndicator style={{ alignSelf: 'center' }} size='large' color={Colors.details} />
                    : <CustomButton
                        color={Colors.secondary}
                        style={styles.searchBtn}
                        onPress={searchProduct}
                    >
                        SEARCH
                    </CustomButton>
                }
            </View>
        )
    } else {
        conditionalMode = (
            <View style={{ alignItems: 'center' }}>
                <MainText>
                    {productMode === 'update'
                        ? 'PRODUCT FOUND'
                        : 'PRODUCT NOT FOUND'
                    }
                </MainText>
                <DefaultText>
                    {productMode === 'update'
                        ? 'A product matches with your search!'
                        : 'No product matches with your search...'
                    }
                </DefaultText>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        color={Colors.secondary}
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Add Product', {barcode: barcodeTaken})
                        }}
                    >
                        {productMode === 'update'
                            ? 'Update Product'
                            : 'Create Product'
                        }
                    </CustomButton>
                </View>
            </View>
        )
    }

    let content
    if (barcodeTaken === '') {
        content = (
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={{ ...styles.input, borderBottomColor: modeColors(currentMode).color, color: modeColors(currentMode).textColor }}
                    value={barcode}
                    onChangeText={code => setBarcode(code)}
                    placeholder="INSERT BARCODE"
                    placeholderTextColor={modeColors(currentMode).color}
                    keyboardType='numeric'
                />
                <View style={styles.OKbtn}>
                    <CustomTextButton
                        color={modeColors(currentMode).textColor}
                        style={{ fontSize: 17 }}
                        isDisabled={barcode.length !== 13 ? true : false}
                        onPress={() => setBarcodeTaken(barcode)}
                    >
                        OK
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
        )
    } else {
        content = (
            <View style={{ alignItems: 'center' }}>
                <DefaultText style={{ fontSize: 18, letterSpacing: 4 }}>
                    {barcodeTaken}
                </DefaultText>
                <View style={styles.searchBtnContainer}>
                    {conditionalMode}
                </View>
            </View >
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screen}>
                <DefaultText style={styles.title}>
                    {barcodeTaken === '' ? 'Scan or Insert the product barcode' : 'Your product'}
                </DefaultText>
                <FontAwesome5 name="barcode" size={180} color={modeColors(currentMode).textColor} />
                {content}
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
        fontSize: 22
    },
    input: {
        width: 180,
        paddingBottom: 3,
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 17
    },
    OKbtn: {
        marginTop: 15
    },
    scan: {
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 30
    },
    searchBtnContainer: {
        alignItems: 'center',
        marginTop: 90
    },
    searchBtn: {
        width: 90,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 8
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        width: 145,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 8
    }
})

export default ScanProductScreen