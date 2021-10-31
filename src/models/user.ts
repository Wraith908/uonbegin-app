export class User {
  constructor(
    public id = 0,
    public first_name = '',
    public last_name = '',
    public email = '') {}

    public name() {
      return this.first_name + ' ' + this.last_name;
    }
}
