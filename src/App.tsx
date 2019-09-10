import React, {Component, Fragment} from 'react';
import './App.scss';
import Header from './common/Header';
import QuestionsPanel from './questions/QuestionsPanel';
import FaqPanel from './faq/FaqPanel';
import HomePanel from './home/HomePanel';
import CompaniesPanel from './companies/CompaniesPanel';

type AppProps = {};

export type Score = {
  id: number,
  score: number,
  delta: number,
  name: string,
  wins: number,
  scores: number,
  pluralText: string,
  opponentName?: string,
  opponentId?: number,
  companyId?: number,
  questionText?: string
  questionId?: number
};

export type Question = {
  id: number,
  text: string,
  pluralText: string,
  scores: Score[],
  score?: number
};

export type Company = {
  id: number,
  name: string,
  questions: Question[],
  scores: Score[],
};

type AppState = {
  hash: string,
  questions: Question[],
  companies: Company[]
};

export type UpdateQuestionsState = {
  questions: Question[]
}

export type UpdateCompaniesState = {
  companies: Company[]
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hash: document.location.hash,
      questions: [],
      companies: []
    };
  }

  componentDidMount(): void {
    window.addEventListener('hashchange', (): void => {
      this.setState({
        hash: document.location.hash
      });
    });
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <div className="App">
          {this.defineContent()}
        </div>
      </Fragment>
    );
  }

  defineContent() {
    const {hash, questions, companies} = this.state;

    if (hash.includes('#tulokset')) {
      return <QuestionsPanel hash={hash} questions={questions} updateState={(state: UpdateQuestionsState) => this.setState(state)}/>;
    } else if (hash.includes('#yritykset')) {
      return <CompaniesPanel hash={hash} companies={companies} updateState={(state: UpdateCompaniesState) => this.setState(state)} />;
    } else if (hash === '#faq') {
      return <FaqPanel/>;
    }

    return <HomePanel/>;
  }

}

export default App;
