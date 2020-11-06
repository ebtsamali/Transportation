import React from 'react';
import { Link } from 'react-router-dom';
import CompaniesTable from './CompaniesTable'
import '../styles/allCompanies.scss';

function AllCompanies() {

	return(
		<div id="all-companies">
			<div className="add-link">
				<Link to={{ pathname: "/transportationCompanies/add" }}>
					<div> <span className="material-icons">add</span> </div>
					<p>Add Transportations</p>
				</Link>
			</div>
			<div className="companies-list">
				<CompaniesTable />
			</div>
		</div>
	);
}

export default AllCompanies;