/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  Parent,
  ParentInterface,
} from "../../../contracts/Inheritance.sol/Parent";

const _abi = [
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "num",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610163806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634e70b1dc1461003b578063d09de08a14610059575b600080fd5b610043610063565b604051610050919061009b565b60405180910390f35b610061610069565b005b60005481565b60008081548092919061007b906100e5565b9190505550565b6000819050919050565b61009581610082565b82525050565b60006020820190506100b0600083018461008c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006100f082610082565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610122576101216100b6565b5b60018201905091905056fea2646970667358221220efdcd40cec5770fa07f6fa959ba1758d46e02f125f7a7c3b9f1b6790cde4240664736f6c63430008170033";

type ParentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ParentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Parent__factory extends ContractFactory {
  constructor(...args: ParentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Parent & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Parent__factory {
    return super.connect(runner) as Parent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ParentInterface {
    return new Interface(_abi) as ParentInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Parent {
    return new Contract(address, _abi, runner) as unknown as Parent;
  }
}
