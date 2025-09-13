import type { FormInput } from '../components/DateForm/DateForm_types'

export default function getAge( bornDate : FormInput ) : FormInput {

    const date = new Date();

    let year = date.getFullYear() - bornDate.year;
    let month = date.getMonth() - bornDate.month;
    let day = date.getDate() - bornDate.day;

    return { day, month, year };
}