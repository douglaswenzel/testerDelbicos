import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import TextCostumization from './TextCostumization';

type MenuItem = {
  id: number;
  title: string;
  screen: string;
};

type MenuNavegacaoProps = {
  onItemSelected?: (screen: string) => void;
  initialActive?: string;
};

const MenuNavegacao: React.FC<MenuNavegacaoProps> = ({ 
  onItemSelected, 
  initialActive = 'DadosConta' 
}) => {
  const [activeItem, setActiveItem] = useState(initialActive);
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
  });

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Dados da Conta', screen: 'DadosConta' },
    { id: 2, title: 'Meus Agendamentos', screen: 'MeusAgendamentos' },
    { id: 3, title: 'Notificações', screen: 'Notificacoes' },
    { id: 4, title: 'Conversas', screen: 'Conversas' },
    { id: 5, title: 'Favoritos', screen: 'Favoritos' },
    { id: 6, title: 'Avaliações', screen: 'Avaliacoes' },
    { id: 7, title: 'Histórico', screen: 'Historico' },
    { id: 8, title: 'Pagamentos', screen: 'Pagamentos' },
    { id: 9, title: 'Ajuda', screen: 'Ajuda' },
  ];

  const handlePress = (screen: string) => {
    setActiveItem(screen);
    if (onItemSelected) {
      onItemSelected(screen);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            item.screen === activeItem 
              ? styles.activeMenuItem 
              : styles.inactiveMenuItem
          ]}
          onPress={() => handlePress(item.screen)}
        >
          <TextCostumization 
            style={[
              styles.menuText,
              item.screen === activeItem && styles.activeMenuText
            ]}
          >
            {item.title}
          </TextCostumization>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 20,
    maxWidth: '100%',
  },
  menuItem: {
    width: 259,
    height: 41,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  activeMenuItem: {
    backgroundColor: '#005A93',
  },
  inactiveMenuItem: {
    backgroundColor: '#FC8200',
  },
  menuText: {
    fontSize: 23,
    fontWeight: '400',
    color: '#000000',
  },
  activeMenuText: {
    color: '#FFFFFF',
  },
});

export default MenuNavegacao;