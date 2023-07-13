import CalendarModel from "../CalendarModel";

export function createCalendar(month, year) {
    const dates = [];
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    console.log("month",month);
    console.log("year",year);
    console.log("daysInMonth",daysInMonth);
    //add blank
    for (let i = 1; i <= firstDay; i++) {
        //previous months
        const c = new CalendarModel();
        c.text = "";
        dates.push(c);
    }
    //add date
    for (let i = 1; i <= daysInMonth; i++) {
        let c = new CalendarModel();
        c.text = i + "";
        const date = new Date(year, month, i);
        c.date = date;
        dates.push(c);
    }
    return dates;
}
