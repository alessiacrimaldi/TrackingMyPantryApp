import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { CustomButton } from '../UI/Buttons'
import Colors from '../../constants/Colors'


const DatePicker = ({ onShowCalendar, setShowCalendar, onDateChosen }) => {
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
                            onDayPress={day => {
                                onDateChosen(day.dateString)
                            }}
                        />
                        <View style={{ marginTop: 5 }}>
                            <CustomButton
                                color={Colors.primary}
                                style={{ width: 80, alignItems: 'center', fontSize: 13 }}
                                onPress={() => setShowCalendar(!onShowCalendar)}
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
    }
})

export default DatePicker