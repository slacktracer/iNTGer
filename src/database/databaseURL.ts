const hostname = process.env.DB_HOSTNAME;
const databaseName = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const protocol = process.env.DB_PROTOCOL;
const user = process.env.DB_USER;

const url = new URL(
  `${protocol}//${user}:${password}@${hostname}/${databaseName}`,
);

url.searchParams.append("retryWrites", "true");
url.searchParams.append("w", "majority");

console.log(url.toString());

export { url };
