"use client";

import { useEffect, useState } from "react";
import Curve from "~~/components/Curve" 
import { NextPage } from "next";
import { formatUnits, parseEther } from "viem";
import { useAccount } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth/useDeployedContractInfo";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Home: NextPage = () => {
  const [amountToSwap, setAmountToSwap] = useState<string>("0");
  const [isSwappingAtoB, setIsSwappingAtoB] = useState(true);
  const [estimatedOutput, setEstimatedOutput] = useState<string | undefined>();
  const [isApproved, setIsApproved] = useState(false);
  const account = useAccount();

  const { data: tokenAData } = useDeployedContractInfo("TokenA");
  const { data: tokenBData } = useDeployedContractInfo("TokenB");
  const { data: simpleDEXData } = useDeployedContractInfo("SimpleDEX");

  const tokenAAddress = tokenAData?.address;
  const tokenBAddress = tokenBData?.address;
  const simpleDEXAddress = simpleDEXData?.address;

  // Consultas para obtener los balances de los tokens
  const { data: reserveA } = useScaffoldReadContract({
    contractName: "TokenA",
    functionName: "balanceOf",
    args: [simpleDEXAddress],
  });

  const { data: reserveB } = useScaffoldReadContract({
    contractName: "TokenB",
    functionName: "balanceOf",
    args: [simpleDEXAddress],
  });

  const { data: priceA } = useScaffoldReadContract({
    contractName: "SimpleDEX",
    functionName: "getPrice",
    args: [tokenAAddress],
  });

  const { data: priceB } = useScaffoldReadContract({
    contractName: "SimpleDEX",
    functionName: "getPrice",
    args: [tokenBAddress],
  });

  // Funciones de aprobación
  const { writeContractAsync: approveTokenA } = useScaffoldWriteContract("TokenA");
  const { writeContractAsync: approveTokenB } = useScaffoldWriteContract("TokenB");

  const { writeContractAsync: swapAforB } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: swapBforA } = useScaffoldWriteContract("SimpleDEX");

  // Estimación de la salida
  useEffect(() => {
    if (amountToSwap && reserveA && reserveB && priceA && priceB) {
      const inputAmountInWei = parseEther(amountToSwap); // Convierte a wei
      const reserveIn = isSwappingAtoB ? BigInt(reserveA) : BigInt(reserveB);
      const reserveOut = isSwappingAtoB ? BigInt(reserveB) : BigInt(reserveA);

      const estimated = (inputAmountInWei * reserveOut) / (reserveIn + inputAmountInWei);
      const estimatedFormatted = formatUnits(estimated, 18);

      setEstimatedOutput(parseFloat(estimatedFormatted).toFixed(3));
    }
  }, [amountToSwap, isSwappingAtoB, reserveA, reserveB, priceA, priceB]);

  // Manejar la aprobación
  const handleApprove = async () => {
    try {
      if (isSwappingAtoB) {
        await approveTokenA({
          functionName: "approve",
          args: [simpleDEXAddress, BigInt(parseEther(amountToSwap))],
        });
      } else {
        await approveTokenB({
          functionName: "approve",
          args: [simpleDEXAddress, BigInt(parseEther(amountToSwap))],
        });
      }
      setIsApproved(true);
      alert("Approval successful!");
    } catch (e) {
      console.error("Error approving the token:", e);
      alert("There was an error approving the token.");
    }
  };

  // Manejar el intercambio
  const handleSwap = async () => {
    if (!isApproved) {
      alert("You must approve the token first.");
      return;
    }

    try {
      if (isSwappingAtoB) {
        await swapAforB({
          functionName: "swapAforB",
          args: [BigInt(parseEther(amountToSwap))],
        });
      } else {
        await swapBforA({
          functionName: "swapBforA",
          args: [BigInt(parseEther(amountToSwap))],
        });
      }
      alert("Swap successful!");
      setAmountToSwap("0");
      setIsApproved(false);
    } catch (e) {
      console.error("Error during swap:", e);
      alert("There was an error during the swap.");
    }
  };

  // Conversión de BigInt a number para pasar al gráfico
  const reserveAAsNumber = reserveA ? Number(reserveA) : 0;
  const reserveBAsNumber = reserveB ? Number(reserveB) : 0;
  const amountToSwapAsNumber = Number(parseEther(amountToSwap));

  return (
    <div className="flex items-center flex-col text-center mt-8 p-10">
      <div className="flex gap-4 w-full justify-center">
        <div className="flex gap-4 flex-col">
          <div className="flex gap-4">
            <div className="card w-48 h-auto bg-blue-200 shadow-lg rounded-lg p-4">
              <label className="block text-left font-semibold text-lg text-gray-800">Token A Balance:</label>
              <input
                type="text"
                value={reserveA ? formatUnits(BigInt(reserveA), 18) : "Loading..."}
                readOnly
                className="input input-bordered w-full mt-2 rounded-md p-2 text-center bg-white text-gray-700 shadow-sm"
              />
            </div>

            <div className="card w-48 h-auto bg-blue-200 shadow-lg rounded-lg p-4">
              <label className="block text-left font-semibold text-lg text-gray-800">Token B Balance:</label>
              <input
                type="text"
                value={reserveB ? formatUnits(BigInt(reserveB), 18) : "Loading..."}
                readOnly
                className="input input-bordered w-full mt-2 rounded-md p-2 text-center bg-white text-gray-700 shadow-sm"
              />
            </div>
          </div>

          <div className="card bg-base-100 w-100 shadow-xl h-auto overflow-y-auto">
            <div className="card-body">
              <h2 className="card-title">Swap Your Tokens</h2>
              <label className="text-left">Amount to Swap</label>
              <input
                type="number"
                value={amountToSwap}
                onChange={e => setAmountToSwap(e.target.value)}
                placeholder="Amount in tokens"
              />
              <div className="form-control mt-4">
                <label className="cursor-pointer label">
                  <span className="label-text">
                    {isSwappingAtoB ? "Swap Token A for Token B" : "Swap Token B for Token A"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isSwappingAtoB}
                    onChange={() => {
                      if (!isApproved) {
                        setIsSwappingAtoB(!isSwappingAtoB);
                      }
                    }}
                  />
                </label>
              </div>

              {estimatedOutput !== undefined && (
                <div className="mt-4">
                  <label className="block text-left">Estimated Amount:</label>
                  <input
                    type="text"
                    value={estimatedOutput + " " + (isSwappingAtoB ? "Token B" : "Token A")}
                    readOnly
                    className="input input-bordered w-full mt-2"
                  />
                </div>
              )}

              {/* Mostrar el botón de aprobación o de intercambio */}
              {!isApproved ? (
                <button className="btn btn-secondary w-full mt-4" onClick={handleApprove}>
                  Approve Token
                </button>
              ) : (
                <button className="btn btn-primary w-full mt-4" onClick={handleSwap}>
                  {isSwappingAtoB ? "Swap A for B" : "Swap B for A"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          <div className="flex gap-4">
            <div className="card w-48 h-auto bg-blue-200 shadow-lg rounded-lg p-4">
              <label className="block text-left font-semibold text-lg text-gray-800">Token A Price:</label>
              <input
                type="text"
                value={priceA ? formatUnits(BigInt(priceA), 18) : "Loading..."}
                readOnly
                className="input input-bordered w-full mt-2 rounded-md p-2 text-center bg-white text-gray-700 shadow-sm"
              />
            </div>

            <div className="card w-48 h-auto bg-blue-200 shadow-lg rounded-lg p-4">
              <label className="block text-left font-semibold text-lg text-gray-800">Token B Price:</label>
              <input
                type="text"
                value={priceB ? formatUnits(BigInt(priceB), 18) : "Loading..."}
                readOnly
                className="input input-bordered w-full mt-2 rounded-md p-2 text-center bg-white text-gray-700 shadow-sm"
              />
            </div>
          </div>
          <div className="card bg-base-100 w-[400px] shadow-xl min-h-[400px] overflow-y-auto">
            <div className="card-body">
              <h2 className="card-title">Curve Chart</h2>
              <div className="h-full">
                <Curve
                  reserveA={reserveAAsNumber}
                  reserveB={reserveBAsNumber}
                  amountToSwapA={isSwappingAtoB ? amountToSwapAsNumber : 0}
                  amountToSwapB={isSwappingAtoB ? 0 : amountToSwapAsNumber}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
