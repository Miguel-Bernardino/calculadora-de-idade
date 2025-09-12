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

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    // Só roda no cliente
    if (typeof window !== "undefined") {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [windowSize]); // recalcula quando a tela mudar

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

  return (

    <div id={styles.main} className='w-screen h-screen flex justify-center items-center '
      style={{
        height: isLandScape && (isMobile || isTablet) && aspectRatio > 1.3 ? `calc(${containerHeight}px + 30px)` : "100vh",
      }}>
      <div id={styles["container"]} className='bg-contain rounded-[4%] rounded-br-[30%] bg-white shadow-xl'>
        
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
