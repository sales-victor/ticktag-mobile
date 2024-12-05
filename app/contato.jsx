import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import emailjs from '@emailjs/browser';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [envioStatus, setEnvioStatus] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    emailjs
      .send('service_b9r2wod', 'template_ammz5dj', formData, 'G0YEcMslAtCN-3raU')
      .then(
        (result) => {
          setEnvioStatus('Mensagem enviada com sucesso!');
          setFormData({
            nome: '',
            email: '',
            mensagem: '',
          });
        },
        (error) => {
          console.error('Erro ao enviar o email: ', error.text);
          setEnvioStatus(`Erro ao enviar a mensagem: ${error.text}`);
        }
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre em contato conosco</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={formData.nome}
          onChangeText={(text) => handleChange('nome', text)}
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          required
          keyboardType="email-address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mensagem:</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Digite sua mensagem"
          value={formData.mensagem}
          onChangeText={(text) => handleChange('mensagem', text)}
          required
          multiline
        />
      </View>

      <Button title="Enviar" onPress={handleSubmit} />

      {envioStatus && <Text style={styles.status}>{envioStatus}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  status: {
    marginTop: 20,
    color: '#28a745',
    fontWeight: 'bold',
  },
});

