import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Top from './panel/top';
import Bottom from './panel/bottom';
import Left from './panel/left';
import Right from './panel/right';
import Center from './panel/center';

const Main = () => {
  return (
    <Container>
      <Top />
      <ContainerMiddle>
        <Left />
        <Center />
        <Right />
      </ContainerMiddle>
      <Bottom />
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContainerMiddle = styled.div`
  flex: 1;
  display: flex;
`;
