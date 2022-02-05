import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'


const AddProductScreen = ({ navigation, route }) => {
    const productMode = route.params.mode
    const productBarcode = route.params.barcode
    const pickedProduct = useSelector(state => state.products.pickedProduct)
    // (if Object.values(pickedProduct).length === 0)

    return (
        <View style={styles.screen}>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 100,
        alignItems: 'center'
    }
})

export default AddProductScreen