import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon/CartIcon';
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/search.svg';
import userIcon from '../../assets/user.svg';

export default function Header() {
  return (
    <Navbar bg="white" className="border-bottom py-2" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/catalog">
          <img src={logo} alt="пиксельмаркет" width="168" height="32" />
        </Navbar.Brand>
        <Nav className="ms-auto flex-row align-items-center gap-2 gap-sm-3">
          <Nav.Link as={Link} to="/catalog" className="d-flex flex-column align-items-center small text-body">
            <img src={searchIcon} alt="" width="24" height="24" />
            <span className="d-none d-sm-inline">Каталог</span>
          </Nav.Link>
          <Nav.Link className="d-flex flex-column align-items-center small text-body">
            <img src={userIcon} alt="" width="24" height="24" />
            <span className="d-none d-sm-inline">Профиль</span>
          </Nav.Link>
          <CartIcon />
        </Nav>
      </Container>
    </Navbar>
  );
}
