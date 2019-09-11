import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FaqPanel: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Mikä tämä on?</h3>
          <p>
            Hauska peli jonka tein tyypatessa <a href="https://nestjs.com/">Nest.js</a>:ää. Vaikuttaa ihan hauskalta freimikseltä.
          </p>
          <hr />
          <h3>Miten tämä toimii?</h3>
          <p>
            Helposti: arvotaan ensin kysymys ja siihen kaksi yritystä. Käyttäjä valitsee yrityksen joka vastaa kysymykseen hänen mielestään paremmin. Pisteet lasketaan kysymyksittäin käyttäen vanhaa kunnon (Clanbasesta tuttua) <a href="https://en.wikipedia.org/wiki/Elo_rating_system">ELO-lukua</a>.
          </p>
          <hr />
          <h3>Miten saan yritykseni mukaan?</h3>
          <p>
            Heitä ehdotus yrityksestä meilitse: <a href="mailto:teemu@talented.fi?subject=Uusi%20yritys%20Firmabattleen&body=Heippa%2C%0A%0Alis%C3%A4tk%C3%A4%C3%A4%20t%C3%A4m%C3%A4%20yritys%20Firmabattleen%3A%0A%0AYritys%3A%20%0AKotisivu%3A%20%0A%0AKiitos!">teemu@talented.fi</a>.
          </p>
        </Col>
      </Row>
    </Container>
  )
};

export default FaqPanel;
