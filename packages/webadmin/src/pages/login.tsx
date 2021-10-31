import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { errorMessageSelector, isLoadingSelector, signInAsync } from "../services/user_slice";

type FromValues = {
  username: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isLoadingSelector);
  const errorMessage = useAppSelector(errorMessageSelector);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<FromValues>();

  const onSubmit = (data: FromValues) => dispatch(signInAsync(data));

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-5 space-y-8 border-b border-gray-200 shadow bg-base-200 sm:rounded-lg">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-50">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 -space-y-px rounded-md shadow-sm">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input"
                {...register("username", { required: true })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {loading && <div className="loading" />}
              {isSubmitted && errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            </div>
            <div className="mt-2 mb-4 text-sm">
              <Link to="/forgot_password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading || isSubmitting}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
