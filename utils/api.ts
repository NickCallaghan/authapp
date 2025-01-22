import axios from "axios";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

let API_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

if (Platform.OS === "android") {
    API_URL = "http://10.0.2.2:3000/api";
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export interface Message {
    id: number;
    content: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMessagePayload {
    content: string;
}

export interface UpdateMessagePayload {
    content: string;
}

// create axios interceptor to log all requests to console.
axios.interceptors.request.use((request) => {
    console.log("Starting Request", request);
    return request;
});

// create axios interceptor to log all responses to console.
axios.interceptors.response.use((response) => {
    console.log("Response:", response);
    return response;
});

export const loginUser = async (
    email: string,
    password: string
): Promise<ApiResponse<any>> => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email,
            password,
        });
        return { data: response.data };
    } catch (error) {
        return { error: `Failed to login. Please try again. ${error}` };
    }
};

export const getUserInfo = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await axios.get(`${API_URL}/users/me`);
        return { data: response.data };
    } catch (error) {
        return { error: `Failed to get user info. Please try again. ${error}` };
    }
};

export const registerUser = async (
    email: string,
    password: string,
    name?: string
): Promise<ApiResponse<any>> => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, {
            email,
            password,
            name,
        });
        return { data: response.data };
    } catch (error) {
        return { error: `Failed to register. Please try again. ${error}` };
    }
};

export const fetchMessages = async (): Promise<ApiResponse<Message[]>> => {
    try {
        const response = await axios.get(`${API_URL}/messages`);
        return { data: response.data };
    } catch (error) {
        return { error: "Failed to fetch messages. Please try again." };
    }
};

export const fetchMessage = async (
    id: number
): Promise<ApiResponse<Message>> => {
    try {
        const response = await axios.get(`${API_URL}/messages/${id}`);
        return { data: response.data };
    } catch (error) {
        return { error: "Failed to fetch message. Please try again." };
    }
};

export const createMessage = async (
    payload: CreateMessagePayload
): Promise<ApiResponse<Message>> => {
    try {
        const response = await axios.post(`${API_URL}/messages`, payload);
        return { data: response.data };
    } catch (error) {
        return { error: "Failed to create message. Please try again." };
    }
};

export const updateMessage = async (
    id: number,
    payload: UpdateMessagePayload
): Promise<ApiResponse<Message>> => {
    try {
        const response = await axios.patch(
            `${API_URL}/messages/${id}`,
            payload
        );
        return { data: response.data };
    } catch (error) {
        throw new Error("Failed to update message. Please try again.");
    }
};

export const deleteMessage = async (id: number): Promise<ApiResponse<void>> => {
    try {
        await axios.delete(`${API_URL}/messages/${id}`);
        return {};
    } catch (error) {
        return { error: "Failed to delete message. Please try again." };
    }
};

export const uploadImage = async ({
    uri,
    token,
}: {
    uri: string;
    token: string;
}) => {
    console.log("UploadCalled with: ", { uri, token });
    return FileSystem.uploadAsync(`${API_URL}/users/me/avatar`, uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "avatar",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        console.log({ RESPONSE: res });
        return JSON.parse(res.body);
    });
};
