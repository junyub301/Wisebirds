import { rest } from "msw";

export const handlers = [
    rest.get("/api/auth/me", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                id: 1,
                email: "abc@abc.com",
                name: "홍길동",
                company: {
                    id: 1,
                    name: "와이즈버즈",
                },
            })
        );
    }),
    rest.get("/api/users", (req, res, ctx) => {
        const users = localStorage.getItem("users");
        let data;
        if (users) {
            data = JSON.parse(users);
        } else {
            data = {
                content: [
                    {
                        id: 1,
                        email: "user1@wisebirds.ai",
                        name: "사용자1",
                        last_login_at: "2022-11-14T07:37:24.914Z",
                    },
                    {
                        id: 2,
                        email: "user2@wisebirds.ai",
                        name: "사용자2",
                        last_login_at: "2022-11-14T07:37:24.914Z",
                    },
                    {
                        id: 3,
                        email: "user3@wisebirds.ai",
                        name: "사용자3",
                        last_login_at: "2022-11-14T07:37:24.914Z",
                    },
                ],
                size: 25,
                total_elements: 2,
                total_pages: 1,
            };
        }

        return res(ctx.status(200), ctx.json(data));
    }),
    rest.get("/api/campaigns", (req, res, ctx) => {
        const campaigns = localStorage.getItem("campaigns");
        let data;
        if (campaigns) {
            data = JSON.parse(campaigns);
        } else {
            data = {
                content: [
                    {
                        id: 1,
                        name: "캠페인1",
                        enabled: true,
                        campaign_objective: "WEBSITE_TRAFFIC",
                        impressions: 384057,
                        clicks: 1974,
                        ctr: 0.8752,
                        video_views: 948,
                        vtr: 0.95123,
                    },
                    {
                        id: 2,
                        name: "캠페인2",
                        enabled: true,
                        campaign_objective: "LEAD",
                        impressions: 705575,
                        clicks: 6726,
                        ctr: 0.8733,
                        video_views: 40,
                        vtr: 0.135,
                    },
                    {
                        id: 3,
                        name: "캠페인3",
                        enabled: true,
                        campaign_objective: "LEAD",
                        impressions: 538086,
                        clicks: 1171,
                        ctr: 0.3833,
                        video_views: 512,
                        vtr: 0.2512,
                    },
                ],
                size: 25,
                total_elements: 2,
                total_pages: 1,
            };
        }
        return res(ctx.status(200), ctx.json(data));
    }),

    rest.post("/api/users", (req, res, ctx) => {
        const users = localStorage.getItem("users");
        req.json().then((res) => {
            const { body } = res;
            if (users) {
                const data = JSON.parse(users);
                const { name, email } = JSON.parse(body);
                data.content.push({
                    id: data.content.length + 1,
                    email,
                    name,
                    last_login_at: new Date().toISOString(),
                });
                localStorage.setItem("users", JSON.stringify(data));
            }
        });
        try {
            return res(
                ctx.status(200),
                ctx.json({
                    result: true,
                    id: 1,
                })
            );
        } catch (e) {
            console.log(e);
        }
    }),

    rest.patch("/api/campaigns/:id", (req, res, ctx) => {
        req.json().then((res) => {
            const campaigns = localStorage.getItem("campaigns");
            const { body } = res;
            const {
                params: { id },
            } = req;
            const { enabled } = JSON.parse(body);
            if (campaigns) {
                const newUsers = JSON.parse(campaigns).content.map(
                    (val: any) => {
                        if (+val.id === +id) {
                            return { ...val, enabled };
                        } else {
                            return val;
                        }
                    }
                );
                localStorage.setItem(
                    "campaigns",
                    JSON.stringify({
                        ...JSON.parse(campaigns),
                        content: newUsers,
                    })
                );
            }
        });
        try {
            return res(
                ctx.status(200),
                ctx.json({
                    result: true,
                    id: 1,
                })
            );
        } catch (e) {
            console.log(e);
        }
    }),
    rest.patch("/api/users/:id", (req, res, ctx) => {
        req.json().then((res) => {
            const users = localStorage.getItem("users");
            const { body } = res;
            const {
                params: { id },
            } = req;
            const { name } = JSON.parse(body);
            if (users) {
                const newUsers = JSON.parse(users).content.map((val: any) => {
                    if (+val.id === +id) {
                        return { ...val, name };
                    } else {
                        return val;
                    }
                });
                localStorage.setItem(
                    "users",
                    JSON.stringify({ ...JSON.parse(users), content: newUsers })
                );
            }
        });

        try {
            return res(
                ctx.status(200),
                ctx.json({
                    result: true,
                    id: 1,
                })
            );
        } catch (e) {
            console.log(e);
        }
    }),
    rest.get("/api/users/:email/exists", (req, res, ctx) => {
        try {
            return res(ctx.status(200), ctx.json({ result: true }));
        } catch (e) {
            console.log(e);
        }
    }),
];
