import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";
import Avatar from "../profile/Avatar";
import UsernameButton from "../profile/UsernameButton";
import { FaTrash } from "react-icons/fa";
import moment from "moment";

export default function Comment({ comment, postID }) {
  const { text, uid, date, id } = comment;
  const { data: user, isPending: userLoading } = useUser(uid);
  const { user: authUser, isLoading: authLoading } = useAuthContext();
  const { mutate: deleteComment, ispending: deleteLoading } = useDeleteComment(
    postID,
    id
  );

  if (userLoading) return "Loading...";

  return (
    <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
      <Flex pb="2">
        <Avatar user={user} size="sm" />
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
            <Box>
              <UsernameButton user={user} />
              <Text fontSize="xs" color="gray.500">
                {moment(date.toDate()).fromNow()} ago
              </Text>
            </Box>
            {!authLoading && authUser.id === uid && (
              <IconButton
                size="sm"
                ml="auto"
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
                isRound
                onClick={deleteComment}
                isLoading={deleteLoading}
              />
            )}
          </Flex>
          <Box pt="2" fontSize="sm">
            <Text>{text}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
