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
};
class authillo {
	private clientId?: string;
	private defaultRedirectUri?: string;
	private enforceStrictSecurity: boolean = false;
	private enableLogs: boolean = false;
	constructor() {}

	/**
	 * @description The first step to set up and use the Authillo class - We recommend you call this function at the begining of your frontend javascript code excecution (you'll likely call this function in an index.(some-file-extension) file )
	 * @param config Object that acts to initialize the Authillo package with your platform's settings - for a full explanation of this parameter, visit https://authillo.com/docs/config
	 */
	public initialize(config: config) {
		this.clientId = config.clientId;
		this.defaultRedirectUri = config.defaultRedirectUri;
		if (config.enforceStrictSecurity != null)
			this.enforceStrictSecurity = config.enforceStrictSecurity;
		if (config.enableLogs != null) this.enableLogs = config.enableLogs;
	}
	private initializationIsValid() {
		return this.clientId != null && this.defaultRedirectUri != null;
	}
	private _generateCodeChallenge = () => {
		return new Promise<string>((resolve, reject) => {
			// TODO- generate a hashed version
			resolve("codeChallenge");
		});
	};
	private log = (content: any) => {
		if (this.enableLogs) console.log(content);
	};

	/**
	 * Function that initiates the Authillo verification / login flow by redirecting the user to authillo's site
	 * @param infoUserNeedsToVerify - The aspects of the user's identity that they'll be required to verify once they reach Authillo's site
	 * @param codeChallenge - (Required if enforceStrictSecurity is set to true) - for a full explanation of this parameter, visit https://authillo.com/docs/codeChallenge
	 * @param redirectUri - The url that Authillo will redirect the user back to. Must exactly match one of the url's provided in your platform configuration.
	 * @param state - A string that will be included in the query parameters of the user when redirected back. This can be used to store some state relevant to the user between redirects (ex: the page they were on before logging in).
	 * @param maxAge - How long the ID token should be valid for in seconds
	 * @param phoneNumberToAutoFill - A phone number to autofill in the phone number field. This should be used when the user has already provided their phone number to your application and should only be included on the first request. If the user has already entered a phone number or already has an Authillo account, this will be ignored.
	 */
	public async begin(
		infoUserNeedsToVerify: Attribute[],
		codeChallenge?: string,
		redirectUri?: string,
		state?: string,
		maxAge?: number,
		phoneNumberToAutoFill?: string
	) {
		if (!this.initializationIsValid())
			throw `invalid configuration -- [make sure .initialize() is run before calling .begin()]`;
		this.log("generating code_challenge");
		if (codeChallenge == null) {
			if (this.enforceStrictSecurity === true)
				throw "missing codeChallenge parameter, ( codeChallenge parameter must be provided when enforceStrictSecurity is set to true";
			codeChallenge = await this._generateCodeChallenge().catch((reason) => {
				this.log(`failed to generate code challenge for following reason: ${reason}`);
				throw reason;
			});
		}
		this.log("code_challenge generated");
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
		this.log(`redirecting the user to ${redirectTo} to begin authorization flow`);
		window.location.href = redirectTo;
	}

	public parseResultsFromQueryString = () => {
		const queryParams = new URLSearchParams(window.location.search);
		const code = queryParams.get("code");
		const state = queryParams.get("state");
		return { code, state };
	};
}

export const Authillo = new authillo();
