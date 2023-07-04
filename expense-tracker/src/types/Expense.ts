class Expense {
  category: string;
  details: string;
  amount: number;
  day: number;
  month: number;
  year: number;
  date: string;
  location: string;
  platform: string;
  userID: string;

  constructor(
    category: string,
    details: string,
    amount: number,
    day: number,
    month: number,
    year: number,
    date: string,
    location: string,
    platform: string,
    userID: string
  ) {
    this.category = category;
    this.details = details;
    this.amount = amount;
    this.day = day;
    this.month = month;
    this.year = year;
    this.date = date;
    this.location = location;
    this.platform = platform;
    this.userID = userID;
  }
}

export default Expense;
