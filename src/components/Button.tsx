import React from "react";
import styled, { css } from "styled-components";

const SIZES = {
    sm: `
        --button-font-size: 0.875rem;
        --button-padding: 8px 12px;
        --button-radius: 4px;
    `,
    md: `
        --button-font-size: 1rem;
        --button-padding: 12px 16px;
        --button-radius: 8px;
    `,
    lg: `
        --button-font-size: 1.25rem;
        --button-padding: 16px 20px;
        --button-radius: 12px;
    `,
};

const VARIANTS = {
    success: `
        --button-color: #ffffff;
        --button-bg-color: #0582ff ;
        --button-hover-bg-color:#025ce2;
    `,
    error: `
        --button-color: #ffffff;
        --button-bg-color: #dc3545;
        --button-hover-bg-color:#d92b3d;
    `,
    cancel: `
        --button-color: #000000;
        --button-bg-color:#d9d6d6;
        --button-hover-bg-color:#cfcccc;
    `,
};

interface ButtonProps {
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "success" | "error" | "cancel";
    value?: string;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}
function Button({
    disabled = false,
    size = "md",
    variant = "success",
    value,
    children,
    onClick,
    ...rest
}: ButtonProps) {
    const sizeStyle = SIZES[size];
    const variantStyle = VARIANTS[variant];

    return (
        <StyledButton
            disabled={disabled}
            sizeStyle={sizeStyle}
            variantStyle={variantStyle}
            onClick={onClick}
            {...rest}
            value={value}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button<{ sizeStyle: string; variantStyle: string }>`
    ${(p) =>
        css`
            ${p.sizeStyle}
        `}
    ${(p) =>
        css`
            ${p.variantStyle}
        `}

  margin: 0;
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    font-size: var(--button-font-size, 1rem);
    padding: var(--button-padding, 12px 16px);
    border-radius: var(--button-radius, 8px);
    color: var(--button-color, #ffffff);
    background: var(--button-bg-color, #0d6efd);

    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, #025ce2);
    }

    &:disabled {
        cursor: default;
        opacity: 0.5;
        background: var(--button-bg-color, #025ce2);
    }
`;

export default Button;
