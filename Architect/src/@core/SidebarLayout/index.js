import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Avatar} from 'react-native-elements';
import {useSidebarToggle} from '../contexts/SidebarToggle';
import {useAuth} from '../contexts/AuthContext';
import RenderClient from '../components/common/RenderCLient';

const Layout = ({children}) => {
  const {toggleSidebar, isSidebarOpen} = useSidebarToggle();

  const {user} = useAuth();

  return (
    <View style={styles.container}>
      {!isSidebarOpen ? (
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.sidebarButton}
            onPress={toggleSidebar}>
            <Icon name="menu" size={25} style={styles.menuIconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 'auto', padding: 50}}
            onPress={toggleSidebar}>
            <Icon name="menu" size={25} style={styles.menuIconColor} />
          </TouchableOpacity>
        </View>
      ) : null}
      {children}
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <View
            style={{
              marginTop: 50,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <RenderClient user={user} />
            <View style={{marginTop: 5, marginLeft: 20}}>
              <Text style={{color: '#126D6A', fontSize: 20, fontWeight: '600'}}>
                {user?.first_name + ' ' + user?.last_name || 'No User Found'}
              </Text>
              <Text style={{color: '#50565A', fontSize: 14, fontWeight: '500'}}>
                View Profile
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  navbar: {
    display: 'flex',
  },
  sidebarButton: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 12,
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  menuIconColor: {
    color: '#126D6A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sidebar: {
    width: 300,
    height: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#126D6A',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
    shadowOffset: {width: '100%', height: '100%'},
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Layout;
