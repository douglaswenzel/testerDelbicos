import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';

import MenuNavegacao from '../components/MenuNavegacao';
import UserProfile, { UserProfileProps } from '../components/UserProfile';
import AlterarEnderecoForm from '../components/AlterarEnderecoForm';

interface ConfigurationProps {
  user: UserProfileProps
}

const Configuration = ({user}: ConfigurationProps) => {
  const [currentScreen, setCurrentScreen] = useState('MeusEnderecos');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'MeusEnderecos':
        return <AlterarEnderecoForm />;

      default:
        return <Text style={styles.contentText}>Selecione uma opção no menu</Text>;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho superior (se houver) */}
      <View style={styles.header}>
        <UserProfile {...user} />
      </View>

      {/* Wrapper principal que contém o menu lateral e o conteúdo */}
      <View style={styles.bodyWrapper}>
        {/* Seção do menu lateral */}
        <View style={styles.menuSection}>
          <MenuNavegacao initialActive={currentScreen} onItemSelected={setCurrentScreen} />
        </View>

        {/* Seção do conteúdo principal */}
        <View style={styles.mainContent}>
          {renderScreen()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que a tela ocupe todo o espaço vertical
    backgroundColor: '#dde6f0',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bodyWrapper: {
    flex: 1, // Permite que esta View ocupe o espaço vertical restante
    flexDirection: 'row', // Alinha o menu e o conteúdo lado a lado
  },
  menuSection: {
    width: 250, // Largura fixa do menu lateral
    backgroundColor: '#f0f2f5',
    paddingVertical: 20,
  },
  mainContent: {
    flex: 1, // Faz com que esta View ocupe todo o espaço horizontal restante.
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default Configuration;