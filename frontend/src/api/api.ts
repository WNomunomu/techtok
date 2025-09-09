import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export class ApiError extends Error {
  public status?: number;
  public errors?: string | string[];

  constructor(message: string, status?: number, errors?: string | string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data;
    const message = errorData?.message || errorData?.errors || error.message || "API request failed";
    
    throw new ApiError(
      typeof message === 'string' ? message : Array.isArray(message) ? message.join(', ') : "API request failed",
      error.response?.status,
      errorData?.errors
    );
  } else {
    throw new ApiError("An unexpected error occurred");
  }
};

export const apiV1Get = async <T>(
  url: string, 
  params?: QueryParams
): Promise<T | void> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, {
      params: params,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiV1Post = async <T, D = Record<string, unknown>>(
  url: string, 
  data: D = {} as D
): Promise<T | void> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data?.errors);
    }
    handleApiError(error);
  }
};

export const apiV1Put = async <T, D = Record<string, unknown>>(
  url: string, 
  data: D = {} as D
): Promise<T | void> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiV1Delete = async <T>(url: string): Promise<T | void> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
