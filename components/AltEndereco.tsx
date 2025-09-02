import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from '@expo/vector-icons';

export default function EnderecoForm() {
  const [cep, setCep] = useState("23585-500");
  const [endereco, setEndereco] = useState("Rua Alvorada de Minas");
  const [numero, setNumero] = useState("1972");
  const [bairro, setBairro] = useState("Jardim Alvorada");
  const [uf, setUf] = useState("RJ");
  const [cidade, setCidade] = useState("Rio de Janeiro");

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Meus Endereços</Text>

        {/* Linha 1: CEP e Endereço */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.cepInput}
              value={cep}
              onChangeText={setCep}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.enderecoInput}
              value={endereco}
              onChangeText={setEndereco}
            />
          </View>

          <TouchableOpacity>
            <FontAwesome name="star-o" size={20} color="#0066cc" />
          </TouchableOpacity>
        </View>

        {/* Linha 2: Número e Bairro */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.numeroInput}
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.bairroInput}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <TouchableOpacity>
            <FontAwesome name="pencil" size={20} color="#ff6600" />
          </TouchableOpacity>
        </View>

        {/* Linha 3: UF e Cidade */}
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>UF</Text>
            <View style={styles.ufInput}>
              <Picker
                selectedValue={uf}
                onValueChange={(itemValue) => setUf(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="RJ" value="RJ" />
                <Picker.Item label="SP" value="SP" />
                <Picker.Item label="MG" value="MG" />
                <Picker.Item label="BA" value="BA" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.cidadeInput}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <TouchableOpacity>
            <FontAwesome name="trash-o" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Botão Salvar à direita */}
        <View style={styles.saveRow}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Novo Endereço centralizado */}
      <TouchableOpacity style={styles.newButton}>
        <Text style={styles.newButtonText}>+ Novo Endereço</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0e8f0",
  },

  card: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#f8fafd",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#3399ff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  inputWrapper: {
    marginRight: 12,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },

 cepInput: {
    width: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flexGrow: 0,
    flexShrink: 0,
  },

  enderecoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  numeroInput: {
    width: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flexGrow: 0,
    flexShrink: 0,
  },

  bairroInput: {
    flex: 1,
    width: '60%',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  ufInput: {
    width: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flexGrow: 0,
    flexShrink: 0,
  },

  cidadeInput: {
    flex: 1, 
    width: '65%',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  picker: {
    height: Platform.OS === "web" ? 36 : 40,
    width: "100%",
  },

  saveRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  newButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  newButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
