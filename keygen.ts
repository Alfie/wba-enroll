import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Keypair } from "@solana/web3.js";

//Generate a new keypair
let kp = Keypair.generate()

console.log('You\'ve generated a new Solana wallet:\n' + kp.publicKey.toBase58())
