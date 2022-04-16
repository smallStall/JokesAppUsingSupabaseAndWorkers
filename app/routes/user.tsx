import { LinksFunction, useLoaderData, useSubmit } from "remix";
import stylesUrl from "~/styles/user.css";
import { Mirror } from "~/components/mirror";
import type { ActionFunction, LoaderFunction } from "remix";
import { signSkyway, requireUserToken, IdToken } from "~/utils/session.server";
import { insertPeer } from "~/utils/session.client";
import { useCallback } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserToken(request);
  return userId;
};

export const action: ActionFunction = async ({ request }) => {
  return await signSkyway(request, "/room");
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function UserRoute() {
  const submit = useSubmit();
  const loaderData = useLoaderData<IdToken>();
  const buttonHandle = useCallback(async () => {
    const peerId = await insertPeer(loaderData.userId);
    const formData = new FormData();
    formData.append("peerId", peerId);
    submit(formData, { method: "post" });
  }, [loaderData.userId, submit]);
  return (
    <section>
      <div>
        <Mirror />
        <p>ルームに入るとカメラの映像が共有されます</p>
        <button type="button" onClick={buttonHandle}>
          ルームに入る
        </button>
      </div>
    </section>
  );
}
