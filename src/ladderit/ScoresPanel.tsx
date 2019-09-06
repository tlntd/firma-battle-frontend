import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Question} from '../App';
import Spinner from '../common/Spinner';

type ScoresPanelProps = {
  question: Question | undefined
}

type ScoresPanelState = {

}

export default class ScoresPanel extends Component<ScoresPanelProps, ScoresPanelState> {
  render() {
    const {question} = this.props;

    if (!question || !question.scores) {
      return <Spinner />;
    }

    return (
      <ListGroup variant="flush">
        {this.renderScores(question)}
      </ListGroup>
    )
  }

  renderScores(question: Question) {
    return question.scores.map((score, i) => {
      return (
        <ListGroup.Item key={score.id}>
          {score.score} | {score.company.name}
        </ListGroup.Item>
      )
    })
  }
}
