import postgraphile from "postgraphile";

const { DATABASE, USER, PASSWORD, HOST, PORT } = process.env;

const tmp_CLIENT = "pg"
const tmp_USER = "postgres"
const tmp_PASSWORD = "mpmpiv100"
const tmp_HOST = "localhost"
const tmp_PORT = 5432
const tmp_DATABASE = "shop_me_online"

const config = postgraphile(
    {
        database: tmp_DATABASE,
        user: tmp_USER,
        password: tmp_PASSWORD,
        host: tmp_HOST,
        port: tmp_PORT,
    },
    'public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
);

export default config;