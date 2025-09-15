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
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
const EditIcon = require("../assets/edit.png");

export interface UserProfileProps {
  userName?: string;
  address?: string;
  avatarSource?: ImageSourcePropType;
  logoSource?: ImageSourcePropType;
  userId: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  React.useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { status: libraryStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert('Permissões necessárias', 'Precisamos de acesso à câmera e galeria para esta funcionalidade.');
      }
    }
  };

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

  const handleTakePhoto = async () => {
    if (onTakePhoto) {
      onTakePhoto();
      setShowOptions(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      console.log('Resultado da câmera:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        await handleImageSelection(selectedAsset);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Erro', 'Não foi possível acessar a câmera.');
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  const handlePickFromGallery = async () => {
    if (onPickFromGallery) {
      onPickFromGallery();
      setShowOptions(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      console.log('Resultado da galeria:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        await handleImageSelection(selectedAsset);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erro', 'Não foi possível acessar a galeria.');
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  const handleImageSelection = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      let imageUri = asset.uri;

      console.log('Asset recebido:', asset);
      console.log('URI original:', asset.uri);
      console.log('Base64 disponível:', !!asset.base64);

      if (Platform.OS === 'web') {
        console.log('Plataforma: Web');
        if (asset.base64) {
          imageUri = `data:image/jpeg;base64,${asset.base64}`;
          console.log('URI convertida para base64:', imageUri.substring(0, 50) + '...');
        } else {
          console.log('Base64 não disponível, usando URI original');
        }
      } else {
        console.log('Plataforma: Mobile');
        const fileName = imageUri.split('/').pop();
        const newPath = `${FileSystem.documentDirectory}${fileName}`;
        
        console.log('Copiando arquivo para:', newPath);
        
        await FileSystem.copyAsync({
          from: imageUri,
          to: newPath,
        });
        
        imageUri = newPath;
        console.log('Arquivo copiado com sucesso');
      }

      console.log('Definindo nova imagem:', imageUri);
      setSelectedAvatar(imageUri);
      
      if (onAvatarChange) {
        onAvatarChange(imageUri);
      }
      
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem.');
    }
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
            setSelectedAvatar(null);
            if (onAvatarChange) {
              onAvatarChange('');
            }
            setShowOptions(false);
          },
        },
      ]
    );
  };

  const getAvatarSource = () => {
    if (selectedAvatar) {
      return { uri: selectedAvatar };
    }
    
    if (avatarSource) {
      if (typeof avatarSource === 'string') {
        return { uri: avatarSource };
      }
      return avatarSource;
    }
    
    return null;
  };

  const currentAvatarSource = getAvatarSource();

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
            disabled={isLoading}
          >
            <Animated.View 
              style={[
                styles.avatarCircle,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              {currentAvatarSource ? (
                <Image 
                  source={currentAvatarSource} 
                  style={styles.avatarImage}
                  resizeMode="cover"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', e.nativeEvent.error);
                    setSelectedAvatar(null);
                  }}
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
                <Text style={styles.overlayText}>
                  {isLoading ? 'Carregando...' : 'Alterar Foto'}
                </Text>
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
              disabled={isLoading}
            >
              <Text style={styles.optionText}>
                {isLoading ? 'Processando...' : 'Tirar Foto'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={handlePickFromGallery}
              disabled={isLoading}
            >
              <Text style={styles.optionText}>
                {isLoading ? 'Processando...' : 'Escolher da Galeria'}
              </Text>
            </TouchableOpacity>
            
            {(currentAvatarSource || selectedAvatar) && (
              <TouchableOpacity 
                style={[styles.optionButton, styles.removeOption]}
                onPress={removePhoto}
                disabled={isLoading}
              >
                <Text style={[styles.optionText, styles.removeText]}>Remover Foto</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.optionButton, styles.cancelOption]}
              onPress={() => setShowOptions(false)}
              disabled={isLoading}
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
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
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