import { Flex, IconButton } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useComments } from "../../hooks/comments";
import { useDeletePost, useToggleLike } from "../../hooks/posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrash,
} from "react-icons/fa";

export default function Actions({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuthContext();

  const isLiked = likes.includes(user?.id);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { mutate: toggleLike, isPending: likeLoading } = useToggleLike(config);
  const { mutate: deletePost, isPending: deleteLoading } = useDeletePost(id);
  const { data: comments, isPending: commentsLoading } = useComments(id);

  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
        />
        {likes.length}
      </Flex>
      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          isLoading={commentsLoading}
          size="md"
          colorScheme="teal"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
          isRound
        />
        {comments?.length}
      </Flex>

      {!userLoading && user.id === uid && (
        <IconButton
          ml="auto"
          onClick={deletePost}
          isLoading={deleteLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
        />
      )}
    </Flex>
  );
}
