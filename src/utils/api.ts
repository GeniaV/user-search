import { API } from "./constants";
import { IDetailedUser, ILoginSearch, IUsers } from "./types";

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getUsersByLoginBySortRepo = async ({ login, sortType, perPage, page }: ILoginSearch) => {
    const res = await fetch(`${API}/search/users?q=${login} in:login&sort=repositories&order=${sortType}&per_page=${perPage}&page=${page}`, {
        method: "GET",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    return checkResponse<IUsers>(res);
};

export const getUserInfo = async (userName: string) => {
    const res = await fetch(`${API}/users/${userName}`, {
        method: "GET",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    return checkResponse<IDetailedUser>(res);
};
