import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../constants/colors';
import Arrow from '../icons/Arrow';
import Screen from '../ui/Screen';

const index = ({ modalVisible, setModalVisible, data = [], selectItem }) => {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectItem(item.name);
          setModalVisible(false);
        }}
        key={index}
      >
        <View style={styles.itemContainer}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Screen style={styles.innerContainer} containerStyle={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setModalVisible(false)}
          >
            <Arrow name="left" size={16} color={colors.black} />
            <Text style={{ marginLeft: 5 }}>BACK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            initialNumToRender={20}
          />
        </View>
      </Screen>
    </Modal>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: '5%',
  },
  textInput: {},
  textInputContainer: {
    backgroundColor: colors.gray,
    padding: '5%',
    borderRadius: 20,
  },
  itemContainer: {
    padding: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    paddingVertical: '3%',
  },
  flatListContainer: {
    height: '95%',
  },
});
