# next-algolia-server

## Install

```bash
yarn add algoliasearch next-algolia-server
```

## Usage

Basic configuration

```js
import AlgoliaServer from "next-algolia-server";

// Create your instance with your algoliaId and algoliaKey
// Get yours https://www.algolia.com/
const algolia = AlgoliaServer.getInstance({ algoliaId, algoliaKey });

// Set your index
algolia.setIndex("blog");

// Set your searchableAttributes
// Read more about this https://www.algolia.com/doc/api-reference/api-parameters/searchableAttributes/
algolia.setSearchableAttributes([
  "title,description",
  "content",
  "categories.name",
]);
```

Then you would be able to use this `algolia` instance to handle your records.

```js
// I did it inside my `getStaticProps`
export async function getStaticProps() {
  // ... functions to get my posts...
  const posts = [];
  // Read more about this https://www.algolia.com/doc/api-reference/api-methods/save-objects/
  // Every record most have a unique `objectID` param
  // Or let algolia generate it with algoliaServer.saveRecords(posts, { autoGenerateObjectIDIfNotExist: true })
  // Be careful if you let algolia generate it you could duplicate your records
  algoliaServer.saveRecords(posts);

  return posts;
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
