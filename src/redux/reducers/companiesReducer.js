
const initialState = {
	allCompanies: [],
	selectedCompany: {}
};

function companiesReducer (state = initialState, action) {
	switch (action.type) {
		case 'SET_ALL_COMPANIES':
			let companies = action.payload;
			companies = companies.map(company => company = {...company, checked: false})
			return {...state, allCompanies: companies};

		case 'SET_SELECTED_COMPANY':
			const company = action.payload;
			return {...state, selectedCompany: {
				companyId: company.ID,
				companyName: company.Name,
				companyAddress: company.Address,
				country: company.Country,
				city: company.City,
				companyPhone: company.TelephoneNumber,
				contactName: company.ContactPerson_Name,
				contactPhone: company.ContactPerson_TelephoneNumber,
				contactEmail: company.ContactPerson_Email,
				companyBuses: company.TransportationCompanyBuses,
				FK_OperatorID: company.FK_OperatorID,
				Masked_ID: company.Masked_ID
			}}

		case 'SET_CHECKED_COMPANY':
			let newCompanies = state.allCompanies.map(company => (
				company.ID === action.payload ? {...company, checked: true} : {...company, checked: false} 
			))
			return {...state, allCompanies: newCompanies};
		
		default:
			return state;
	}
}

export default companiesReducer;