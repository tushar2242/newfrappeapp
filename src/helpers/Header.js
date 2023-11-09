let authHeader;

if (typeof window !== "undefined") {
    // this will only execute on the client side where window object is available
    const api_key = localStorage.getItem('api_key');
    const api_secret = localStorage.getItem('api_secret');

    authHeader = {
        headers: {
            'Authorization': `token ${api_key}:${api_secret}`,
            'Content-Type': 'application/json',
        },
    };
}

export { authHeader };
