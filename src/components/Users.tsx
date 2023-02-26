import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchUsers } from "../api/request";
import { ERROR_GLOBAL } from "../constants/error";
import useModal from "../hooks/useModal";
import { Users as UserType } from "../types/fetch";
import { formatDate } from "../utils";
import Create from "./Create";
import Table, { makeTextAlignTableHeader } from "./Table";
import Update from "./Update";

export default function Users() {
    const [page, setPage] = useState<number>(1);
    const {
        data: users,
        isFetching,
        isError,
    } = useQuery<UserType>(
        ["users", page],
        () => fetchUsers({ page, size: 25 }),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { showModal } = useModal();

    const onUpdate = (row: any) => {
        const { id, email, name } = row.original;
        showModal({
            modalType: "CustomModal",
            modalProps: {
                children: <Update id={id} email={email} name={name} />,
                title: "사용자 수정",
            },
        });
    };

    const columns = useMemo(
        () => [
            {
                ...makeTextAlignTableHeader({
                    value: "아이디",
                    accessor: "email",
                }),
            },
            {
                ...makeTextAlignTableHeader({
                    value: "이름",
                    accessor: "name",
                }),
            },
            {
                ...makeTextAlignTableHeader({
                    value: "마지막로그인일시",
                    accessor: "last_login_at",
                }),
                Cell: ({ cell: { value } }: any) => <p>{formatDate(value)}</p>,
            },
            {
                ...makeTextAlignTableHeader({
                    value: "수정",
                    align: "center",
                    accessor: "update",
                }),
                Cell: ({ row }: any) => (
                    <p
                        style={{
                            textAlign: "center",
                            margin: 0,
                        }}
                    >
                        <button
                            className='update__btn'
                            onClick={() => onUpdate(row)}
                        >
                            수정
                        </button>
                    </p>
                ),
            },
            {
                Header: "id",
                accessor: "id",
            },
        ],
        []
    );

    useEffect(() => {
        if (isError) {
            showModal({
                modalType: "AlertModal",
                modalProps: {
                    message: ERROR_GLOBAL,
                    confirmText: "확인",
                },
            });
        }
    }, [isError]);

    const onCreate = () => {
        showModal({
            modalType: "CustomModal",
            modalProps: {
                children: <Create />,
                title: "사용자 생성",
            },
        });
    };

    const onPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { value },
        } = e;
        if (value === "prev" && page > 1) {
            setPage((pre) => pre - 1);
        } else {
            setPage((pre) => pre + 1);
        }
    };
    return (
        <>
            <h3>사용자 관리</h3>
            <CreateButton onClick={onCreate}>생성</CreateButton>
            {!isFetching && <Table columns={columns} data={users?.content} />}
            <PageWrap>
                <button
                    disabled={page === 1}
                    value='prev'
                    onClick={onPageClick}
                >
                    prev
                </button>
                <span>{page}</span>
                <button
                    disabled={users?.total_pages === page}
                    className={``}
                    value='next'
                    onClick={onPageClick}
                >
                    next
                </button>
            </PageWrap>
        </>
    );
}

const CreateButton = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0.4rem;
    color: white;
    background-color: #0582ff;
`;

const PageWrap = styled.div`
    text-align: center;
    span {
        font-size: 14px;
        margin: 0 10px;
    }
`;
