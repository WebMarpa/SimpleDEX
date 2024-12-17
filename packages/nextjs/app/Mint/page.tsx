"use client";

import { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Mint: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<"TokenA" | "TokenB">("TokenA");
  const [address, setAddress] = useState("");
  const [amountToMint, setAmountToMint] = useState<string | bigint>("");
  const [tokenImage, setTokenImage] = useState("/images/tokenA.png"); // Ruta local inicial

  const account = useAccount();

  // Obtener información del contrato seleccionado desde deployedContracts
  const { data: contractInfo } = useDeployedContractInfo(selectedToken);

  // Leer balance del token seleccionado
  const { data: tokenBalance } = useScaffoldReadContract({
    contractName: selectedToken,
    functionName: "balanceOf",
    args: [account?.address ?? ""],
  });

  // Preparar la función para realizar mint
  const { writeContractAsync: mintTokens } = useScaffoldWriteContract(selectedToken);

  const handleMint = async () => {
    if (!contractInfo) {
      console.error("Contract information not found for selected token:", selectedToken);
      return;
    }

    try {
      await mintTokens({
        functionName: "mint",
        args: [address, BigInt(amountToMint || 0)],
      });
    } catch (e) {
      console.error("Error during minting:", e);
    }
  };

  // Cambiar la imagen según el token seleccionado
  const handleTokenChange = (token: "TokenA" | "TokenB") => {
    setSelectedToken(token);

    // Diccionario para las imágenes locales de cada token
    const tokenImages: Record<"TokenA" | "TokenB", string> = {
      TokenA: "/images/tokenA.png", // Ruta local de TokenA
      TokenB: "/images/tokenB.png", // Ruta local de TokenB
    };

    setTokenImage(tokenImages[token]);
  };

  return (
    <div className="flex items-center flex-col text-center mt-8 p-10">
      <div className="card glass bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={tokenImage} alt="Token Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Mint your Tokens</h2>

          {/* Selector de Token */}
          <label className="block text-left">Select Token</label>
          <select
            className="select select-bordered w-full"
            value={selectedToken}
            onChange={e => handleTokenChange(e.target.value as "TokenA" | "TokenB")}
          >
            <option value="TokenA">TokenA</option>
            <option value="TokenB">TokenB</option>
          </select>

          {/* Balance */}
          <label className="block text-left mt-4">Actual Amount</label>
          <input className="input input-bordered w-full" disabled value={formatEther(tokenBalance || BigInt(0))} />

          <label className="block text-left">Amount to mint</label>
          <IntegerInput
            value={amountToMint?.toString() || ""} // Convertimos a string
            onChange={updatedAmount => {
              setAmountToMint(updatedAmount); // Aquí asumimos que updatedAmount es siempre un string
            }}
            placeholder="value (wei)"
          />

          {/* Dirección del receptor */}
          <label className="block text-left">To</label>
          <AddressInput onChange={setAddress} value={address} placeholder="Input recipient address" />

          <div className="card-actions justify-end">
            <button
              className={`btn btn-primary w-full mt-2 ${!contractInfo ? "btn-disabled" : ""}`}
              onClick={handleMint}
            >
              Mint Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
