import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, HStack } from 'native-base'

import { AuthNavigatiorRoutesProps } from '@routes/auth.routes'
import FrontCity from '@assets/front.png'
import SaudeFront from '@assets/download.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {

  const navigation = useNavigation<AuthNavigatiorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16} bg='white'>
        

        <Center my={24}>
          <Heading fontSize='6xl' fontWeight='bold' color='green.700'>
            HMAPP
          </Heading>
          <Text color='gray.400' fontSize='sm'>
            Hospital municipal de Fronteiras - PI
          </Text>
        </Center>

        <Center>
          <Heading color='gray.400' fontSize='xl' mb={6} fontFamily='heading'>
            Acesse sua conta
          </Heading>

          <Input
            placeholder='E-mail'
            keyboardType='email-address'  
            autoCapitalize='none'
          />

          <Input
            placeholder='Senha'
            secureTextEntry  
          />

          <Button title='Acessar' />
        </Center>

        <Center mt={24}>
          <Text
            color='gray.300'
            fontSize='sm'
            mb={3}
            fontFamily='body'
          >
            Ainda não tem acesso?
          </Text>

          <Button
            title='Criar conta'
            variant='outline'
            onPress={handleNewAccount}
          />
        </Center>

        
        <Center mt={10}>
          <Text mb={5}>
            Secretaria Municipal de Saúde
          </Text>
          <HStack>
            <Image
              source={FrontCity}
              alt='Logo Fronteiras'
              rounded={8}
              size={70}
              resizeMode='contain'  
            />
            <Image
              source={SaudeFront}
              alt='Logo Saúde'
              rounded={8}
              size={70}
              resizeMode='contain'  
            />
          </HStack>
          <Text mt={5}>
            By William Klywerston and Isael Silva ™
          </Text>
        </Center>  
      </VStack>
      
      
    </ScrollView>
      
  )
}