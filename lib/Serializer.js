var _ = require('underscore');
var moment = require('moment');

/**
 * These are the models that are used to serialize the data
 */
var { Profile, Picture, ScheduleModels } = require('./models/Models.js');
var { Schedule, Term, Course, Session } = ScheduleModels;

/**
 * Handles the formatting of remote request responses responses.
 *
 * @class
 */
class Serializer {

  /**
   * Serializes data into a `Profile` Object
   *
   * @method profile
   * @static
   * @param {Object} profileData - the data that needs to be serialized into a `Profile`
   * @return {Profile} - returns an instance of `Profile`
   */
  static profile(profileData) {
    let profile = {
      name: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].PER_NAMES[0].PER_NAME[0].NAME_DISPLAY[0],
      acadCareer: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].RESIDENCY_OFFICIALS[0].RESIDENCY_OFFICIAL[0].ACAD_CAREER[0]
    };

    return new Profile(profile);
  }

  /**
   * Serializes data into a `Picture` Object
   *
   * @method picture
   * @static
   * @param {Object} pictureData - the data that needs to be serialized into a `Picture`
   * @return {Picture} - returns an instance of `Picture`
   */
  static picture(pictureData) {
    let picture = {
      base64: pictureData.SCC_GETPHOTO_RESP.EMPLOYEE_PHOTO[0].Base64Data[0]
    };

    return new Picture(picture);
  }

  /**
   * Serializes data into a `Schedule` Object
   *
   * @method schedule
   * @static
   * @param {Object} scheduleData - the data that needs to be serialized into a `Schedule`
   * @param {Num} payloadMode - specifies the format the payload will come back in; must be 1, 2,
   * or 3 and defaults to 1
   * @return {Schedule} - returns an instance of `Schedule`
   */
  static schedule(scheduleData, payloadMode) {
    let schedule = {
      terms: []
    };
    console.log(scheduleData);

    let termList = scheduleData.SSR_GET_ENROLLMENT_RESP
        .SSR_ENRL_STUDYLIST[0]
        .SSR_ENRL_TERMS[0]
        .SSR_ENRL_TERM;
    let termNo = 0;
    console.log(`TermList: `, termList);
    schedule.terms = _.map(termList, termData => {
      return this._term(termData, payloadMode, termNo++);
    });

    console.log(schedule);
    return schedule;
    // return new Schedule(schedule);
  }




  static _term(termData, payloadMode, termNo) {
    let term = {
      "acadCareerDesc": termData.ACAD_CAREER_LOVDescr[0],
      "curGpa": termData.CUR_GPA[0],
      "cumGpa": termData.CUM_GPA[0],
      "termName": termData.STRM_LOVDescr[0],
      "institution": termData.INSTITUTION_LOVDescr[0],
      "termBeginDate": termData.TERM_BEGIN_DT[0],
      "termEndDate": termData.TERM_END_DT[0]
    };


    if (payloadMode !== 3 && termData.ENROLLMENT_DETAILS[0].ENROLLMENT_DETAIL) {
      let courseList = termData.ENROLLMENT_DETAILS[0]
          .ENROLLMENT_DETAIL;
      console.log(`courseList: `, courseList);
      console.log(termData);
      let courseNo = 0;
      let courses = _.map(courseList, courseData => {
        return this._course(courseData, payloadMode, courseNo++);
      });

      term = _.extend(term, {
        "courses": courses
      });
    }

    let newTerm = new Term(term);
    console.log(`Term ${termNo}: `, newTerm);
    console.log("");
    return newTerm;
  }

  static _course(courseData, payloadMode, courseNo) {
    let course = {
      "desc": courseData.COURSE_TITLE_LONG[0],
      "status": courseData.ENROLL_STATUS_DESCR[0],
      "units": courseData.UNT_TAKEN[0],
      "gradeDesc": courseData.GRADE_BASIS_DESCRFORMAL[0],
      "grade": courseData.CRSE_GRADE_OFF[0],
      "course": courseData.SUBJECT[0] + ' ' + courseData.CATALOG_NBR[0]
    };

    if (payloadMode === 1) {
      let sessionList = courseData.ENRL_CLASS_SECTIONS[0]
          .ENRL_CLASS_SECTION;
      console.log("\tsessionList: ", sessionList);

      let sessionNo = 0;
      let sessions = _.map(sessionList, sessionData => {
        return this._session(sessionData, payloadMode, sessionNo++);
      });

      course = _.extend(course, {
        "sessions": sessions
      });
    } else if (payloadMode === 2) {
      let sessionNo = 0;
      console.log(course);
      console.log(courseData);
      // let sessions = _.map(courseData, sessionData => {
      //   return this._session(sessionData, payloadMode, sessionNo++);
      // });
      let sessions = this._session(courseData, payloadMode, sessionNo++)

      course = _.extend(course, {
        "sessions": sessions
      });
    }

    let newCourse = new Course(course);
    console.log(`\tCourse ${courseNo}: `, newCourse);
    return newCourse;
  }

  static _session(sessionData, payloadMode, sessionNo) {
    let session;
    console.log(sessionData);
    if (payloadMode === 1) {
      let meetingData = sessionData.CLASS_MEETING_PATTERNS[0]
          .CLASS_MEETING_PATTERN[0];

      session = {
        "classNumber": sessionData.CLASS_NBR[0],
        "classSection": sessionData.CLASS_SECTION[0],
        "component": sessionData.SSR_COMPONENT_LOVDescr[0],
        "daysTimes": this._formatDaysTimes(meetingData),
        "room": meetingData.SSR_MTG_LOC_LONG[0],
        "instructor": meetingData.SSR_INSTR_LONG[0],
        "startDate": moment(sessionData.START_DT[0], 'YYYY-MM-DD').format('MM/DD/YYYY'),
        "endDate": moment(sessionData.END_DT[0], 'YYYY-MM-DD').format('MM/DD/YYYY')
      };
    } else if (payloadMode === 2) {
      session = {
        "classNumber": sessionData.CLASS_NBR[0],
        "instructor": sessionData.SSR_INSTR_LONG[0]
      };
    }

    let newSession = new Session(session);
    console.log(`\t\tSession ${sessionNo}: `, newSession);
    return newSession;
  }

  static _formatDaysTimes(meetingData) {
    let days = "";
    if(meetingData.MON[0]==='Y')   { days += "M"; } // Monday
    if(meetingData.TUES[0]==='Y')  { days += "T"; } // Tuesday
    if(meetingData.WED[0]==='Y')   { days += "W"; } // Wednesday
    if(meetingData.THURS[0]==='Y') { days += "R"; } // Thursday
    if(meetingData.FRI[0]==='Y')   { days += "F"; } // Friday
    if(meetingData.SAT[0]==='Y')   { days += "S"; } // Saturday
    if(meetingData.SUN[0]==='Y')   { days += "U"; } // Sunday
    if(days === "")                { days = "Invalid Day"; }

    let start = moment(meetingData.MEETING_TIME_START[0], 'hh:mm:ss.SSS').isValid() ? moment(meetingData.MEETING_TIME_START[0], 'hh:mm:ss.SSS').format('h:mma') : "Invalid Time";
    let end = moment(meetingData.MEETING_TIME_END[0], 'hh:mm:ss.SSS').isValid() ? moment(meetingData.MEETING_TIME_END[0], 'hh:mm:ss.SSS').format('h:mma') : "Invalid Time";

    let times = "";
    times += start;
    times += ' - ';
    times += end;

    let formattedDaysTimes = days + ': ' + times
    return formattedDaysTimes;
  }
}

module.exports = Serializer;
