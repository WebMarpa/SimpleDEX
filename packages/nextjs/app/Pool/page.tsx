"use client";
import { useState } from "react";
import { NextPage } from "next";
import { parseEther, formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth/useDeployedContractInfo";

const Home: NextPage = () => {
  const [amountTokenA, setAmountTokenA] = useState<string>("0");
  const [amountTokenB, setAmountTokenB] = useState<string>("0");
  const [removeAmountTokenA, setRemoveAmountTokenA] = useState<string>("0");
  const [removeAmountTokenB, setRemoveAmountTokenB] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const account = useAccount();

  // Usamos useDeployedContractInfo para obtener detalles de los contratos
  const { data: tokenAData } = useDeployedContractInfo("TokenA");
  const { data: tokenBData } = useDeployedContractInfo("TokenB");
  const { data: simpleDEXData } = useDeployedContractInfo("SimpleDEX");

  const simpleDEXAddress = simpleDEXData?.address;

  // Consultas de los contratos para obtener los balances de los tokens
  const { data: balanceTokenA } = useScaffoldReadContract({
    contractName: "TokenA",
    functionName: "balanceOf",
    args: [account.address],
  });

  const { data: balanceTokenB } = useScaffoldReadContract({
    contractName: "TokenB",
    functionName: "balanceOf",
    args: [account.address],
  });

  // Consultas para obtener los balances del pool en el contrato SimpleDEX
  const { data: poolBalanceTokenA } = useScaffoldReadContract({
    contractName: "TokenA",
    functionName: "balanceOf",
    args: [simpleDEXAddress],
  });

  const { data: poolBalanceTokenB } = useScaffoldReadContract({
    contractName: "TokenB",
    functionName: "balanceOf",
    args: [simpleDEXAddress],
  });

  // Función para aprobar tokens y agregar liquidez
  const { writeContractAsync: approveTokenA } = useScaffoldWriteContract("TokenA");
  const { writeContractAsync: approveTokenB } = useScaffoldWriteContract("TokenB");
  const { writeContractAsync: addLiquidity } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: removeLiquidity } = useScaffoldWriteContract("SimpleDEX");

  const handleAddLiquidity = async () => {
    setLoading(true);
    try {
      // Aprobar Token A
      await approveTokenA({
        functionName: "approve",
        args: [simpleDEXAddress, BigInt(parseEther(amountTokenA))],
      });

      // Aprobar Token B
      await approveTokenB({
        functionName: "approve",
        args: [simpleDEXAddress, BigInt(parseEther(amountTokenB))],
      });

      // Agregar liquidez
      await addLiquidity({
        functionName: "addLiquidity",
        args: [
          BigInt(parseEther(amountTokenA)), // Amount of Token A
          BigInt(parseEther(amountTokenB)), // Amount of Token B
        ],
      });

      alert("Liquidity added successfully!");
    } catch (e) {
      console.error("Error adding liquidity:", e);
      alert("There was an error adding liquidity.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    setLoading(true);
    try {
      // Remover liquidez
      await removeLiquidity({
        functionName: "removeLiquidity",
        args: [
          BigInt(parseEther(removeAmountTokenA)), // Amount of Token A to remove
          BigInt(parseEther(removeAmountTokenB)), // Amount of Token B to remove
        ],
      });

      alert("Liquidity removed successfully!");
    } catch (e) {
      console.error("Error removing liquidity:", e);
      alert("There was an error removing liquidity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col text-center mt-8 p-10">
      <div className="flex gap-8">
        {/* Add Liquidity Card */}
        <div className="card bg-base-100 w-96 shadow-xl h-auto overflow-y-auto">
          <div className="card-body">
            <h2 className="card-title">Add Liquidity to the Pool</h2>

            {/* Amount of Token A */}
            <label className="text-left">Amount of Token A</label>
            <input
              type="number"
              value={amountTokenA}
              onChange={(e) => setAmountTokenA(e.target.value)}
              placeholder="Amount in Token A"
            />

            {/* Amount of Token B */}
            <label className="text-left mt-4">Amount of Token B</label>
            <input
              type="number"
              value={amountTokenB}
              onChange={(e) => setAmountTokenB(e.target.value)}
              placeholder="Amount in Token B"
            />

            {/* Balances */}
            <div className="mt-4">
              <div>
                <label className="block text-left">Token A Balance:</label>
                <input
                  type="text"
                  value={balanceTokenA ? formatUnits(BigInt(balanceTokenA), 18) : "Loading..."}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="mt-2">
                <label className="block text-left">Token B Balance:</label>
                <input
                  type="text"
                  value={balanceTokenB ? formatUnits(BigInt(balanceTokenB), 18) : "Loading..."}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Add Liquidity Button */}
            <button
              className={`btn ${loading ? "btn-disabled" : "btn-primary"} w-full mt-4`}
              onClick={handleAddLiquidity}
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Liquidity"}
            </button>
          </div>
        </div>

        {/* Remove Liquidity Card */}
        <div className="card bg-base-100 w-96 shadow-xl h-auto overflow-y-auto">
          <div className="card-body">
            <h2 className="card-title">Remove Liquidity from the Pool</h2>

            {/* Amount of Token A */}
            <label className="text-left">Amount of Token A</label>
            <input
              type="number"
              value={removeAmountTokenA}
              onChange={(e) => setRemoveAmountTokenA(e.target.value)}
              placeholder="Amount in Token A"
            />

            {/* Amount of Token B */}
            <label className="text-left mt-4">Amount of Token B</label>
            <input
              type="number"
              value={removeAmountTokenB}
              onChange={(e) => setRemoveAmountTokenB(e.target.value)}
              placeholder="Amount in Token B"
            />

            {/* Pool Balances */}
            <div className="mt-4">
              <div>
                <label className="block text-left">Token A in Pool:</label>
                <input
                  type="text"
                  value={poolBalanceTokenA ? formatUnits(BigInt(poolBalanceTokenA), 18) : "Loading..."}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div className="mt-2">
                <label className="block text-left">Token B in Pool:</label>
                <input
                  type="text"
                  value={poolBalanceTokenB ? formatUnits(BigInt(poolBalanceTokenB), 18) : "Loading..."}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Remove Liquidity Button */}
            <button
              className={`btn ${loading ? "btn-disabled" : "btn-primary"} w-full mt-4`}
              onClick={handleRemoveLiquidity}
              disabled={loading}
            >
              {loading ? "Processing..." : "Remove Liquidity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
