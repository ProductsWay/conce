import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { persistor } from "../app/store";
import logger from "../logger";
import { isLoggedInSelector, signOut } from "../services/user_slice";

const Logout = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      logger.warn("Logout");
      dispatch(signOut());
      persistor
        .purge()
        .then(() => {
          // redirect to login page
          window.location.href = "/login";
        })
        .catch(logger.error);
    } else {
      // redirect to login page
      window.location.href = "/login";
    }
  }, [isLoggedIn]);
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-5 space-y-8 text-gray-900 bg-white border-b border-gray-200 shadow sm:rounded-lg">
        <div className="loading">You will be logged out in a few seconds.</div>
      </div>
    </div>
  );
};

export default Logout;
