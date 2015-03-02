var _ = require('underscore');

let serialize = function(profileJson) {
  let profileObj = {
    constituent: constituents(profileJson.SCC_GETCONST_RESP.CONSTITUENT)
  };

  let profileRes = {};

  return;
};

let constituents = function(constituentJson) {
  constituentJson = _.isArray(constituentJson) ? constituentJson[0] : constituentJson;

  let deepKeys = [
    'PER_NAMES',
    'EMAIL_ADDRESSES',
    'ACADEMIC_HISTORIES',
    'ADDRESSES',
    'PHONES',
    'PERS_DATA_EFFDT',
    'PERS_NIDS',
    'WORK_EXPERIENCES',
    'PERSON_SAS',
    'RELIGIOUS_PREFERENCES',
    'ACADEMIC_INTERESTS',
    'AWARDS',
    'RESIDENCY_SELFS',
    'EXTRACURR_ACTIVITYS',
    'RESIDENCY_OFFICIALS',
    'TEST_SCORES',
    'EXTERNAL_SYSTEM_KEYS',
    'RELATIONSHIPS',
    'PORTOFENTRYDATAS',
    'VISAPERMITDATAS',
    'PERSONDATAUSAS',
    'CITIZENSHIPS',
    'DIVERSITYS',
    'GENERAL_MATERIALS',
    'LANGUAGES',
    'LICENSES_CERTIFICATES',
    'MEMBERSHIPS',
    'EMERGENCY_CONTACTS',
    'DRIVERS_LICENSES',
    'DISABILITIES',
    'PUBLICATIONS',
    'STUDENT_CAREERS',
    'CHESSNS_AUS',
    'PREV_HEPS_AUS',
    'YEARS12_AUS',
    'VISA_PMT_NLDS',
    'USER_PREFERENCES',
    'IMPAIR_HDRS'
  ];
  let constituent = {
    emplid: _.isArray(constituentJson.EMPLID) ? constituentJson.EMPLID[0] : constituentJson.EMPLID,
    birthdate: _.isArray(constituentJson.BIRTHDATE) ? constituentJson.BIRTHDATE[0] : constituentJson.BIRTHDATE,
    birthplace: _.isArray(constituentJson.BIRTHPLACE) ? constituentJson.BIRTHPLACE[0] : constituentJson.BIRTHPLACE,
    birthcountry: _.isArray(constituentJson.BIRTHCOUNTRY) ? constituentJson.BIRTHCOUNTRY[0] : constituentJson.BIRTHCOUNTRY,
    dtOfDeath: _.isArray(constituentJson.DT_OF_DEATH) ? constituentJson.DT_OF_DEATH[0] : constituentJson.DT_OF_DEATH,
    citizenshipsHistory: _.isArray(constituentJson.CITIZENSHIPS_HISTORY) ? constituentJson.CITIZENSHIPS_HISTORY[0] : constituentJson.CITIZENSHIPS_HISTORY,
    stdntsData: _.isArray(constituentJson.STDNTS_DATA) ? constituentJson.STDNTS_DATA[0] : constituentJson.STDNTS_DATA,
    canReportsStdnt: _.isArray(constituentJson.CAN_REPORTS_STDNT) ? constituentJson.CAN_REPORTS_STDNT[0] : constituentJson.CAN_REPORTS_STDNT,
    stdBankAccountsNld: _.isArray(constituentJson.STD_BANK_ACCOUNTS_NLD) ? constituentJson.STD_BANK_ACCOUNTS_NLD[0] : constituentJson.STD_BANK_ACCOUNTS_NLD,
    personCanData: _.isArray(constituentJson.PERSON_CAN_DATA) ? constituentJson.PERSON_CAN_DATA[0] : constituentJson.PERSON_CAN_DATA,
    stdCorrespondencesNld: _.isArray(constituentJson.STD_CORRESPONDENCES_NLD) ? constituentJson.STD_CORRESPONDENCES_NLD[0] : constituentJson.STD_CORRESPONDENCES_NLD,
    stdEducationsNld: _.isArray(constituentJson.STD_EDUCATIONS_NLD) ? constituentJson.STD_EDUCATIONS_NLD[0] : constituentJson.STD_EDUCATIONS_NLD,
    stdNationalitiesNld: _.isArray(constituentJson.STD_NATIONALITIES_NLD) ? constituentJson.STD_NATIONALITIES_NLD[0] : constituentJson.STD_NATIONALITIES_NLD,
    namesNld: _.isArray(constituentJson.NAMES_NLD) ? constituentJson.NAMES_NLD[0] : constituentJson.NAMES_NLD,
    scholarshipsNld: _.isArray(constituentJson.SCHOLARSHIPS_NLD) ? constituentJson.SCHOLARSHIPS_NLD[0] : constituentJson.SCHOLARSHIPS_NLD,
    heStdNldData: _.isArray(constituentJson.HE_STD_NLD_DATA) ? constituentJson.HE_STD_NLD_DATA[0] : constituentJson.HE_STD_NLD_DATA,
    stdInfoNld: _.isArray(constituentJson.STD_INFOS_NLD) ? constituentJson.STD_INFOS_NLD[0] : constituentJson.STD_INFOS_NLD,
    tribalAffilsNzl: _.isArray(constituentJson.TRIBAL_AFFILS_NZL) ? constituentJson.TRIBAL_AFFILS_NZL[0] : constituentJson.TRIBAL_AFFILS_NZL,
    persDataNzl: _.isArray(constituentJson.PERS_DATA_NZL) ? constituentJson.PERS_DATA_NZL[0] : constituentJson.PERS_DATA_NZL,
    hesaPersUk: _.isArray(constituentJson.HESA_PERS_UK) ? constituentJson.HESA_PERS_UK[0] : constituentJson.HESA_PERS_UK
  };

  for (var i = 0; i < deepKeys.length; i++) {
    if (deepKeySerializers[deepKeys[i]]) {
      constituent[deepKeys[i]] = deepKeySerializers[deepKeys[i]](constituentJson[deepKeys[i]]);
    }
  }

  console.log(constituent);

  return constituentJson;
};

