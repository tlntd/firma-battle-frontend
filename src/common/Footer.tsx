import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.scss';

type Props = {
  hash: string | undefined
};

const Footer: React.FC<Props> = ({hash}) => {
  if (hash) {
    return null;
  }
  return (
    <Navbar bg="light" fixed="bottom">
      <p className="Footer-text">
        Tämän sivun tekivät <a href="https://github.com/varmais">Teemu Tiilikainen</a> ja <a href="https://talented.fi">Talented</a> – Talented auttaa tekijöitä löytämään parhaat firmat ja firmoja tekemään parempaa rekrytointia.
      </p>
    </Navbar>
  );
};

export default Footer;
