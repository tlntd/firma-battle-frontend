import React, {Component, Fragment} from 'react';
import './App.scss';
import Header from './Header';
import QuestionsPanel from './ladderit/QuestionsPanel';
import FaqPanel from './faq/FaqPanel';
import HomePanel from './home/HomePanel';
import CompaniesPanel from './companies/CompaniesPanel';

type AppProps = {};

export type Score = {
  id: number,
  score: number,
  name: string,
  wins: number,
  scores: number,
  pluralText: string
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
  questions: Question[]
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

    if (hash.includes('#kysymykset')) {
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
