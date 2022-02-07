import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import DefaultText from '../../components/UI/DefaultText'
import Card from '../../components/UI/Card'
import MapPreview from '../../components/products/MapPreview'


const ProductDetailsScreen = ({ navigation, route }) => {
    const productId = route.params.productId
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

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
            <View style={styles.container}>
                <DefaultText>description</DefaultText>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignItems: 'center'
    },
    locationContainer: {
        marginVertical: 20,
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
    }
})

export default ProductDetailsScreen