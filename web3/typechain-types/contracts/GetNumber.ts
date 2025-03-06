/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface GetNumberInterface extends Interface {
  getFunction(
    nameOrSignature: "getSquare" | "num" | "setNumber"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "getSquare", values?: undefined): string;
  encodeFunctionData(functionFragment: "num", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setNumber",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getSquare", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "num", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setNumber", data: BytesLike): Result;
}

export interface GetNumber extends BaseContract {
  connect(runner?: ContractRunner | null): GetNumber;
  waitForDeployment(): Promise<this>;

  interface: GetNumberInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getSquare: TypedContractMethod<[], [bigint], "view">;

  num: TypedContractMethod<[], [bigint], "view">;

  setNumber: TypedContractMethod<[_num: BigNumberish], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getSquare"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "num"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setNumber"
  ): TypedContractMethod<[_num: BigNumberish], [void], "nonpayable">;

  filters: {};
}
