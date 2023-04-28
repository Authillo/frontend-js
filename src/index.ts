// export type config = {
// 	clientId: string;
// 	clientSecret: string;
// };
export type Attribute =
	| "name"
	| "age"
	| "face"
	| "selfie"
	| "idphoto"
	| "email"
	| "phone"
	| "license"
	| "sex"
	| "birthdate"
	| "linkedin"
	| "google"
	| "instagram";
/**
 * @param {string} clientId - Unique identifier of your app - for a full explanation of this parameter, visit https://authillo.com/docs/clientId
 * @param {string} defaultRedirectUri - The default url that the user will be redirected back to (on your site/app) after completing the authorization flow. Must exactly match one of the url's provided in your platform configuration. - for a full explanation of this parameter, visit https://authillo.com/docs/defaultRedirectUri
 * @param {boolean} [enforceStrictSecurity=false] - Flag, which if set, will require the code_verifier flow - for a full explanation of this parameter, visit https://authillo.com/docs/enforceStrictSecurity
 * @param {()=>Promise<string>} [generateCodeChallenge] - Function that handles generating the code challenge by requesting a code challenge from your backend- (if this function is not provided, we use a default code challenge which is the same across all users, effectively skipping the code verification part of the oidc flow) - for a full explanation of this parameter, visit https://authillo.com/docs/generateCodeChallenge
 */
export type config = {
	clientId: string;
	defaultRedirectUri: string;
	enforceStrictSecurity?: boolean;
	generateCodeChallenge?: () => Promise<string>;
};
class authillo {
	private clientId?: string;
	private defaultRedirectUri?: string;
	private enforceStrictSecurity: boolean = false;
	private codeVerifier?: string;
	constructor() {}
	public initialize(config: config) {
		this.clientId = config.clientId;
		this.defaultRedirectUri = config.defaultRedirectUri;
		if (config.enforceStrictSecurity != null)
			this.enforceStrictSecurity = config.enforceStrictSecurity;
		if (config.generateCodeChallenge != null)
			this._generateCodeChallenge = config.generateCodeChallenge;
	}
	private initializationIsValid() {
		return this.clientId != null && this.defaultRedirectUri != null;
	}
	private _generateCodeChallenge = () => {
		//
	};

	public begin(
		infoUserNeedsToVerify: Attribute[],
		redirectUri?: string,
		state?: string,
		maxAge?: number,
		phoneNumberToAutoFill?: string
	) {
		//
	}
}

export const Authillo = new authillo();
