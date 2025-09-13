import { useEffect, useRef, useState } from 'react'
import type { FormInput } from '../components/DateForm/DateForm_types'
import Form from '../components/DateForm/DateForm'
import DateText from '../components/DateText/DateText'
import styles from './App.module.css'
import { useMediaQuery } from "react-responsive";

import {getAge} from '~/lib/Date'

function App() {

  const isLandScape = useMediaQuery({ query: "(orientation: landscape)" });
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 

  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const mainContainer = useRef<HTMLDivElement | null>(null);

  // Novo estado para o aspect ratio, que será atualizado junto com o windowSize
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    const updateScreenSize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    updateScreenSize(); // ✅ chama imediatamente ao montar

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

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
        //mainContainer.current.style.height = hasValidLandscape && (isMobile) ? `calc(${formContainerSize.height}px + 20vh)` : hasValidLandscape && isTablet ? `calc(${formContainerSize.height}px + 40vh)` : "100vh";
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

  // A lógica agora usa o estado atualizado de 'aspectRatio'
  
  useEffect(() => {
    if(!isLandScape || aspectRatio === 0) return;
    let hasValidLandscape: boolean = isLandScape && aspectRatio > 1.3;
    console.log("Atualizando altura...");
    console.log("formContainerSize.height:", formContainerSize.height);
    console.log("hasValidLandscape:", hasValidLandscape);
    console.log("isMobile:", isMobile);
    console.log("isTablet:", isTablet);
    if (!mainContainer.current || formContainerSize.height === 0 ) return;

    let novaAltura = "100vh";

    if (hasValidLandscape && isMobile) {
      novaAltura = `calc(${formContainerSize.height}px + 20vh)`;
    } else if (hasValidLandscape && isTablet) {
      novaAltura = `calc(${formContainerSize.height}px + 40vh)`;
    }
    mainContainer.current.style.height = novaAltura;
    
  }, [formContainerSize.height, isLandScape, aspectRatio, isMobile, isTablet]);

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
      id={styles.main} 
      className='w-screen h-screen flex justify-center items-center'
      ref={mainContainer}>
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