import { collection, doc, query, updateDoc } from "firebase/firestore";
import {
  db,
  storage,
  useCollectionData,
  useDocumentData,
} from "../lib/firebase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function useUser(id) {
  const q = query(doc(db, "users", id));

  const userQuery = useQuery({
    queryKey: ["user", id],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => useDocumentData(q),
  });

  return userQuery;
}

export function useUsers() {
  const q = collection(db, "users");

  const usersQuery = useQuery({
    queryKey: ["users"],
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryFn: () => useCollectionData(q),
  });
  return usersQuery;
}

export function useUpdateAvatar(uid) {
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) {
      throw new Error({
        title: "No file selected",
        description: "Please select a file to upload",
      });
    }

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });
  }

  const updateAvatarMutate = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      toast({
        title: "Profile updated!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      navigate(0);
    },
    onError: (error) => {
      toast({
        title: error.message.title || "File uploading Error",
        description: error.message.description || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });

  return {
    setFile,
    updateAvatarMutate,
    fileURL: file && URL.createObjectURL(file),
  };
}
