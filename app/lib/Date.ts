import type { FormInput } from '../components/DateForm/DateForm_types'

export default function getAge( bornDate : FormInput ) : FormInput {

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