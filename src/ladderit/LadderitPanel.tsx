import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import {UpdateState, Question} from '../App';
import config from '../config';
import ScoresPanel from './ScoresPanel';

type LadderitProps = {
  hash: string,
  updateState: (state: UpdateState) => void,
  questions: Question[]
}

type LadderitState = {
}

export default class LadderitPanel extends Component<LadderitProps, LadderitState> {
  async componentDidMount(): Promise<void> {
    try {
      const response = await axios.get(`${config.api_endpoint}/questions`);
      this.props.updateState({questions: response.data});
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidUpdate(): Promise<void> {
    const {hash, questions, updateState} = this.props;
    const id: number = parseInt(hash.split('-')[1], 10);

    if (id) {
      const question = this.getQuestion();
      if (question && !question.scores) {
        try {
          const response = await axios.get(`${config.api_endpoint}/questions/${id}/scores`);
          const patchedQuestions = questions.map((question) => {
            if (question.id === id) {
              question.scores = response.data;
            }
            return question;
          });
          updateState({questions: patchedQuestions});
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.defineContent()}
          </Col>
        </Row>
      </Container>
    );
  }

  defineContent() {
    const id = this.getQuestionsId();

    if (id) {
      return <ScoresPanel question={this.getQuestion()} />;
    }

    return (
      <ListGroup variant="flush">
        {this.renderQuestions()}
      </ListGroup>
    );
  }

  renderQuestions() {
    return this.props.questions.map((question) => {
      return (
        <ListGroup.Item key={question.id} action href={`#kysymykset-${question.id}`}>
          {question.pluralText}
        </ListGroup.Item>
      );
    });
  }

  getQuestionsId(): number {
    return parseInt(this.props.hash.split('-')[1], 10);
  }

  getQuestion(): Question | undefined {
    return this.props.questions.find((question) => question.id === this.getQuestionsId());
  }
}
