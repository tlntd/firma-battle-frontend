import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Company} from '../App';
import Spinner from '../common/Spinner';

type Props = {
  company: Company | undefined
}

const CompanyQuestionsPanel: React.FC<Props> = ({company}) => {
  if (!company || !company.questions || !company.questions.length) {
    return <Spinner />;
  }

  return (
    <ListGroup variant="flush">
      {renderScores(company)}
    </ListGroup>
  );

  function renderScores(company: Company) {
    return company.questions.map((question) => {
      return (
        <ListGroup.Item key={question.id} action href={`#yritykset-${company.id}-kysymykset-${question.id}`}>
          <span className="rating">{question.score}</span> {question.pluralText}
        </ListGroup.Item>
      )
    })
  }
};

export default CompanyQuestionsPanel;
