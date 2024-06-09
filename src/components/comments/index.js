import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { Box } from "@chakra-ui/react";
import Post from "../post";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

export default function Comments() {
  const { id } = useParams();
  const { data: post, isPending: isLoading } = usePost(id);

  if (isLoading) return "Loading...";

  return (
    <Box align="center" pt="50">
      {post && (
        <>
          <Post post={post} />
          <NewComment post={post} />
          <CommentList post={post} />
        </>
      )}
    </Box>
  );
}
