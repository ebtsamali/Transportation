import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './shared/Header';
import AllCompanies from './components/AllCompanies';
import AddCompany from './components/AddCompany';
import './styles/main.scss';

function App() {
  return (
	  <>
		<Header />
		<BrowserRouter>
			<Switch>
				<Route exact path="/transportationCompanies/all" component={AllCompanies} />
				<Route exact path="/" component={AllCompanies} />
				<Route exact path="/transportationCompanies/add" component={AddCompany} />
				<Route exact path="/transportationCompanies/update/:companyId" component={AddCompany} />
			</Switch>
		</BrowserRouter>
	  </>
  );
}

export default App;
