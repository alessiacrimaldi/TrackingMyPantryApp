import React from 'react'
import { StyleSheet } from 'react-native'
import DefaultText from '../../components/UI/DefaultText'
import ProductItem from '../../components/products/ProductItem'


const FavoritesScreen = ({ navigation }) => {
    return (
        <>
            <ProductItem favorite />
        </>
    )
}

const styles = StyleSheet.create({

})

export default FavoritesScreen