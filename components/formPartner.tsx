import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Alert,
} from 'react-native';

const PartnerForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <View style={styles.formContainer}>
      <Text style={styles.title}>Cadastro de Parceiro</Text>

      {/* Primeira linha: Nome, Sobrenome, Telefone */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Sobrenome</Text>
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Segunda linha: E-mail, CPF */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Terceira linha: Endereço, Número, Bairro, CEP */}
      <View style={styles.row}>
        <View style={styles.flexItem2}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.flexItem3}>
          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            placeholder="Nº"
            value={streetNumber}
            onChangeText={setStreetNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.flexItem2}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
        </View>
        <View style={styles.flexItem3}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Quarta linha: Cidade, UF */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>UF</Text>
          <TextInput
            style={styles.input}
            placeholder="UF"
            value={state}
            onChangeText={setState}
            maxLength={2}
            autoCapitalize="characters"
          />
        </View>
      </View>

      {/* Quinta linha: Senha, Confirmar Senha */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* Botão */}
      <View style={styles.buttonContainer}>
        <Button
          title="Salvar Alterações"
          onPress={handleSaveChanges}
          color="#007BFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical: 40,
    paddingHorizontal: 16,
    minHeight: '80%',
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
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  flexItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  flexItem2: {
    flex: 2,
    marginHorizontal: 4,
  },
  flexItem3: {
    flex: 1.2,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 4,
    color: '#444',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 4,
    fontSize: 20,
  },
  buttonContainer: {
    margin: 16,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
});

export default PartnerForm;