var _ = require('underscore');
var moment = require('moment');

/**
 * Serves as the model for Schedule data
 *
 * @class
 */
class Schedule {

  constructor(scheduleData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      terms: this.terms
    } = scheduleData;
  }

  static create(obj, mode) {
    let terms = _.map(obj.ssrGetEnrollmentResp.ssrEnrlStudylist.ssrEnrlTerms.ssrEnrlTerm, term => {
      return Term.create(term, mode);
    });

    let schedule = {
      terms: terms
    };

    return new Schedule(schedule);
  }
}

class Term {

  constructor(termData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      acadCareerDesc: this.acadCareerDesc,
      curGpa: this.curGpa,
      cumGpa: this.cumGpa,
      termName: this.termName,
      institution: this.institution,
      termBeginDate: this.termBeginDate,
      termEndDate: this.termEndDate,
      courses: this.courses
    } = termData;
  }

  static create(obj, mode) {
    let term = {
      acadCareerDesc: obj.acadCareerLovdescr,
      curGpa: obj.curGpa,
      cumGpa: obj.cumGpa,
      termName: obj.strmLovdescr,
      institution: obj.institutionLovdescr,
      termBeginDate: obj.termBeginDt,
      termEndDate: obj.termEndDt
    };

    if (mode !== 3 && obj.enrollmentDetails.enrollmentDetail) {
      let courses = [];

      if (_.isArray(obj.enrollmentDetails.enrollmentDetail)) {
        courses = obj.enrollmentDetails.enrollmentDetail.map(course => {
          return Course.create(course, mode);
        });
      } else {
        courses.push(Course.create(obj.enrollmentDetails.enrollmentDetail, mode));
      }

      term = _.extend(term, {
        courses: courses
      });
    }

    return new Term(term);
  }
}

class Course {

  constructor(courseData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      desc: this.desc,
      status: this.status,
      units: this.units,
      gradeDesc: this.gradeDesc,
      grade: this.grade,
      course: this.course,
      sessions: this.sessions
    } = courseData;
  }

  static create(obj, mode) {
    let course = {
      desc: obj.courseTitleLong,
      status: obj.enrollStatusDescr,
      units: obj.untTaken,
      gradeDesc: obj.gradeBasisDescrformal,
      grade: obj.crseGradeOff,
      course: `${obj.subject} ${obj.catalogNbr}`
    };

    if (mode === 1) {
      let sessions = [];

      if (_.isArray(obj.enrlClassSections.enrlClassSection)) {
        sessions = obj.enrlClassSections.enrlClassSection.map(session => {
          return Session.create(session, mode);
        });
      } else {
        sessions.push(Session.create(obj.enrlClassSections.enrlClassSection, mode));
      }

      course = _.extend(course, {
        sessions: sessions
      });
    } else if (mode === 2) {
      let sessions = Session.create(obj, mode);

      course = _.extend(course, {
        sessions: sessions
      });
    }

    return new Course(course);
  }
}

class Session {

  constructor(sessionData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      classNumber: this.classNumber,
      classSection: this.classSection,
      component: this.component,
      daysTimes: this.daysTimes,
      room: this.room,
      instructor: this.instructor,
      startDate: this.startDate,
      endDate: this.endDate
    } = sessionData;
  }

  static create(obj, mode) {
    let session;

    if (mode === 1) {
      let meeting = obj.classMeetingPatterns.classMeetingPattern;

      session = {
        classNumber: obj.classNbr,
        classSection: obj.classSection,
        component: obj.ssrComponentLovdescr,
        daysTimes: this.formatDaysTimes(meeting),
        room: meeting.ssrMtgLocLong,
        instructor: meeting.ssrInstrLong,
        startDate: moment(obj.startDt, 'YYYY-MM-DD').format('MM/DD/YYYY'),
        endDate: moment(obj.endDt, 'YYYY-MM-DD').format('MM/DD/YYYY')
      };
    } else if (mode === 2) {
      session = {
        classNumber: obj.classNbr,
        instructor: obj.ssrInstrLong
      };
    }

    return new Session(session);
  }

  static formatDaysTimes(obj) {
    let days = '';

    if (obj.mon === 'Y') {
      days += 'M';
    }
    if (obj.tues === 'Y') {
      days += 'T';
    }
    if (obj.wed === 'Y') {
      days += 'W';
    }
    if (obj.thurs === 'Y') {
      days += 'R';
    }
    if (obj.fri === 'Y') {
      days += 'F';
    }
    if (obj.sat === 'Y') {
      days += 'S';
    }
    if (obj.sun === 'Y') {
      days += 'U';
    }
    if (days === '') {
      days = 'Invalid Day';
    }

    let start = moment(obj.meetingTimeStart, 'hh:mm:ss.SSS').isValid() ?
      moment(obj.meetingTimeStart, 'hh:mm:ss.SSS').format('hh:mma') : 'Invalid Time';
    let end = moment(obj.meetingTimeEnd, 'hh:mm:ss.SSS').isValid() ?
      moment(obj.meetingtimeEnd, 'hh:mm:ss.SSS').format('hh:mma') : 'Invalid Time';

    return `${days}: ${start} - ${end}`;
  }
}

module.exports = Schedule;
