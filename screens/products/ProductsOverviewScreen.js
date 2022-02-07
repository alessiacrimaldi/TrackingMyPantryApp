import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'
import DefaultText from '../../components/UI/DefaultText'
import ProductItem from '../../components/products/ProductItem'


const ProductsOverviewScreen = ({ navigation }) => {
    const availableProducts = useSelector(state => state.products.filteredProducts)
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            dispatch(productsActions.loadFilteredProducts())
        }, [dispatch])
    )

    const renderProduct = itemData => {
        return <ProductItem
            quantity={itemData.item.quantity}
            name={itemData.item.name}
            barcode={itemData.item.barcode}
            expiryDate={itemData.item.expiryDate}
            onVote={() => {

            }}
        />
    }

    return (
        <View>
            {/* {products.length === 0
                ? <View style={styles.screen}>
                    <DefaultText>
                        There are no products <Ionicons name='cart' size={15} />
                    </DefaultText>
                </View>
                : <View>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={products}
                        renderItem={renderProduct}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            } */}
            <ProductItem />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen