import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import {enableMapSet} from "immer";

enableMapSet()

render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
