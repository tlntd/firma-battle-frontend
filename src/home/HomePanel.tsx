import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import PlayingModal from './PlayingModal';

const HomePanel: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron fluid>
            <Container>
              <h1>Firmabattle!</h1>
              <h5 className="font-weight-normal">
                Mihin tarvii faktaa kun on fiilistä? Nyt laitetaan Suomen IT-alan firmat oikeasti järjestykseen.
              </h5>
              <p>
                Firmabattlessa valitset voittajan sen mukaan, kumpi yritys sinun mielestäsi vastaa paremmin
                annettuun kysymykseen. Pisteenlasku ja ranking perustuu Clanbasesta tuttuun ELO-järjestelmään,
                ja tuloksia pääset katsomaan <a href="#tulokset">täältä</a>.
              </p>
              <p>
                <Button size="lg" variant="primary" onClick={() => setPlaying(true)}>Aloita</Button>
              </p>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
      <PlayingModal showing={playing} onClose={() => setPlaying(false)} />
    </Container>
  );
};

export default HomePanel;
