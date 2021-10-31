import { useRoutes } from "react-router-dom";

import { useAppSelector } from "./app/hooks";
import routes from "./routes";
import { isLoggedInSelector } from "./services/user_slice";

const App = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const router = useRoutes(routes(isLoggedIn));
  return router;
};

export default App;
