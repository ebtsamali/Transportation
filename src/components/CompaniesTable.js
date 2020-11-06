import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setAllCompanies, setCheckedCompany } from '../redux/actions/companiesAction';
import companiesAPI from '../API/companiesAPI';
import '../styles/companiesTable.scss';

const CompaniesTable  = (props) => {
	const { setCompanies, allCompanies, setChecked } = props;

	useEffect(() => {
		companiesAPI.getAllCompanies()
		.then(response => {
			if (response.statusText !== "OK") {
				throw new Error('Faild to get company data');
			}
			const companies = response.data.Data;
			if(companies) {
				setCompanies(companies);
			}
		})
		.catch(error => console.log(error))
	}, [])

	const handleCheck = (e, id) => {
		if (e.target.value) {
			setChecked(id)
		}
	}

	return(
		<div id="companies-table">
			<Table>
				<thead>
					<tr>
						<th><input type="checkbox" className="th-select" /></th>
						<th>Company ID #</th>
						<th>Company Name</th>
						<th>Total Fleet</th>
						<th><span className="material-icons">settings</span></th>
					</tr>
				</thead>
				{ allCompanies.length > 0 && <tbody> 
					{allCompanies.map(company => {
						return(
							<tr key={company.ID}>
								<td> 
									<input type="checkbox" checked={company.checked} onChange={(e) => handleCheck(e,company.ID)} /> 
								</td>
								<td>{company.ID}</td>
								<td>{company.Name}</td>
								<td>{company.TotalFleet}</td>
								<td>
									{company.CanEdit && <Link to={{pathname: `/transportationCompanies/update/${company.ID}`}} className="edit-btn">
										Edit
									</Link>}
								</td>
							</tr>
						);
					})} 
				</tbody>}
			</Table>
		</div>
	);
}

const mapStateToProps = state => ({
	allCompanies: state.companies.allCompanies
})

const mapDispatchToProps = dispatch => ({
	setCompanies: companies => dispatch(setAllCompanies(companies)),
	setChecked: id => dispatch(setCheckedCompany(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesTable);