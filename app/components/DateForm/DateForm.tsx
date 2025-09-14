/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import  type { FormInput, IFormProps } from '../DateForm/DateForm_types';
import DateTextInput from '../DateTextInput/DateTextInput' 
import SubimitDateButton from '../SubimitDateButton/SubimitDateButton'
import styles from '../../styles/DateForm/DateForm.module.css'
import { isValidDay, isValidMonth } from "~/lib/Date";

const DateForm: React.FC<IFormProps> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormInput>();
        

    const submitHandler: SubmitHandler<FormInput> = (data) => {
        onSubmit(data);
    };
    
    /*
    
        let yearPattern = {
            event: { 
                min: new Date().getFullYear(),
                max: Infinity,
            },
            birthday: { 
                min: 1908, //pessoa mais velha do mundo
                max: new Date().getFullYear(),
            }
        }

        let monthPattern = {
            event: {
                min: 1, 
                max: 12,
                validate: (value) => {
                    const [year, month, day] = [ Number(getValues("year")), value, Number(getValues("day"))];
                    if (!isValidMonthForEvent) {
                        return "Invalid Month";
                    }
                    return true;
                }
            }
            birthday: {
                min: 1, 
                max: 12,
                validate: (value) => {
                    const [year, month, day] = [ Number(getValues("year")), value, Number(getValues("day"))];
                    if (!isValidMonthForBirthday) {
                        return "Invalid Month";
                    }
                    return true;
                }
            }
        }

        let dayPattern = {
            
            event: {
                min: 1, 
                max: 31,
                validate: (value) => {
                    const [year, month, day] = [ Number(getValues("year")), Number(getValues("month")), value];
                    if (!isValidDayForEvent(year, month, day)) 
                        return "Invalid Day";
                    return true;
                }         
            }

            birthday: { 
                min: 1, 
                max: 31,
                validate: (value) => {
                    const [year, month, day] = [ Number(getValues("year")), Number(getValues("month")), value];
                    if (!isValidDayForBirthday(year, month, day)) 
                        return "Invalid Day";
                    return true;
                }      
            }

        
        }

    */

    return (

        <div className="">
            <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
                <header className={styles.header}> 

                    <DateTextInput {...register("day",{
                        required: "This field is required",
                        pattern: { value: /^[0-9]+$/, message: "Only Numbers" },
                        min: { value: 1, message: "Invalid Day" },
                        max: { value: 31, message: "Invalid Day" },
                        validate: (value) => {
                            const [year, month, day] = [ Number(getValues("year")), Number(getValues("month")), value];
                            
                            if (!isValidDay(year, month, day)) 
                                return "Invalid Day";
                            
                            return true;
                            //return dayPattern[type].validate(value);
                        }
                    })} 
                    errTxt={errors.day?.message} gap="0.5vw" placeholder="DD"> DAY </DateTextInput>   
                    
                    <DateTextInput {...register("month",{
                        required: "This field is required",
                        pattern: { value: /^[0-9]+$/, message: "Only Numbers" },
                        min: { value: 1, message: "Invalid Month" },
                        max: { value: 12, message: "Invalid Month" },
                        validate: (value) => {
                            const [year, month, day] = [ Number(getValues("year")), value, Number(getValues("day"))];
                            if (!isValidMonth(year, month)) 
                                return "Invalid Month";                            
                            return true;
                        }
                    })} 
                    errTxt={errors.month?.message} gap="0.5vw" placeholder="MM"> MONTH </DateTextInput>
                    
                    <DateTextInput {...register("year",{
                        required: "This field is required",
                        pattern: { value: /^[0-9]+$/, message: "Only Numbers" },
                        min: { value: 1908, message: "Invalid Year" },
                        max: { value: new Date().getFullYear(), message: "Invalid Year" },
                    })} 
                    errTxt={errors.year?.message} gap="0.5vw" placeholder="YYYY"> YEAR </DateTextInput>

                </header>

                <footer className="flex items-center">
                    <SubimitDateButton></SubimitDateButton>
                </footer>

            </form>
        </div>
    );

};

export default DateForm
