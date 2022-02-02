import React from 'react'
import {
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CustomButton } from '../UI/Buttons'
import moment from 'moment'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import MainText from '../../components/UI/MainText'
import Card from '../../components/UI/Card'


const ProductItem = ({ date, favorite }) => {
    let TouchableComponent = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    date = new Date()

    return (
        <Card style={styles.productItem}>
            <View style={styles.touchable}>
                <TouchableComponent>
                    <View style={styles.card}>
                        <View style={styles.productRow}>
                            <MainText style={{ color: Colors.details }}>(1)</MainText>
                            {date &&
                                <DefaultText style={{ color: Colors.details }}>
                                    best before: {moment(date).format('DD/MM/YYYY')}
                                </DefaultText>
                            }
                        </View>
                        <View style={styles.productRow}>
                            <View>
                                <MainText style={{ fontSize: 17 }}>Product</MainText>
                                <DefaultText>barcode: <DefaultText style={{ color: Colors.secondary }}>000000</DefaultText></DefaultText>
                            </View>
                            {favorite &&
                                <Ionicons
                                    name="star"
                                    size={25}
                                    color={Colors.ternary}
                                />
                            }
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <CustomButton color={Colors.secondary}>VOTE</CustomButton>
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    productItem: {
        marginTop: 20,
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
        alignItems: 'center',
        marginBottom: 10
    }
})

export default ProductItem