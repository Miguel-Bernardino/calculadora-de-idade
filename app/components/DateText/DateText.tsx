import React from "react";
import styles from '../../styles/DateText/DateText.module.css'

type DateTextProps = {
    children?: React.ReactNode; 
    dateValue?: string | number;
} & React.ComponentProps<'strong'>;


const DateText: React.FC<DateTextProps> = ({dateValue, children, ...props }) => {
  
  return (
    <div className={styles["text-container"]}>
        <strong {...props} className={styles.text}> 
            <p className="inline text-[hsl(259,100%,65%)]">
                {
                  dateValue != null ? `${dateValue}`: "- -" 
                }
            </p>
            {children}
        </strong>
        
    </div>
  )
}

export default DateText;
