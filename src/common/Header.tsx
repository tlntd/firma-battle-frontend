import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="navbar">
          <Nav>
            <Nav.Link href="/#tulokset">Tulokset</Nav.Link>
            <Nav.Link href="/#yritykset">Yritykset</Nav.Link>
            <Nav.Link href="/#faq">FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
