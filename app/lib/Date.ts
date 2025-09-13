import type { FormInput } from '../components/DateForm/DateForm_types'

export function getAge( bornDate : FormInput ) : FormInput {

    const date = new Date();

    let year = date.getFullYear() - bornDate.year;
    let month = date.getMonth() - bornDate.month;
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

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function isValidDate(year: number, month: number, day: number): boolean {
    
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= daysInMonth[month -1];
}