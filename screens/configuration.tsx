
import React, { useState } from 'react';
import MenuNavegacao from '../components/MenuNavegacao';
import UserProfile from '../components/UserProfile';
import AltEndereco from '../components/AltEndereco';
import Formnovo from '../components/Formnovo';


const Configuration = () => {
  const [currentScreen, setCurrentScreen] = useState('DadosConta');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'DadosConta':
        return <AltEndereco />;
      case 'MeusAgendamentos':
        return <div style={contentStyle}>Conteúdo de Meus Agendamentos</div>;
      default:
        return <div style={contentStyle}>Selecione uma opção no menu</div>;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <UserProfile />
      </div>
      <div style ={secondSection}>
        <MenuNavegacao initialActive = {currentScreen} onItemSelected={setCurrentScreen} />
        <div style={mainContentStyle}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

// Estilos web
const containerStyle: React.CSSProperties = {
  display: 'flex',
  background: '#dde6f0',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
};
const sidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '32px 0',
};
const mainContentStyle: React.CSSProperties = {
  flex: 1,
  // display: 'flex',
  // flexDirection: 'column',
  background: 'black',
  backgroundColor: 'transparent',
  width: 1100,
  alignItems: 'center',
  justifyContent: 'center',
};
const contentStyle: React.CSSProperties = {
  fontSize: 18,
  textAlign: 'center',
  color: '#333',
};

const secondSection: React.CSSProperties = {
  flexDirection: 'row',
  display: 'flex',
  width: '100%',
}

export default Configuration;