import { useToast } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, useCollectionData } from "../lib/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./../App";

export function useAddComment({ postID, uid }) {
  const toast = useToast();

  async function addComment(text) {
    const newCommentRef = doc(collection(db, "posts", postID, "comments"));
    await setDoc(newCommentRef, {
      text,
      id: newCommentRef.id,
      postID,
      date: serverTimestamp(),
      uid,
    });
  }

  const addCommentMutate = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postID] });
      toast({
        title: "Comment added!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Comment add failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });

  return addCommentMutate;
}

export function useComments(postID) {
  const q = query(
    collection(db, "posts", postID, "comments"),
    orderBy("date", "asc")
  );

  const commentsQuery = useQuery({
    queryKey: ["comments", postID],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => useCollectionData(q),
  });

  // if (error) throw error;
  return commentsQuery;
}

export function useDeleteComment(postID, id) {
  const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      const docRef = doc(db, "posts", postID, "comments", id);
      await deleteDoc(docRef);
    }
  }

  const deleteCommentMutate = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postID] });
      toast({
        title: "Comment deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
    onError: (error) => {
      toast({
        title: "Comment delete failed!",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });

  return deleteCommentMutate;
}
