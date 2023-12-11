import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Entypo } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';


import { getAllAttendees, getAllCoaches } from '../../api/actions';
import { Avatar } from '../ui';
import colors from '../../constants/colors';
import Dot from '../icons/Dot';
import { useAuth } from '../../context/Auth';

const CoachesList = () => {
  const [attendees, setattendees] = useState([]);
  const { authData } = useAuth();

  useEffect(() => {
    getAllAttendees(authData.accessToken)
      .then(async (response) => {
        return await response.data.map((x) => ({
          id: x.id,
          firstName: x.firstName,
          imageSource: x.avatarUrl != null ? x.avatarUrl : faker.image.avatar(),
          isActive: faker.datatype.boolean(),
        }));
      })
      .then((data) => setattendees(data))
      .catch((error) => console.log(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Avatar src={{ uri: item.imageSource }} />
        <View style={styles.nameContainer}>
          <Dot
            size={48}
            color={item.isActive === 0 ? colors.gray : colors.active}
            style={styles.dot}
          />
          <Text style={styles.name}>{item.firstName}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Profit Coaches</Text>
      <FlatList
        horizontal
        data={attendees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CoachesList;

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dot: {
    marginHorizontal: -15,
  },
  name: {
    fontSize: RFPercentage(2),
  },
});
