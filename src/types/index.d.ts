declare interface EmailTemplateInput {
    name: string;
    subject: string;
    body: string;
}

declare interface LoginInput {
    email: string;
    password: string;
}

declare interface SignupInput {
    name: string;
    email: string;
    password: string;
}

declare interface WorkflowInput {
    name: string;
    description: string;
    user: string;
}

declare interface EmailTemplateApiResponse {
    name: string;
    subject: string;
    body: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}
type GetEmailTemplatesResponse = EmailTemplate[] | { error: string };

declare interface WorkflowApiResponse {
    name: string;
    status: string;
    createdAt: string;
    // updatedAt: string;
    // user: string;
    // nodes: string[];
    // edges: string[];
    // id: string;
}