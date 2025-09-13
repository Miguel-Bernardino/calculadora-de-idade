import { useEffect, useRef, useState } from 'react'
import type { FormInput } from '../components/DateForm/DateForm_types'
import  Form  from '../components/DateForm/DateForm'
import DateText from '../components/DateText/DateText'
import styles from './App.module.css'
import { useMediaQuery } from "react-responsive";

import getAge from '~/lib/Date'

function App() {

  const isLandScape = useMediaQuery({ query: "(orientation: landscape)" });
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 

  const formContainerRef = useRef<HTMLDivElement | null>(null);

  // Novo estado para o aspect ratio, que será atualizado junto com o windowSize
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    const updateScreenSize = () => {
      // Recalcula e atualiza o aspect ratio a cada redimensionamento
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []); // O array de dependências vazio garante que o listener seja adicionado apenas uma vez.

  const [formContainerSize, setFormContainerSize] = useState({
    width: 0,
    height: 0,
  });

  // useEffect para sincronizar o tamanho do container com as mudanças de tela.
  useEffect(() => {
    // Função para atualizar o tamanho do container.
    const updateContainerSize = () => {
      if (formContainerRef.current) {
        const { offsetWidth, offsetHeight } = formContainerRef.current;
        setFormContainerSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    // Atualiza o tamanho na primeira renderização.
    updateContainerSize();

    // Adiciona o listener para o evento 'resize'.
    window.addEventListener('resize', updateContainerSize);

    // Remove o listener quando o componente é desmontado.
    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []); // O array de dependências vazio garante que o listener seja adicionado apenas uma vez.

  const [daysOld, setDaysOld] = useState<number | undefined>();
  const [monthsOld, setMonthsOld] = useState<number | undefined>();
  const [yearsOld, setYearOld] = useState<number | undefined>();

  const handleFormSubmit = (data: FormInput) => {
    
    const age : FormInput = getAge(data);

    setDaysOld(age.day);
    setMonthsOld(age.month);
    setYearOld(age.year);

  };

  // A lógica agora usa o estado atualizado de 'aspectRatio'
  let hasValidLandscape: boolean = isLandScape && aspectRatio > 1.3;

  return (
    <div 
      id={styles.main} 
      className='w-screen h-screen flex justify-center items-center'
      style={{
        height: hasValidLandscape && (isMobile) ? `calc(${formContainerSize.height}px + 20vh)` : hasValidLandscape && isTablet ? `calc(${formContainerSize.height}px + 40vh)` : "100vh",
      }}
    >
      <div 
        ref={formContainerRef} 
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