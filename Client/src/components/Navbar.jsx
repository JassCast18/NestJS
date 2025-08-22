import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded my-3 px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={isAuthenticated ? "/tasks" : "/"}>
          Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            {isAuthenticated ? (
              <>
                <li className="nav-item text-white me-2">
                  Welcome <strong>{user.username}</strong>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/add-task">
                    Add Task
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-2" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
