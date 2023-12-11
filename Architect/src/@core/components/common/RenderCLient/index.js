import {View, Text, Image} from 'react-native';
import {styles} from './styles';

const RenderClient = ({user}) => {
  const {profilePicture, first_name, last_name} = user;

  // Check if profile picture is available
  if (profilePicture) {
    return <Image source={{uri: profilePicture}} style={styles.profileImage} />;
  }

  // Generate initials from first_name and last_name
  const initials = `${first_name.charAt(0)}${last_name.charAt(
    0,
  )}`.toUpperCase();

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};

export default RenderClient;
