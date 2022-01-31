export interface UserData {
    _id?: string;
    displayName: string;
    username: string;
    email?: string;
}

export interface PromptData {
    _id: string;
    title: string;
    text: string;
    createdBy: UserData;
}