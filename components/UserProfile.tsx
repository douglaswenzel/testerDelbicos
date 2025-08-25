import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  Modal,
  Animated,
  Easing,
  Alert,
} from 'react-native';
const EditIcon = require("../assets/edit.png");

interface UserProfileProps {
  userName?: string;
  address?: string;
  avatarSource?: ImageSourcePropType;
  logoSource?: ImageSourcePropType;
  onEditPress?: () => void;
  onAvatarChange?: (newAvatar: string) => void;
  onTakePhoto?: () => void;
  onPickFromGallery?: () => void;
  style?: ViewStyle;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userName = 'Douglas W.',
  address = 'Rua Alvorada de Minas, 1972\nRio de Janeiro-RJ\n23585-500',
  avatarSource,
  logoSource,
  onEditPress,
  onAvatarChange,
  onTakePhoto,
  onPickFromGallery,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [overlayOpacity] = useState(new Animated.Value(0));

  const handleAvatarPress = () => {
    setShowOptions(true);
  };

  const handleAvatarLongPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowOptions(true);
    });
  };

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTakePhoto = () => {
    if (onTakePhoto) {
      onTakePhoto();
    } else {
      Alert.alert(
        'Tirar Foto',
        'Funcionalidade de câmera será implementada aqui.',
        [{ text: 'OK' }]
      );
    }
    setShowOptions(false);
  };

  const handlePickFromGallery = () => {
    if (onPickFromGallery) {
      onPickFromGallery();
    } else {
      Alert.alert(
        'Escolher da Galeria',
        'Funcionalidade de galeria será implementada aqui.',
        [{ text: 'OK' }]
      );
    }
    setShowOptions(false);
  };

  const removePhoto = () => {
    Alert.alert(
      'Remover foto',
      'Tem certeza que deseja remover a foto de perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            onAvatarChange?.('');
            setShowOptions(false);
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleAvatarPress}
            onLongPress={handleAvatarLongPress}
            onPressIn={handleHoverIn}
            onPressOut={handleHoverOut}
            activeOpacity={0.9}
          >
            <Animated.View 
              style={[
                styles.avatarCircle,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
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

              <Animated.View 
                style={[
                  styles.avatarOverlay,
                  { opacity: overlayOpacity }
                ]}
              >
                <Text style={styles.overlayText}>Alterar Foto</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
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
              <Image source={EditIcon} style={styles.editIconImage}/>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.optionText}>Tirar Foto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handlePickFromGallery}
            >
              <Text style={styles.optionText}>Escolher da Galeria</Text>
            </TouchableOpacity>
            
            {avatarSource && (
              <TouchableOpacity 
                style={[styles.optionButton, styles.removeOption]}
                onPress={removePhoto}
              >
                <Text style={[styles.optionText, styles.removeText]}>Remover Foto</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.optionButton, styles.cancelOption]}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.optionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
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
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 79,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
    padding: 1,
    marginTop: -45
  },
  editIconImage: {
    width: 20,
    height: 20,
    tintColor: '#FC8200',
  },
  address: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000000',
    flex: 1,
    marginRight: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  removeOption: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  removeText: {
    color: '#FF3B30',
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
});

export default UserProfile;