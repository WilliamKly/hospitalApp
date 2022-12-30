import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput 
        bg='gray.100'
        h={14}
        px={4}
        borderWidth={2}
        fontSize='md'
        color='green.700'
        fontFamily='body'
        placeholderTextColor='gray.900'
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg: 'white',
          borderWidth: 1, 
          borderColor: 'green.500'
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}