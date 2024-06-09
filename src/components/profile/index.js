import { useParams } from "react-router-dom";
import { useLikes, usePosts } from "../../hooks/posts";
import { useUser } from "../../hooks/users";
import { useAuthContext } from "../../context/AuthContextProvider";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";
import PostsList from "../post/PostsList";
import moment from "moment";

export default function Profile() {
  const { id } = useParams();
  const { data: posts, isPending: postsLoading } = usePosts(id);
  const { data: user, isPending: userLoading } = useUser(id);
  const { user: authUser, isLoading: authLoading } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const likes = useLikes(posts);
  if (userLoading) return "Loading...";

  return (
    <Stack spacing="5">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Avatar size="2xl" user={user} />

        {!authLoading && authUser.id === user.id && (
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="teal"
            onClick={onOpen}
          >
            Change avatar
          </Button>
        )}

        <Stack ml="10">
          <Text fontSize="2xl">{user.username}</Text>
          <HStack spacing="10">
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Posts: {posts?.length}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Likes: {likes}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined: {moment(user.date.toDate()).format("MMMM YYYY")}
            </Text>
          </HStack>
        </Stack>

        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />

      {postsLoading ? (
        <Text>Posts are loading...</Text>
      ) : (
        <PostsList posts={posts} />
      )}
    </Stack>
  );
}
