/* Favorites Screen: Schermata per la visualizzazione dei prodotti preferiti */

import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import DefaultText from '../../components/UI/DefaultText'
import ProductItem from '../../components/products/ProductItem'


const FavoritesScreen = ({ navigation }) => {
    const favoriteProducts = useSelector(state => state.products.userFavoriteProducts)

    const renderProduct = itemData => {
        return <ProductItem
            quantity={itemData.item.quantity}
            name={itemData.item.name}
            barcode={itemData.item.barcode}
            expiryDate={itemData.item.expiryDate && itemData.item.readableDate}
            rating={itemData.item.rating}
            favorite={true}
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
            {favoriteProducts.length === 0
                ? <View style={styles.screen}>
                    <DefaultText>
                        You have no favorites <Ionicons name='star' size={15} />
                    </DefaultText>
                    <DefaultText>Start adding some!</DefaultText>
                </View>
                : <View style={{ marginTop: 10 }}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={favoriteProducts}
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
    }
})

export default FavoritesScreen