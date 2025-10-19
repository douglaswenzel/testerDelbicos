// MenuNavegacao.tsx (Corrigido para React Native)
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'; // ⬅️ IMPORTAÇÕES NATIVAS
import TextCostumization from './TextCostumization';

type MenuNavegacaoProps = {
  onItemSelected?: (screen: string) => void;
  initialActive?: string;
};

type MenuItem = {
  id: number;
  title: string;
  screen: string;
};

const menuItems: MenuItem[] = [
    { id: 1, title: 'Conta', screen: 'DadosContaForm' },
    { id: 2, title: 'Endereços', screen: 'MeusEnderecos' },
    { id: 3, title: 'Segurança', screen: 'TrocarSenhaForm' },
    { id: 4, title: 'Agendamentos', screen: 'MeusAgendamentos' },
    { id: 5, title: 'Notificações', screen: 'Notificacoes' },
    { id: 6, title: 'Conversas', screen: 'Conversas' },
    { id: 7, title: 'Favoritos', screen: 'Favoritos' },
    { id: 8, title: 'Avaliações', screen: 'Avaliacoes' },
    { id: 9, title: 'Histórico', screen: 'Historico' },
    { id: 10, title: 'Pagamentos', screen: 'Pagamentos' },
    { id: 11, title: 'Ajuda', screen: 'Ajuda' },
];


const MenuNavegacao: React.FC<MenuNavegacaoProps> = ({
  onItemSelected,
  initialActive = 'DadosConta',
}) => {
  const [activeItem, setActiveItem] = useState(initialActive);

  useEffect(() => {
    setActiveItem(initialActive);
  }, [initialActive]);

  const handlePress = (screen: string) => {
    setActiveItem(screen);
    if (onItemSelected) {
      onItemSelected(screen);
    }
  };

  return (
    // Usa <View> no lugar de <div>
    <View style={styles.menuContainer}> 
      {menuItems.map((item) => {
        const isActive = item.screen === activeItem;
        
        // Usa TouchableOpacity no lugar de <button>
        return (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.menuItem,
              isActive ? styles.activeMenuItem : styles.inactiveMenuItem,
            ]}
            onPress={() => handlePress(item.screen)}
          >
            {/* Usa o TextCostumization corrigido */}
            <TextCostumization
              style={[
                styles.menuText,
                isActive ? styles.activeMenuText : {},
              ]}
            >
              {item.title}
            </TextCostumization>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Estilos convertidos para React Native StyleSheet
const styles = StyleSheet.create({
    menuContainer: {
        marginVertical: 20, // '20px 0' -> marginVertical
        width: '100%',     // maxWidth: '100%'
        // React Native não precisa de display: 'flex' (é o padrão)
    },
    menuItem: {
        width: "90%",
        height: 41,
        borderRadius: 20,
        marginBottom: 17,
        flexDirection: 'row', // Para alinhar itens horizontalmente (display: flex)
        alignItems: 'center',
        paddingLeft: 15,
        // Propriedades web removidas: cursor, userSelect, border, background
    },
    // Inativo: neutro claro; Ativo: laranja (mock)
    activeMenuItem: {
        backgroundColor: '#FC8200',
    },
    inactiveMenuItem: {
        backgroundColor: '#e8eef5',
    },
    menuText: {
        fontSize: 23,
        fontWeight: '400',
        color: '#222',
    },
    activeMenuText: {
        color: '#fff',
    },
});

export default MenuNavegacao;