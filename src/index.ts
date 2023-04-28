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
 * @param {boolean} [enableLogs=false] - Flag, which enables output of authillo console logs (defaults to false)
 * @param {()=>Promise<string>} [generateCodeChallenge] - Function that handles generating the code challenge by requesting a code challenge from your backend- (if this function is not provided, we use a default code challenge which is the same across all users, effectively skipping the code verification part of the oidc flow) - for a full explanation of this parameter, visit https://authillo.com/docs/generateCodeChallenge
 */
export type config = {
	clientId: string;
	defaultRedirectUri: string;
	enforceStrictSecurity?: boolean;
	enableLogs?: boolean;
	generateCodeChallenge?: () => Promise<string>;
};
class authillo {
	private clientId?: string;
	private defaultRedirectUri?: string;
	private enforceStrictSecurity: boolean = false;
	private enableLogs: boolean = false;
	private codeVerifier?: string;
	constructor() {}
	public initialize(config: config) {
		this.clientId = config.clientId;
		this.defaultRedirectUri = config.defaultRedirectUri;
		if (config.enforceStrictSecurity != null)
			this.enforceStrictSecurity = config.enforceStrictSecurity;
		if (config.enableLogs != null) this.enableLogs = config.enableLogs;
		if (config.generateCodeChallenge != null)
			this._generateCodeChallenge = config.generateCodeChallenge;
	}
	private initializationIsValid() {
		return this.clientId != null && this.defaultRedirectUri != null;
	}
	private _generateCodeChallenge = () => {
		//
	};
	private log = (content: any) => {
		if (this.enableLogs) console.log(content);
	};

	public begin(
		infoUserNeedsToVerify: Attribute[],
		redirectUri?: string,
		state?: string,
		maxAge?: number,
		phoneNumberToAutoFill?: string
	) {
		if (!this.initializationIsValid())
			throw `invalid configuration -- [make sure .initialize() is run before calling .begin()]`;

		/**
		 * https://authillo.com/authorize?response_type=code&scope=openid name face linkedin&state=someInfoForLater&redirect_uri=&client_id=yhWHSv9PQ40ZZQGFNlrQbB8W1dqxyQVHpzWAiJFjKrk&max_age=&code_challenge=code_verifier_hash123&code_challenge_method=S256
		 */
		this.log("constucting url to redirect user to in order to begin authorization flow");
		const scopesString = infoUserNeedsToVerify.reduce((prev, cur) => {
			return prev + ` ${cur}`;
		}, "");
		const redirectTo = `https://authillo.com/authorize?response_type=code&scope=openid${scopesString}&state=${state}&redirect_uri=${
			redirectUri ?? this.defaultRedirectUri
		}&client_id=${this.clientId}&max_age=${
			maxAge ?? 3600
		}&code_challenge=${codeChallenge}&code_challenge_method=S256${
			phoneNumberToAutoFill != null ? `&autofillPhoneNumber=${phoneNumberToAutoFill}` : ""
		}`;
	}
}

export const Authillo = new authillo();
