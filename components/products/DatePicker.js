import React, { useState } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { CustomButton } from '../UI/Buttons'
import Colors from '../../constants/Colors'


const DatePicker = ({ onShowCalendar, setShowCalendar, onDateChosen }) => {
    const [value, setValue] = useState()

    return (
        <View style={styles.centered}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={onShowCalendar}
            >
                <View style={styles.centered}>
                    <View style={styles.modal}>
                        <Calendar
                            onDayPress={day => setValue(day.dateString)}
                        />
                        <View style={styles.actions}>
                            <CustomButton
                                color={Colors.primary}
                                style={styles.button}
                                onPress={() => setShowCalendar(!onShowCalendar)}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton
                                color={Colors.save}
                                style={styles.button}
                                isDisabled={!value ? true : false}
                                onPress={() => {
                                    onDateChosen(value)
                                    setShowCalendar(!onShowCalendar)
                                }}
                            >
                                Confirm
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingBottom: 15,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 8
    },
    actions: {
        marginTop: 5,
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: 80,
        alignItems: 'center',
        fontSize: 13 
    }
})

export default DatePicker