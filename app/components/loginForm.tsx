import { Link, useSearchParams } from "remix";
import { signInWithGoogle } from "~/utils/session.client";
import { login, registUser } from "~/utils/session.client";
import { schema } from "~/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";

export type LoaderData = {
  status: string;
};

type Props = { isLogin: boolean };

export function LoginForm({ isLogin }: Props) {
  const [loginError, setLoginError] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [searchParams] = useSearchParams();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const loginButtonHandle = useCallback(async () => {
    const { error } = await login({
      email: getValues("email"),
      password: getValues("password"),
    });
    if (error) {
      setLoginError(error.status);
      return;
    }
  }, [getValues, setLoginError]);

  const registerButtonHandle = useCallback(async () => {
    setMessage("ご入力いただいたメールアドレスとパスワードを送信しました。")
    const { error } = await registUser({
      email: getValues("email"),
      password: getValues("password"),
    });
    if (error) {
      setLoginError(error.status);
      setMessage("");
      return;
    }
    window.location.href ="/sent";
  }, [getValues, setLoginError]);

  const status = searchParams.get("status");

  return (
    <section>
      <div className="card">
        {status == undefined ? (
          <div>
            <p className="top-p">
              {isLogin
                ? "アカウントをお持ちでない方はこちら"
                : "ログインはこちら"}
            </p>
            <Link to={isLogin ? "/signup" : "/login"} className="button">
              {isLogin ? "新規会員登録" : "ログインする"}
            </Link>
          </div>
        ) : null}
        <hr />
        <button onClick={() => signInWithGoogle()} className="google">
          {isLogin ? "Googleでログイン" : "Googleで登録する"}
        </button>
        <form onFocus={() => setLoginError(0)}>
          <div>
            <input
              type="email"
              id="email-input"
              className="email"
              defaultValue="smallstall001@gmail.com"
              autoComplete="email"
              placeholder="メールアドレス"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>

          <div>
            <input
              id="password-input"
              autoComplete={"current-password"}
              defaultValue="mametaro3"
              type="password"
              placeholder="パスワード"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </div>
          <button
            type={"button"}
            onClick={isLogin ? loginButtonHandle : registerButtonHandle}
          >
            {isLogin ? "メールアドレスでログイン" : "メールアドレスで登録する"}
          </button>
          <p>
            {loginError === 400 && isLogin
              ? "メールアドレスとパスワードの組み合わせが正しくありません"
              : null}
          </p>
          <p>{message}</p>
          {isLogin ? (
            <div className="links">
              <Link to="/reset">パスワードをお忘れの方</Link>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
