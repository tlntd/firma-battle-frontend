import React, {Component, Fragment} from 'react';
import './App.scss';
import Header from './Header';
import LadderitPanel from './ladderit/LadderitPanel';
import FaqPanel from './faq/FaqPanel';
import HomePanel from './home/HomePanel';

type AppProps = {};

export type Company = {
  name: string
};

export type Score = {
  id: number,
  score: number,
  company: Company
}

export type Question = {
  id: number,
  text: string
  scores: Score[]
};

type AppState = {
  hash: string,
  questions: Question[]
};

export type UpdateState = {
  questions: Question[]
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hash: document.location.hash,
      questions: []
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
    const {hash, questions} = this.state;

    if (hash.includes('#ladderit')) {
      return <LadderitPanel hash={hash} questions={questions} updateState={(state: UpdateState) => this.setState(state)}/>;
    } else if (hash === '#faq') {
      return <FaqPanel/>;
    }

    return <HomePanel/>;
  }

}

export default App;
