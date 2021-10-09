import "./styles.css";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import { UserAPI } from "./types/api/UserAPI";
import { useState } from "react";
import { UserProfileType } from "./types/UserProfileType";

export default function App() {
  const [UserProfiles, setUserProfiles] = useState<Array<UserProfileType>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
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

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {UserProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
