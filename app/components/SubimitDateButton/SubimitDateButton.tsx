import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from '../../styles/SubimitDateButton/SubimitDateButton.module.css'

type SubimitDateButtonProps = {
    children?: React.ReactNode; 
} & React.ComponentProps<'input'>;

console.log(styles);

const SubimitDateButtonDesktop: React.FC<SubimitDateButtonProps> = ({children, ...props }) => {
  
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 
  
  return (
    
    <div className={`flex items-center`}> 
        

        <hr className={styles["divisor-line"]}/> 
        
        <label htmlFor="button" className={styles["label-button"]}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g>
            </svg>
            {children}
        </label>

        {isMobile || isTablet ? <hr className={styles["divisor-line"]}/> : null}

        <input {...props} id="button" type="submit" className="absolute -left-[9999px]"/>

    </div>
  )
}

export default SubimitDateButtonDesktop;
