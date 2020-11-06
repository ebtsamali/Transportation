import axios from 'axios';

function formData() {
	return ({
		countries: () => {
			return axios.get('http://23.254.228.118:8080/API/api/Lookup/GetCountries');
		},
		cities: (id) => {
			return axios.get(`http://23.254.228.118:8080/API/api/Lookup/GetCities?countryId=${id}`);
		},
		vehiclesTypes: () => {
			return axios.get('http://23.254.228.118:8080/API/api/Lookup/GetVehicleType');
		}
	});
}

export default formData();