import moment from 'moment';

//Filters reducer
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate: moment().startOf('month'), //instance of moment to show start of month in calendar
    endDate: moment().endOf('month') //instance of moment to show end of month in calendar
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
           return { //take the state obj. and assign the text received to action.text value
                   ...state,
                   text:action.text};
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
                return {
                    ...state,
                    endDate: action.endDate
                }; 
        default:
            return state;
    }
};
export default filtersReducer;