import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Form, Map } from '../../components';

export function Home() {
  return (
    <Flex w="100%" flexDir="column" align="center">
      <Form />
      {/* <Map /> */}
    </Flex>
  );
}
