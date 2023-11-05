import { useState } from "react";
import { ethers }   from "ethers";

function App() {

  const URL_QUIKNODE          = "https://omniscient-hidden-dust.discover-quiknode.pro/";
  const CODE_QUIKNODE         = "1c9ef9b3fc5c4ef1ff622e2bf7c76bbb28c73a7"  
  const URL_COMPLETE_QUIKNODE = `${URL_QUIKNODE}/${CODE_QUIKNODE}/`;
  // State variables.
  const [ tokens, setTokens]  = useState([]);
  const [address, setAddress] = useState("");

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(address);
    fetchTokens().then((data) => {
      setTokens(data.assets);
    }).catch((err) => setTokens([]));
  };

  // Fetch tokens.
  const fetchTokens = async() => {
    
    const provider = new ethers.JsonRpcProvider(URL_COMPLETE_QUIKNODE);
    const tokens   = await provider.send("qn_getWalletTokenBalance", {
      wallet:address,
      // contracts: []
      contracts: [
        "0xC02aaA39b223FE8D0A0e5C4F27aAD9083C756Cc2", // WETH
        "0xdAc17F958D2ee523a2206206994597C13D831ec7", // USDT
        "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", // MATIC
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3660eB48", // USDC
        "0x6B175474E89084C44Da98b954EedeAC495271d0F", // DAI
        "0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11", // CODE
        "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", // ENS
        "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", // BNB
        "0x4Fabb145d64652a948d72533023f6E7A623C7C53", // BUSD
        "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", // stETH
        "0x95aD61b0a150d79219dCF66E1E6Cc01f0B64C4cE", // SHIB
        "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
        "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", // HEX
        "0x514910771AF9Ca656af849dff83E8264EcF986CA", // LINK
        "0x4d224452801ACEd8B2F0aebE155379bb5D594381", // APE
        "0x5A98FcBEA516Cf06857215779Fd812CA3beF1N32", // LDO
        "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // AAVE
        "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", // MKR
      ]
    });
    return tokens;
  };

  return (
    <div className="h-screen w-screen justify-center space-x-3 ml-5">
      
      <div className="flex space-x-3 w-screen h-14 ml-2 mt-10">
        <form onSubmit={handleSubmit} className="w-6/12 h-15 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
          <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter your Address here" className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
          <button type="submit" className="rounded-lg top-1 right-1 bottom-1 border absolute w-42 text-sm justify-center bg-blue-400 text-white p-3 font-bold">Show me the tokens!</button>          
        </form>
      </div>

    {tokens.length > 0 && (
      <div className="relative overflow-x-auto justify-center space-x-3 w-6/12 h-140 mt-10 mb-10">        
        <h1 className="text-3xl font-bold">Tokens</h1>
        <table className="min-w-full divide-y-4 divide-gray-200 text-sm">
          
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-4 text-left font-bold text-gray-1000">Name</th>
              <th className="whitespace-nowrap px-4 py-4 text-left font-bold text-gray-900">Symbol</th>
              <th className="whitespace-nowrap px-4 py-4 text-left font-bold text-gray-900">Balnce</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tokens.map((token, index) => {
              <tr key={index}>
                {/* Check if token a name. */}
                {token.symbol && (
                  <>
                    <td className="whitespace-nowrap px-4 py-4 text-blue-500">{token.name}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-900">{token.symbol}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-blue-500">{utils.formatUnits(token.amount, token.decimals)}</td>
                  </>
                )}
              </tr>
            })}
          </tbody>

        </table>
      </div>
    )}

    </div>
  );

}

export default App;
