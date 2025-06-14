const API_BASE_URL = "http://localhost:5000";

export const userRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'HEAD' = 'GET',
  body?: any
) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Set body even for GET/HEAD if explicitly required
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('userRequest error:', error);
    throw error;
  }
};

export const authRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' = 'GET',
  body?: any,
  token?: string
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };


  if (body && method !== 'GET' && method !== 'HEAD') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  return response.json();
};
 