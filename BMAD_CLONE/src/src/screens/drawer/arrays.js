import {Icons} from '../../components/Icons';
import DrawerScreen from '../DrawerScreen';
import DrawerScreen2 from '../DrawerScreen2';
import {colors} from './constant';
import Connections from '../../../Screens/Connections/Connections';
import ConnectionStack from '../../../Screens/Connections/ConnectionStack';
import ChatStack from '../../../Screens/Chat/ChatStack';
import MyProfileScreen from '../../../Screens/Home/Profile/MyProfileScreen';
import OfferADrink from '../../../Screens/Offer/OfferADrink';
import OutOfDrink from '../../../Screens/Offer/OutOfDrink';
import BottomTab from '../../../BottomTab';
import ProceedToPay from '../../../Screens/Offer/ProceedToPay';
export const ScreensArray2 = [
  {
    route: 'home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: BottomTab,
    notification: 0,
  },
  {
    route: 'connections',
    label: 'Connection',
    type: Icons.AntDesign,
    icon: 'sharealt',
    component: ConnectionStack,
    notification: 0,
  },
  {
    route: 'profile',
    label: 'Profile',
    type: Icons.Feather,
    icon: 'user',
    component: MyProfileScreen,
    notification: 0,
  },
  {
    route: 'ProceedToPay',
    label: 'ProceedToPay',
    type: Icons.Feather,
    icon: 'user',
    component: ProceedToPay,
    notification: 0,
  },
  {
    route: 'Chats',
    label: 'Chats',
    type: Icons.Feather,
    icon: 'user',
    component: ChatStack,
    notification: 0,
  },
  // {
  //   route: 'OfferADrink',
  //   label: 'Offer a drink',
  //   type: Icons.Feather,
  //   icon: 'layers',
  //   component: OfferADrink,
  //   notification: 0,
  // },
];

export const ScreensArray = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: DrawerScreen,
    notification: 0,
  },
  {
    route: 'Inbox',
    label: 'My Inbox',
    type: Icons.Feather,
    icon: 'inbox',
    component: DrawerScreen,
    notification: 9,
  },
  {
    route: 'Calendar',
    label: 'My Calendar',
    type: Icons.Feather,
    icon: 'calendar',
    component: DrawerScreen,
    notification: 4,
  },
  {
    route: 'Documents',
    label: 'My Documents',
    type: Icons.Feather,
    icon: 'layers',
    component: DrawerScreen,
    notification: 0,
  },
  {
    route: 'Activity',
    label: 'My Activity',
    type: Icons.Feather,
    icon: 'pie-chart',
    component: DrawerScreen,
    notification: 2,
  },
  {
    route: 'Settings',
    label: 'Settings',
    type: Icons.Feather,
    icon: 'settings',
    component: DrawerScreen,
    notification: 0,
  },
];

export const ProjectsArray = [
  {
    title: 'Personal',
    icon: 'profile',
    color: colors.icon1,
    iconType: Icons.AntDesign,
  },
  {
    title: 'travel',
    icon: 'profile',
    color: colors.icon2,
    iconType: Icons.AntDesign,
  },
  {
    title: 'Business',
    icon: 'profile',
    color: colors.icon3,
    iconType: Icons.AntDesign,
  },
  {title: 'Add', icon: 'plus', color: colors.icon4, iconType: Icons.AntDesign},
];

export const ProfileMenu = [
  {label: 'History', icon: 'history', iconType: Icons.MaterialIcons},
  {label: 'Rate', icon: 'star', iconType: Icons.MaterialIcons},
  {label: 'Share', icon: 'share', iconType: Icons.MaterialIcons},
  {label: 'Logout', icon: 'logout', iconType: Icons.MaterialIcons},
];
