
import React, { useState } from 'react';
import MenuNavegacao from '../components/MenuNavegacao';
import UserProfile from '../components/UserProfile';
import Formnovo from '../components/Formnovo';


const Configuration = () => {
  const [currentScreen, setCurrentScreen] = useState('DadosConta');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'DadosConta':
        return <Formnovo />;
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
        <MenuNavegacao
          initialActive={currentScreen}
          onItemSelected={setCurrentScreen}
        />
      </div>
      <div style={mainContentStyle}>
        {renderScreen()}
      </div>
    </div>
  );
};

// Estilos web
const containerStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
  background: '#dde6f0',
  justifyContent: 'center',
  alignItems: 'flex-start',
};
const sidebarStyle: React.CSSProperties = {
  width: 320,
  minHeight: '100vh',
  background: '#fff',
  boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px 0',
};
const mainContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '48px 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
const contentStyle: React.CSSProperties = {
  fontSize: 18,
  textAlign: 'center',
  color: '#333',
};

export default Configuration;