import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from '@metaplex-foundation/umi';
import bs58 from 'bs58';

// Define our Mint address
const mintAddress = publicKey('64kivSq7dzejdRmEZvVGLFVdAow8FvTcCHSKrpx3McBu');

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: mintAddress,
      mintAuthority: signer,
    };
    let data: DataV2Args = {
      name: 'WBA - tim',
      symbol: 'TK12',
      uri: 'https://solana.com',
      sellerFeeBasisPoints: 10,
      creators: null,
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });
    let result = await tx.sendAndConfirm(umi);
    console.log(
      `here is the result for the metadata tx: ${bs58.encode(result.signature)}`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
