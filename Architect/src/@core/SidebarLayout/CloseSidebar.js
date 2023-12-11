import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSidebarToggle} from '../contexts/SidebarToggle';

const CloseSidebar = ({children}) => {
  const {setIsSidebarOpen} = useSidebarToggle();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsSidebarOpen(false)}
      activeOpacity={1}>
      {children}
    </TouchableOpacity>
  );
};

export default CloseSidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
