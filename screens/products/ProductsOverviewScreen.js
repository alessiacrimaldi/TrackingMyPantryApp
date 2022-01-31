import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList, Alert, ActivityIndicator } from 'react-native'
import ProductItem from '../../components/products/ProductItem'


const ProductsOverviewScreen = ({ navigation }) => {
    return (
        <>
            <ProductItem />
            <ProductItem />
        </>
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen