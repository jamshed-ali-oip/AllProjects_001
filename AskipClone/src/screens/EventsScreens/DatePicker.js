import React, { useState } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';
const { height, width } = Dimensions.get('window');
const D_Apicker = () => {

  const [date, setdate] = useState("")



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2090, 6, 3)}
          weekdays={['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']}
          months={[
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
          ]}
          previousTitle="Précédent"
          nextTitle="Suivant"
          todayBackgroundColor="#333333"
          selectedDayColor="black"
          selectedDayTextColor="white"
          monthTitleStyle={{ fontWeight: 'bold' }}
          yearTitleStyle={{ fontWeight: 'bold' }}
          nextTitleStyle={{
            marginRight: width * 0.035
          }}
          previousTitleStyle={{
            marginLeft: width * 0.035
          }}

          scaleFactor={400}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#b3b3b3',
          }}
          onDateChange={(e) => { setdate(e) }}
        />
      </View>
    </SafeAreaView>
  );
};
export default D_Apicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081a4f',
    padding: width * 0.015,
    borderRadius: width * 0.035,
    margin: width * 0.03
  },
  textStyle: {
    marginTop: height * 0.035,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: width * 0.035,
    margin: width * 0.035,
  },
});
