import {
  USER_GET_INFO,
  NEAR_ME_USERS,
  NO_NEAR_ME_USERS,
  USER_COORDS,
  LIKE_UNLIKE_POST,
  GET_ALL_FEED_DATA,
  COMMENT_ON_POST,
  GET_INVITATIONS,
  GET_POST_COMMENTS,
  CANCEL_REQUEST_SENT,
  GET_ALL_CONNECTIONS,
  GET_POST,
  CANCEL_OFFER_FROM_PROFILE,
  SAVE_NEAR_ME_USER_DATA,
  UNFRIEND,
  AFTER_SENDING_REQ_FROM_PROFILE,
  GET_NOTIFICATIONS,
  BUY_DRINKS,
  LIKE_POST_FROM_SCREEN,
  ACCEPT_FRIEND,
  REJECT_FRIEND,
  GET_ALL_MESSAGES,
  SAVE_CURRENT_CHAT_OBJ,
  GET_ALL_CONVERSATIONS,
  CONVERSATION_CREATED,
  RESET_MESSAGES,
  RESET_NEARME,
  RESET_NOTIFICATIONS,
  RESER_CONNECTIONS,
  RESET_POSTS,
  DEDUCT_DRINK,
  SAVE_SOCKET_REF,
  UPDATE_PROFILE,
  SHOW_DRAWER_CONNECTIONS_BADGE,
  SHOW_TAB_NOTIFICATIONS_BADGE,
  APPEND_DATA_TO_NOTIFICATIONS,
  RESET_UNREAD_COUNT,
} from './../Actions/actionType';

const iNITIAL_NEAR_ME = {
  allUsers: [],
  user: null,
};
const coordsState = {
  lat: null,
  long: null,
};

const INITIAL_USER_DATA = {
  data: null,
  isLogin: false,
  accessToken: '',
  socket: null,
};

const INITIAL_STATE_POSTS = {
  feedPosts: [],
  postComments: [],
  post: null,
};

const INITIAL_NOTI_DATA = {
  notifications: [],
  unreadNoti: 0,
};

const INITIAL_CONNECTIONS_DATA = {
  connections: [],
  invitations: [],
  showConnectionsBadge: false,
};

const INITIAL_MESSAGES_DATA = {
  messages: [],
  currentChat: null,
  conversations: [],
};

