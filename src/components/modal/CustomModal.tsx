import { useEffect } from "react";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

export interface CustomModalProps {
    title?: string;
    children: React.ReactNode;
}

export default function CustomModal({ title, children }: CustomModalProps) {
    const { hideModal } = useModal();
    useEffect(() => {
        function keyupEvent(e: KeyboardEvent) {
            if (e.key === "Escape") {
                hideModal();
            }
        }
        document.addEventListener("keyup", keyupEvent);
        return () => document.removeEventListener("keyup", keyupEvent);
    }, []);
    return (
        <CustomModalWrap>
            <div className='customModal__title'>
                <h3>{title}</h3>
                <button className='close_btn' onClick={hideModal}>
                    X
                </button>
            </div>
            {children}
        </CustomModalWrap>
    );
}

const CustomModalWrap = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    .customModal__title {
        display: flex;
        justify-content: space-between;
        .close_btn {
            border: 0;
            outline: 0;
            background-color: unset;
            color: gray;
            cursor: pointer;
        }
    }
`;
