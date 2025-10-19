import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Platform, 
    ScrollView, 
    Dimensions,
    ScaledSize, 
    TouchableOpacity, 
} from 'react-native';

// Assumindo que você usa este pacote para ícones
import { Ionicons } from '@expo/vector-icons'; 

// Importações dos componentes (Ajuste os caminhos se necessário)
import MenuNavegacao from '../components/MenuNavegacao';
import AlterarEnderecoForm from '../components/AlterarEnderecoForm';
import DadosContaForm from '../components/DadosContaForm';
import TrocarSenhaForm from '../components/TrocarSenhaForm';
import NotificacoesContent from '../components/NotificacoesContent';

// --- DEFINIÇÕES DE PROPRIEDADES E TELAS ---

interface UserProfileProps {
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    avatarSource: { uri: string | null };
    onAvatarChange: (base64: string | null) => Promise<void>;
    uploading?: boolean;
}

// VARIÁVEIS GLOBAIS
const VIRTUALIZED_SCREENS = ['Notificacoes']; 
const MIN_LARGE_SCREEN_WIDTH = 768; 

// --- COMPONENTE PRINCIPAL ---

const Configuration: React.FC<{ user: UserProfileProps }> = ({ user }) => {
    const [currentScreen, setCurrentScreen] = useState('MeusEnderecos');
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [screenSize, setScreenSize] = useState<ScaledSize>(Dimensions.get('window'));

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setScreenSize(window);
            if (window.width >= MIN_LARGE_SCREEN_WIDTH) {
                 setIsMenuOpen(false);
            }
        };
        
        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription.remove();
    }, []);

    const isLargeScreen = screenSize.width >= MIN_LARGE_SCREEN_WIDTH;

    // Função que renderiza o conteúdo da tela selecionada
    const renderScreen = () => {
        switch (currentScreen) {
            case 'MeusEnderecos':
                return <AlterarEnderecoForm />;
            case 'DadosContaForm':
                return <DadosContaForm user={user} />;
            case 'TrocarSenhaForm':
                return <TrocarSenhaForm />;
            case 'Notificacoes':
                // Nota: O Modal dentro deste componente exige que o componente raiz (App.tsx) use PaperProvider e Portal.Host.
                return <NotificacoesContent userId={user.userId}/>;
            default:
                return <Text style={styles.contentText}>Selecione uma opção no menu</Text>;
        }
    };

    const isVirtualizedScreen = VIRTUALIZED_SCREENS.includes(currentScreen);
    const MainContainer = isVirtualizedScreen ? View : ScrollView; 

    return (
        <MainContainer style={styles.container}>
            
            {!isLargeScreen && (
                <View style={styles.headerMobile}>
                    <Text style={styles.headerTitle}>Minha Conta</Text>
                    <TouchableOpacity 
                        onPress={() => setIsMenuOpen(prev => !prev)}
                        style={styles.hamburgerButton}
                    >
                        <Ionicons 
                            name={isMenuOpen ? "close-outline" : "menu-outline"} 
                            size={32} 
                            color="#333" 
                        />
                    </TouchableOpacity>
                </View>
            )}
            
            <View style={[
                styles.bodyWrapper,
                !isLargeScreen && styles.bodyWrapperMobile 
            ]}>
                
                {(isLargeScreen || isMenuOpen) && (
                    <View style={isLargeScreen ? styles.menuSection : styles.menuSectionMobileFull}> 
                        <MenuNavegacao 
                            initialActive={currentScreen} 
                            onItemSelected={(screen) => {
                                setCurrentScreen(screen);
                                !isLargeScreen && setIsMenuOpen(false); 
                            }} 
                        />
                    </View>
                )}

                {(!isMenuOpen || isLargeScreen) && (
                    <View style={styles.mainContent}>
                        {renderScreen()}
                    </View>
                )}
            </View>
        </MainContainer>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dde6f0',
    },
    headerMobile: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            android: { elevation: 4 },
            ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }
        }),
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    hamburgerButton: {
        padding: 5,
    },
    
    bodyWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    bodyWrapperMobile: {
        flexDirection: 'column',
    },

    menuSection: {
        width: 250, 
        flex: 1,
        backgroundColor: '#f0f2f5',
        paddingVertical: 20,
    },
    
    menuSectionMobileFull: {
        width: '100%', 
        flex: 1, 
        backgroundColor: '#f0f2f5',
        paddingVertical: 10,
    },
    
    mainContent: {
        flex: 1, 
        padding: 20,
    },
    
    contentText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
});

export default Configuration;