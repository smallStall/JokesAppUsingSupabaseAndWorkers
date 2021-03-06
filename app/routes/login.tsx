import {
  LinksFunction,
  MetaFunction,
} from "remix";
import { LoginForm } from "~/components/loginForm";
import stylesUrl from "../styles/login.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "集中できルーム | ログイン",
    description:
      "集中できRoom!はオンラインで集中できる環境を提供するサービスです。",
  };
};

export default function Login() {
  return <LoginForm isLogin={true}/>;
}

