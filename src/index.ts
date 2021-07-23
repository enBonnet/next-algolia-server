import algoliasearch, {
  SearchIndex,
  AlgoliaSearchOptions,
} from "algoliasearch";
import { SaveObjectsOptions } from "@algolia/client-search";

interface AlgoliaServerConfig {
  algoliaId: string;
  algoliaKey: string;
  options?: AlgoliaSearchOptions;
}
export default class AlgoliaServer {
  protected static instance: AlgoliaServer | null = null;
  private algoliaId: string = "";
  private algoliaKey: string = "";
  private options?: AlgoliaSearchOptions | undefined = undefined;
  private clientIndex?: SearchIndex = undefined;

  constructor(config: AlgoliaServerConfig) {
    this.algoliaId = config.algoliaId;
    this.algoliaKey = config.algoliaKey;
    this.options = config.options;
  }

  public static getInstance = (config: AlgoliaServerConfig): AlgoliaServer => {
    if (!AlgoliaServer.instance) {
      AlgoliaServer.instance = new AlgoliaServer(config);
    }

    return AlgoliaServer.instance;
  };

  public setIndex = (indexName: string) => {
    const client = algoliasearch(this.algoliaId, this.algoliaKey, this.options);
    this.clientIndex = client.initIndex(indexName);
    this.clientIndex;
  };

  public setSearchableAttributes = (attributes: Array<string>) => {
    return new Promise((resolve, reject) => {
      if (!this.clientIndex) throw new Error("Client index is not defined");
      this.clientIndex
        .setSettings({
          searchableAttributes: attributes,
        })
        .then((done) => resolve(done))
        .catch((err) => reject(err));
    });
  };

  public uploadRecords = (
    records: Array<any>,
    options?: SaveObjectsOptions
  ) => {
    return new Promise((resolve, reject) => {
      if (!this.clientIndex) throw new Error("Client index is not defined");
      this.clientIndex
        .saveObjects(records, options)
        .then((recordsIds) => resolve(recordsIds))
        .catch((err) => reject(err));
    });
  };

  public deleteRecords = () => {
    return new Promise((resolve, reject) => {
      if (!this.clientIndex) throw new Error("Client index is not defined");
      this.clientIndex
        .clearObjects()
        .then((done) => resolve(done))
        .catch((err) => reject(err));
    });
  };

  public saveRecords = async (
    records: Array<any>,
    options?: SaveObjectsOptions
  ) => {
    try {
      await this.uploadRecords(records, options);
    } catch (err) {
      throw new Error(err);
    }
  };
}
