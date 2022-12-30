import { useState } from 'react'
import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack, SectionList, Text } from "native-base";

export function History() {

  const [exercises, setExercises] = useState([
    {
      title: '26.09.22',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '27.09.22',
      data: ['Puxada frontal']
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Consultas' />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color='gray.100' textAlign='center'>
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

    </VStack>
  )
}