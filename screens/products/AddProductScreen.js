import React from 'react'
import { StyleSheet, View } from 'react-native'


const AddProductScreen = () => {
    /* per vedere se l'oggetto è vuoto */
    // const pickedProduct = useSelector(state => state.products.pickedProduct)
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