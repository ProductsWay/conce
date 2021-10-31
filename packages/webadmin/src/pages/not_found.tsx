import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">404 </h1>
          <p className="mb-5">Oops. Looks like you're lost.</p>
          <Link to="/">
            <button className="btn btn-primary">Go to homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
