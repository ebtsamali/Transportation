import axios from 'axios';

function companiesServices() {
	return ({
		getAllCompanies: () => {
			return axios.get('http://23.254.228.118:8080/API/api/TransportationCompany/All');
		},
		addCompany: (data) => {
			console.log("data ",data);
			return axios.post('http://23.254.228.118:8080/API/api/TransportationCompany/Add', data);
		},
		getselectedCompany: (companyId) => {
			return axios.get(`http://23.254.228.118:8080/API/api/TransportationCompany/GetById?id=${companyId}`)
		},
		updateCompany: (data) => {
			return axios.put('http://23.254.228.118:8080/API/api/TransportationCompany/Update', data)
		}
	});
}

export default companiesServices();