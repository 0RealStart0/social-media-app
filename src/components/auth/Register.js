import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useRegister } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { DASHBOARD, LOGIN } from "../../lib/routes";
import {
  emailValidate,
  passwordConfirmValidate,
  passwordValidate,
  usernameValidate,
} from "../../utils/form-validate";
import { Link as RouterLink } from "react-router-dom";

export default function Register() {
  const { mutate: signup, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  let pwd = watch("password", "");

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Register
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.passwordConfirm} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("passwordConfirm", {
                ...passwordConfirmValidate,
                validate: (value) =>
                  value === pwd || "The passwords do not match",
              })}
            />
            <FormErrorMessage>
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isPending}
            loadingText="Signing Up"
          >
            Register
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "teal.100" }}
          >
            Log In
          </Link>{" "}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
