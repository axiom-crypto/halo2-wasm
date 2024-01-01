function fetchAndConvertToUint8Array(url: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    // Check if running in Node.js environment
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      const https = require('https');
      https.get(url, (res: any) => {
        let chunks: any[] = [];
        res.on('data', (chunk: any) => chunks.push(chunk));
        res.on('end', () => {
          let binaryData = Buffer.concat(chunks);
          resolve(new Uint8Array(binaryData));
        });
        res.on('error', reject);
      });
    }
    // Check if running in browser or web worker environment
    else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          resolve(new Uint8Array(buffer));
        })
        .catch(reject);
    } else {
      reject(new Error('Environment not supported'));
    }
  });
}

const convertBase64ToUint8Arr = (b64str: string) => {
  const binstr = atob(b64str);
  const buf = new Uint8Array(binstr.length);
  Array.prototype.forEach.call(binstr, (ch, i) => {
    buf[i] = ch.charCodeAt(0);
  });
  return buf;
}

export const getKzgParams = async (k: number): Promise<Uint8Array> => {
  if (k < 6 || k > 19) {
    throw new Error(`k=${k} is not supported`);
  }
  return fetchAndConvertToUint8Array(`https://axiom-crypto.s3.amazonaws.com/challenge_0085/kzg_bn254_${k}.srs`);
};