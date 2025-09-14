import React, { useState, useEffect  } from "react";
import styles from '../../styles/DateTextInput/DateTextInput.module.css'
import { useMediaQuery } from "react-responsive";

type DateTextInputProps = {
  gap?: string | number;
  children?: React.ReactNode; 
  errTxt?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const DateTextInput: React.FC<DateTextInputProps> = ({ errTxt = "", children, gap, ...props }) => {

  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    setErr(errTxt.trim() !== "");
  }, [errTxt]);

  return (
    <div className={`flex flex-col`} 
      style={{gap: `${gap}`,}}>
      
      <label htmlFor="DateTextInput" className={styles["label-text"]} 
        style={{
          color: err ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44%)",
        }}>
          {children}
      </label>


      <input id="DateTextInput" className={styles["input-text"]} type="text" 
        style={{
          borderColor: err ? "hsl(0, 100%, 67%)" : "hsl(0, 0%, 86%)",
        }}
          {...props}
      />

      {
        errTxt != "" 
          ? <small className={styles["error-msg"]}><i>{errTxt}</i></small> 
          : <small className="text-[hsl(0,100%,100%)] select-none">ANY</small> //Isso Aqui é um Espacamento Invisivel
      }

    </div>
  );
};

export default DateTextInput;
