import React, { useLayoutEffect, useCallback } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import MainText from '../../components/UI/MainText'
import Card from '../../components/UI/Card'
import MapPreview from '../../components/products/MapPreview'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return '#efefef'
        case 'dark':
            return 'rgba(255, 255, 255, 0.2)'
    }
}

const ProductDetailsScreen = ({ navigation, route }) => {
    const currentMode = useSelector(state => state.mode.theme)
    const productId = route.params.productId
    const dispatch = useDispatch()

    const selectedProduct = useSelector(state =>
        state.products.userProducts.find(product => product.id === productId)
    )

    const selectedLocation = { lat: selectedProduct.lat, lng: selectedProduct.lng }

    const showMapHandler = () => {
        navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        })
    }

    const currentProductIsFavorite = useSelector(state =>
        state.products.userFavoriteProducts.some(product => product.id === productId)
    )

    const toggleFavoriteHandler = useCallback(() => {
        {currentProductIsFavorite
            ? dispatch(productsActions.deleteFavorite(productId))
            : dispatch(productsActions.insertFavorite(productId))
        }
    }, [dispatch, productId])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Favorite'
                        iconName={currentProductIsFavorite ? 'ios-star' : 'ios-star-outline'}
                        color={Colors.ternary}
                        onPress={toggleFavoriteHandler}
                    />
                </HeaderButtons>
            )
        })
    }, [currentProductIsFavorite, toggleFavoriteHandler])

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
            {selectedProduct.address &&
                <Card style={styles.locationContainer}>
                    <View style={styles.addressContainer}>
                        <DefaultText style={styles.address}>{selectedProduct.address}</DefaultText>
                    </View>
                    <MapPreview
                        style={styles.mapPreview}
                        location={selectedLocation}
                        onPress={showMapHandler}
                    />
                </Card>
            }
            <View style={{ width: '100%', marginTop: 15, paddingVertical: 5, backgroundColor: modeColor(currentMode) }}>
                <MainText style={styles.barcode}>{selectedProduct.barcode}</MainText>
            </View>
            <View style={styles.container}>
                <DefaultText style={styles.description}>{selectedProduct.description}</DefaultText>
            </View>
            <View style={{ ...styles.container, flexDirection: 'row', justifyContent: 'center' }}>
                <MainText style={styles.rating}>{selectedProduct.rating}</MainText>
                <Ionicons
                    name="star"
                    size={21}
                    color={Colors.secondary}
                />
            </View>
            <View style={styles.container}>
                {selectedProduct.expiryDate &&
                    <View>
                        <DefaultText style={{ ...styles.expiryDate, fontSize: 14 }}>expires on:</DefaultText>
                        <DefaultText style={{ ...styles.expiryDate, fontSize: 16 }}>{selectedProduct.readableDate}</DefaultText>
                    </View>
                }
            </View>
            <View style={styles.container}>
                {selectedProduct.isGlutenFree &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <DefaultText>Gluten-free</DefaultText>
                        <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color={Colors.save}
                        />
                    </View>
                }
                {selectedProduct.isLactoseFree &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <DefaultText>Lactose-free</DefaultText>
                        <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color={Colors.save}
                        />
                    </View>
                }
                {selectedProduct.isVegan &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <DefaultText>Vegan</DefaultText>
                        <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color={Colors.save}
                        />
                    </View>
                }
                {selectedProduct.isVegetarian &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                        <DefaultText>Vegetarian</DefaultText>
                        <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color={Colors.save}
                        />
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    locationContainer: {
        marginTop: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    container: {
        width: '85%',
        alignItems: 'center',
        marginTop: 15
    },
    barcode: {
        width: '100%',
        fontSize: 20,
        letterSpacing: 3.5,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 15
    },
    rating: {
        fontSize: 19,
        marginRight: 4
    },
    expiryDate: {
        textAlign: 'center',
        color: Colors.details
    }
})

export default ProductDetailsScreen