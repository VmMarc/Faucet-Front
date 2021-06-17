import { useContext } from "react";

import { Web3Context } from "web3-hooks";

const Nav = () => {
  const [web3State, login] = useContext(Web3Context);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <p className="text-white">your balance: {web3State.balance} ETHER </p>

      {!web3State.isLogged ? (
        <>
          <button className="btn btn-secondary mx-4" onClick={login}>
            Login
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-success mx-4">
            {web3State.account.split("").splice(0, 6).join("") +
              "..." +
              web3State.account.split("").splice(-4).join("")}
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
