import { User } from "./user";

interface Campaign {
    id: number;
    name: string;
    enabled: boolean;
    campaign_objective:
        | "WEBSITE_TRAFFIC"
        | "WEBSITE_TRAFFIC"
        | "SALES"
        | "APP_INSTALLATION"
        | "LEAD"
        | "BRAND"
        | "VIDEO_VIEWS";
    impressions: number;
    clicks: number;
    ctr: number;
    video_views: number;
    vtr: number;
}

interface Page {
    total_elements: number;
    total_pages: number;
    last: boolean;
    number: number;
    size: number;
    sort: any;
    number_of_elements: number;
    first: boolean;
    empty: boolean;
}

export interface Users extends Page {
    content: User[];
}

export interface Campaigns extends Page {
    content: Campaign[];
}
