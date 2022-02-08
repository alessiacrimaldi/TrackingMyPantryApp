/* Componente per renderizzare la lista dell'amministrazione dei prodotti in 'Admin Screen' */

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { CustomButton } from '../UI/Buttons'
import Colors from '../../constants/Colors'
import DefaultText from '../../components/UI/DefaultText'
import MainText from '../../components/UI/MainText'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return { linesColor: '#efefef', trashColor: 'black' }
        case 'dark':
            return { linesColor: Colors.darkMode, trashColor: 'white' }
    }
}

const ManageProductItem = ({ quantity, name, barcode, description, expiryDate, rating, onRemove }) => {
    const currentMode = useSelector(state => state.mode.theme)
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={{ ...styles.item, borderBottomColor: modeColor(currentMode).linesColor }}>
            <View style={styles.itemRow}>
                <DefaultText style={styles.quantity}>{quantity}</DefaultText>
                <View style={styles.itemInfo}>
                    <MainText style={styles.name}>{name.toUpperCase()}</MainText>
                    <DefaultText style={styles.barcode}>{barcode}</DefaultText>
                </View>
                <Ionicons
                    name='ios-trash-outline'
                    size={22}
                    color={modeColor(currentMode).trashColor}
                    onPress={onRemove}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    color={Colors.secondary}
                    style={{ width: 125, alignItems: 'center', fontSize: 14 }}
                    onPress={() => { setShowDetails(prevState => !prevState) }}
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </CustomButton>
            </View>
            {showDetails &&
                <View style={styles.itemDetails}>
                    {expiryDate &&
                        <View>
                            <DefaultText style={styles.expires}>expires on:</DefaultText>
                            <DefaultText style={styles.expiryDate}>{expiryDate}</DefaultText>
                        </View>
                    }
                    <DefaultText style={styles.description}>{description}</DefaultText>
                    <DefaultText style={styles.rating}>
                        {rating}
                        <Ionicons
                            name="star"
                            size={15}
                            color={Colors.secondary}
                        />
                    </DefaultText>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 2,
        marginTop: 17,
        paddingBottom: 15,
        paddingHorizontal: 20
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'center'
    },
    quantity: {
        color: Colors.details,
        fontSize: 19,
        marginRight: 11
    },
    name: {
        fontSize: 16
    },
    barcode: {
        fontSize: 15,
        color: Colors.lines
    },
    itemInfo: {
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    itemDetails: {
        paddingHorizontal: 25,
        marginTop: 8
    },
    expires: {
        textAlign: 'center',
        fontSize: 13,
        color: Colors.details
    },
    expiryDate: {
        textAlign: 'center',
        fontSize: 14,
        color: Colors.details,
        marginBottom: 5
    },
    description: {
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 5
    },
    rating: {
        fontSize: 15,
        textAlign: 'center'
    }
})

export default ManageProductItem