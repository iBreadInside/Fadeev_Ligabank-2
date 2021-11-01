import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import {AppRoute} from '../../const';
import CreditCalculatorPage from '../credit-calculator-page/credit-calculator-page';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <CreditCalculatorPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
