import useAxios from "../hooks/useAxios";

export const createUserInDB = async ({user}) => {
    user.role = "user";
    user.createdAt = new Date();
    await useAxios().post(`/users`,user);
    return;
}