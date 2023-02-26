import styled from "styled-components";
import useModal from "../../hooks/useModal";

export interface AlertModalProps {
    message: string;
    confirmText?: string;
    handleConfirm?: () => void;
}

export default function AlertModal({
    message,
    confirmText = "OK",
    handleConfirm,
}: AlertModalProps) {
    const { hideModal } = useModal();
    return (
        <AlertWrap>
            <div className='alert__message'>{message}</div>
            <div className='alert__button__area'>
                <button onClick={hideModal}>{confirmText}</button>
            </div>
        </AlertWrap>
    );
}

const AlertWrap = styled.div`
    padding: 20px;
    border-radius: 5px;
    min-width: 400px;
    background-color: white;
    .alert__message {
        white-space: pre-wrap;
    }
    .alert__button__area {
        margin-top: 10px;
        text-align: end;
    }
`;
