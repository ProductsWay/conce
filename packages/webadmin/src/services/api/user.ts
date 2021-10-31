export function signIn(username: string, password: string) {
  const baseURL = `${import.meta.env.VITE_API_URL}/user/login`;

  return fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}

export default {
  signIn,
};
