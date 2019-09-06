import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Company} from '../App';
import Spinner from '../common/Spinner';

type ScoresPanelProps = {
  company: Company | undefined
}

const CompanyScoresPanel: React.FC<ScoresPanelProps> = ({company}) => {
  if (!company || !company.scores || !company.scores.length) {
    return <Spinner />;
  }

  return (
    <ListGroup variant="flush">
      {renderScores(company)}
    </ListGroup>
  );

  function renderScores(company: Company) {
    return company.scores.map((score) => {
      return (
        <ListGroup.Item key={score.id} action href={`#yritykset-${company.id}-kysymykset-${score.id}`}>
          <span className="rating">{score.score}</span> {score.pluralText}
        </ListGroup.Item>
      )
    })
  }
};

export default CompanyScoresPanel;
