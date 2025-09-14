import type { FormInput } from '../components/DateForm/DateForm_types'

export function getAge( bornDate : FormInput ) : FormInput {

    const date = new Date();

    let year = date.getFullYear() - bornDate.year;
    let month = date.getMonth() +1 - bornDate.month;
    let day = date.getDate() - bornDate.day;

    if (day < 0) {
        month --;
        const ultimoDiaMesAnterior = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        day += ultimoDiaMesAnterior;
    }

    if (month < 0) {
        year--;
        month += 12;
    }

    return { day, month, year };
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/* 

    
    function isValidMonthForBirthday(year: number, month: number, day: number): boolean {
        
        return  isValidMonth(...) ;

    }

    function isValidMonthEvent(year: number, month: number, day: number): boolean {
        
        ....

    }

*/

export function isValidMonth(year: number, month: number) : boolean {
    const date = new Date();
    
    const currentMonth = date.getMonth() +1;
    const currentYear = date.getFullYear();
    
    return !(currentMonth < month && currentYear === year);

}

/* 

    
    function isValidDayForBirthday(year: number, month: number, day: number): boolean {
        
        return  isValidDay(...) ;

    }

    function isValidDayForEvent(year: number, month: number, day: number): boolean {
        
        ....

    }

*/

export function isValidDay(year: number, month: number, day: number): boolean {
    const date = new Date();
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    //cortado para isValidDayForBirthday
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() +1;
    const currentYear = date.getFullYear();

    if( day > currentDay && currentMonth === month && currentYear === currentYear){
        return false;
    }
    //ate aqui

    return day > 0 && day <= daysInMonth[month -1];
}