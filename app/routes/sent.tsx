import { LinksFunction, MetaFunction } from "remix";
import stylesUrl from "../styles/login.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "集中できルーム | メール送信しました",
  };
};

export default function Sent() {
  return (
    <section>
      <div className="card">
        <p>
          ご登録ありがとうございます。ご入力いただいたアドレスにメールを送りましたので、ご確認ください。
        </p>
      </div>
    </section>
  );
}
