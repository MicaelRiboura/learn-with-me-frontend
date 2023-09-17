import { toast } from "react-toastify";

export const useValidationForms = () => {
    const validateRequiredFields = (fields) => {
        let validationErrors = 0;
        fields.forEach(({ input, msg }) => {
            if (input === '') {
                toast.error(msg);
                validationErrors++;
            }
        });

        return validationErrors;
    }

    const validateEmailField = (field) => {
        let validationErrors = 0;
        if (!field.includes('@')) {
            toast.error('O campo e-mail está incorreto');
            validationErrors++;
        }

        return validationErrors;
    }

    return {
        validateRequiredFields,
        validateEmailField,
    } 
}