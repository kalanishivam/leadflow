import { axiosBaseUrl } from "./config";


export const createEmailTemplate = async (data: EmailTemplateInput): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('api/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        return { error: 'Failed to create email template' };
        console.log(error);
    }
};