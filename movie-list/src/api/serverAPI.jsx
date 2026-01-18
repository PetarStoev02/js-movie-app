const host = import.meta.env.VITE_SERVER_URL || "http://localhost:3500";

class ServerAPIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ServerAPIError';
    this.status = status;
    this.data = data;
  }
}

async function request(method, data) {
  const options = {
    method,
    headers: {},
  };

  if (data && method !== "DELETE") {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  let url = host;
  switch (method) {
    case "GET":
      url += "/movies?owner=petar";
      break;
    case "POST":
      url += "/movies";
      break;
    case "PATCH":
      url += `/movies/${data._id}`;
      break;
    case "DELETE":
      url += `/movies/${data}`;
      break;
    default:
      throw new ServerAPIError(`Unsupported method: ${method}`, 400);
  }

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new ServerAPIError(
        errorData.message || `Server error: ${res.status}`,
        res.status,
        errorData
      );
    }

    return res;
  } catch (error) {
    if (error instanceof ServerAPIError) {
      throw error;
    }
    console.error(`API request failed: ${method} ${url}`, error);
    throw new ServerAPIError(
      error.message || 'Network error occurred',
      0,
      { originalError: error.name }
    );
  }
}

export const getMovies = () => request("GET");
export const postMovies = (data) => request("POST", data);
export const patchMovies = (data) => request("PATCH", data);
export const deleteMovies = (data) => request("DELETE", data);
