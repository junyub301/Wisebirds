import { useState } from "react";
import styled from "styled-components";

interface SwitchProps {
    id: number | string;
    value: boolean;
    disabled?: boolean;
    onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Switch({
    id,
    value,
    disabled = false,
    onChangeFn,
}: SwitchProps) {
    const [isOn, setIsOn] = useState<boolean>(value);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChangeFn) {
            onChangeFn(e);
        }
        !disabled && setIsOn((pre) => !pre);
    };
    return (
        <>
            <CheckBoxWrapper>
                <CheckBox
                    disabled={disabled}
                    id={`${id}`}
                    checked={isOn}
                    onChange={onChange}
                    type='checkbox'
                />
                <CheckBoxLabel
                    className={`${disabled && "disabled"}`}
                    htmlFor={`${id}`}
                />
            </CheckBoxWrapper>
        </>
    );
}
const CheckBoxWrapper = styled.div`
    position: relative;
    left: 20%;
`;
const CheckBoxLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 15px;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }
    &.disabled {
        background-color: gray !important;
    }
`;
const CheckBox = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    &:checked + ${CheckBoxLabel} {
        background: #4fbe79;
        &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            margin-left: 21px;
            transition: 0.2s;
        }
    }
`;
