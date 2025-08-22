


import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import TextCostumization from "./TextCostumization";

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function Formnovo() {
  const [form, setForm] = useState({
    nome: "Douglas",
    sobrenome: "W.",
    telefone: "(15) 95147-89530",
    email: "douglasw@gmail.com",
    cpf: "001.112.223-45",
    endereco: "Rua Alvorada de Minas",
    numero: "1972",
    bairro: "Jardim Alvorada",
    cep: "23585-500",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    senha: "********************",

    confirmarSenha: "********************"
  });

  function handleChange(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit() {
    // Adicione lógica de envio aqui
    Alert.alert("Alterações salvas!");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        {/* Primeira linha */}

        <View style={styles.row}>
          <View style={styles.inputColNome}>
            <Text style={styles.label}><TextCostumization>Nome</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.nome}
              onChangeText={text => handleChange("nome", text)}
              placeholder="Nome"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputColSobrenome}>
            <Text style={styles.label}><TextCostumization>Sobrenome</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.sobrenome}
              onChangeText={text => handleChange("sobrenome", text)}
              placeholder="Sobrenome"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputColTelefone}>
            <Text style={styles.label}><TextCostumization>Telefone</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.telefone}
              onChangeText={text => handleChange("telefone", text)}
              placeholder="Telefone"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Segunda linha */}

        <View style={styles.row}>
          <View style={styles.inputColSenha}>
            <Text style={styles.label}><TextCostumization>E-mail</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={text => handleChange("email", text)}
              placeholder="E-mail"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputColCpf}>
            <Text style={styles.label}><TextCostumization>CPF</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.cpf}
              onChangeText={text => handleChange("cpf", text)}
              placeholder="CPF"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputColCep}>
            <Text style={styles.label}><TextCostumization>CEP</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.cep}
              onChangeText={text => handleChange("cep", text)}
              placeholder="CEP"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputColEndereco}>
            <Text style={styles.label}><TextCostumization>Endereço</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.endereco}
              onChangeText={text => handleChange("endereco", text)}
              placeholder="Endereço"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputColNumero}>
            <Text style={styles.label}><TextCostumization>Número</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.numero}
              onChangeText={text => handleChange("numero", text)}
              placeholder="Número"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputColBairro}>
            <Text style={styles.label}><TextCostumization>Bairro</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.bairro}
              onChangeText={text => handleChange("bairro", text)}
              placeholder="Bairro"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        {/* Quarta linha */}
        <View style={styles.row}>
          <View style={styles.inputColCidade}>
            <Text style={styles.label}><TextCostumization>Cidade</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.cidade}
              onChangeText={text => handleChange("cidade", text)}
              placeholder="Cidade"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputColUf}>
            <Text style={styles.label}><TextCostumization>UF</TextCostumization></Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.uf}
                onValueChange={(value: string) => handleChange("uf", value)}
                style={styles.picker}
                dropdownIconColor="#222"
                mode={Platform.OS === 'ios' ? 'dropdown' : 'dialog'}
              >
                {estados.map(uf => (
                  <Picker.Item key={uf} label={uf} value={uf} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Quinta linha */}
        <View style={styles.row}>
          <View style={styles.inputColSenha}>
            <Text style={styles.label}><TextCostumization>Senha</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.senha}
              onChangeText={text => handleChange("senha", text)}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry
            />
          </View>
          <View style={styles.inputColConfirmarSenha}>
            <Text style={styles.label}><TextCostumization>Confirmar Senha</TextCostumization></Text>
            <TextInput
              style={styles.input}
              value={form.confirmarSenha}
              onChangeText={text => handleChange("confirmarSenha", text)}
              placeholder="Confirmar Senha"
              placeholderTextColor="#aaa"
              secureTextEntry
            />
          </View>
          <View style={styles.buttonCol}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f3f6fa',
      paddingVertical: 24,
      alignItems: 'center',
      minHeight: 700,
    },
    formWrapper: {
      backgroundColor: '#fff',
      borderRadius: 8,
      width: '97%',
      maxWidth: 1100,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: '#bdbdbd',
      marginBottom: 30,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: 18,
      flexWrap: 'wrap',
    },
    // Primeira linha: 3 campos iguais
    inputColNome:{
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    inputColSobrenome:{
      flexBasis: '38%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    inputColTelefone: {
      minWidth: 200,
      maxWidth: 200,
      marginRight: 0,
      alignItems: 'flex-start',
    },
      // Segunda linha: E-mail (maior), CPF (menor)
    inputColEmail: {
      flexBasis: '65%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },

    inputColCpf:{
      flexBasis: '35%',
      minWidth: 180,
      maxWidth: 180,
      marginRight: 0,
      alignItems: 'flex-start',
    },
    inputColCep: {
      flexBasis: '100%',
      minWidth: 100,
      maxWidth: 140,
      marginRight: 0,
      alignItems: 'flex-start',
      marginLeft: 18,
    },
      // Terceira linha: Endereço (maior), Número (menor), Bairro (maior), CEP (menor)
    inputColEndereco: {
      flexBasis: '38%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    inputColNumero: {
      flexBasis: '15%',
      minWidth: 80,
      maxWidth: 110,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    inputColBairro: {
      flexBasis: '27%',
      minWidth: 150,
      maxWidth: 200,
      marginRight: 18,
      alignItems: 'flex-start',
    },

    // Quarta linha: Cidade (maior), UF (menor)
    inputColUf: {
      flexBasis: '25%',
      minWidth: 80,
      maxWidth: 110,
      marginRight: 0,
      alignItems: 'flex-start',
    },
        inputColCidade: {
      flexBasis: '70%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    // Quinta linha: Senha (maior), Confirmar Senha (maior), Botão (menor)
    inputColSenha: {
      flexBasis: '40%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    inputColConfirmarSenha: {
      flexBasis: '40%',
      minWidth: 230,
      maxWidth: 230,
      marginRight: 18,
      alignItems: 'flex-start',
    },
    buttonCol: {
      minWidth: 10,
      maxWidth: 10,
      alignSelf: 'center',
      alignItems: 'center',
      height: 55,
      marginLeft: 100,
      marginTop: 20,
    },

    label: {
      marginBottom: 4,
      fontWeight: '500',
      fontSize: 13,
      color: '#222',
    },
    input: {
      width: '100%',
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderWidth: 1.5,
      borderColor: '#bdbdbd',
      borderRadius: 7,
      fontSize: 20,
      fontWeight: '700',
      backgroundColor: '#fff',
      marginBottom: 0,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.13,
          shadowRadius: 6,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    button: {
      backgroundColor: '#006494',
      borderRadius: 6,
      height: 55,
      marginTop: 0,
      borderWidth: 2,
      borderColor: '#fff',
      fontSize: 2,
      width: 150,
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.13,
          shadowRadius: 6,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    buttonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
      padding: 0,
      width: '100%',
    },
    pickerWrapper: {
      width: '100%',
      borderWidth: 1.5,
      borderColor: '#bdbdbd',
      borderRadius: 7,
      backgroundColor: '#fff',
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.13,
          shadowRadius: 6,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    picker: {
      width: '100%',
      height: 48,
      color: '#222',
      fontSize: 20,
      fontWeight: '700',
      backgroundColor: 'transparent',
    },
  });


