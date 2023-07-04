class ExpenseCategory {
  name: string;
  userID?: string;

  constructor(name: string, userID: string) {
    this.name = name;
    this.userID = userID;
  }
}

export default ExpenseCategory;
