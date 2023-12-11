import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  FlatList,
} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {api} from '../../Config/Apis.json';
import AppText from '../../Components/AppText';
import {testFunc} from '../../Store/Actions/index';
import ConnectionsMapper from './ConnectionsMapper';
import {showMessage, hideMessage} from 'react-native-flash-message';
import * as types from '../../Store/Actions/actionType';
import ConnectionButtonsMapper from './ConnectionButtonsMapper';

import * as actions from '../../Store/Actions/index';
import {useIsFocused} from '@react-navigation/native';
import {themeRed} from '../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('window');

const Test = ({
  getAllConnections,
  getInvites,
  unfriendUser,
  connectionsReducer,
  userReducer,
  testFunc,
  cancelMyRequestSent,
  getNotifications,navigation
}) => {
  const [choice, setChoice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const USER_ID = userReducer?.data?.user_id;
  const [connections, setConnections] = useState([]);
  const dispatch = useDispatch();
  const [invitation, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getAllConnectionsAndInvitations();
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getAllConnectionsAndInvitations = () => {
    getAllConnections(USER_ID).then(() => {
      getInvites(USER_ID);
    });
  };

  const _onPressToggleButton = (item, index) => {
    console.log(index, '==============');
    setChoice(index);
  };

  const unFriendThisPerson = (item, index) => {
    const data = {
      user: USER_ID,
      friend: item?.user_id,
    };
    unfriendUser(data);
  };

  const _onPressCancelMyRequestSent = (item, index) => {
    console.log('test');
    const data = {
      user: USER_ID,
      friend: item?.user_id,
    };
    cancelMyRequestSent(data);
  };

  useEffect(() => {
    if (choice === 0) {
      console.log('connection length: ', connections?.length);
    } else if (choice === 1) {
      console.log('invitations length: ', invitation?.length);
    } else {
      console.log('requests length: ', requests?.length);
    }
  }, []);

  useEffect(() => {
    let reqs = connectionsReducer?.invitations?.filter(
      ele => ele.status == 'send',
    );
    let invitations = connectionsReducer?.invitations?.filter(
      ele => ele?.status !== 'send',
    );
    setRequests(reqs);
    setConnections(connectionsReducer?.connections);
    setInvitations(invitations);
  }, [connectionsReducer?.connections, connectionsReducer?.invitations]);
  //   }, []);

  useEffect(() => {
    if (isFocused === true) {
      getAllConnectionsAndInvitations();
      // testFunc(USER_ID);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <FlatList
            contentContainerStyle={styles.toggleContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={buttonData}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({item, index}) => (
              <ConnectionButtonsMapper
                item={item}
                index={index}
                choice={choice}
                onPress={_onPressToggleButton}
              />
            )}
          />
        )}
        data={choice === 0 ? connections : choice === 1 ? invitation : requests}
        keyExtractor={item => item?.user_id.toString()}
        renderItem={({item, index}) => (
          <ConnectionsMapper
            item={item}
            navigation={navigation}
            index={index}
            unFriendThisPerson={unFriendThisPerson}
            _onPressCancelMyRequestSent={_onPressCancelMyRequestSent}
          />
        )}
      />
      {choice === 0 && connections?.length === 0 && (
        <View style={styles.cardView}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            You have no connections
          </Text>
        </View>
      )}
      {choice === 1 && invitation.length === 0 && (
        <View style={styles.cardView}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            You have no invitations
          </Text>
        </View>
      )}

      {choice === 2 && requests.length === 0 && (
        <View style={styles.cardView}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            You have no requests
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = ({
  nearMeUserReducer,
  userReducer,
  connectionsReducer,
}) => {
  return {
    nearMeUserReducer,
    userReducer,
    connectionsReducer,
  };
};
export default connect(mapStateToProps, actions)(Test);

const styles = StyleSheet.create({
  cardView: {
    position: 'absolute',
    top: height * 0.4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: width * 0.03,
    justifyContent: 'center',
    paddingHorizontal: width * 0.02,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent:'flex-start',
    // alignItems:'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.02,
    // backgroundColor: 'grey',
    // height: height * 0.06,
  },
});

const buttonData = [
  {
    id: 0,
    label: 'My Connections',
    selected: true,
  },
  {
    id: 1,
    label: 'Invitations',
    selected: false,
  },
  {
    id: 2,
    label: 'Requests Sent',
    selected: false,
  },
];
