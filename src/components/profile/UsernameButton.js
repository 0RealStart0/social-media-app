import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";

export default function UsernameButton({ user }) {
  return (
    <Button
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      colorScheme="teal"
      variant="link"
    >
      {user.username}
    </Button>
  );
}
