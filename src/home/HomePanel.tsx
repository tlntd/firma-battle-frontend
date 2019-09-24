import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PlayingModal from './PlayingModal';
import './HomePanel.scss';

const HomePanel: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <div className="HomeContainer">
            <img src="/images/talented_Firmabattle.png" alt="Firmabattle" />
            <h1>
              Mihin tarvii faktaa kun on fiilistä? Nyt laitetaan Suomen IT-alan firmat oikeasti järjestykseen.
            </h1>

            <Button onClick={() => setPlaying(true)}>Aloita</Button>

            <p>
              Firmabattlessa valitset voittajan sen mukaan, kumpi yritys sinun mielestäsi vastaa paremmin
              annettuun kysymykseen. Pisteenlasku ja ranking perustuu Clanbasesta tuttuun ELO-järjestelmään,
              ja tuloksia pääset katsomaan <a href="#tulokset"><b>täältä</b></a>.
            </p>
          </div>
        </Col>
      </Row>
      <PlayingModal showing={playing} onClose={() => setPlaying(false)} />
    </Container>
  );
};

export default HomePanel;
