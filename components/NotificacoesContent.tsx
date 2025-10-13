import React, { useState, useEffect, useCallback } from 'react';
import { 
    FlatList, 
    StyleSheet, 
    Alert,
    View 
} from 'react-native';
import { 
    Surface, 
    Text, 
    ActivityIndicator, 
    Card, 
    Button,
    useTheme
} from 'react-native-paper'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

// Defina a interface para a notificação
interface Notification {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
    createdAt: string; 
    user_id: number;
}

// *** MUDAR PARA SEU IP LOCAL E PORTA CORRETA ***
const BASE_URL = 'http://localhost:3000/api'; 

interface NotificacoesContentProps {
    userId: string; 
}

const NotificacoesContent: React.FC<NotificacoesContentProps> = ({ userId }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { colors } = useTheme();

    // Função para buscar notificações
    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/notifications/${userId}`);
            setNotifications(response.data);
        } catch (err) {
            setError('Erro ao carregar notificações.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Função para marcar uma notificação como lida
    const markAsRead = useCallback(async (notificationId: number, userId: number) => {
        try {
            await axios.patch(`${BASE_URL}/notifications/read/${userId}`);
            
            // Atualiza o estado local
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId ? { ...notif, is_read: true } : notif
                )
            );
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível marcar a notificação como lida.');
            console.error(err);
        }
    }, []);

    // Função para marcar todas como lidas
    const markAllAsRead = useCallback(async () => {
        try {
            await axios.patch(`${BASE_URL}/notifications/${userId}/read-all`);
            
            // Atualiza o estado local
            setNotifications(prev => 
                prev.map(notif => ({ ...notif, is_read: true }))
            );
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível marcar todas as notificações como lidas.');
            console.error(err);
        }
    }, [userId]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const renderItem = ({ item }: { item: Notification }) => {
        const iconName = item.is_read ? "check-circle-outline" : "alert-circle"; 
        const iconColor = item.is_read ? colors.surfaceVariant : colors.error;

        return (
            <Card 
                style={[styles.card, !item.is_read && styles.unreadCard]}
                onPress={() => !item.is_read && markAsRead(item.id)}
                disabled={item.is_read}
                elevation={item.is_read ? 1 : 2} 
            >
                <Card.Content style={styles.cardContent}>
                    <MaterialCommunityIcons 
                        name={iconName as any} 
                        size={28} 
                        color={iconColor} 
                        style={styles.icon}
                    />
                    <View style={styles.textContainer}>
                        <Text 
                            style={[
                                styles.title, 
                                { color: !item.is_read ? colors.onSurface : colors.onSurfaceVariant }
                            ]}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        <Text 
                            style={[
                                styles.message, 
                                { color: colors.onSurfaceVariant }
                            ]}
                            numberOfLines={2}
                        >
                            {item.message}
                        </Text>
                        <Text style={styles.date}>
                            {new Date(item.createdAt).toLocaleString()}
                        </Text>
                    </View>
                    
                </Card.Content>
            </Card>
        );
    };

    // --- RENDERIZAÇÃO DE ESTADOS ---
    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.centered} />;
    }

    if (error) {
        return <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>;
    }

    if (notifications.length === 0) {
        return <Text style={styles.emptyText}>Você não tem notificações.</Text>;
    }
    
    const unreadCount = notifications.filter(n => !n.is_read).length;

    return (
        <Surface style={styles.container}>
            {unreadCount > 0 && (
                <Button 
                    mode="contained"
                    icon="check-all"
                    onPress={markAllAsRead} 
                    loading={loading}
                    disabled={loading}
                    style={{ marginBottom: 15 }}
                >
                    Marcar {unreadCount} como lidas
                </Button>
            )}
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                contentContainerStyle={styles.listContent}
            />
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: '#fff', 
    },
    unreadCard: {
        borderLeftWidth: 5,
        borderLeftColor: '#FC8200',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        marginRight: 15,
        alignSelf: 'flex-start',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 13,
        lineHeight: 18,
    },
    date: {
        fontSize: 10,
        color: '#aaa',
        marginTop: 6,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontSize: 16,
    }
});

export default NotificacoesContent;