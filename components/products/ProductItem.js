import React from 'react'
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import MainText from '../../components/UI/MainText'
import Card from '../../components/UI/Card'


const ProductItem = ({ quantity, name, barcode, expiryDate, rating, favorite, onSelect }) => {
    let TouchableComponent = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <Card style={styles.productItem}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={onSelect}>
                    <View style={styles.card}>
                        <View style={styles.productRow}>
                            <MainText style={{ color: Colors.details }}>({quantity})</MainText>
                            {expiryDate &&
                                <DefaultText style={{ color: Colors.details }}>
                                    best before: {expiryDate}
                                </DefaultText>
                            }
                        </View>
                        <View style={styles.productRow}>
                            <View>
                                <MainText style={{ fontSize: 17 }}>{name.toUpperCase()}</MainText>
                                <DefaultText style={{ fontSize: 15 }}>barcode: <DefaultText style={{ color: Colors.secondary, fontSize: 16 }}>{barcode}</DefaultText></DefaultText>
                                <DefaultText style={{ fontSize: 15 }}>
                                    {rating}
                                    <Ionicons
                                        name="star"
                                        size={15}
                                        color={Colors.secondary}
                                    />
                                </DefaultText>
                            </View>
                            {favorite &&
                                <Ionicons
                                    name='star'
                                    size={25}
                                    color={Colors.ternary}
                                />
                            }
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    productItem: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    card: {
        paddingVertical: 15,
        paddingHorizontal: 17
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    }
})

export default ProductItem