import { NavLink, Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Llamas } from './views/Llamas'
import { Alpaca } from './views/Alpaca'
import './App.css'

function App() {
  return (
    <>
      <header className="site-header">
        <h2 className="site-title">Llama vs Alpaca</h2>

        <nav>
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/llamas"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Llamas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alpacas"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Alpacas
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/llamas" element={<Llamas />} />
          <Route path="/alpacas" element={<Alpaca />} />
        </Routes>
      </main>
    </>
  )
}

export default App