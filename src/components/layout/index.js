import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { LOGIN } from "../../lib/routes";
import Navbar from "./Navbar";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { user, isLoading } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(LOGIN);
    }
  }, [user, pathname, isLoading, navigate]);

  if (isLoading) {
    return "Loading auth user...";
  }

  return (
    <>
      <Navbar />
      <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200px">
        <Box w="900px">
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
}
