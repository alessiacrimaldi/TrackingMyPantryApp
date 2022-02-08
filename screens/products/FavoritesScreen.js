import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
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
            favorite={itemData.item.favorite}
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
                : <View style={styles.listContainer}>
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
    },
    listContainer: {
        marginVertical: 15
    }
})

export default FavoritesScreen