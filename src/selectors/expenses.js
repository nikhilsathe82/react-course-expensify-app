import moment from 'moment';

//Get Visible expenses
export default (expenses,{text,sortBy,startDate,endDate}) => { //destructure the text, sortBy.. filters obj
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; //always true. so we want to filter expenses only if startdate is nonnumber 
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true ; //if there is no start date then value is always true and we do not filter
        //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true 
        const textMatch=(expense.description.toLowerCase()).includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch; //if all of these things are true then filter func returns true and item is kept in array. // if false, then  filter func returns false and item is removed and not display on screen. 
    }).sort((a,b) => {
         if (sortBy === 'date') {
             return a.createdAt < b.createdAt ? 1 : -1 // return 1 if a <b else return -1
         } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1 // return 1 if a <b else return -1
        }
    });                                                     
};

