import client from "./client";

export async function fetchMe() {
    const { data } = await client.get("/auth/me");
    return data;
}

export async function fetchCampaigns() {
    const { data } = await client.get("/campaigns");
    return data;
}

export async function fetchUsers(params?: { page: number; size: number }) {
    const { data } = await client.get("/users", { params });
    return data;
}

export async function postUser(body: {
    name: string;
    email: string;
    password: string;
    repeat_password: string;
}) {
    const { data } = await client.post("/users", {
        body: JSON.stringify(body),
    });
    return data;
}

export async function patchUser({
    id,
    body,
}: {
    id: number;
    body: { name: string };
}) {
    const { data } = await client.patch(`/users/${id}`, {
        body: JSON.stringify(body),
    });
    return data;
}
export async function patchCampaignState({
    id,
    body,
}: {
    id: number;
    body: { enabled: boolean };
}) {
    const { data } = await client.patch(`/campaigns/${id}`, {
        body: JSON.stringify(body),
    });
    return data;
}

export async function existsEmail(email: string) {
    const { data } = await client.get(`/api/users/${email}/exists`);
    return data;
}
