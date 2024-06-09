import { useForm } from "react-hook-form";
import { useAddPost, usePosts } from "../../hooks/posts";
import { useAuthContext } from "../../context/AuthContextProvider";
import { Box, Button, HStack, Heading, Textarea } from "@chakra-ui/react";
import reactTextareaAutosize from "react-textarea-autosize";
import PostsList from "../post/PostsList";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addPost, isPending: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuthContext();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <Box maxW="600px" mx="auto" py="10" px={"4"}>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={reactTextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
    </Box>
  );
}

export default function Dashboard() {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return "Loading posts...";

  return (
    <>
      <NewPost />
      <PostsList posts={posts} />
    </>
  );
}
