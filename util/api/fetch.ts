export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}
export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export async function fetchPost(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    });
    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export async function fetchPostURLEncoded(url: string, data?: any) {
  try {
    const formBody = []
    for (var keys in data) {
      formBody.push(encodeURIComponent(keys) + '=' + encodeURIComponent(data[keys]))
    }
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formBody.join('&')
    });
    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export async function fetchPutJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
