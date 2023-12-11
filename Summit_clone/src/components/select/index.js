import React from 'react';
import { StyleSheet } from 'react-native';
import Select2 from 'react-native-select-two';
import { Picker } from '@react-native-picker/picker';

const index = ({ title, onSelect, onRemoveItem, data, ...otherProps }) => {
  return (
    <Select2
      popupTitle={title}
      title={title}
      data={data}
      onSelect={onSelect}
      onRemoveItem={onRemoveItem}
      cancelButtonText="Cancel"
      selectButtonText="Select"
      searchPlaceHolderText="Search"
      {...otherProps}
    />
  );
};

export default index;

const styles = StyleSheet.create({});
