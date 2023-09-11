let config = {};

const test = Deno.env.get('TEST_ENVIRONMENT')

if (test) {
  //TEST DATABASE
  config.database = Deno.env.get('DATABASE_URL');
} else {
  //REAL DATABASE
  config.database = Deno.env.get('DATABASE_URL');
}

export { config };