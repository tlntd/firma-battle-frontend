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

type CompaniesState = {
}

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
    const {hash, companies, updateState} = this.props;
    const id: number = parseInt(hash.split('-')[1], 10);

    if (id) {
      const question = this.getCompany();
      if (question && !question.scores) {
        try {
          const response = await axios.get(`${config.api_endpoint}/companies/${id}/scores`);
          const patchedCompanies = companies.map((company) => {
            if (company.id === id) {
              company.scores = response.data;
            }
            return company;
          });
          updateState({companies: patchedCompanies});
        } catch (e) {
          console.error(e);
        }
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
    const id = this.getCompanyId();

    if (id) {
      return <CompanyScoresPanel company={this.getCompany()} />
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

  getCompanyId(): number {
    return parseInt(this.props.hash.split('-')[1], 10);
  }

  getCompany(): Company | undefined {
    return this.props.companies.find((company) => company.id === this.getCompanyId());
  }
}
