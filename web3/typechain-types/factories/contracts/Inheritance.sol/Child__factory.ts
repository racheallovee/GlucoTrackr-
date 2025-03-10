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
  Child,
  ChildInterface,
} from "../../../contracts/Inheritance.sol/Child";

const _abi = [
  {
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "incrementAndDecrement",
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
  "0x608060405234801561001057600080fd5b506101e3806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632baeceb7146100515780634e70b1dc1461005b578063d09de08a14610079578063ed2b814b14610083575b600080fd5b61005961008d565b005b6100636100a6565b60405161007091906100e6565b60405180910390f35b6100816100ac565b005b61008b6100c5565b005b60008081548092919061009f9061010b565b9190505550565b60005481565b6000808154809291906100be90610135565b9190505550565b6100cd6100ac565b6100d561008d565b565b6100e081610101565b82525050565b60006020820190506100fb60008301846100d7565b92915050565b6000819050919050565b600061011682610101565b9150600082141561012a5761012961017e565b5b600182039050919050565b600061014082610101565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156101735761017261017e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212204e27ad6a9478a52c8fb1f8bfd93f5d87479fbdbf763cd08df4d9f8b548b605b564736f6c63430008070033";

type ChildConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChildConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Child__factory extends ContractFactory {
  constructor(...args: ChildConstructorParams) {
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
      Child & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Child__factory {
    return super.connect(runner) as Child__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChildInterface {
    return new Interface(_abi) as ChildInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Child {
    return new Contract(address, _abi, runner) as unknown as Child;
  }
}
