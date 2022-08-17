import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Formik, Form as FormikForm } from 'formik';

export function Form() {
  return (
    <Formik
      initialValues={{
        airport1: '',
        airport2: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({
        values, isSubmitting, isValidating, isValid, errors, handleSubmit, handleChange,
      }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Flex gap="15px" flexDir="column">
            <FormControl isInvalid={!!errors.airport1}>
              <FormLabel htmlFor="airport1">
                <Text>Airport 1</Text>
              </FormLabel>
              <Input
                type="airport1"
                name="airport1"
                placeholder="Airport 1"
                onChange={handleChange}
                value={values.airport1}
                isDisabled={isSubmitting || isValidating}
              />
              <FormErrorMessage>{errors.airport1}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.airport2}>
              <FormLabel htmlFor="airport2">
                <Text>Airport 2</Text>
              </FormLabel>
              <Input
                type="airport2"
                name="airport2"
                placeholder="Airport 2"
                onChange={handleChange}
                value={values.airport2}
                isDisabled={isSubmitting || isValidating}
              />
              <FormErrorMessage>{errors.airport2}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting || isValidating}
            >
              Submit
            </Button>
          </Flex>
        </FormikForm>
      )}
    </Formik>
  );
}
