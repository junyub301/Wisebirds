import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import client from "../api/client";
import { headerState } from "../atom/header";
import { Me } from "../types/user";

export default function Header() {
    const [user, setUser] = useState<Me>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [headers, setHeaders] = useRecoilState(headerState);
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            currentTarget: { value },
        } = e;
        setHeaders({ menu: "campaigns", auth: value });
    };

    useEffect(() => {
        async function getUser() {
            const { data } = await client.get("/auth/me");
            setUser(data);
        }
        getUser();
    }, []);
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const {
            currentTarget: { title },
        } = e;
        setHeaders({ menu: title, auth: headers.auth });
    };
    return (
        <HeaderWrap>
            <Column className='header__logo'>Wisebirds</Column>
            <div className='header__content'>
                <div className='header__content__left'>
                    <Column
                        onClick={onClick}
                        title='campaigns'
                        className={`campaign ${
                            headers.menu === "campaigns" ? "active" : null
                        }`}
                    >
                        캠패인
                    </Column>
                    {headers.auth === "admin" && (
                        <Column
                            onClick={onClick}
                            title='users'
                            className={`user ${
                                headers.menu === "users" ? "active" : null
                            }`}
                        >
                            사용자
                        </Column>
                    )}
                </div>
                <div className='header__content__right'>
                    <Column
                        onClick={() => setShowInfo((pre) => !pre)}
                        title='me'
                        className='header__content__right__user'
                    >
                        <span>{user?.email}</span>
                        {showInfo && (
                            <div className='info'>
                                <div>{user?.name}</div>
                                <div>{user?.email}</div>
                                <div>{user?.company.name}</div>
                            </div>
                        )}
                    </Column>
                    <Column className='header__select'>
                        <select onChange={onChange}>
                            <option value='admin'>어드민</option>
                            <option value='manager'>매니저</option>
                            <option value='viewer'>뷰어</option>
                        </select>
                    </Column>
                </div>
            </div>
        </HeaderWrap>
    );
}

const HeaderWrap = styled.div`
    background-color: #0582ff;
    width: 100%;
    display: inline-flex;
    color: white;
    .header__logo {
        margin: auto;
    }
    .header__content {
        margin-left: 10px;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        &__left,
        &__right {
            display: inline-flex;
            gap: 10px;
            justify-content: center;
            justify-items: center;
            cursor: pointer;
        }
        &__left {
        }
        &__right {
            padding-right: 20px;
            &__user {
                position: relative;
                .info {
                    text-align: center;
                    left: 17px;
                    background-color: white;
                    border-radius: 4px;
                    padding: 3px;
                    box-shadow: -2px -1px 12px -2px #cdc9c9;
                    z-index: 3;
                    width: 150px;
                    top: 42px;
                    color: black;
                    position: absolute;
                }
            }
        }
    }
`;

const Column = styled.div`
    margin: auto;
    padding: 20px;

    &.active:not(.header__logo, .header__select) {
        background-color: #064d95;
    }
`;
