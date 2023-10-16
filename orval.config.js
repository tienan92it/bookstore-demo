module.exports = {
  'bookstore-file': {
    input: 'https://develop-api.bookstore.dwarvesf.com/swagger/doc.json',
    output: {
      mode: 'tags-split',
      target: 'app/_api/bookstore.ts',
      schemas: 'app/_api/model',
      client: 'swr',
      mock: true,
      override: {
        mutator: {
          path: 'app/_api/mutator/fetcher.ts',
          name: 'fetcher'
        }
      }
    },
    hooks: {
      afterAllFilesWrite: 'eslint ./app/_api --ext .ts,.tsx,.js --fix' // run lint fix after all files are written
    }
  }
};
