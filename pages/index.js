import Layout from "../components/layout";
import { useState } from "react";
import { useAccessKey, useUser } from "../lib/hooks";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const textFieldStyles = {
  marginTop: "30px",
  width: "300px",
  display: "block",
  border: "1px solid",
  height: "50px",
};

const Home = () => {
  const user = useUser();
  const { data, mutate, error } = useAccessKey();
  const [pageData, setPageData] = useState({
    title: "",
    description: "",
    bannerInfo: "",
  });

  const createGame = () => {
    axios
      .post(`${window.location.href}/api/createGame`, pageData)
      .then(function (response) {
        toast.success("Data Saved Successfully");
      });
  };

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{user.issuer}</pre>
          <pre>
            <b>issuer</b> {user.issuer}
          </pre>
          <pre>
            <b>email</b> {user.email}
          </pre>

          <pre>
            <b>public address</b> {user.publicAddress}
          </pre>

          <br />
        </>
      )}
      <input
        type="text"
        placeholder="title"
        style={{ ...textFieldStyles }}
        onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="description"
        style={{ ...textFieldStyles }}
        onChange={(e) =>
          setPageData({ ...pageData, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="banner info"
        style={{ ...textFieldStyles }}
        onChange={(e) =>
          setPageData({ ...pageData, bannerInfo: e.target.value })
        }
      />
      <button
        className="btn btn-blue"
        onClick={() => createGame()}
        style={{ marginTop: "30px" }}
      >
Add data      </button>
    </Layout>
  );
};

export default Home;