let deepKeySerializers = {
  PER_NAMES: function(obj) {
  	console.log('PER_NAMES');
  	return obj;
  },
  EMAIL_ADDRESSES: function(obj) {
  	console.log('EMAIL_ADDRESSES');
  	return obj;
  },
  ACADEMIC_HISTORIES: function(obj) {
  	console.log('ACADEMIC_HISTORIES');
  	return obj;
  },
  ADDRESSES: function(obj) {
  	console.log('ADDRESSES');
  	return obj;
  },
  PHONES: function(obj) {
  	console.log('PHONES');
  	return obj;
  },
  PERS_DATA_EFFDT: function(obj) {
  	console.log('PERS_DATA_EFFDT');
  	return obj;
  },
  PERS_NIDS: function(obj) {
  	console.log('PERS_NIDS');
  	return obj;
  },
  WORK_EXPERIENCES: function(obj) {
  	console.log('WORK_EXPERIENCES');
  	return obj;
  },
  PERSON_SAS: function(obj) {
  	console.log('PERSON_SAS');
  	return obj;
  },
  RELIGIOUS_PREFERENCES: function(obj) {
  	console.log('RELIGIOUS_PREFERENCES');
  	return obj;
  },
  ACADEMIC_INTERESTS: function(obj) {
  	console.log('ACADEMIC_INTERESTS');
  	return obj;
  },
  AWARDS: function(obj) {
  	console.log('AWARDS');
  	return obj;
  },
  RESIDENCY_SELFS: function(obj) {
  	console.log('RESIDENCY_SELFS');
  	return obj;
  },
  EXTRACURR_ACTIVITYS: function(obj) {
  	console.log('EXTRACURR_ACTIVITYS');
  	return obj;
  },
  RESIDENCY_OFFICIALS: function(obj) {
  	console.log('RESIDENCY_OFFICIALS');
  	return obj;
  },
  TEST_SCORES: function(obj) {
  	console.log('TEST_SCORES');
  	return obj;
  },
  EXTERNAL_SYSTEM_KEYS: function(obj) {
  	console.log('EXTERNAL_SYSTEM_KEYS');
  	return obj;
  },
  RELATIONSHIPS: function(obj) {
  	console.log('RELATIONSHIPS');
  	return obj;
  },
  PORTOFENTRYDATAS: function(obj) {
  	console.log('PORTOFENTRYDATAS');
  	return obj;
  },
  VISAPERMITDATAS: function(obj) {
  	console.log('VISAPERMITDATAS');
  	return obj;
  },
  PERSONDATAUSAS: function(obj) {
  	console.log('PERSONDATAUSAS');
  	return obj;
  },
  CITIZENSHIPS: function(obj) {
  	console.log('CITIZENSHIPS');
  	return obj;
  },
  DIVERSITYS: function(obj) {
  	console.log('DIVERSITYS');
  	return obj;
  },
  GENERAL_MATERIALS: function(obj) {
  	console.log('GENERAL_MATERIALS');
  	return obj;
  },
  LANGUAGES: function(obj) {
  	console.log('LANGUAGES');
  	return obj;
  },
  LICENSES_CERTIFICATES: function(obj) {
  	console.log('LICENSES_CERTIFICATES');
  	return obj;
  },
  MEMBERSHIPS: function(obj) {
  	console.log('MEMBERSHIPS');
  	return obj;
  },
  EMERGENCY_CONTACTS: function(obj) {
  	console.log('EMERGENCY_CONTACTS');
  	return obj;
  },
  DRIVERS_LICENSES: function(obj) {
  	console.log('DRIVERS_LICENSES');
  	return obj;
  },
  DISABILITIES: function(obj) {
  	console.log('DISABILITIES');
  	return obj;
  },
  PUBLICATIONS: function(obj) {
  	console.log('PUBLICATIONS');
  	return obj;
  },
  STUDENT_CAREERS: function(obj) {
  	console.log('STUDENT_CAREERS');
  	return obj;
  },
  CHESSNS_AUS: function(obj) {
  	console.log('CHESSNS_AUS');
  	return obj;
  },
  PREV_HEPS_AUS: function(obj) {
  	console.log('PREV_HEPS_AUS');
  	return obj;
  },
  YEARS12_AUS: function(obj) {
  	console.log('YEARS12_AUS');
  	return obj;
  },
  VISA_PMT_NLDS: function(obj) {
  	console.log('VISA_PMT_NLDS');
  	return obj;
  },
  USER_PREFERENCES: function(obj) {
  	console.log('USER_PREFERENCES');
  	return obj;
  },
  IMPAIR_HDRS: function(obj) {
  	console.log('IMPAIR_HDRS');
  	return obj;
  }
};

module.exports = serialize;
