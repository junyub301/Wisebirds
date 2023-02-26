import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchCampaigns, patchCampaignState } from "../api/request";
import { headerState } from "../atom/header";
import { ERROR_GLOBAL } from "../constants/error";
import useModal from "../hooks/useModal";
import { Campaigns as CampaignType } from "../types/fetch";
import { formatNumber, roundNumber } from "../utils";
import Switch from "./Switch";
import Table, { makeTextAlignTableHeader } from "./Table";

export default function Campaigns() {
    const [page, setPage] = useState<number>(1);
    const { auth } = useRecoilValue(headerState);
    const {
        data: campaigns,
        isFetching,
        isError,
    } = useQuery<CampaignType>(["campaigns", auth], fetchCampaigns, {
        refetchOnWindowFocus: false,
    });
    const { mutate } = useMutation(patchCampaignState);
    const { showModal } = useModal();
    const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { id, checked },
        } = e;
        mutate(
            { id: +id, body: { enabled: checked } },
            {
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
    const columns = useMemo(
        () => [
            {
                Header: "상태",
                accessor: "enabled",
                Cell: ({ cell: { value }, row }: any) => {
                    return (
                        <Switch
                            id={row.original.id}
                            value={value}
                            onChangeFn={onToggle}
                            disabled={auth === "viewer"}
                        />
                    );
                },
            },
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
                    <p style={{ textAlign: "right" }}>{formatNumber(value)}</p>
                ),
            },
            {
                ...makeTextAlignTableHeader({
                    value: "클릭수",
                    accessor: "clicks",
                    align: "right",
                }),
                Cell: ({ cell: { value } }: any) => (
                    <p style={{ textAlign: "right" }}>{formatNumber(value)}</p>
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
                    <p style={{ textAlign: "right" }}>{formatNumber(value)}</p>
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
        ],
        [auth]
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
            <h3>캠페인 관리</h3>
            {!isFetching && (
                <Table data={campaigns?.content} columns={columns} />
            )}
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
                    disabled={campaigns?.total_pages === page}
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
const PageWrap = styled.div`
    text-align: center;
    span {
        font-size: 14px;
        margin: 0 10px;
    }
`;
