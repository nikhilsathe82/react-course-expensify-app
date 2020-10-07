import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


export default class ExpenseForm extends React.Component {
    //constructor is used to access props from parent component
    constructor(props){
        super(props);

        //set up local component state. use default 4 state values only if no expense data is passed down. i.e. add expense page works.
        // else use original data if expense data is passed down
        //below state works in case of both add or edit expense
        this.state ={
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note :'',
            amount: props.expense ? (props.expense.amount / 100).toString() : '', //as amount is number, we have to conver it to string
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error:''
        };
    }
    
    
    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(()=>({ description })); //({description:description}) 1st is obj prop and second is virable. setState(()=> is the updater func
    }; 
    onNoteChange = (e) => {
        // const note = e.target.value;
        e.persist();
        this.setState(()=>({ note:e.target.value }));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState (() => ({ amount }));    
        } 
    };
    onDateChange = (createdAt) =>{
        if (createdAt) {
            this.setState(()=>({ createdAt }));
        };

    };
    onFocusChange = ({ focused }) => {
       this.setState(() => ({ calendarFocused: focused })); //focused contains value selected by user from calendar which is assigned to calendarfocussed in state obj
    };

    //to handle form onSubmit
    onSubmit = (e) =>{
      e.preventDefault(); //prevents full page refresh
      if(!this.state.description || !this.state.amount){
           this.setState(() => ({ error: "Please provide description and amount."}));

      } else {
        this.setState(() => ({ error:''}));
        //onSubmit is the one passed down from addexpensepage and we are calling it with data and all props
        this.props.onSubmit({ //we are using props as it is passed in from parent addexpensepage
           description: this.state.description,
           amount: parseFloat(this.state.amount,10) * 100, //conver amount to int from string
           createdAt: this.state.createdAt.valueOf(), //createdAt is moment obj and convert it to timestamp. this gives regular number that gives that value
           note: this.state.note
        });

      };
    };

    render() {
        const {description,amount} = this.state;
        const isEnabled = description.length>0 && amount.length>0;
        return (
            <div>
             {this.state.error && <p>{this.state.error}</p>} 
             <form onSubmit={this.onSubmit}>
                <input 
                   type="text"
                   placeholder="Description"
                   autoFocus
                   value={this.state.description} //sets to current state value
                   onChange={this.onDescriptionChange}
                />
                <input 
                   type="text"
                   placeholder="Amount"
                   value={this.state.amount}
                   onChange={this.onAmountChange}
                />
                <SingleDatePicker 
                   date={this.state.createdAt}
                   onDateChange={this.onDateChange}
                   focused={this.state.calendarFocused}
                   onFocusChange={this.onFocusChange}
                   numberOfMonths={1}
                   isOutsideRange={()=> false}
                />
                <textarea
                placeholder="Add a note for your expense (optional)"
                value={this.state.note}
                onChange={this.onNoteChange}
                >
                </textarea>
                <button disabled={!isEnabled}>Add Expense</button>
             </form>
            </div>
        )
    }
}