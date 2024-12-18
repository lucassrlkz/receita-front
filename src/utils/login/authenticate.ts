type AuthLoginProps = {
  username: string,
  password: string
}

export default async function authLogin({username, password}: AuthLoginProps): Promise<boolean | string> {
    const authenticate = {
      true: true,
      error: "Login e/ou senha inválidos. Tente novamente."
    }

    if (username === process.env.LOGIN_USER &&
      password === process.env.LOGIN_PASSWORD) {

      return authenticate.true;
    } else {
      return authenticate.error;
    }
}