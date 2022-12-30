import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";
import { ExerciseCard } from '@components/ExerciseCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home() {
  const [groups, setGroups] = useState(['ESCALA', 'SOBRE', 'ATENDIMENTO', 'CONTATO'])
  const [exercises, setExercises] = useState(['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'])
  const [groupSelected, setGroupSelected] = useState('ESCALA')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md' fontFamily='heading'>
            Médicos da semana
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => ( <ExerciseCard onPress={handleOpenExerciseDetails} /> )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>

    </VStack>
  )
}