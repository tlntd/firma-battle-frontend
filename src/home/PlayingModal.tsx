import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import config from '../config';
import Spinner from '../common/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
  logo: string
};

type PlayingModalState = {
  question: Question | undefined,
  companies: Array<Company>
};

class PlayingModal extends Component<PlayingModalProps, PlayingModalState> {
  static getEmptyState () {
    return {
      question: undefined,
      companies: []
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
    this.setState(PlayingModal.getEmptyState());
    this.props.onClose();
  }

  render () {
    const {showing} = this.props;
    return (
      <Modal
        centered
        size="xl"
        show={showing}
        onEntered={this.loadQuestion}
        onHide={this.handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
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
      </Container>
    )
  }

  renderCompany (company: Company) {
    return (
      <Col>
        <Card>
          <Card.Img variant="top" src={`${config.image_endpoint}/${company.logo}`} />
          <Button variant="primary" onClick={() => this.voteForCompany(company.id)}>
            {company.name}
          </Button>
        </Card>
      </Col>
    )
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

  async voteForCompany(winnerId: number): Promise<void> {
    try {
      const loserId: number = this.state.companies.find((c: Company): boolean => c.id !== winnerId)!.id;
      const questionId: number = this.state.question!.id;
      const response = await axios.post(`${config.api_endpoint}/vote`, {winnerId, loserId, questionId});
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}

export default PlayingModal;
