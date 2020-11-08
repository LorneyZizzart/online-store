import * as moment from 'moment';
export class DateMoment{
    static getDate(value:string, format:string):string{
        if(!value) return '';
        // dar el formato en que viene la fecha value
        const date = moment(value);
        return date.utc().locale('es').format(format);
    }

    static getAddDate(date:string){
        return moment(date, 'yyyy-MM-DD').add(1, 'days').utc().locale('es').format('yyyy-MM-DD');
    }
}
