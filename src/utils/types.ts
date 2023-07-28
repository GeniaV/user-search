interface IUser {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    received_events_url: string,
    type: string,
    score: number,
    following_url: string,
    gists_url: string,
    starred_url: string,
    events_url: string,
    site_admin: true
}

export interface IUsers {
    total_count: number,
    incomplete_results: boolean,
    items: IUser[]
}

export interface ILoginSearch {
    login: string,
    sortType?: string,
    perPage: number,
    page: number
}

export enum SortingOption { 
    ASC = "asc", 
    DESC = "desc"
};