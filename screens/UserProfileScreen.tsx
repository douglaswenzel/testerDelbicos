import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import UserProfile from '../components/UserProfile';
import Configuration from './configuration';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  avatarImg: string;
  bannerImg: string;
  createdAt: string;
  updatedAt: string;
}

const UserProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const userId = '3';

  const loadSavedAvatar = async (apiAvatar: string) => {
    try {
      if (Platform.OS !== 'web') {
        const userImageDir = `${FileSystem.documentDirectory}userImages/${userId}`;
        const avatarPath = `${userImageDir}/avatar.jpg`;

        const fileInfo = await FileSystem.getInfoAsync(avatarPath);

        if (fileInfo.exists) {
          setAvatarUri(avatarPath);
        } else {
          setAvatarUri(apiAvatar);
        }
      } else {
        const storageKey = `userImages/${userId}/avatar.jpg`;
        const savedBase64 = localStorage.getItem(storageKey);

        if (savedBase64) {
          setAvatarUri(`data:image/jpeg;base64,${savedBase64}`);
        } else {
          setAvatarUri(apiAvatar);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar avatar salvo:', error);
      setAvatarUri(apiAvatar);
    }
  };

  const saveAvatar = async (userId: string, base64Image: string) => {
    try {
      if (Platform.OS !== 'web') {
        const userImageDir = `${FileSystem.documentDirectory}userImages/${userId}`;
        const avatarPath = `${userImageDir}/avatar.jpg`;

        const dirInfo = await FileSystem.getInfoAsync(userImageDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(userImageDir, { intermediates: true });
        }

        await FileSystem.writeAsStringAsync(avatarPath, base64Image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setAvatarUri(avatarPath);
      } else {
        const storageKey = `userImages/${userId}/avatar.jpg`;
        localStorage.setItem(storageKey, base64Image);
        setAvatarUri(`data:image/jpeg;base64,${base64Image}`);
      }

      console.log('✅ Avatar salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
      Alert.alert('Erro', 'Não foi possível salvar a imagem do usuário.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clients/${userId}`);
        if (!response.ok) throw new Error('Erro ao buscar usuário');

        const data: User = await response.json();
        setUserData(data);

        await loadSavedAvatar(data.avatarImg);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FC8200" />
      </View>
    );
  }

  if (!userData) return null;

  return (
    <Configuration 
      user={{ 
        userId: String(userData.id), 
        userName: userData.name, 
        avatarSource: { uri: avatarUri || userData.avatarImg },
        onAvatarChange: (base64: string) => saveAvatar(userId, base64)
      }}
    />
  );
};

export default UserProfileScreen;
