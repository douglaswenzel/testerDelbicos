import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import MenuNavegacao from '../components/MenuNavegacao';
import TextCostumization from '../components/TextCostumization';
import PartnerForm from '../components/formPartner';

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
            <PartnerForm />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1200,
    flexDirection: 'row',
    backgroundColor: '#DDE6F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
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