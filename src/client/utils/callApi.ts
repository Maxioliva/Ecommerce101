class ApiError extends Error {
  public statusCode?: number;
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type ApiCallOptions = {
  method: Method;
  endpoint: string;
  payload?: any;
};

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const API_HOST = IS_DEVELOPMENT ? 'http://localhost:4220' : 'https://elchamuserver.onrender.com/';
const API_URL = '/api/v1';

const callApi = async <T = any>({ method, endpoint, payload }: ApiCallOptions): Promise<T> => {
  const headers: Record<string, string> = {};
  const url = API_HOST + API_URL + endpoint;

  let fetchOptions: RequestInit = { headers, method };
  if (payload) {
    headers['Content-Type'] = 'application/json';
    fetchOptions = { ...fetchOptions, body: JSON.stringify(payload), method };
  }

  const response = await fetch(url, fetchOptions);

  if (response.status >= 400) {
    const error = new ApiError();
    error.message = response.statusText;
    error.statusCode = response.status;
    try {
      const { message } = await response.json();
      if (message) {
        error.message = message;
      }
    } catch {}
    throw error;
  } else {
    return response.json();
  }
};

export default callApi;
