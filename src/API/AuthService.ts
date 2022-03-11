import { client } from ".";
import { APIResponse } from "../redux/types/APITypes";

interface LoginData {
  data: any;
}

interface RegisterData {
  token: string;
}

class AuthService {
  static async login(username: string, password: string) {
    const { data } = await client.put<APIResponse<LoginData>>("/auth/login", {
      username,
      password,
    });
    return data;
  }

  static async register(
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const { data } = await client.post<APIResponse<RegisterData>>(
      "/auth/register",
      { username, password, confirmPassword }
    );
    return data;
  }
}

export default AuthService;
