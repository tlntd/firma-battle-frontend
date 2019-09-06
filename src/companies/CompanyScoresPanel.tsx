import React, {Fragment} from 'react';
import {Company, Score} from '../App';
import Spinner from '../common/Spinner';
import Table from 'react-bootstrap/Table';
import './CompanyScoresPanel.scss';

type Props = {
  company: Company | undefined,
  scores: Score[] | undefined,
  questionId?: number
}

const CompanyScoresPanel: React.FC<Props> = ({company, scores}) => {
  if (!company || !scores || !scores.length) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h2 className="Scores-title">{company.name}</h2>
      <Table striped hover>
        <thead>
        <tr>
          <th>Vastustaja</th>
          <th>Kysymys</th>
          <th>Pisteet</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {renderScores(scores)}
        </tbody>
      </Table>
    </Fragment>
  );

  function renderScores(scores: Score[]) {
    return scores.map((score, i) => {
      return (
        <tr key={i}>
          <td><a href={`#yritykset-${score.opponentId}`}>{score.opponentName}</a></td>
          <td><a href={`#kysymykset-${score.questionId}`}>{score.questionText}</a></td>
          {renderDelta(score.delta)}
          {renderArrow(score.delta)}
        </tr>
      )
    })
  }

  function renderDelta(delta: number) {
    if (delta >= 0) {
      return <td className="text-success">+{delta}</td>;
    }
    return <td className="text-danger">{delta}</td>;
  }

  function renderArrow(delta: number) {
    if (delta >= 0) {
      return <td><div className="arrow-up"/></td>;
    }
    return <td><div className="arrow-down"/></td>;
  }
};

export default CompanyScoresPanel;
