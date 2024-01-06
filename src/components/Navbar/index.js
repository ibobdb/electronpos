import "./style.scss";
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <header className="navbar sticky-top flex-md-nowrap p-0 shadow bg-light">
      <Link
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 bg-light"
        path={'/'}
      >
        DBPOS
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-nav">
        <div className="nav-item text-nowrap d-flex">
          <Link className="nav-link px-3" path={'/'}>
            Printer
          </Link>
          <Link className="nav-link px-3" path={'/'}>
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
}
