export interface ConfirmModalProps {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    handleClose?: () => void;
    handleConfirm?: () => void;
}

export default function ConfirmModal({
    title,
    message,
    confirmText = "OK",
    cancelText = "Cancel",
    handleClose,
    handleConfirm,
}: ConfirmModalProps) {
    return <div></div>;
}
