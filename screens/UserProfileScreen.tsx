import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import UserProfile from '../components/UserProfile';
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

  const userId = '3';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar usuário');
        }

        const data: User = await response.json();
        setUserData(data);
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

  if (!userData) {
    return null; 
  }

  return (
    <UserProfile
      userId={String(userData.id)}
      userName={userData.name}
      avatarSource={{ uri: userData.avatarImg }}
    />
  );
};

export default UserProfileScreen;
