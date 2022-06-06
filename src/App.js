
import './App.css';
import MainPage from './component/MainPage';
import store from './store';
import {Provider} from 'react-redux';
function App() {
  return (
    <Provider store={store}>
        <MainPage></MainPage>
    </Provider>
   
  );
}

export default App;
