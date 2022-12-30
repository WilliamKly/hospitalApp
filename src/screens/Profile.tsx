import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { TouchableOpacity } from "react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('http://github.com/williamKly.png')

  const toast = useToast()

  async function handleUsePhotoSelect() {
    setPhotoIsLoading(true)
    try{
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if(photoSelected.canceled) {
        return
      }

      if(photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande! escolha uma de até 5mb',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
  
    } catch(err) {
      console.log(err)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {
            photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.500'
              endColor='gray.400'
            />
            :
            <UserPhoto 
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity onPress={handleUsePhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg='gray.600'
            placeholderTextColor='white'
            placeholder="Nome"
          />

          <Input
            bg='gray.600'
            placeholderTextColor='white'
            value="E-mail"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} fontFamily='heading'>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholderTextColor='white'
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholderTextColor='white'
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholderTextColor='white'
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}