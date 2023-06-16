import { getDay, format } from 'date-fns';

export default class DateFormatter {
  static formatDate(inputDate) {
    inputDate = new Date(inputDate);
    let dateFormatted = format(inputDate, 'do LLL yy');
    return dateFormatted;
  }

  static formatTime(inputDate) {
    inputDate = new Date(inputDate);
    let dateFormatted = format(inputDate, 'h:mm aaa');
    return dateFormatted;
  }

  static formatHour(inputDate) {
    inputDate = new Date(inputDate);
    let dateFormatted = format(inputDate, 'h aaa');
    return dateFormatted;
  }

  static getWeekDay(date) {
    let result;
    switch (getDay(new Date(date))) {
      case 0:
        result = 'Sunday';
        break;
      case 1:
        result = 'Monday';
        break;
      case 2:
        result = 'Tuesday';
        break;
      case 3:
        result = 'Wednesday';
        break;
      case 4:
        result = 'Thursday';
        break;
      case 5:
        result = 'Friday';
        break;
      case 6:
        result = 'Saturday';
        break;
    }
    return result;
  }
}
