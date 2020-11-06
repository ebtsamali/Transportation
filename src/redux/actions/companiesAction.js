import { SET_ALL_COMPANIES, SET_SELECTED_COMPANY, SET_CHECKED_COMPANY } from '../constants/actionsTypes';

export const setAllCompanies = (companies) => {
	return {
		type: SET_ALL_COMPANIES,
		payload: companies
	}
}

export const setSelectedCompany = (company) => {
	return {
		type: SET_SELECTED_COMPANY,
		payload: company
	}
}

export const setCheckedCompany = (id) => {
	return {
		type: SET_CHECKED_COMPANY,
		payload: id
	}
}