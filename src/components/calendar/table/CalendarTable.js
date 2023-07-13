import React, {Component} from "react";
import "./style.css";
import {
    isValidDate,
    isBefore,
    startOfToday
} from "../DateUtil";

class CalendarTable extends Component {
    renderDates() {
        let {dates} = this.props;
        let tr = [];
        for (let i = 0; i < dates.length; i++) {
            let td = [];
            for (let j = 0; j < 7; j++) {
                let position = i + j;
                let cal = dates[position];
                if (cal && cal.text) {
                    let className = [];
                    const isPastDate =
                        isValidDate(cal.date) && isBefore(cal.date, startOfToday());

                    if (isPastDate & (cal.events === 0)) {
                        className.push("bg-light disabled-event");
                    } else if (cal.isSelected) {
                        className.push("bg-primary text-white");
                    } else if (cal.events > 0) {
                        className.push(
                            "bg-secondary text-white",
                            isPastDate ? "disabled-event" : ""
                        );
                    }

                    td.push(
                        <td
                            key={position}
                            className={className.join(" ")}
                            onClick={() => !isPastDate && this.props.onItemClick(position)}
                        >
                            <div className="px-1 d-flex align-items-center">
                                <h6 className="m-0 font-size-sm font-weight-bold">
                                    {cal.text}
                                </h6>
                            </div>
                            {cal.events > 0 && (
                                <span
                                    className="badge badge-pill badge-light p-1 position-absolute"
                                    style={{bottom: "12px", right: "12px"}}
                                >
                  <label
                      className="text-primary font-weight-bold ml-1 mb-0"
                      style={{fontSize: "10px"}}
                  >
                    {cal.events} events
                  </label>
                </span>
                            )}
                        </td>
                    );
                } else {
                    //blank column
                    td.push(<td className="bg-light disabled-event" key={position}/>);
                }
            }
            i += 6;
            tr.push(<tr key={i}>{td}</tr>);
        }
        return tr;
    }

    render() {
        return (
            <div className="bg-white p-2 calendar">
                <table
                    className="table table-bordered table-responsive-sm"
                    style={{minHeight: "690px"}}>
                    <thead>
                    <tr>
                        <th className="font-size-xs text-muted">SUN</th>
                        <th className="font-size-xs text-muted">MON</th>
                        <th className="font-size-xs text-muted">TUE</th>
                        <th className="font-size-xs text-muted">WED</th>
                        <th className="font-size-xs text-muted">THU</th>
                        <th className="font-size-xs text-muted">FRI</th>
                        <th className="font-size-xs text-muted">SAT</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderDates()}</tbody>
                </table>
            </div>
        );
    }
}

export default CalendarTable;
