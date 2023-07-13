import React, {Component, Fragment} from "react";
import CalendarNavigator from "./navigator/CalendarNavigator";
import CalendarTable from "./table/CalendarTable";
import {createCalendar} from "./table/CalenderFactory";
import {startOfToday} from "./DateUtil";

class Calendar extends Component {
    constructor() {
        super();
        let today = startOfToday();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        let dates = createCalendar(this.currentMonth, this.currentYear);
        this.state = {dates};
    }

    setTodayEvent() {
        const today = startOfToday();
        this.onItemClick(
            this.state.dates.findIndex(
                ({date}) => date && date.getTime() === today.getTime()
            )
        );
    }

    getDates() {
        return this.state.dates;
    }

    setDates = dates => {
        this.setState({dates: dates});
    };
    onItemClick = position => {
        this.select(position);
        let {onItemClick} = this.props;
        if (onItemClick) onItemClick(position);
    };

    select(position) {
        let {dates} = this.state;
        for (let i = 0; i < dates.length; i++) {
            let cal = dates[i];
            if (i === position) {
                cal.isSelected = true;
            } else if (cal.isSelected) {
                cal.isSelected = false;
            }
        }
        this.setDates(dates);
    }

    todayClick = () => {
        let today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.setState(
            {dates: createCalendar(this.currentMonth, this.currentYear)},
            () => {
                let {todayClick} = this.props;
                todayClick();
            }
        );
    };
    previousClick = () => {
        this.currentYear =
            this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
        this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;

        this.setState(
            {dates: createCalendar(this.currentMonth, this.currentYear)},
            () => {
                let {previousClick} = this.props;
                previousClick();
            }
        );
    };
    nextClick = () => {
        this.currentYear =
            this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
        this.setState(
            {dates: createCalendar(this.currentMonth, this.currentYear)},
            () => {
                let {nextClick} = this.props;
                nextClick();
            }
        );
    };

    render() {
        let {dates} = this.state;
        return (
            <Fragment>
                <CalendarNavigator
                    currentYear={this.currentYear}
                    currentMonth={this.currentMonth}
                    previousClick={this.previousClick}
                    todayClick={this.todayClick}
                    nextClick={this.nextClick}
                />
                <CalendarTable dates={dates} onItemClick={this.onItemClick}/>
            </Fragment>
        );
    }
}

export default Calendar;
