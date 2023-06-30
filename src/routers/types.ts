import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/mint"?: {};
  "/home"?: {};
  "/marketplace"?: {};
  "/staking"?: {};
  "/profile/:account"?: {};
  "/nft-detailt/:collection/:id"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  component: ComponentType<Object>;
}
