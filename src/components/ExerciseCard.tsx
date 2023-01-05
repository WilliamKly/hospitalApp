import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { EscalaDTO } from '@dtos/EscalaDTO';

type Props = TouchableOpacityProps & {
  data: EscalaDTO;
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3} >
        <Image
          source={{ uri: 'https://img.freepik.com/vetores-premium/medico-icone-ou-avatar-em-branco_136162-58.jpg?w=2000' }}
          alt='Foto do médico'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading fontSize='lg' color='white' fontFamily='heading'>
            {data.nome}
          </Heading>

          <Text fontSize='sm' color='gray.200' mt={1} numberOfLines={2}>
            Segunda-feira a partir das 7h da manhã 
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name='chevron-thin-right'
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  )
}