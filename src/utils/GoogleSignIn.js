import useAxios from "../hooks/useAxios";

export const createUserInDB = async ({user}) => {
    await useAxios().post(`/users`,user);
    return;
}