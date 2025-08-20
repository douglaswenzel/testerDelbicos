import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
const EditIcon = require ("../assets/edit.png");

interface UserProfileProps {
  userName?: string;
  address?: string;
  avatarSource?: ImageSourcePropType;
  logoSource?: ImageSourcePropType;
  onEditPress?: () => void;
  style?: ViewStyle;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userName = 'Douglas W.',
  address = 'Rua Alvorada de Minas, 1972\nRio de Janeiro-RJ\n23585-500',
  avatarSource,
  logoSource,
  onEditPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              {avatarSource ? (
                <Image 
                  source={avatarSource} 
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  {logoSource ? (
                    <Image 
                      source={logoSource} 
                      style={styles.logoImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.avatarText}>
                      {userName.split(' ').map(name => name[0]).join('')}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{userName}</Text>
            

          </View>
          <View style={styles.userAddress}>
            <Text style={styles.address}>
              {address}
            </Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={onEditPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.editIcon}>
                <Image source={EditIcon} style={styles.editIcon}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 529,
    height: 161,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarSection: {
    marginRight: 20,
  },
  avatarContainer: {
    width: 179,
    height: 158,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: '#FC8200',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarImage: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  avatarPlaceholder: {
    width: 152,
    height: 152,
    borderRadius: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logoImage: {
    width: 142,
    height: 142,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  userAddress: {
    flexDirection: 'row',
    width: 529,
  },
  userName: {
    fontFamily: 'Inter',
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 44,
    color: '#000000',
    marginRight: 12,
  },
  editButton: {
    padding: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editIconLine: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: '#FC8200',
  },
  editIconLineRotated: {
    transform: [{ rotate: '90deg' }],
  },
  address: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000000',
    marginTop: 4,
  },
});

export default UserProfile;