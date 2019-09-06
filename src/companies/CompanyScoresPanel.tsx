import React, {Fragment} from 'react';
import {Company, Question} from '../App';
import Spinner from '../common/Spinner';
import Table from 'react-bootstrap/Table';
import './CompanyScoresPanel.scss';

type Props = {
  company: Company | undefined,
  question: Question | undefined
}

const CompanyScoresPanel: React.FC<Props> = ({company, question}) => {
  if (!company || !question || !question.scores || !question.scores.length) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h2 className="Scores-title">{company.name}</h2>
      <h4 className="Scores-title">{question.pluralText}</h4>
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
        {renderScores(question)}
        </tbody>
      </Table>
    </Fragment>
  );

  function renderScores(question: Question) {
    return question.scores.map((score, i) => {
      return (
        <tr key={i}>
          <td>{score.opponent_name}</td>
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
