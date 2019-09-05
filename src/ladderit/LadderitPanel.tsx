import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import {UpdateState, Question} from '../App';
import config from '../config';

type LadderitProps = {
  updateState: (state: UpdateState) => void,
  questions: Question[]
}

type LadderitState = {
  selectedQuestion: Question | undefined
}

export default class LadderitPanel extends Component<LadderitProps, LadderitState> {
  constructor(props: LadderitProps) {
    super(props);
    this.state = {
      selectedQuestion: undefined
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const response = await axios.get(`${config.api_endpoint}/questions`);
      this.props.updateState({questions: response.data});
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {this.renderQuestions()}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }

  renderQuestions() {
    return this.props.questions.map((question) => {
      return (
        <ListGroup.Item action href={`#ladderit-${question.id}`}>
          {question.text}
        </ListGroup.Item>
      );
    });
  }
}
