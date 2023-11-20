/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./auth.js").Auth;
	type DatabaseUserAttributes = {
		username?: string;
    email?: string;
    verified?: boolean
	};
	type DatabaseSessionAttributes = {};
}

// TODO: Add more complex type logic DatabaseUserAttributes?
