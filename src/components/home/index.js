import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { DASHBOARD, LOGIN } from "../../lib/routes";

function Home() {
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();

  if (isLoading) {
    return "Loading auth user...";
  }

  if (!isLoading && !user) {
    navigate(LOGIN);
  } else {
    navigate(DASHBOARD);
  }

  return <div>index</div>;
}

export default Home;
