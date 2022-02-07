import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, FlatList, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { CustomButton } from '../../components/UI/Buttons'
import { Ionicons } from '@expo/vector-icons'
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import Card from '../../components/UI/Card'
import MainText from '../../components/UI/MainText'
import ManageProductItem from '../../components/products/ManageProductItem'


const AdminScreen = ({ navigation }) => {
    const totalItems = useSelector(state => state.products.userProducts).length
    const items = useSelector(state => state.products.filteredProducts)

    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            dispatch(productsActions.loadFilteredProducts())
        }, [dispatch])
    )

    const renderItem = itemData => {
        return <ManageProductItem
            quantity={itemData.item.quantity}
            name={itemData.item.name}
            barcode={itemData.item.barcode}
            description={itemData.item.description}
            expiryDate={itemData.item.expiryDate && itemData.item.readableDate}
            rating={itemData.item.rating}
            onRemove={() => {
                Alert.alert(
                    'Are you sure?',
                    `Once you remove this product, it's lost`,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                        {
                            text: 'Confirm',
                            style: 'default',
                            onPress: () => {
                                dispatch(productsActions.deleteProduct(itemData.item.id))
                            }
                        }
                    ]
                )
            }}
        />
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <View style={styles.header}>
                    <MainText style={styles.total}>Total Products: <MainText style={styles.totalNumber}>{totalItems}</MainText></MainText>
                    <CustomButton
                        color={Colors.save}
                        style={styles.addButton}
                        onPress={() => {
                            navigation.navigate('Scan Product')
                        }}
                    >
                        <Ionicons name="ios-add-sharp" size={50} />
                    </CustomButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={items}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginVertical: 20,
        marginHorizontal: 15
    },
    card: {
        paddingVertical: 15,
        paddingHorizontal: 17
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    total: {
        fontSize: 17
    },
    totalNumber: {
        fontSize: 20,
        color: Colors.primary
    },
    addButton: {
        width: 60,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },
    listContainer: {
        marginTop: 3,
        marginBottom: 150
    }
})

export default AdminScreen