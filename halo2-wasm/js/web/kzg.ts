import { fetchAndConvertToUint8Array } from "../shared/utils";

export const getKzgParams = async (k: number): Promise<Uint8Array> => {
  console.log("KZG: web");
  if (k < 6 || k > 19) {
    throw new Error(`k=${k} is not supported`);
  }
  const srs = await fetchAndConvertToUint8Array(`https://axiom-crypto.s3.amazonaws.com/challenge_0085/kzg_bn254_${k}.srs`)
  console.log("KZG: web", srs);
  return srs;
};