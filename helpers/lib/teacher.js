// MongoDB Models
const Teacher = require('../../models/Teacher');

const memCache = require('../cache').default;

module.exports = {
  async generateCode(teacher) {
    let { firstName, lastName } = teacher;

    let code = `${firstName
      .substring(0, 1)
      .toUpperCase()}${lastName.toUpperCase()}`;

    let dbTeacher = await Teacher.findOne({ code });
    let number = 0;

    while (dbTeacher) {
      number++;
      let code = `${firstName
        .substring(0, 1)
        .toUpperCase()}${lastName.toUpperCase()}${number}`;
      dbTeacher = await Teacher.findOne({ code });
    }

    return code;
  }
};
