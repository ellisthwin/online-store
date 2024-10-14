import { readFileSync } from "fs"; //imports the readFileSync function from Node.js’s built-in fs (file system) module
import { getEnvironment, Env } from "./environment";
import { merge } from "./merge"; 
import { config as dotenvconfig } from "dotenv";

const file = process.env.SERVER_CONFIG ?? "server.config.json"  //f no environment variable is provided, the application will look for a default configuration file called "server.config.json". otherwise This variable points to a configuration file
const data = JSON.parse(readFileSync(file).toString());
dotenvconfig({
    path: getEnvironment().toString() + ".env"
})


try{
    const envFile = getEnvironment().toString() + "." + file;
    const envData = JSON.parse(readFileSync(envFile).toString());
    merge(data, envData);
} catch {
    // do nothing yet
}

export const getConfig = (path: string, defaultVal : any = undefined) : any => {
    const paths = path.split(":");
    let val = data;
    paths.forEach(p => val = val[p]);
    return val ?? defaultVal;
}

export const getSecret = (name: string) => {
    const secret = process.env[name];
    if(secret === undefined) {
        throw new Error(`Undefined secret: ${name}`);
    }
    return secret;
}

export { getEnvironment, Env };