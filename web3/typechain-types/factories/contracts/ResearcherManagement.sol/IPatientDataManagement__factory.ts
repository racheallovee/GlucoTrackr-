/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IPatientDataManagement,
  IPatientDataManagementInterface,
} from "../../../contracts/ResearcherManagement.sol/IPatientDataManagement";

const _abi = [
  {
    inputs: [],
    name: "getAnonymizedPatientData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_researcher",
        type: "address",
      },
    ],
    name: "grantResearcherAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_researcher",
        type: "address",
      },
    ],
    name: "revokeResearcherAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IPatientDataManagement__factory {
  static readonly abi = _abi;
  static createInterface(): IPatientDataManagementInterface {
    return new Interface(_abi) as IPatientDataManagementInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IPatientDataManagement {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IPatientDataManagement;
  }
}
