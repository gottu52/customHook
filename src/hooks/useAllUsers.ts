import axios from "axios";
import { useState } from "react";
import { UserProfileType } from "../types/UserProfileType";
import { UserAPI } from "../types/api/UserAPI";

// 全ユーザーの一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [UserProfiles, setUserProfiles] = useState<Array<UserProfileType>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<UserAPI>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
          email: user.email
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getUsers, error, loading, UserProfiles };
};
