import { AlgoliaSearchOptions } from "algoliasearch";

export interface AlgoliaServerConfig {
  algoliaId: string;
  algoliaKey: string;
  options?: AlgoliaSearchOptions;
}