export function userReducer(state = INITIAL_USER_DATA, action) {
  switch (action.type) {
    case USER_GET_INFO:
      return {
        ...state,
        data: action.payload.data,
        accessToken: action.payload.token,
        isLogin: action.payload.isLogin,
      };

    case BUY_DRINKS:
      return {
        ...state,
        data: {
          ...state.data,
          coins: Number(state?.data?.coins) + Number(action?.payload),
        },
      };

    case DEDUCT_DRINK:
      // console.log(
      //   'DRINKS NOW DEDUCTED: from',
      //   Number(state?.data?.coins),
      //   ' to ',
      //   Number(state?.data?.coins) - 1,
      // );
      return {
        ...state,
        data: {
          ...state.data,
          coins: Number(state?.data?.coins) - 1,
        },
      };

    case SAVE_SOCKET_REF:
      return {
        ...state,
        socket: action.payload,
      };

    case UPDATE_PROFILE:
      // console.log({
      //   ...state.data,
      //   ...action.payload,
      // })
      return {
        ...state,
        data: {
          // ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export function usersNearmeReducer(state = iNITIAL_NEAR_ME, action) {
  switch (action.type) {
    case RESET_NEARME:
      return {
        ...iNITIAL_NEAR_ME,
      };

    case NEAR_ME_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case NO_NEAR_ME_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case SAVE_NEAR_ME_USER_DATA:
      // console.log(
      //   action.payload?.status,
      //   '+++++++++++++++++++++++++++++++ from reducer',
      // );
      return {
        ...state,
        user: action.payload,
      };

    case CANCEL_OFFER_FROM_PROFILE:
      // console.log(action.payload, 'xxxxxxxxxxxxxxx');
      return {
        ...state,
        user: {
          ...state.user,
          connected: 'null',
        },
      };

    case AFTER_SENDING_REQ_FROM_PROFILE:
      // console.log('near me user ak dataaaaaaa');
      // console.log(state.user);
      return {
        ...state,
        user: {
          user: action.payload,
          connected: 'send',
        },
      };

    default:
      return state;
  }
}

export function userCoordsReducer(state = coordsState, action) {
  switch (action.type) {
    // case RESET_COORDS:
    //   return {
    //     coordsState,
    //   };
    case USER_COORDS:
      return action.payload;
    default:
      return state;
  }
}

export function postsReducer(state = INITIAL_STATE_POSTS, action) {
  switch (action.type) {
    case RESET_POSTS:
      return {
        ...INITIAL_STATE_POSTS,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case GET_ALL_FEED_DATA:
      return {
        ...state,
        feedPosts: action.payload,
      };

    case COMMENT_ON_POST:
      return {
        ...state,
      };

    case GET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
      };

    case LIKE_UNLIKE_POST:
      let post_id = action.payload.post_id;
      let index = 0;

      state.feedPosts.map((ele, idx) => {
        if (ele.post_id === post_id) {
          index = idx;
        }
      });

      let copyFeedPosts = [...state.feedPosts];
      copyFeedPosts[index].is_like = copyFeedPosts[index].is_like == 0 ? 1 : 0;
      copyFeedPosts[index].count_likes = action.payload.totalLikes;
      return {
        ...state,
        feedPosts: [...copyFeedPosts],
      };

    case LIKE_POST_FROM_SCREEN:
      let oldData = { ...state.post };
      oldData.count_likes = action.payload.totalLikes;
      oldData.is_like = oldData?.is_like === 1 ? 0 : 1;
      return {
        ...state,
        post: oldData,
      };

    default:
      return state;
  }
}

export function notificationsReducer(state = INITIAL_NOTI_DATA, action) {
  switch (action.type) {
    case SHOW_TAB_NOTIFICATIONS_BADGE:
      return {
        ...state,
        unreadNoti: state.unreadNoti + 1,
      };

    case RESET_UNREAD_COUNT:
      return {
        ...state,
        unreadNoti: 0,
      };
    case RESET_NOTIFICATIONS:
      return {
        ...INITIAL_NOTI_DATA,
      };

    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    case APPEND_DATA_TO_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload, ...state.notifications],
      };
    default:
      return state;
  }
}

export function connectionsReducer(state = INITIAL_CONNECTIONS_DATA, action) {
  switch (action.type) {
    case SHOW_DRAWER_CONNECTIONS_BADGE:
      return {
        ...state,
        showConnectionsBadge: action.payload,
      };

    case RESER_CONNECTIONS:
      return {
        ...INITIAL_CONNECTIONS_DATA,
      };

    case GET_ALL_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
      };

    case UNFRIEND:
      let index = 0;
      let copyArr = [...state.connections];
      copyArr.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          index = idx;
        }
      });
      copyArr.splice(index, 1);
      return {
        ...state,
        connections: copyArr,
      };

    case REJECT_FRIEND:
      let copyInvitess = [...state.invitations];
      let indxxx = 0;
      copyInvitess.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          indxxx = idx;
        }
      });
      copyInvitess.splice(index, 1);
      return {
        invitations: copyInvitess,
      };

    case CANCEL_REQUEST_SENT:
      let indx = 0;
      let copyAr = [...state.invitations];
      copyAr.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          index = idx;
        }
      });
      copyAr.splice(index, 1);
      return {
        ...state,
        invitations: copyAr,
      };

    case GET_INVITATIONS:
      return {
        ...state,
        invitations: action.payload,
      };

    case ACCEPT_FRIEND:
      let copyInvites = [...state.invitations];
      let indxx = 0;
      copyInvites.map((ele, idx) => {
        if (ele.user_id === action.payload.friend) {
          indxx = idx;
        }
      });
      copyInvites[indxx].status = 'accepted';
      let copyConnects = [copyInvites[indxx], ...state.connections];
      copyInvites.splice(index, 1);
      return {
        connections: copyConnects,
        invitations: copyInvites,
      };

    default:
      return state;
  }
}

export function messagesReducer(state = INITIAL_MESSAGES_DATA, action) {
  switch (action.type) {
    case RESET_MESSAGES:
      return {
        ...INITIAL_MESSAGES_DATA,
      };

    case GET_ALL_MESSAGES:
      // console.log(action.payload?.currentChat,"[[[[")
      const arr = action.payload.messages.map(ele => {
        const userImage =
          action.payload?.currentChat?.user_image !== null &&
            action.payload?.currentChat?.user_image !== undefined &&
            action.payload?.currentChat?.user_image !== ''
            ? currentChat?.user_image
            : require('../../Assets/Images/dp.png');

        return {
          _id: ele?.id,
          text: ele?.message,
          createdAt: ele?.createdAt,
          user: {
            _id:
              action.payload?.currentChat?.user_id === ele?.receiver
                ? ele.receiver
                : ele?.sender,
            name: action.payload?.currentChat?.chatPerson?.user_name,
            avatar: userImage,
          },
        };
      });
      return {
        ...state,
        messages: arr,
      };

    case SAVE_CURRENT_CHAT_OBJ:
      return {
        ...state,
        currentChat: action.payload,
      };

    case GET_ALL_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };

    case CONVERSATION_CREATED:
      return {
        ...state,
        currentChat: action.payload,
      };
    default:
      return state;
  }
}
