import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from '../../styles/SubimitDateButton/SubimitDateButton.module.css'

type SubimitDateButtonProps = {
    children?: React.ReactNode; 
} & React.ComponentProps<'input'>;

const SubimitDateButtonDesktop: React.FC<SubimitDateButtonProps> = ({children, ...props }) => {
  
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); 
  
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    
    <div className={`flex items-center`}> 
        

        <hr className={styles["divisor-line"]}/> 
        
        <label htmlFor="button" className={styles["label-button"]}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" strokeWidth="3"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g>
            </svg>
            {children}
        </label>

        {isClient && (isMobile || isTablet) && (
          <hr className={styles["divisor-line"]} />
        )}

        <input {...props} id="button" type="submit" className="absolute -left-[9999px]"/>

    </div>
  )
}

export default SubimitDateButtonDesktop;
