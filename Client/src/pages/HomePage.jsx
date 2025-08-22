import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-danger d-flex justify-content-center align-items-center min-vh-100">
      <header className="bg-dark text-white p-5 rounded shadow">
        <h1 className="display-4 fw-bold mb-3">React Tasks</h1>
        <p className="text-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          fugit doloremque molestias recusandae labore repellat amet dicta tempore
          necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
          quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
          ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
          officia accusantium vitae doloremque, molestias modi.
        </p>

        <Link
          className="btn btn-secondary mt-3"
          to="/register"
        >
          Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
