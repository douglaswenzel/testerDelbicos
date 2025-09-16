import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Modal, Image, Alert, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function DadosContaForm() {
  const [nome, setNome] = useState('Douglas');
  const [sobrenome, setSobrenome] = useState('W.');
  const [cpf, setCpf] = useState('001.112.223-45');
  const [email, setEmail] = useState('douglasw@gmail.com');
  const [telefone, setTelefone] = useState('(15) 95147-89530');


  // Avatar state e animação
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [overlayOpacity] = useState(new Animated.Value(0));

  React.useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert(
          'Permissões necessárias',
          'Precisamos de acesso à câmera e galeria para esta funcionalidade.'
        );
      }
    }
  };


  const handleAvatarPress = () => setShowOptions(true);
  const handleAvatarLongPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, easing: Easing.ease, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, easing: Easing.ease, useNativeDriver: true }),
    ]).start(() => setShowOptions(true));
  };
  const handleHoverIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 1.05, duration: 200, easing: Easing.ease, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 200, easing: Easing.ease, useNativeDriver: true }),
    ]).start();
  };
  const handleHoverOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, easing: Easing.ease, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 200, easing: Easing.ease, useNativeDriver: true }),
    ]).start();
  };

  const handleTakePhoto = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (!result.canceled && result.assets?.length > 0) {
        handleImageSelection(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a câmera.');
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  const handlePickFromGallery = async () => {
    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (!result.canceled && result.assets?.length > 0) {
        handleImageSelection(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível acessar a galeria.');
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  const handleImageSelection = (asset: ImagePicker.ImagePickerAsset) => {
    if (!asset.base64) {
      Alert.alert('Erro', 'Imagem não contém dados base64.');
      return;
    }
    const dataUri = `data:image/jpeg;base64,${asset.base64}`;
    setAvatar(dataUri);
  };

  const removePhoto = () => {
    Alert.alert('Remover foto', 'Tem certeza que deseja remover a foto de perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => setAvatar(null),
      },
    ]);
    setShowOptions(false);
  };

  const handleSaveChanges = () => {
    console.log('Dados Salvos:', { nome, sobrenome, cpf, email, telefone });
  };

  return (
    <View style={styles.formWrapper}>
      <Text style={styles.headerTitle}>Dados da Conta</Text>
      <View style={styles.card}>
        <View style={styles.contentWrapper}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity
              style={styles.profileImagePlaceholder}
              onPress={handleAvatarPress}
              onLongPress={handleAvatarLongPress}
              onPressIn={handleHoverIn}
              onPressOut={handleHoverOut}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              <Animated.View style={{ width: '100%', height: '100%', borderRadius: 60, overflow: 'hidden', backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleAnim }] }}>
                {avatar ? (
                  <Image source={{ uri: avatar }} style={{ width: '100%', height: '100%', borderRadius: 60 }} resizeMode="cover" />
                ) : (
                  <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>{nome[0]}{sobrenome[0]}</Text>
                )}
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 60, alignItems: 'center', justifyContent: 'center', opacity: overlayOpacity }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>{isLoading ? 'Carregando...' : 'Alterar Foto'}</Text>
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
            <Modal visible={showOptions} transparent animationType="fade" onRequestClose={() => setShowOptions(false)}>
              <View style={modalStyles.modalOverlay}>
                <TouchableOpacity style={{flex:1, position:'absolute', width:'100%', height:'100%'}} activeOpacity={1} onPress={() => setShowOptions(false)} />
                <View style={modalStyles.optionsContainer}>
                  <TouchableOpacity style={modalStyles.optionButton} onPress={handleTakePhoto} disabled={isLoading}>
                    <Text style={modalStyles.optionText}>{isLoading ? 'Processando...' : 'Tirar Foto'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={modalStyles.optionButton} onPress={handlePickFromGallery} disabled={isLoading}>
                    <Text style={modalStyles.optionText}>{isLoading ? 'Processando...' : 'Escolher da Galeria'}</Text>
                  </TouchableOpacity>
                  {avatar && (
                    <TouchableOpacity style={[modalStyles.optionButton, modalStyles.removeOption]} onPress={removePhoto} disabled={isLoading}>
                      <Text style={[modalStyles.optionText, modalStyles.removeText]}>Remover Foto</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={[modalStyles.optionButton, modalStyles.cancelOption]} onPress={() => setShowOptions(false)} disabled={isLoading}>
                    <Text style={modalStyles.optionText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.formGrid}>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome} />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={[styles.input, styles.telefoneInput]}
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                  <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    // Flex removido para que o componente ocupe a altura necessária
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d2b36',
    marginBottom: 12,
  },
  card: {
    // Flex removido
    backgroundColor: '#f8fafd',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(51, 153, 255, 0.19)',
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
    padding: 24,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  formGrid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  telefoneInput: {
    borderWidth: 2,
    width: "50%",
  },
  saveButtonContainer: {
    width: '48%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#005A93',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Modal styles (copiados do UserProfile)
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  optionButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  removeOption: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  removeText: {
    color: '#FF3B30',
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
});