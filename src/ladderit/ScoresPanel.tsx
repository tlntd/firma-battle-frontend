import React, {Component, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import {Question} from '../App';
import Spinner from '../common/Spinner';
import './ScoresPanel.scss';

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
      <Fragment>
        <h2 className="Scores-title">{question.pluralText}</h2>
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Pisteet</th>
              <th>Nimi</th>
              <th>Voitot</th>
              <th>Tappiot</th>
            </tr>
          </thead>
          <tbody>
            {this.renderScores(question)}
          </tbody>
        </Table>
      </Fragment>
    );
  }

  renderScores(question: Question) {
    return question.scores.map((score, i) => {
      return (
        <tr key={score.id}>
          <td>{i+1}.</td>
          <td>{score.score}</td>
          <td>{score.name}</td>
          <td>{score.wins}</td>
          <td>{score.scores - score.wins}</td>
        </tr>
      )
    })
  }
}
