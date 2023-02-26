import { CustomModalProps } from "./../components/modal/CustomModal";
import { AlertModalProps } from "./../components/modal/AlertModal";
import { ConfirmModalProps } from "./../components/modal/ConfirmModal";
import { atom } from "recoil";
import { MODAL_TYPES } from "../components/modal/Modal";

const { ConfirmModal, AlertModal, CustomModal } = MODAL_TYPES;

export interface ConfirmModalType {
    modalType: typeof ConfirmModal;
    modalProps: ConfirmModalProps;
}

export interface AlertModalType {
    modalType: typeof AlertModal;
    modalProps: AlertModalProps;
}

export interface CustomModalType {
    modalType: typeof CustomModal;
    modalProps: CustomModalProps;
}

export interface ModalType {
    modalType: typeof ConfirmModal | typeof AlertModal | typeof CustomModal;
    modalProps: ConfirmModalProps | AlertModalProps | CustomModalProps;
}

// export type ModalType = ConfirmModalType | AlertModalType | CustomModalType;

export const modalState = atom<ModalType | null>({
    key: "modalState",
    default: null,
});
