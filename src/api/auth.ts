import { api } from "./axios";

export const loginApi = async (email: string, password: string) => {
  const response = await api.get("");
  const users = response.data;

  const matchedUser = users.find(
    (u: any) => u.email === email && u.password === password,
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password");
  }

  const token = "mock-jwt-token";

  return {
    user: matchedUser,
    token,
  };
};
