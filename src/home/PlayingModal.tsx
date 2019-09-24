import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import config from '../config';
import Spinner from '../common/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Button from 'react-bootstrap/Button';
import { fadeOutUp, fadeOutDown } from 'react-animations';
import {css, StyleSheet} from 'aphrodite';
import './PlayingModal.scss';

type PlayingModalProps = {
  showing: boolean,
  onClose: () => void
};

type Question = {
  id: number,
  text: string
};

type Company = {
  id: number,
  name: string,
  logo: string,
  winner: boolean | undefined
};

type Results = {
  winnerScore: number,
  winnerDelta: number,
  loserScore: number,
  loserDelta: number
};

type PlayingModalState = {
  question: Question | undefined,
  companies: Array<Company>,
  results: Results | undefined
};

class PlayingModal extends Component<PlayingModalProps, PlayingModalState> {
  static getEmptyState () {
    return {
      question: undefined,
      companies: [],
      results: undefined
    };
  }

  constructor(props: PlayingModalProps) {
    super(props);
    this.state = PlayingModal.getEmptyState();
    this.handleClose = this.handleClose.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);
    this.voteForCompany = this.voteForCompany.bind(this);
  }

  handleClose(): void {
    this.props.onClose();
    this.setState(PlayingModal.getEmptyState());
  }

  render () {
    const {showing} = this.props;
    return (
      <Modal
        centered
        size="lg"
        show={showing}
        onEntered={this.loadQuestion}
        onHide={this.handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ModalHeader closeButton={true} />
        <Modal.Body>
          {this.defineContent()}
        </Modal.Body>
      </Modal>
    );
  }

  defineContent() {
    const {question, companies: [company1, company2]} = this.state;

    if (question && company1 && company2) {
      return this.renderBody(question, company1, company2);
    }

    return <Spinner />
  }

  renderBody (question: Question, company1: Company, company2: Company) {
    return (
      <Container>
        <Row>
          <Col>
            <h3>{question.text}</h3>
          </Col>
        </Row>
        <Row>
          {this.renderCompany(company1)}
          {this.renderCompany(company2)}
        </Row>
        <Row>
          <Col>
            <div className="Modal-links">
              <Button variant="link" onClick={() => this.newQuestion()}>Skippaa kysymys</Button>
              <p>Peli jatkuu niin kauan kuin jaksat kliksutella</p>
            </div>
          </Col>
        </Row>
        <a className="btn btn-scores" href="#tulokset">Tulokset</a>
      </Container>
    )
  }

  renderCompany (company: Company) {
    return (
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={`${config.image_endpoint}/${company.logo}`}
            alt={company.name}
            onClick={() => this.voteForCompany(company.id)}
          />
          {this.renderPoints(company)}
        </Card>
      </Col>
    )
  }

  renderPoints (company: Company) {
    const {results} = this.state;
    const styles = StyleSheet.create({
      up: {
        animationName: fadeOutUp,
        animationDuration: '2.5s'
      },
      down: {
        animationName: fadeOutDown,
        animationDuration: '2.5s'
      }
    });

    if (results && company.winner) {
      return (
        <h4 className={`score-up text-success ${css(styles.up)}`}>
          +{results.winnerDelta} pistettä
        </h4>
      );
    }

    if (results) {
      return (
        <h4 className={`score-down text-danger ${css(styles.down)}`}>
          {results.loserDelta} pistettä
        </h4>
      );
    }
  }

  async loadQuestion(): Promise<void> {
    try {
      const companiesResponse = await axios.get(`${config.api_endpoint}/companies/random`);
      const questionResponse = await axios.get(`${config.api_endpoint}/questions/random`);
      this.setState({
        companies: companiesResponse.data,
        question: questionResponse.data
      });
    } catch (e) {
      console.error(e);
    }
  }

  voteForCompany(winnerId: number): void {
    try {
      const companies = this.state.companies.map((company) => {
        company.winner = Boolean(company.id === winnerId);
        return company;
      });
      this.setState({companies}, async (): Promise<void> => {
        const loserId: number = this.state.companies.find((c: Company): boolean => c.id !== winnerId)!.id;
        const questionId: number = this.state.question!.id;
        const response = await axios.post(`${config.api_endpoint}/vote`, {winnerId, loserId, questionId});
        this.setState({results: response.data}, () => {
          setTimeout(() => {
            this.newQuestion();
          }, 2000);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  newQuestion = () => {
    this.setState(PlayingModal.getEmptyState(), () => {
      this.loadQuestion();
    });
  }
}

export default PlayingModal;
