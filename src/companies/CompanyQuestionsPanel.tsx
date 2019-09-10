import React, {Fragment} from 'react';
import {Company} from '../App';
import Spinner from '../common/Spinner';
import Table from 'react-bootstrap/Table';

type Props = {
  company: Company | undefined
}

const CompanyQuestionsPanel: React.FC<Props> = ({company}) => {
  if (!company || !company.questions || !company.questions.length) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h2 className="Scores-title">{company.name}</h2>
      <Table striped hover>
        <thead>
        <tr>
          <th>Pisteet</th>
          <th>Kysymys</th>
        </tr>
        </thead>
        <tbody>
        {renderQuestions(company)}
        </tbody>
      </Table>
    </Fragment>
  );

  function renderQuestions(company: Company) {
    return company.questions.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.score}</td>
          <td><a href={`#tulokset-${question.id}`}>{question.pluralText}</a></td>
        </tr>
      );
    });
  }
};

export default CompanyQuestionsPanel;
