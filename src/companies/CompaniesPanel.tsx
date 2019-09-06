import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import {Company, UpdateCompaniesState} from '../App';
import config from '../config';
import CompanyScoresPanel from './CompanyScoresPanel';

type CompaniesProps = {
  hash: string,
  updateState: (state: UpdateCompaniesState) => void,
  companies: Company[]
}

type CompaniesState = {}

export default class CompaniesPanel extends Component<CompaniesProps, CompaniesState> {
  async componentDidMount(): Promise<void> {
    try {
      const response = await axios.get(`${config.api_endpoint}/companies`);
      this.props.updateState({companies: response.data});
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidUpdate(): Promise<void> {
    const companyId: number = this.getCompanyId();

    if (companyId) {
      const company = this.getCompany();
      if (company && !company.questions) {
        await this.fetchQuestions(companyId);
        await this.fetchScores(companyId);
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
    const companyId = this.getCompanyId();

    if (companyId) {
      const company = this.getCompany();
      return <CompanyScoresPanel company={company} scores={company && company.scores}/>;
    }

    return (
      <ListGroup variant="flush">
        {this.renderCompanies()}
      </ListGroup>
    );
  }

  renderCompanies() {
    return this.props.companies.map((company) => {
      return (
        <ListGroup.Item key={company.id} action href={`#yritykset-${company.id}`}>
          {company.name}
        </ListGroup.Item>
      );
    });
  }

  async fetchQuestions(companyId: number): Promise<void> {
    const {companies, updateState} = this.props;
    try {
      const response = await axios.get(`${config.api_endpoint}/companies/${companyId}/questions`);
      const patchedCompanies = companies.map((company) => {
        if (company.id === companyId) {
          company.questions = response.data;
        }
        return company;
      });
      updateState({companies: patchedCompanies});
    } catch (e) {
      console.error(e);
    }
  }

  async fetchScores(companyId: number): Promise<void> {
    const {companies, updateState} = this.props;
    try {
      const response = await axios.get(`${config.api_endpoint}/companies/${companyId}/scores`);
      const patchedCompanies = companies.map((company) => {
        if (company.id === companyId) {
          company.scores = response.data;
        }
        return company;
      });
      updateState({companies: patchedCompanies});
    } catch (e) {
      console.error(e);
    }
  }

  getCompanyId(): number {
    return parseInt(this.props.hash.split('-')[1], 10);
  }

  getCompany(): Company | undefined {
    return this.props.companies.find((company) => company.id === this.getCompanyId());
  }
}
