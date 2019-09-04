import React, {Component, Fragment} from 'react';
import './App.scss';
import Header from './Header';
import LadderitPanel from './ladderit/LadderitPanel';
import FaqPanel from './faq/FaqPanel';
import HomePanel from './home/HomePanel';

type AppProps = {};

type AppState = {
  hash: string
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hash: document.location.hash
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
    const {hash} = this.state;

    if (hash === '#ladderit') {
      return <LadderitPanel/>;
    } else if (hash === '#faq') {
      return <FaqPanel/>;
    }

    return <HomePanel/>;
  }

}

export default App;
