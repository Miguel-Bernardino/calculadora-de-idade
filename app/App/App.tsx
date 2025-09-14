import { useState } from 'react'
import type { FormInput } from '../components/DateForm/DateForm_types'
import Form from '../components/DateForm/DateForm'
import DateText from '../components/DateText/DateText'
import styles from './App.module.css'

import {getAge} from '~/lib/Date'

function App() {

  const [daysOld, setDaysOld] = useState<number | undefined>();
  const [monthsOld, setMonthsOld] = useState<number | undefined>();
  const [yearsOld, setYearOld] = useState<number | undefined>();

  const handleFormSubmit = (data: FormInput) => {
    
    const age : FormInput = getAge(data);

    setDaysOld(age.day);
    setMonthsOld(age.month);
    setYearOld(age.year);

  };


  return (
    <div 
      className='min-h-[100%] flex justify-center items-center'>
      <div 
        id={styles["container"]} 
        className='bg-contain rounded-[4%] rounded-br-[30%] bg-white shadow-xl'
      >
        <Form onSubmit={handleFormSubmit}/>
        <footer className={styles.footer}>
            <DateText dateValue={yearsOld}>years</DateText>
            <DateText dateValue={monthsOld}>months</DateText>
            <DateText dateValue={daysOld}>days</DateText>
        </footer>
      </div>
    </div>
  );
}

export default App