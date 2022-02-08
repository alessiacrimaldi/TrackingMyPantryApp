import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import ProductItem from '../../components/products/ProductItem'


const ProductsOverviewScreen = ({ navigation }) => {
    const availableProducts = useSelector(state => state.products.filteredProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        try {
            await dispatch(productsActions.loadFilteredProducts())
        } catch (err) {
            console.log(err)
        }
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])

    useEffect(() => {
        const willFocusSub = navigation.addListener('focus', loadProducts)
        return willFocusSub
    }, [loadProducts])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.details} />
            </View>
        )
    }

    const renderProduct = itemData => {
        return <ProductItem
            quantity={itemData.item.quantity}
            name={itemData.item.name}
            barcode={itemData.item.barcode}
            expiryDate={itemData.item.expiryDate && itemData.item.readableDate}
            rating={itemData.item.rating}
            onSelect={() => {
                navigation.navigate('Product Details', {
                    productId: itemData.item.id,
                    productName: itemData.item.name
                })
            }}
        />
    }

    return (
        <View>
            {!isLoading && availableProducts.length === 0
                ? <View style={styles.screen}>
                    <DefaultText>
                        There are no products <Ionicons name='cart' size={15} />
                    </DefaultText>
                </View>
                : <View style={{ marginTop: 10 }}>
                    <FlatList
                        onRefresh={loadProducts}
                        refreshing={isRefreshing}
                        keyExtractor={item => item.id}
                        data={availableProducts}
                        renderItem={renderProduct}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen