
import * as ethUtil from "ethereumjs-util";

export function hashPersonalMessage(msg: string): string {
    const buffer = Buffer.from(msg);
    const result = ethUtil.hashPersonalMessage(buffer);
    const hash = ethUtil.bufferToHex(result);
    return hash;
  }
  
  export function recoverPublicKey(sig: string, hash: string): string {
    const sigParams = ethUtil.fromRpcSig(sig);
    const hashBuffer = Buffer.from(hash.replace("0x", ""), "hex");
    const result = ethUtil.ecrecover(
      hashBuffer,
      sigParams.v,
      sigParams.r,
      sigParams.s
    );
    const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));
    return signer;
  }
  
  export function recoverPersonalSignature(sig: string, msg: string): string {
    const hash = hashPersonalMessage(msg);
    const signer = recoverPublicKey(sig, hash);
    return signer;
  }
  