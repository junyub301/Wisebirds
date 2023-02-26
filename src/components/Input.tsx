import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
    label: string;
    register: UseFormRegisterReturn;
    required?: boolean;
    children?: React.ReactNode;
    [key: string]: any;
}

export default function Input({
    label,
    register,
    required = false,
    children,
    ...rest
}: InputProps) {
    return (
        <CustomInputWrap>
            <label className='input__label'>
                {label}
                {required && <span className='required__icon'>*</span>}
            </label>
            <div className='input__content '>
                <CustomInput
                    className={`${children && "has__child"}`}
                    {...register}
                    {...rest}
                />
                {children}
            </div>
        </CustomInputWrap>
    );
}

const CustomInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    .input__content {
        position: relative;
        display: flex;
        align-items: center;
        .has__child {
            padding-right: 35px;
        }
    }
    .required__icon {
        color: red;
    }
    .input__label {
        font-weight: 500;
    }
`;

const CustomInput = styled.input`
    appearance: none;
    border: 1px solid rgb(209 213 219);
    border-radius: 0.375rem;
    height: 1.8rem;
    width: 100%;
`;
