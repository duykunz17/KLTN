/** Close this when you want to deploy
*   and create environment variables like below on the environment you deployed.
*/
export const API_URL_NODEJS_SERVER = 'http://localhost:3001';
export const ENDPOINT_SOKET = 'localhost:3001';

// old API_ID, run for localhost
export const API_GOOGLE_ID = "26774653711-2443l7jnseg7vfpvhiscad0r3te4ti8a.apps.googleusercontent.com";
export const API_FACEBOOK_ID = "1089146518102635";

/** Social networking links are not allowed,
 *  because the facebook and google apps you created don't belong to this path.
*/
// export const API_URL_NODEJS_SERVER = 'https://kltn-group28.herokuapp.com';
// export const ENDPOINT_SOKET = 'https://kltn-group28.herokuapp.com';


/** Social networking links allowed */
// export const API_URL_NODEJS_SERVER = 'https://tduy.herokuapp.com';
// export const ENDPOINT_SOKET = 'https://tduy.herokuapp.com';

// new API_ID
// export const API_GOOGLE_ID = "26774653711-iaarqnsamsvbemm3tq9hghthrcbqcg6f.apps.googleusercontent.com";
// export const API_FACEBOOK_ID = "713104499490545";

export const PAYPAL_CONFIG = {
    env: 'sandbox',
    client: {
        sandbox: 'ASya3kU6j93AmZ3EBhJZVonnvf4XyezV-LTuTpPdW7-SlxDOvDVkN-V9cHz1FmvYI1qbZwkBBidufbnr',
        production: '-- id --',
    }
}