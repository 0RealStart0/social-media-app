import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../lib/routes";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";

async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

export function useLogin() {
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    await signInWithEmailAndPassword(auth, email, password);
    return redirectTo;
  }

  return useMutation({
    mutationFn: login,
    onSuccess: (redirectTo) => {
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });
}

export function useRegister() {
  const toast = useToast();
  const navigate = useNavigate();
  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      throw new Error("Username already exists");
    } else {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        username: username.toLowerCase(),
        avatar: "",
        date: serverTimestamp(),
      });

      return redirectTo;
    }
  }

  return useMutation({
    mutationFn: register,
    onSuccess: (redirectTo) => {
      toast({
        title: "Account created",
        description: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });
}

export function useLogout() {
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    await signOut(auth);
    return LOGIN;
  }

  return useMutation({
    mutationFn: logout,
    onSuccess: (redirectTo) => {
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      navigate(redirectTo);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    },
  });
}
