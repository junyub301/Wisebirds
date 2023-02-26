import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCampaigns, fetchUsers } from "../api/request";
import { headerState } from "../atom/header";
import Campaigns from "../components/Campaigns";
import Header from "../components/Header";
import Table from "../components/Table";
import Update from "../components/Update";
import Users from "../components/Users";
import { ERROR_GLOBAL } from "../constants/error";
import useModal from "../hooks/useModal";
import { formatDate, formatNumber, roundNumber } from "../utils";

export default function Home() {
    const { menu } = useRecoilValue(headerState);
    /* const { showModal } = useModal();
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<
        { Header: any; accessor: string; [key: string]: any }[]
    >([]);
    const {
        data: users,
        isLoading: isUserLoading,
        isFetching,
    } = useQuery("users", () => fetchUsers({ page: 1, size: 25 }));
    const { data: campaigns, isFetching: campaignLoading } = useQuery(
        "campaigns",
        fetchCampaigns
    );

    const onClick = (row: any) => {
        const { id, email, name } = row.original;
        showModal({
            modalType: "CustomModal",
            modalProps: {
                children: <Update id={id} email={email} name={name} />,
                title: "사용자 수정",
            },
        });
    };

    function makeTextAlignTableHeader({
        align = "left",
        value,
        accessor,
    }: {
        align?:
            | "start"
            | "end"
            | "left"
            | "right"
            | "center"
            | "justify"
            | "match-parent";
        value: string;
        accessor: string;
    }) {
        return {
            Header: () => <p style={{ textAlign: align }}>{value}</p>,
            accessor,
        };
    }

    useEffect(() => {
        function fetchData() {
            try {
                if (menu === "campaigns") {
                    if (!campaignLoading) {
                        setData(campaigns.content);
                        setColumns([
                            { Header: "상태", accessor: "enabled" },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "캠페인명",
                                    accessor: "name",
                                }),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "캠페인",
                                    accessor: "campaign_objective",
                                }),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "노출수",
                                    accessor: "impressions",
                                    align: "right",
                                }),
                                Cell: ({ cell: { value } }: any) => (
                                    <p style={{ textAlign: "right" }}>
                                        {formatNumber(value)}
                                    </p>
                                ),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "클릭수",
                                    accessor: "clicks",
                                    align: "right",
                                }),
                                Cell: ({ cell: { value } }: any) => (
                                    <p style={{ textAlign: "right" }}>
                                        {formatNumber(value)}
                                    </p>
                                ),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "CTR",
                                    accessor: "ctr",
                                    align: "right",
                                }),
                                Cell: ({ cell: { value } }: any) => (
                                    <p style={{ textAlign: "right" }}>
                                        {roundNumber(value) + "%"}
                                    </p>
                                ),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "동영상조회수",
                                    accessor: "video_views",
                                    align: "right",
                                }),
                                Cell: ({ cell: { value } }: any) => (
                                    <p style={{ textAlign: "right" }}>
                                        {formatNumber(value)}
                                    </p>
                                ),
                            },
                            {
                                ...makeTextAlignTableHeader({
                                    value: "VTR",
                                    accessor: "vtr",
                                    align: "right",
                                }),
                                Cell: ({ cell: { value } }: any) => (
                                    <p style={{ textAlign: "right" }}>
                                        {roundNumber(value) + "%"}
                                    </p>
                                ),
                            },
                        ]);
                    }
                } else {
                    if (!isUserLoading) {
                        setData(users.content);
                        setColumns([
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
                                Cell: ({ cell: { value } }: any) => (
                                    <>{formatDate(value)}</>
                                ),
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
                                        <button onClick={() => onClick(row)}>
                                            수정
                                        </button>
                                    </p>
                                ),
                            },
                            {
                                Header: "id",
                                accessor: "id",
                            },
                        ]);
                    }
                }
            } catch (e) {
                showModal({
                    modalType: "AlertModal",
                    modalProps: {
                        message: ERROR_GLOBAL,
                        confirmText: "확인",
                    },
                });
            }
        }

        fetchData();
    }, [menu, campaignLoading, isUserLoading, isFetching]); */
    return (
        <div>
            <>
                <Header />
                {menu === "campaigns" ? <Campaigns /> : <Users />}
            </>
        </div>
    );
}
