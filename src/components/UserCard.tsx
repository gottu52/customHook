import { VFC } from "react";
import { UserProfileType } from "../types/UserProfileType";

type Props = {
  user: UserProfileType;
};

export const UserCard: VFC<Props> = (props) => {
  const { user } = props;

  const style = {
    border: "solid 1px #ccc",
    borderRadius: "8px",
    padding: "0 16px",
    margin: "8px"
  };

  return (
    <div style={style}>
      <dl>
        <dt>名前</dt>
        <dd>{user.name}</dd>
        <dt>住所</dt>
        <dd>{user.address}</dd>
        <dt>メール</dt>
        <dd>{user.email}</dd>
      </dl>
    </div>
  );
};
