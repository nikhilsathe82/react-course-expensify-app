import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount,setStartDate,setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
      calendarFocused: null
  };
  //ondateschanges is getting called with obj and we have to destructure it and use startdate and enddate
  onDatesChange = ({ startDate, endDate }) => {
         this.props.dispatch(setStartDate(startDate));
         this.props.dispatch(setEndDate(endDate));
  };
  onFocusChange = (calendarFocused) =>{
     this.setState(() => ({ calendarFocused })); //assign the calendarfocused prop to new value calendarfocused
  };
  render() {
    return (//props has access to state.filters.text. 
      <div>
        <input type="text" value={this.props.filters.text} onChange={(e) => { //e is event argument
          this.props.dispatch(setTextFilter(e.target.value));  //sets the text from input value using settextfilter and new state will be set using value={} above.
        }} />
        <select value={this.props.filters.sortBy} onChange={(e) => {
          if (e.target.value === "date") {
            this.props.dispatch(sortByDate());
          } else if (e.target.value === 'amount') {
            this.props.dispatch(sortByAmount());
          }
        }}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker 
         startDate={this.props.filters.startDate}
         endDate={this.props.filters.endDate}
         onDatesChange={this.onDatesChange} //call ondateschange when dates change.
         focusedInput={this.state.calendarFocused} //uses default state i.e calendarfocussed
         onFocusChange={this.onFocusChange}//takes in focusedinput from above line i.e. calendarfocused
         showClearDates={true}
         numberOfMonths={1}
         isOutsideRange={() => false} 
        />
      </div>
    );
  }
};


//to get value from store and display on the screen
const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters); //first () takes map,state,props func while second () takes the component
