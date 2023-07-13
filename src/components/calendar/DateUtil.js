export function isSameDay(d1, d2) {
  const dateLeft = startOfDay(d1);
  const dateRight = startOfDay(d2);

  return dateLeft.getTime() === dateRight.getTime();

  // return (
  //   d1.getFullYear() === d2.getFullYear() &&
  //   d1.getMonth() === d2.getMonth() &&
  //   d1.getDate() === d2.getDate()
  // );
}

export function parseDate(date) {
  return Date.parse(date);
}

export function toDate(date) {
  const argStr = Object.prototype.toString.call(date);

  // Clone the date
  if (typeof date === "object" && argStr === "[object Date]") {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(date.getTime());
  } else if (typeof date === "number" || argStr === "[object Number]") {
    return new Date(date);
  } else if (typeof date === "string" || argStr === "[object String]") {
    return new Date(parseDate(date));
  }

  return new Date(NaN);
}

export function isValidDate(date) {
  return !isNaN(toDate(date));
}

export function startOfDay(dirtyDate) {
  const date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfMonth(dirtyDate) {
  const date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(dirtyDate) {
  const date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function endOfMonth(dirtyDate) {
  const date = toDate(dirtyDate);
  const month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function startOfToday() {
  return startOfDay(Date.now());
}

export function endOfToday() {
  return endOfDay(Date.now());
}

export function startOfYear(dirtyDate) {
  const cleanDate = toDate(dirtyDate);
  const date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);

  return date;
}

export function endOfYear(dirtyDate) {
  const date = toDate(dirtyDate);
  const year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function isEqualDate(dirtyLeftDate, dirtyRightDate) {
  const dateLeft = toDate(dirtyLeftDate);
  const dateRight = toDate(dirtyRightDate);

  return dateLeft.getTime() === dateRight.getTime();
}

export function isBefore(dirtyDate, dirtyDateToComapre) {
  const date = toDate(dirtyDate);
  const dateToCompare = toDate(dirtyDateToComapre);

  return date.getTime() < dateToCompare.getTime();
}

export function isAfter(dirtyDate, dirtyDateToComapre) {
  const date = toDate(dirtyDate);
  const dateToCompare = toDate(dirtyDateToComapre);

  return date.getTime() > dateToCompare.getTime();
}

export function isFuture(dirtyDate) {
  const date = toDate(dirtyDate);

  return date.getTime() > Date.now();
}

export function isPast(dirtyDate) {
  const date = toDate(dirtyDate);

  return date.getTime() < Date.now();
}

export function eachDayOfInterval(startDirtyDate, endDirtyDate, step = 1) {
  const startDate = toDate(startDirtyDate);
  const endDate = toDate(endDirtyDate);

  const endTime = endDate.getTime();
  const dates = [];

  if (startDate.getTime() === endTime) {
    return dates;
  }

  const currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);

  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }

  return dates;
}

export const formatDate = date => {
  return isValidDate(date)
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
    : "";
};

export function formatDateTime(dirtyDate) {
  const date = toDate(dirtyDate);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}
