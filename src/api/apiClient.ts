import { axiosBaseUrl } from "./config";

// email routes here
export const createEmailTemplate = async (data: EmailTemplateInput): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('/templates/create', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to create email template' };
    }
};

export const getEmailTemplates = async (): Promise<GetEmailTemplatesResponse> => {
    try {
        const response = await axiosBaseUrl.get('/templates');
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to get email templates' };
    }
};


//user routes here
export const loginUser = async(data : LoginInput): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('/user/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to login' };
    }
};

export const signupUser = async(data : SignupInput): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('/user/signup', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to signup' };
    }
};

export const verifyToken = async(): Promise<{ message: string } | { error: string }> => {
    try {
     
        const response = await axiosBaseUrl.get('/user/verify');
        
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to verify token' };
    }
};

export const logoutUser = async(): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('/user/logout');
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to logout' };
    }
};




// workflow routes here
export const createNewWorkFlow = async(data : unknown): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await axiosBaseUrl.post('/workflow/create', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: 'Failed to create workflow' };
    }
};