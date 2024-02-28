import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import './App.css';
import logo from './assets/CRUD.png'
import "bootstrap/dist/css/bootstrap.min.css"
import Product from './main/product/Product';
import Category from './main/category/Category';
import Variation from './main/variation/Variation';
import Nav from './global/Nav';
import ProductCreate from './main/product/ProductCreate.';
import CategoryCreate from './main/category/CategoryCreate';
import VariationCreate from './main/variation/VariationCreate';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className='container'>
            <div className='row'>
              <div className="col header-top">
                <img src={logo} className="logo img-fluid" />
              </div>
            </div>
            <div className="row mt-4 app-container">
              <div className="col-md-2 pe-0">
                <Nav />
              </div>
              <div className="col-md-10 pt-3 pb-3 content">
                <Switch>
                  <Route exact path="/">
                    <Product />
                  </Route>
                  <Route path="/product/:action/:id?">
                    <ProductCreate />
                  </Route>
                  <Route exact path="/category">
                    <Category />
                  </Route>
                  <Route path="/category/:action/:id?">
                    <CategoryCreate />
                  </Route>
                  <Route exact path="/variation">
                    <Variation />
                  </Route>
                  <Route path="/variation/:action/:id?">
                    <VariationCreate />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
