/* Componente per la richiesta dei permessi della fotocamera e lo scanner del barcode */

import React, { useState, useEffect } from 'react'
import { View, Alert } from 'react-native'
import { BarCodeScanner, usePermissions } from 'expo-barcode-scanner'
import DefaultText from '../UI/DefaultText'


const BarCodeScan = ({ onBarcodeTaken }) => {
    const [status, requestPermission] = usePermissions()
    const [productScanned, setProductScanned] = useState(null)

    useEffect(() => {
        const verifyPermissions = async () => {
            let finalStatus
            if (!status?.granted) {
                finalStatus = (await requestPermission()).status
            }
            if (finalStatus && finalStatus !== "granted") {
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant camera permissions to scan products',
                    [{ text: "Okay" }]
                )
                return
            }
        }
        verifyPermissions()
    }, [])

    const scanProductHandler = ({ type, data }) => {
        setProductScanned({
            type,
            data
        })
        onBarcodeTaken(data)
    }

    if (!status?.granted) {
        return <DefaultText>No access to camera</DefaultText>
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            {!productScanned &&
                <BarCodeScanner
                    style={{ flex: 1 }}
                    onBarCodeScanned={productScanned ? undefined : scanProductHandler}
                />
            }
        </View>
    )
}

export default BarCodeScan