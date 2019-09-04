import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import config from '../config';

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
    this.loadQuestion = this.loadQuestion.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(): void {
    this.setState(PlayingModal.getEmptyState());
    this.props.onClose();
  }

  render () {
    const {showing} = this.props;
    const {question, companies: [company1, company2]} = this.state;
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
          <h1>{question && question.text}</h1>
          <p>{company1 && company1.name}</p>
          <p>{company2 && company2.name}</p>
        </Modal.Body>
      </Modal>
    );
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
}

export default PlayingModal;
