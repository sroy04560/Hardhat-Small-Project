import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import './App.css';

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = 'Contract Address';
      const url = 'http://localhost:8545';
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
      console.log(contract);
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  }, [contract]);

  const changeGreetings = async () => {
    const input = document.querySelector('#value');
    //if we need to change any contract means write any thing
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    setTimeout();
  };
  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className="input" type="text" id="value"></input>
      <button className="button" onClick={changeGreetings}>
        Change
      </button>
    </div>
  );
}

export default App;
