import React, { useState } from 'react';


import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Participant } from '../../components/Participant'

import { styles } from './styles'
89


export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantInput, setParticipantInput] = useState('');

  function handleParticpantAdd() {
    if (participants.includes(participantInput)) {
      return Alert.alert('Participante já cadastrado', 'Já existe um participante cadastrado com esse nome')
    }

    setParticipants(old => [...old, participantInput]);
    setParticipantInput('');
  }

  function handleParticipantRemove(user: string) {
    return Alert.alert('Remover', `Remover o participante ${user}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== user))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipantInput}
          value={participantInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticpantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou ainda! Adicione participantes à lista.
          </Text>
        )}
      />

    </View>


  )
};

