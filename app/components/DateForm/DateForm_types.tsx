export type FormInput = {
    
    day: number;
    month: number;
    year: number;

};

export interface IFormProps {
    /*
        type: string;
    */
    onSubmit: (data: FormInput) => void;
}

 