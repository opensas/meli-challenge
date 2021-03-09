import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import { GetServerSideProps } from "next";
import { FC } from "react";
import api from "../product/api";
import { Product } from "../product/types";

type Props = {
  result: Product
}

const ProductPage: FC<Props> = ({ result: product }: Props) => {
  console.log({ product })

  return (
    <Box centercontent="true" padding={4}>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row">
          <Image src={product.image}
            height="250px" minHeight="250px"
            width="250px" minWidth="250px"
          />
          <Stack direction="column">
            <Text color="gray.300" fontSize="sm">Estado: {product.condition} - Vendidos: {product.sold_quantity}</Text>
            <Text fontSize="2xl" fontWeight="bold">{product.title}</Text>
            <Text fontSize="4xl" fontWeight="500">
              {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
            </Text>
            <Button colorScheme="blue">Comprar</Button>
          </Stack>
        </Stack>
        <Stack>
          <Text>{product.location}</Text>
        </Stack>
      </Stack>

    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const id = query?.id?.toString() || ''
  return {
    props: {
      result: await api.fetch(id)
    }
  }
}

export default ProductPage