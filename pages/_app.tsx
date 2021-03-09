import { SearchIcon } from '@chakra-ui/icons'
import { ChakraProvider, CSSReset, IconButton, Image, Input, Stack } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import router from 'next/router'
import React, { FC, FormEvent, useRef } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {

  const queryInput = useRef(null)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = e.target['query'].value || ''
    // console.log(`e.target['query'].value`, e.target['query'].value)
    // console.log(`queryInput.current.value`, queryInput?.current?.value ?? null)
    router.push(`/?q=${query}`)
  }
  return (
    <ChakraProvider>
      <CSSReset />
      <Stack direction="row" backgroundColor="yellow.400" p="4" spacing="2">
        <Image src="/logo.png" />
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack direction="row" p="0" spacing="0" width="100%" >
            <Input ref={queryInput} name="query" placeholder="Buscar en meli"
              roundedRight="0" background="white" autoFocus={true}
            />
            <IconButton aria-label="Search database" icon={<SearchIcon />}
              roundedLeft="0" background="white"
            />
          </Stack>
        </form>
      </Stack>
      <Stack direction="row" p="2">
        <Component {...pageProps} />
      </Stack>
    </ChakraProvider>
  )
}

export default App
