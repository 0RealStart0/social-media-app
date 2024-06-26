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
  VStack,
} from "@chakra-ui/react";
import { useLogin } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { DASHBOARD, REGISTER } from "../../lib/routes";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();

  if (isLoading) {
    return "Loading login page...";
  }

  if (user) {
    navigate(DASHBOARD);
  }

  async function handleLogin(data) {
    login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Log In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
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
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isPending}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to={REGISTER}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "teal.100" }}
          >
            Register
          </Link>{" "}
          instead!
        </Text>

        <Box mt="8" bg="gray.50" p="4" borderRadius="md">
          <VStack spacing="4" textAlign="center">
            <Text fontSize="sm">테스트 계정:</Text>
            <Box bg="gray.100" p="2" borderRadius="md" width="full">
              <Text>
                <strong>이메일:</strong> test@example.com
              </Text>
              <Text>
                <strong>비밀번호:</strong> password123
              </Text>
            </Box>
            <Text fontSize="sm" color="red.500">
              참고: 탈퇴 기능은 없으며, 모든 테스트 데이터는 일정 기간 후
              삭제됩니다. 익명 정보로 가입해 주세요.
            </Text>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
}
