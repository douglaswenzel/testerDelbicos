
import React, { useState } from 'react';
import TextCostumization from './TextCostumization';
import Formnovo from './Formnovo';

type MenuNavegacaoProps = {
  onItemSelected?: (screen: string) => void;
  initialActive?: string;
};

type MenuItem = {
  id: number;
  title: string;
  screen: string;
};


const MenuNavegacao: React.FC<MenuNavegacaoProps> = ({
  onItemSelected,
  initialActive = 'DadosConta',
}) => {
  const [activeItem, setActiveItem] = useState(initialActive);

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

  // Estilos para web
  const menuContainer: React.CSSProperties = {
    margin: '20px 0',
    maxWidth: '100%',
  };
  const menuItem: React.CSSProperties = {
    width: 259,
    height: 41,
    borderRadius: 20,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    background: 'none',
  };
  const activeMenuItem: React.CSSProperties = {
    backgroundColor: '#005A93',
  };
  const inactiveMenuItem: React.CSSProperties = {
    backgroundColor: '#FC8200',
  };
  const menuText: React.CSSProperties = {
    fontSize: 23,
    fontWeight: 400,
    color: '#000',
  };
  const activeMenuText: React.CSSProperties = {
    color: '#fff',
  };

  return (
    <div>
      <div style={menuContainer}>
        {menuItems.map((item) => {
          const isActive = item.screen === activeItem;
          return (
            <button
              key={item.id}
              style={{
                ...menuItem,
                ...(isActive ? activeMenuItem : inactiveMenuItem),
              }}
              onClick={() => handlePress(item.screen)}
            >
              <TextCostumization
                style={{
                  ...menuText,
                  ...(isActive ? activeMenuText : {}),
                }}
              >
                {item.title}
              </TextCostumization>
            </button>
          );
        })}
      </div>
      <Formnovo />
    </div>
  );
};

export default MenuNavegacao;