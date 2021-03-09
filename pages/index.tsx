import { Box, Grid, Container, Stack, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps } from "next";

import Link from 'next/link'
import React, { FC } from "react";

import api from '../product/api';
import { Product } from "../product/types";

type Props = {
  results: Product[]
}

const IndexPage: FC<Props> = (props: Props) => {
  // console.log(' results', props.results)
  return (
    <Box centercontent="true" padding={4}>

      <Stack backgroundColor="white" padding="4" boxShadow="2" borderRadius={2}>
        {/* <Grid
        backgroundColor="white"  borderRadius={2} boxShadow="sm" 
        padding="4" spacing="6" width="100%"
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
      > */}
        {props.results.map(product => (
          <Link key={product.id} href={`/${product.id}`}>
            <a>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <Image
                    backgroundColor="gray.50"
                    borderRadius="sm"
                    width={180} height={180}
                    minWidth={180} minHeight={180}
                    src={product.image}
                  />
                  <Stack direction="column">
                    {/* <Text fontSize={{base: "2xl", lg: "lg", xl: 'sm'}} fontWeight="500 "> */}
                    <Text fontSize="2xl" fontWeight="500">
                      {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </Text>
                    <Text>{product.title}</Text>
                  </Stack>
                  {product.title}
                </Stack>
                <Stack>
                  <Text>{product.location}</Text>
                </Stack>
              </Stack>
            </a>
          </Link>

        ))}
        {/* </Grid> */}
      </Stack>
    </Box>
  )

}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const q = context?.query?.q?.toString() || ''

  return {
    props: {
      results: await api.search(q)
    }
  }

}

export default IndexPage