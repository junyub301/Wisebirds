import { atom } from "recoil";

interface HeaderState {
    auth: string;
    menu: string;
}

export const headerState = atom<HeaderState>({
    key: "headerState",
    default: {
        menu: "campaigns",
        auth: "admin",
    },
});
