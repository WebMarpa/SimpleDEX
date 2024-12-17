import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deploySimpleDEX: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const tokenA = await deploy("TokenA", { from: deployer, log: true });
  const tokenB = await deploy("TokenB", { from: deployer, log: true });

  await deploy("SimpleDEX", {
    from: deployer,
    args: [tokenA.address, tokenB.address],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const SimpleDEX = await hre.ethers.getContract<Contract>("SimpleDEX", deployer);
 
};

export default deploySimpleDEX;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deploySimpleDEX.tags = ["SimpleDEX"];
