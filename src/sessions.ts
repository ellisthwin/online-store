import { Express } from "express";
import { Sequelize } from "sequelize";
import { getConfig, getSecret } from "./config";
import session from "express-session";
import sessionStore from "connect-session-sequelize";

const config = getConfig("session");
const secret = getSecret("COOKIE_SECRET");
const logging = config.orm.logging?{logging: console.log, logQueryParameters: true}:  { logging: false };

export const createSessions = (app: Express) => { 


    const sequelize = new Sequelize({   //Creates a Sequelize instance for connecting to the session database
        ...config.orm.settings, ...logging
    });

    const store = new (sessionStore(session.Store)) ({  
        db: sequelize
    });

    if (config.reset_db === true) {               //Handles database synchronization to ensure the session store tables are set up correctly.
        sequelize.drop().then(() => store.sync());
    } else {
        store.sync();
    }

    app.use(session({  //Configures and applies session management middleware to the Express app.
        secret, 
        store, 
        resave: true, 
        saveUninitialized:false, 
        cookie:  // Sets the maximum age of the session cookie in milliseconds
        {maxAge: config.maxAgeHrs * 60 * 60 * 1000,  //Converts maxAgeHrs (hours) to milliseconds
            sameSite: "strict" } //Uses the "strict" policy for the SameSite attribute, ensuring the cookie is only sent in requests originating from the same site
    }));
}