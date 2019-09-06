import React, {Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import {Question} from '../App';
import Spinner from '../common/Spinner';
import './QuestionScoresPanel.scss';

type QuestionScoresPanelProps = {
  question: Question | undefined
}

const QuestionScoresPanel: React.FC<QuestionScoresPanelProps> = ({question}) => {
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
            {renderScores(question)}
          </tbody>
        </Table>
      </Fragment>
    );

  function renderScores(question: Question) {
    return question.scores.map((score, i) => {
      return (
        <tr key={score.id}>
          <td>{i+1}.</td>
          <td>{score.score}</td>
          <td><a href={`#yritykset-${score.companyId}`}>{score.name}</a></td>
          <td>{score.wins}</td>
          <td>{score.scores - score.wins}</td>
        </tr>
      )
    })
  }
};

export default QuestionScoresPanel;
