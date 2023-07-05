class Income {
  category: string;
  details: string;
  gross: number;
  net: number;
  tax: number;
  day: number;
  month: number;
  year: number;
  date: string;
  from: string;
  platform: string;
  userID: string;

  constructor(
    category: string,
    details: string,
    gross: number,
    net: number,
    tax: number,
    day: number,
    month: number,
    year: number,
    date: string,
    from: string,
    platform: string,
    userID: string
  ) {
    this.category = category;
    this.details = details;
    this.gross = gross;
    this.net = net;
    this.tax = tax;
    this.day = day;
    this.month = month;
    this.year = year;
    this.date = date;
    this.from = from;
    this.platform = platform;
    this.userID = userID;
  }
}

export default Income;
