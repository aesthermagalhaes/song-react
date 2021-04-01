import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Início</Link>
          </li>
          <li>
            <Link to='/songs'>Músicas</Link>
          </li>
          <li>
            <Link to='/register'>Cadastro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
