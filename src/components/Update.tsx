import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { patchUser } from "../api/request";
import { ERROR_GLOBAL, ERROR_NAME_PATTERN } from "../constants/error";
import useModal from "../hooks/useModal";
import Button from "./Button";
import Input from "./Input";

interface UpdateProps {
    id: number;
    email: string;
    name: string;
}
export default function Update({ id, email, name }: UpdateProps) {
    const { hideModal, showModal } = useModal();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        defaultValues: {
            name,
        },
    });
    const { mutate } = useMutation(patchUser);
    const onSubmit = ({ name }: { name: string }) => {
        mutate(
            { id, body: { name } },
            {
                onSuccess: (data) => {
                    if (data.result) {
                        queryClient.invalidateQueries("users");
                        hideModal();
                    }
                },
                onError: () => {
                    showModal({
                        modalType: "AlertModal",
                        modalProps: {
                            message: ERROR_GLOBAL,
                            confirmText: "확인",
                        },
                    });
                },
            }
        );
    };
    return (
        <UpdateForm onSubmit={handleSubmit(onSubmit)}>
            <div className='update__content'>
                <div>
                    <label className='user__id__title'>
                        아이디
                        <span className='required__icon'>*</span>
                    </label>
                    <div className='user__id__value'>{email}</div>
                </div>
                <Input
                    label='이름'
                    register={register("name", {
                        required: "이름을 입력하세요.",
                        pattern: {
                            value: /[가-힣a-zA-Z]{1,16}/,
                            message: ERROR_NAME_PATTERN,
                        },
                    })}
                    required
                />
                {errors.name && (
                    <span className='error'>{errors.name.message}</span>
                )}
            </div>
            <div className='update__footer'>
                <Button
                    className='btn_cancel'
                    onClick={hideModal}
                    variant='cancel'
                    size='sm'
                    type='button'
                >
                    취소
                </Button>
                <Button size='sm' type='submit'>
                    확인
                </Button>
            </div>
        </UpdateForm>
    );
}

const UpdateForm = styled.form`
    min-width: 500px;
    .update__content {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #bdb7b7;
        .user__id__ {
            &title {
                .required__icon {
                    color: red;
                }
            }
        }
        .password__icon {
            width: 20px;
            position: absolute;
            right: 0px;
            display: flex;
            align-items: center;
            padding-right: 0.75rem;
            cursor: pointer;
        }
    }
    .update__footer {
        text-align: center;
        .btn_cancel {
            margin-right: 5px;
        }
    }
`;
