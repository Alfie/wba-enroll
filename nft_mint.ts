import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = await createNft(umi,{mint,
        name: "Generug",
        uri: "https://arweave.net/NLMb7EF_sGnObjquG-UketDSci-Q49Smyt0RxlriA78",
        sellerFeeBasisPoints: percentAmount(69),
        symbol: "RUG"})
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
     //https://explorer.solana.com/tx/39KMctcf93mt8XuiknzLJBPbq8UjWKxgPQuebhoLSzJvGSz8pWFr2vr5rwE7oxPZG7z8zqSEsuaLVNdHRmuC1YoK?cluster=devnet
    console.log("Mint Address: ", mint.publicKey);
})();