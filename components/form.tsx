import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Alert,
} from 'react-native';

const PartnerForm = () => {
  // State variables for each form field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState(''); // CPF is a specific document, so the name is kept
  const [address, setAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to be called when the button is pressed
  const handleSaveChanges = () => {
    Alert.alert('Formulário Enviado', 'Os dados foram registrados no console.');
    
    console.log({
        firstName,
        lastName,
        phone,
        email,
        cpf,
        address,
        streetNumber,
        neighborhood,
        zipCode,
        city,
        state,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cadastro de Parceiro</Text>

        {/* --- DADOS PESSOAIS --- */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
        />

        {/* --- DOCUMENTOS E CONTATO --- */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1.5, marginRight: 8 }]}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
        </View>

        {/* --- ENDEREÇO --- */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 3, marginRight: 8 }]}
            placeholder="Endereço (Rua, Av...)"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nº"
            value={streetNumber}
            onChangeText={setStreetNumber}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
            <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="Bairro"
                value={neighborhood}
                onChangeText={setNeighborhood}
            />
            <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="CEP"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="numeric"
            />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 3, marginRight: 8 }]}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="UF"
            value={state}
            onChangeText={setState}
            maxLength={2}
            autoCapitalize="characters"
          />
        </View>

        {/* --- SENHA --- */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* --- BOTÃO --- */}
        <View style={styles.buttonContainer}>
            <Button
                title="Salvar Alterações"
                onPress={handleSaveChanges}
                color="#007BFF"
            />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Folha de estilos para o formulário
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 24,
    textAlign: 'center',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
      margin: 16,
      marginTop: 20,
      borderRadius: 8,
      overflow: 'hidden',
  }
});

export default PartnerForm;