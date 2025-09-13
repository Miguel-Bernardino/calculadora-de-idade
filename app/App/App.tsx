import { useEffect, useRef, useState } from 'react'
import type { FormInput } from '../components/DateForm/DateForm_types'
import  Form  from '../components/DateForm/DateForm'
import DateText from '../components/DateText/DateText'
import styles from './App.module.css'
import { useMediaQuery } from "react-responsive";

import getAge from '~/lib/Date'

function App() {

  const isLandScape = useMediaQuery({ query: "(orientation: landscape)" });
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 

  const formContainerRef = useRef<HTMLDivElement | null>(null);

  // Parte para pegar o tamanho inteiro da tela do usuario
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  }); 
  
  useEffect(() => {
    const updateScreenSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateScreenSize);

    // Limpeza do listener ao desmontar
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [])
  
  //tamanho da div que contem o formulario
  const [formContainerSize, setFormContainerSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (formContainerRef.current) {
      const { offsetWidth, offsetHeight } = formContainerRef.current;
      setFormContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  /*
    proporcao para saber quanto maior a largura e em relacao a altura, 
    usado para saber quando a proporcao do landscape deve ser usada
  */
  const aspectRatio = windowSize.width / windowSize.height;

  const [daysOld, setDaysOld] = useState<number | undefined>();
  const [monthsOld, setMonthsOld] = useState<number | undefined>();
  const [yearsOld, setYearOld] = useState<number | undefined>();


  const handleFormSubmit = (data: FormInput) => {
    
    const age : FormInput = getAge(data);

    setDaysOld(age.day);
    setMonthsOld(age.month);
    setYearOld(age.year);

  };

  let hasValidLandscape: boolean = isLandScape && aspectRatio > 1.3;

  return (

    <div id={styles.main} className='w-screen h-screen flex justify-center items-center '
      style={{
        height: hasValidLandscape && (isMobile) ? `calc(${formContainerSize.height}px + 20vh)` : hasValidLandscape && isTablet ? `calc(${formContainerSize.height}px + 40vh)` : "100vh",
      }}>
      <div ref={formContainerRef} id={styles["container"]} className='bg-contain rounded-[4%] rounded-br-[30%] bg-white shadow-xl'>
        
        <Form onSubmit={handleFormSubmit}/>

        <footer className={styles.footer}>
            <DateText dateValue={yearsOld}>years</DateText>
            <DateText dateValue={monthsOld}>months</DateText>
            <DateText dateValue={daysOld}>days</DateText>
        </footer>
        
      </div>
    </div>

  )
}

export default App
