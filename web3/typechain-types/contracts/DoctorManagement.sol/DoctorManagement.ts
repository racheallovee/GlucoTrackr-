/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface DoctorManagementInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "admin"
      | "doctors"
      | "patientDataContract"
      | "registerDoctor"
      | "registeredDoctors"
      | "requestAccessToPatient"
      | "revokeAccessFromPatient"
      | "verifyDoctor"
      | "viewPatientRecord"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AccessRequested"
      | "AccessRevoked"
      | "DoctorRegistered"
      | "DoctorVerified"
  ): EventFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "doctors",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "patientDataContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerDoctor",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredDoctors",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestAccessToPatient",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeAccessFromPatient",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyDoctor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "viewPatientRecord",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "doctors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "patientDataContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerDoctor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredDoctors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestAccessToPatient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeAccessFromPatient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyDoctor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "viewPatientRecord",
    data: BytesLike
  ): Result;
}

export namespace AccessRequestedEvent {
  export type InputTuple = [doctor: AddressLike, patient: AddressLike];
  export type OutputTuple = [doctor: string, patient: string];
  export interface OutputObject {
    doctor: string;
    patient: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AccessRevokedEvent {
  export type InputTuple = [doctor: AddressLike, patient: AddressLike];
  export type OutputTuple = [doctor: string, patient: string];
  export interface OutputObject {
    doctor: string;
    patient: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DoctorRegisteredEvent {
  export type InputTuple = [
    doctor: AddressLike,
    name: string,
    specialization: string
  ];
  export type OutputTuple = [
    doctor: string,
    name: string,
    specialization: string
  ];
  export interface OutputObject {
    doctor: string;
    name: string;
    specialization: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DoctorVerifiedEvent {
  export type InputTuple = [doctor: AddressLike];
  export type OutputTuple = [doctor: string];
  export interface OutputObject {
    doctor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface DoctorManagement extends BaseContract {
  connect(runner?: ContractRunner | null): DoctorManagement;
  waitForDeployment(): Promise<this>;

  interface: DoctorManagementInterface;

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

  admin: TypedContractMethod<[], [string], "view">;

  doctors: TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, string, boolean] & {
        name: string;
        specialization: string;
        isVerified: boolean;
      }
    ],
    "view"
  >;

  patientDataContract: TypedContractMethod<[], [string], "view">;

  registerDoctor: TypedContractMethod<
    [_name: string, _specialization: string],
    [void],
    "nonpayable"
  >;

  registeredDoctors: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  requestAccessToPatient: TypedContractMethod<
    [_patient: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeAccessFromPatient: TypedContractMethod<
    [_patient: AddressLike],
    [void],
    "nonpayable"
  >;

  verifyDoctor: TypedContractMethod<
    [_doctor: AddressLike],
    [void],
    "nonpayable"
  >;

  viewPatientRecord: TypedContractMethod<
    [_patient: AddressLike],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "doctors"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, string, boolean] & {
        name: string;
        specialization: string;
        isVerified: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "patientDataContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registerDoctor"
  ): TypedContractMethod<
    [_name: string, _specialization: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "registeredDoctors"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "requestAccessToPatient"
  ): TypedContractMethod<[_patient: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeAccessFromPatient"
  ): TypedContractMethod<[_patient: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifyDoctor"
  ): TypedContractMethod<[_doctor: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "viewPatientRecord"
  ): TypedContractMethod<[_patient: AddressLike], [string], "view">;

  getEvent(
    key: "AccessRequested"
  ): TypedContractEvent<
    AccessRequestedEvent.InputTuple,
    AccessRequestedEvent.OutputTuple,
    AccessRequestedEvent.OutputObject
  >;
  getEvent(
    key: "AccessRevoked"
  ): TypedContractEvent<
    AccessRevokedEvent.InputTuple,
    AccessRevokedEvent.OutputTuple,
    AccessRevokedEvent.OutputObject
  >;
  getEvent(
    key: "DoctorRegistered"
  ): TypedContractEvent<
    DoctorRegisteredEvent.InputTuple,
    DoctorRegisteredEvent.OutputTuple,
    DoctorRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "DoctorVerified"
  ): TypedContractEvent<
    DoctorVerifiedEvent.InputTuple,
    DoctorVerifiedEvent.OutputTuple,
    DoctorVerifiedEvent.OutputObject
  >;

  filters: {
    "AccessRequested(address,address)": TypedContractEvent<
      AccessRequestedEvent.InputTuple,
      AccessRequestedEvent.OutputTuple,
      AccessRequestedEvent.OutputObject
    >;
    AccessRequested: TypedContractEvent<
      AccessRequestedEvent.InputTuple,
      AccessRequestedEvent.OutputTuple,
      AccessRequestedEvent.OutputObject
    >;

    "AccessRevoked(address,address)": TypedContractEvent<
      AccessRevokedEvent.InputTuple,
      AccessRevokedEvent.OutputTuple,
      AccessRevokedEvent.OutputObject
    >;
    AccessRevoked: TypedContractEvent<
      AccessRevokedEvent.InputTuple,
      AccessRevokedEvent.OutputTuple,
      AccessRevokedEvent.OutputObject
    >;

    "DoctorRegistered(address,string,string)": TypedContractEvent<
      DoctorRegisteredEvent.InputTuple,
      DoctorRegisteredEvent.OutputTuple,
      DoctorRegisteredEvent.OutputObject
    >;
    DoctorRegistered: TypedContractEvent<
      DoctorRegisteredEvent.InputTuple,
      DoctorRegisteredEvent.OutputTuple,
      DoctorRegisteredEvent.OutputObject
    >;

    "DoctorVerified(address)": TypedContractEvent<
      DoctorVerifiedEvent.InputTuple,
      DoctorVerifiedEvent.OutputTuple,
      DoctorVerifiedEvent.OutputObject
    >;
    DoctorVerified: TypedContractEvent<
      DoctorVerifiedEvent.InputTuple,
      DoctorVerifiedEvent.OutputTuple,
      DoctorVerifiedEvent.OutputObject
    >;
  };
}
