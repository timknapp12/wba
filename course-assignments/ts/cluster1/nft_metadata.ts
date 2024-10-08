import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    const generugImage =
      'https://arweave.net/W3gogC1dAqi6YqYYdQFuRGZe2v2S1IMIPztuk91Udlc';

    const image = generugImage;

    const metadata = {
      name: 'WBA_Rug2',
      symbol: 'RUG',
      description: 'Rug NFT',
      image,
      attributes: [{ trait_type: 'Rarity', value: 'Unique' }],
      properties: {
        files: [
          {
            uri: image,
            type: 'image/png',
          },
        ],
        category: 'image',
      },
    };

    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });

    console.log('Your metadata URI: ', metadataUri);
  } catch (error) {
    console.log('Oops.. Something went wrong', error);
  }
})();
