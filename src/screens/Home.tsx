import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";
import { EscalaDTO } from '@dtos/EscalaDTO'
import { ExerciseCard } from '@components/ExerciseCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState(['ESCALA', 'SOBRE', 'ATENDIMENTO', 'CONTATO'])
  const [medicos, setMedicos] = useState<EscalaDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('ESCALA')

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get('/api/cliente/escala/')
      console.log(response.data)
      setMedicos(response.data)
    }catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

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
            {medicos.length}
          </Text>
        </HStack>

        <FlatList
          data={medicos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => ( <ExerciseCard onPress={handleOpenExerciseDetails} data={item} /> )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>

    </VStack>
  )
}