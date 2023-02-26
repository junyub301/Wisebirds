import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { existsEmail, postUser } from "../api/request";
import { ReactComponent as NotShow } from "../assets/not_show.svg";
import { ReactComponent as Show } from "../assets/show.svg";
import {
    ERROR_GLOBAL,
    ERROR_ID_PATTERN,
    ERROR_NAME_PATTERN,
    ERROR_PASSWORD_CHECK,
    ERROR_PASSWORD_PATTERN,
    ERROR_ALREADY_ID,
} from "../constants/error";
import useModal from "../hooks/useModal";
import Button from "./Button";
import Input from "./Input";

interface CreateInputs {
    id: string;
    password: string;
    check_password: string;
    name: string;
}

export default function Create() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CreateInputs>();
    const { hideModal, showModal } = useModal();
    const queryClient = useQueryClient();
    const { mutate } = useMutation(postUser);
    const onSubmit = ({ id, password, check_password, name }: CreateInputs) => {
        if (password !== check_password) {
            return setError("check_password", {
                message: ERROR_PASSWORD_CHECK,
            });
        }
        mutate(
            {
                name,
                email: id,
                password,
                repeat_password: check_password,
            },
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
    const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = e;
        const { data } = await existsEmail(value);
        if (data.result) {
            return setError("id", {
                message: ERROR_ALREADY_ID,
            });
        }
    };

    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [showCheckPassword, setCheckShowPassword] = useState<boolean>(true);

    return (
        <CreateForm onSubmit={handleSubmit(onSubmit)}>
            <div className='create__content'>
                <Input
                    label='아이디'
                    register={register("id", {
                        required: "아이디(이메일)을 입력하세요.",
                        pattern: {
                            value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                            message: ERROR_ID_PATTERN,
                        },
                        maxLength: {
                            value: 50,
                            message: ERROR_ID_PATTERN,
                        },
                        minLength: {
                            value: 9,
                            message: ERROR_ID_PATTERN,
                        },
                        onBlur: onBlur,
                    })}
                    required
                />
                {errors.id && (
                    <span className='error'>{errors.id.message}</span>
                )}
                <Input
                    label='비밀번호'
                    register={register("password", {
                        required: "비밀번호를 입력하세요.",
                        pattern: {
                            value: /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-])(?=.*[0-9]).{8,15}/,
                            message: ERROR_PASSWORD_PATTERN,
                        },
                    })}
                    type={showPassword ? "password" : "text"}
                    required
                >
                    <div
                        className='password__icon'
                        onClick={() => setShowPassword((pre) => !pre)}
                    >
                        <span>
                            {showPassword ? (
                                <NotShow width={15} height={15} />
                            ) : (
                                <Show width={15} height={15} />
                            )}
                        </span>
                    </div>
                </Input>
                {errors.password && (
                    <span className='error'>{errors.password.message}</span>
                )}

                <Input
                    label='비밀번호 확인'
                    register={register("check_password", {
                        required: "비밀번호를 입력하세요",
                    })}
                    type={showCheckPassword ? "password" : "text"}
                    required
                >
                    <div
                        className='password__icon'
                        onClick={() => setCheckShowPassword((pre) => !pre)}
                    >
                        <span>
                            {showCheckPassword ? (
                                <NotShow width={15} height={15} />
                            ) : (
                                <Show width={15} height={15} />
                            )}
                        </span>
                    </div>
                </Input>
                {errors.check_password && (
                    <span className='error'>
                        {errors.check_password.message}
                    </span>
                )}

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
            <div className='create__footer'>
                <Button
                    className='btn_cancel'
                    onClick={hideModal}
                    variant='cancel'
                    size='sm'
                    type='button'
                >
                    취소
                </Button>
                <Button type='submit' size='sm'>
                    확인
                </Button>
            </div>
        </CreateForm>
    );
}

const CreateForm = styled.form`
    min-width: 580px;
    .create__content {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 15px;
        border-bottom: 1px solid #bdb7b7;
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
    .create__footer {
        text-align: center;
        .btn_cancel {
            margin-right: 5px;
        }
    }
`;
