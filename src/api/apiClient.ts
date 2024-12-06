import { axiosBaseUrl } from "./config";


export const createEmailTemplate = async (data: unknown): Promise<unknown> => {
    try {
        const response = await axiosBaseUrl.post('api/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};