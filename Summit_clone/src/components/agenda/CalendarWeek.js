import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../constants/colors";
import uuid from "react-native-uuid";
import dayjs from "dayjs";


const {width, height} = Dimensions.get('window')

const CalendarWeek = ({ selectedDate, setSelectedDate, events }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const handlePress = (item) => {
    console.log(Object.keys(item).length, "==============");
    // const data = dayjs(item.date).format('YYYY-MM-DD')
    // const data = dayjs(item.date).format('YYYY-MM-DDT00:00:00.000') + 'Z';
    const data = dayjs(item.date).format("YYYY-MM-DDT00:00:00.000") + "Z";
    if (selectedDate === data) return;
    setSelectedDate(data);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.calenderItemContainer}>
        <Text style={styles.dayOfWeek}>{item.dayOfWeek}</Text>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View
            style={
              item.date === selectedDate
                ? styles.selectedDayContainer
                : item.hasData === true
                ? styles.dayHasData
                : styles.dayContainer
            }
          >
            <Text
              style={
                item.date === selectedDate ? styles.selectedDay : styles.day
              }
            >
              {item.day}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const initializeData = () => {
    var data = [];
    for (let x = -3; x < 10; x++) {
      let date = new Date();
      date.setDate(date.getDate() + x);
      const stringFormattedDate =
        dayjs(date).format("YYYY-MM-DDT00:00:00.000") + "Z";

      data.push({
        id: uuid.v4(),
        dayOfWeek: dayjs(date).format("dd").slice(0, 1),
        day: dayjs(date).format("D"),
        date: stringFormattedDate,
        hasData: events.some((x) => x.date === stringFormattedDate),
      });

      setdata(data);

    }
  };

  const getMoreData = () => {
    try {
      setloading(true);
      const lastDate = data[data.length - 1].date;

      var newdata = [];

      for (let x = 1; x < 10; x++) {
        let date = new Date(lastDate);
        date.setDate(date.getDate() + x);

        newdata.push({
          id: uuid.v4(),
          dayOfWeek: dayjs(date).format("dd").slice(0, 1),
          day: dayjs(date).format("D"),
          date: date.toISOString(),
        });
      }
      setdata([...data, ...newdata]);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        initialNumToRender={10}
      />
    </View>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    marginBottom: "3%",
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    // borderRadius: 20,
    // backgroundColor: "#ffffff",
    // shadowColor: "rgba(131, 134, 163, 0.12)",
    // shadowOffset: {
    //   width: 0,
    //   height: 6
    // },
    // shadowRadius: 10,
    // shadowOpacity: 1,
    elevation: 10,
    zIndex: 1,
  },
  dayOfWeek: {
    color: colors.primary,
    fontWeight: "bold",
  },
  day: {
    fontWeight: "bold",
    color: colors.black,
    zIndex: 0,
  },
  dayHasData: {
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    width: 50,
    alignItems: "center",
    zIndex: 0,
  },
  dayContainer: {
    alignItems: "center",
    paddingVertical: 8,
    width: width * 0.09,
    // backgroundColor : 'blue',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    zIndex: 0,
  },
  selectedDayContainer: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: colors.primary,
    width: width * 0.09,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    zIndex: 0,
    justifyContent: "center",
  },
  selectedDay: {
    fontWeight: "bold",
    color: colors.white,
    zIndex: 0,
  },
  calenderItemContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 1,
  },
});
