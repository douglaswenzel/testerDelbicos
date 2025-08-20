import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
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
      password,
      confirmPassword,
    });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.inputFixed}
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Sobrenome</Text>
          <TextInput
            style={styles.inputFixed}
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
            style={styles.inputFixed}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.flexItemCpf}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.inputCpf}
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
            style={styles.inputFixed}
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
        <View style={styles.flexItemCity}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.inputFixed}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={styles.flexItemUF}>
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

      {/* Quinta linha: Senha, Confirmar Senha e Botão */}
      <View style={styles.rowPassword}>
        <View style={styles.passwordContainer}>
          <View style={styles.flexItemSmall}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.inputFixed}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.flexItemSmall}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.inputFixed}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonContainerSmall}
            onPress={handleSaveChanges}
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderRadius: 8,
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
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  flexItem: {
    flex: 0.4,
    marginHorizontal: 8, // diminuído
  },
  flexItemCpf: {
    flex: 0.22,
    marginLeft: 8, // diminuído
    marginRight: 0,
  },
  flexItemCity: {
    flex: 0.3,
    marginHorizontal: 8, // diminuído
  },
  flexItemUF: {
    flex: 0.07,
    marginHorizontal: 8, // diminuído
  },
  flexItem2: {
    flex: 0.6,
    marginHorizontal: 8, // diminuído
  },
  flexItem3: {
    flex: 0.3,
    marginHorizontal: 8, // diminuído
  },
  flexItemSmall: {
    flex: 0.4,
    marginHorizontal: 8, // diminuído
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  inputFixed: {
    width: 250,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 4,
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  inputCpf: {
    width: 150,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 4,
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  buttonContainer: {
    margin: 16,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  buttonContainerSmall: {
    marginHorizontal: 4,
    borderRadius: 10,
    overflow: 'hidden',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005A93',
    paddingHorizontal: 20,
    minWidth: 140,
    width: 195,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    marginTop: 24,
  },
  rowPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  passwordContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
});

export default PartnerForm;