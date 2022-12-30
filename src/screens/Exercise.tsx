import { Heading, HStack, Icon, VStack, Text, Image, Box, ScrollView, Center } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg='gray.600' pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name='arrow-left'
            color='green.500'
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
          <Heading color='gray.100' fontSize='lg' flexShrink={1} fontFamily='heading'>
            Dr. William Klywerston
          </Heading>

          <HStack alignItems='center'>
            <Text color='gray.200' ml={1} textTransform='capitalize'>
              Consulta
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w='full'
            h={80}
          source={{ uri: 'https://img.freepik.com/vetores-premium/medico-icone-ou-avatar-em-branco_136162-58.jpg?w=2000' }}
            alt='Nome do médico'
            mb={3}
            resizeMode='cover'
            rounded='lg'
          />

          <Box bg='gray.600' rounded='md' pb={4} px={4}>
            <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
              <HStack>
                <Text color='gray.200' ml='2'>
                  Atendendo a partir das 7h
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar Consulta"
            />

            
          </Box>
        </VStack>
        <Center>
          <Text color='white'>
            IMPORTANTE: Quando você clica no botão de MARCAR CONSULTA, a sua consulta é marcada para o mesmo dia!
          </Text>
        </Center>
      </ScrollView>
    </VStack>
  )
}