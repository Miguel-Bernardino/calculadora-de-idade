export type FormInput = {
    
    day: number;
    month: number;
    year: number;

};

export interface IFormProps {
    onSubmit: (data: FormInput) => void;
}

 