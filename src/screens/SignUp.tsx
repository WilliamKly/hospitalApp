import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido!'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const navigation = useNavigation()

  function handleGoBack(){
    navigation.goBack()
  }

  async function handleSingUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await api.post('/api/auth/register', {
        'name': name,
        'email': email,
        'password': password
      })
      await signIn(email, password)
      
    } catch(error) {
      setIsLoading(false)
   
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10} pb={16} bg='white'>

        <Center my={24}>
          <Heading fontSize='6xl' fontWeight='bold' color='green.700'>
            HMAPP
          </Heading>
          <Text color='gray.400' fontSize='sm'>
            Marque a sua consulta
          </Text>
        </Center>

        <Center>
          <Heading color='gray.400' fontSize='xl' mb={6} fontFamily='heading'>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
                
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'  
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password_confirm'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme a senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSingUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title='Voltar para o login'
          variant='outline'
          mt={16}
          onPress={handleGoBack}
        />
        
      </VStack>
    </ScrollView>
  )
}