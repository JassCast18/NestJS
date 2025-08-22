import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "28rem" }}>
        {registerErrors.map((error, i) => (
          <div className="alert alert-danger py-2" key={i}>
            {error}
          </div>
        ))}

        <h1 className="h3 mb-3 fw-bold text-center">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Write your name"
              {...register("name")}
              autoFocus
            />
            {errors.username?.message && (
              <div className="text-danger small">{errors.username?.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="youremail@domain.tld"
              {...register("email")}
            />
            {errors.email?.message && (
              <div className="text-danger small">{errors.email?.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="********"
              {...register("password")}
            />
            {errors.password?.message && (
              <div className="text-danger small">{errors.password?.message}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="********"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <div className="text-danger small">
                {errors.confirmPassword?.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        <p className="mt-3 text-center">
          Already Have an Account?{" "}
          <Link to="/login" className="text-decoration-none text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
