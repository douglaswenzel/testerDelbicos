import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import MenuNavegacao from '../components/MenuNavegacao';
import TextCostumization from '../components/TextCostumization';

const Configuration = () => {
  const [currentScreen, setCurrentScreen] = useState('DadosConta');
  

  const [fontsLoaded] = useFonts({
    'Inter': Inter_400Regular,
  });


  const renderScreen = () => {
    switch (currentScreen) {
      case 'DadosConta':
        return (
          <TextCostumization style={styles.content}>
            Conteúdo de Dados da Conta
          </TextCostumization>
        );
      case 'MeusAgendamentos':
        return (
          <TextCostumization style={styles.content}>
            Conteúdo de Meus Agendamentos
          </TextCostumization>
        );
      default:
        return (
          <TextCostumization style={styles.content}>
            Selecione uma opção no menu
          </TextCostumization>
        );
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005A93" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MenuNavegacao 
        initialActive={currentScreen}
        onItemSelected={setCurrentScreen}
      />
      
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>

      <StatusBar backgroundColor="#005A93" barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default Configuration;