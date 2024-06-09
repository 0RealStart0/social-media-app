import { Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../hooks/users";
import Avatar from "../profile/Avatar";
import UsernameButton from "../profile/UsernameButton";
import moment from "moment";

export default function Header({ post }) {
  const { uid, date } = post;
  const { data: user, isPending: isLoading } = useUser(uid);

  if (isLoading) return "Loading...";
  return (
    <Flex
      alignItems="center"
      borderBottom="2px solid"
      borderColor="teal.100"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="md" />

      <Box ml="4">
        <UsernameButton user={user} />
        <Text fontSize="sm" color="gray.500">
          {moment(date.toDate()).fromNow()}
        </Text>
      </Box>
    </Flex>
  );
}
