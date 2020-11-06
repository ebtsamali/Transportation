import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setSelectedCompany } from '../redux/actions/companiesAction';
import formDataAPI from '../API/formDataAPI';
import companiesAPI from '../API/companiesAPI';
import '../styles/addCompany.scss';

class AddCompany extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			countries: [],
			cities: [],
			vehiclesTypes: [],
			checkedCompany: {},
			status: "add"
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.getCities = this.getCities.bind(this);
	}

	componentDidMount() {
		const { match } = this.props;

		formDataAPI.countries().then(response => {
			this.setState({countries: response.data.Data});
		});

		formDataAPI.vehiclesTypes().then(response => {
			this.setState({vehiclesTypes: response.data.Data});
		});

		if (match.path.endsWith('update/:companyId')) {
			this.setState({status: "update"});
			companiesAPI.getselectedCompany(match.params.companyId)
			.then(response => {
				const company = response.data.Data;
				if (response.statusText !== "OK") {
					throw new Error('Faild to get company data');
				}
				console.log(company);
				this.props.setCompany(company);
				this.getCities(null, company.Country);
			})
			.catch(error => console.log(error))
		}
	}

	componentWillUnmount() {
		this.props.setCompany({});
	}

	getCities(e, id) {
		const countryId = id ?? e?.target.value ;
		formDataAPI.cities(countryId).then(response => {
			this.setState({cities: response.data.Data});
		})
	}

	renderError({error, touched}) {
		if (touched && error) {
			return (
				<div className="alert alert-danger custom-width">
					{error}
				</div>
			);
		}
	}

	renderInput = ({ input, label,disabled, width, meta }) => {
		let setWidth = width || 2; 
		return (
			<Col md={setWidth}>
				<label>{label}</label>
				<input {...input} className="form-control" disabled={!!disabled} />
				{this.renderError(meta)}
			</Col>
		);
	}

	renderSelect = ({ input, label, data, meta }) => {
		return (
			<Col md={2} className="selectLocation">
				<label>{label}</label>
				<select {...input} className="form-control">
					<option value="">Choose</option>
					{ data.length > 0 && data.map( item => 
						<option key={item.ID} value={item.ID}>
							{item.Value}
						</option>
					)}
				</select>
				{this.renderError(meta)}
			</Col>
		);
	}

	renderDatePicker = ({ input, label, meta }) => {
		return (
			<Col md={2} className="selectLocation">
				<label>{label}</label>
				<DatePicker
					{...input}
					className="form-control"
					selected={input.value ?  input.value : null}
					placeholderText="Choose"
					dateFormat="yyyy"
					showYearPicker
				/>
				{this.renderError(meta)}
			</Col>
		);
	}

	// renderFile = ({ input, label, meta }) => {
	// 	return (
	// 		<Col md={2}>
	// 			<label>{label}</label>
	// 			<input {...input} type="file" className="file-upload" />
	// 			{this.renderError(meta)}
	// 		</Col>
	// 	);
	// }

	renderBuses = ({ fields }) => {
		console.log(fields);
		if (!fields.length) {
			console.log('enter');
			fields.push({});
		}
		const  { vehiclesTypes } = this.state;
		return (
			fields.map((bus, index) => {
				console.log(bus);
				return (
					<Card key={index}>
						<Row className="form-group">
							<h5>Bus {index + 1} Data</h5>
						</Row>
					
						<Row className="form-group">
							<Field name={`${bus}.BusTypeID`} label="Vehicle Type 1" data={vehiclesTypes} component={this.renderSelect} />
							<Field name={`${bus}.Brand`} label="Brand" component={this.renderInput} />
							<Field name={`${bus}.YearModel`} label="Year Model" component={this.renderDatePicker} />
							<Field name={`${bus}.Description`} label="Description" width="4" component={this.renderInput} />
							<Col md={2}></Col>
							<Field name={`${bus}.Number_Of_Seats`} label="Total Number of Seats" component={this.renderInput} />
							<Field name={`${bus}.Number_Of_Seats_Per_Raw`} label="Number of Seats per Row" component={this.renderInput} />
							<Field name={`${bus}.Total_Number_Of_Buses`} label="Total Num. of Buses" component={this.renderInput} />
							{/** <Field name={`${bus}.Bus_Layout`} label="Vehicle Layout" component={this.renderFile} />*/}
							<Col md={2}></Col>
							<Field name={`${bus}.Notes`} label="Notes" width="6" component={this.renderInput} />
						</Row>

						<Row className="form-group">
							{index > 0 && <Col md={2}>
								<Button type="button" className="form-control" onClick={() => fields.remove(index)} > Remove </Button>
							</Col>}
							<Col md={2}> 
								<Button type="button" className="form-control add" onClick={() => fields.push({}) }> Add </Button>
							</Col>
						</Row>
					</Card>
				);
			})
		);
	}
	

	onSubmit(formValues) {
		const { initialValues, allCompanies } = this.props;
		// let image = new FormData();
		// image.append('Bus_Layout', formValues.)
		const data = {
			Address: formValues.companyAddress,
			Country: formValues.country,
			City: formValues.city,
			TelephoneNumber: formValues.companyPhone,
			ContactPerson_Name: formValues.contactName,
			ContactPerson_TelephoneNumber: formValues.contactPhone,
			ContactPerson_Email: formValues.contactEmail,
			TransportationCompanyBuses: formValues.TransportationCompanyBuses.map((bus, index) => bus = {
				...bus, 
				ID: index, 
				YearModel:  new Date(bus.YearModel).getFullYear(),
			})
		}

		if (this.state.status === "update") {
			const another = {
				ID: formValues.companyId,
				FK_OperatorID: initialValues.FK_OperatorID,
				Masked_ID: initialValues.Masked_ID
			}
			companiesAPI.updateCompany({...data,...another }).then(response => {
				if(response.statusText !== "OK") {
					throw new Error('Faild to save data');
				}
				this.props.history.push("/transportationCompanies/all");
			}) 
			.catch(error => {
				console.log(error.message);
			})
			return;
		}

		const company = allCompanies.find(company => company.checked);
		const {CanEdit, TotalFleet, checked, ...anotherdata} = company ? company : {};

		companiesAPI.addCompany({...data, ...anotherdata}).then(response => {
			if(response.statusText !== "OK") {
				throw new Error('Faild to save data');
			}
			console.log(response);
			this.props.history.push("/transportationCompanies/all");
		}) 
		.catch(error => {
			console.log(error.message);
		})
	}

	render() {
		// console.log(this.props);
		const { countries, cities } = this.state;
		return (
			<form id="add-company" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Card className="card">
					<Row className="form-group">
						<h5>Company Data</h5>
					</Row>

					<Row className="form-group">
						<Field name="companyId" label="Company ID #" disabled="true" component={this.renderInput} />
						<Field name="companyAddress" label="Company Address" component={this.renderInput} />
						<Field name="country" label="Country" data={countries} component={this.renderSelect} onChange={this.getCities} />
						<Field name="city" label="City" data={cities} component={this.renderSelect} />			
						<Field name="companyPhone" label="Company Telephone Num." component={this.renderInput} />
						<Col md={2}></Col>
						<Field name="contactName" label="Contact Person Name" component={this.renderInput} />
						<Field name="contactPhone" label="Contact Person Tele.Num." component={this.renderInput} />
						<Field name="contactEmail" label="Contact Person Email" component={this.renderInput} />
					</Row>
				</Card>

				<FieldArray name="TransportationCompanyBuses" component={this.renderBuses} />

				<Row className="form-group btns">
					<Col md={2}>
						<Button type="reset" className="form-control btn" onClick={this.props.reset}> Clear </Button>
					</Col>
					<Col md={2}> 
						<Button type="submit" className="form-control btn" > Save </Button>
					</Col>
				</Row>
			</form>
		);
	}
}

const validate = formValues => {
	let errors = {};
	if (!formValues.companyAddress) {
		errors.companyAddress = "Address is Required";
	}
	if (!formValues.country) {
		errors.country = "Country is Required";
	}
	if (!formValues.companyPhone) {
		errors.companyPhone = "Telephone Num. is Required";
	}
	if (!formValues.contactName) {
		errors.contactName = "Contact Person Name is Required";
	}
	if (!formValues.contactPhone) {
		errors.contactPhone = "Contact Person Phone is Required";
	}
	if (!formValues.contactEmail) {
		errors.contactEmail = "Contact Person Email is Required";
	}

	return errors;
}

const mapStateToProps = state => ({
	initialValues: state.companies.selectedCompany,
	allCompanies: state.companies.allCompanies
})

const mapDispatchToProps = dispatch => ({
	setCompany: company => dispatch(setSelectedCompany(company))
})

AddCompany = reduxForm({
	form: 'addCompany',
	enableReinitialize: true,
	validate
})(AddCompany);

AddCompany = connect(mapStateToProps, mapDispatchToProps)(AddCompany);

export default AddCompany;

// export default reduxForm({
// 	form: 'addCompany',
// 	validate
// })(AddCompany);