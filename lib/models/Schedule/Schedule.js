/**
 * Serves as the model for Schedule data
 *
 * @class
 */
class Schedule {

   constructor(scheduleData) {
     let fields = {
       terms: this._terms
     } = scheduleData;
   }

   get terms() {
   	return this._terms;
   }

   set terms(terms) {
   	temp = this._terms;
   	this._terms = terms;

   	return this._terms;
   }

}

module.exports = Schedule;
