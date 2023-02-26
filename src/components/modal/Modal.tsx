import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "../../atom/modal";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import CustomModal from "./CustomModal";

export const MODAL_TYPES = {
    ConfirmModal: "ConfirmModal",
    AlertModal: "AlertModal",
    CustomModal: "CustomModal",
} as const;

const MODAL_COMPONENTS: any = {
    [MODAL_TYPES.ConfirmModal]: ConfirmModal,
    [MODAL_TYPES.AlertModal]: AlertModal,
    [MODAL_TYPES.CustomModal]: CustomModal,
};

const Modal = () => {
    const { modalType, modalProps } = useRecoilState(modalState)[0] || {};

    const renderComponent = () => {
        if (!modalType) {
            return null;
        }
        const ModalComponent = MODAL_COMPONENTS[modalType];

        return (
            <ModalWrap>
                <ModalComponent {...modalProps} />
            </ModalWrap>
        );
    };

    return <>{renderComponent()}</>;
};

export default Modal;

const ModalWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;
