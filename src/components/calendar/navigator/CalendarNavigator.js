import React, { Component } from "react";

class CalendarNavigator extends Component {
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  render() {
    let { previousClick, todayClick, nextClick } = this.props;
    let { currentYear, currentMonth } = this.props;
    return (
      <div className="d-flex justify-content-between mb-2 align-items-center my-4">
        <div />
        <h5 className="text-uppercase text-muted">{`${this.monthNames[currentMonth]} ${currentYear}`}</h5>
        <div>
          <div
            className="btn-group border rounded"
            role="group"
            aria-label="Navigation"
            style={{ height: "35px" }}
          >
            <button
              onClick={previousClick}
              type="button"
              className="btn btn-light py-1"
            >
              <i className="fa fa-chevron-left font-xs text" />
            </button>
            <button
              onClick={todayClick}
              type="button"
              className="btn btn-light border-left text-muted font-xs px-4 py-1"
            >
              TODAY
            </button>
            <button
              onClick={nextClick}
              type="button"
              className="btn btn-light py-1 border-left "
            >
              <i className="fa fa-chevron-right font-xs text-muted" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarNavigator;
