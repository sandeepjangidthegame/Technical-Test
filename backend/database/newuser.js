const conn = require('./connection');

class newUser {
    constructor(id, name, email, passwd, dept, create_date, user_status) {
      this.id = id;
      this.user_name = name;
      this.user_email = email;
      this.user_passwd = passwd;
      this.dept = dept;
      this.create_date = create_date;
      this.status = user_status;
    }
  
    save() {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (id, user_name, user_email, user_passwd, dept, create_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [this.id, this.user_name, this.user_email, this.user_passwd, this.dept, this.create_date, this.status];
  
      conn.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting data into the database:', error);
          reject(error);
        } else {
          console.log('Data inserted successfully.');
          resolve(results);
        }
      });
    });
    }
  }
  
  module.exports = newUser;