import * as config from '../../config';
import * as path from 'path';
import * as fs from 'fs';

interface AssetStore {
  [asset: string]: {[extension: string]: string};
}

/**
 * Implements asset cache busting. Create an assets store that will map webpacked assets.json
 * from nominal bundle file name to the name with the hash appended.
 * After creating the asset store using const assets = createAssetStore(), the assets can be
 * obtained by calling assets('filename.extension') to get the mapped path.
 */
export default function createAssetStore() {
  let assetStore: AssetStore = null;
  if (config.environment === 'production') {
    try {
      assetStore = JSON.parse(fs.readFileSync(path.resolve(config.buildDir, 'assets.json'), 'utf-8'));
    } catch (e) {
      throw new Error("Asset file unreadable");
    }
  }

  return (asset: string): string => {

      if (assetStore === null) {
        // keep the asset string as-is because we are not in production.
        return asset;
      }
      // get from assets map
      const basename = path.basename(asset);
      const ext = path.extname(basename).slice(1);
      const filename = basename.slice(0, -(ext.length + 1));
      if (!assetStore.hasOwnProperty(filename)) {
        // lets the asset fetching fail with 404
        return asset;
      } else {
        return assetStore[filename][ext];
      }
  };
}
