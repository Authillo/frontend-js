export type config = {
	clientId: string;
	clientSecret: string;
};
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
type result = {
	user?: {
		sub: string;
		name?: string;
		age?: number;
		birthdate?: string;
		phoneNumber?: string;
		sex?: "MALE" | "FEMALE";
		email?: string;
		riskScore?: number; //deprecated
		phoneNumberData?: {
			type?: string;
		};
		faceInfo?: {
			faceVerified: boolean;
			faceVerificationMR: boolean;
			riskScore: number;
		};
		idPhotoInfo?: {
			hasLicense: boolean;
			parsedLicenseData?: {
				licenseNumber: string;
				firstName: string;
				lastName: string;
				idType: string;
				expirationDate: string;
				birthdate: string;
				state: string;
				zipCode: string;
				manuallyReviewed: Boolean;
			};
			licenseImageFront?: string;
			licenseImageBack?: string;
		};
		licenseInfo?: {
			hasLicense: boolean;
			parsedLicenseData?: {
				licenseNumber: string;
				firstName: string;
				lastName: string;
				idType: string;
				expirationDate: string;
				birthdate: string;
				state: string;
				zipCode: string;
				manuallyReviewed: Boolean;
			};
		};
		linkedinInfo?: {
			linkedinVerified: boolean;
			linkedinData?: {
				linkedinId: string;
				name: string;
				firstName: string;
				lastName: string;
				email: string;
				emailVerified: boolean;
				picture?: string;
				locale?: string;
			};
		};
	};
};

export class authillo {
	private clientId: string;
	private clientSecret: string;
	constructor(config: config) {
		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
	}
	verify: (
		user_phone_number: string,
		attributes: Attribute[]
	) => Promise<{ userStatus: "pending" | "verified" }> = async (
		user_phone_number: string,
		attributes: Attribute[]
	) => {
		return { userStatus: "pending" };
	};

	getVerifiedInfo: (user_phone_number: string, attributes: Attribute[]) => Promise<result> = async (
		user_phone_number: string,
		attributes: Attribute[]
	) => {
		return {
			user: {
				sub: "asdflkivnwi29040nsfl1i38fncsk10234uls10csdnf0s810cn",
				email: "james@authillo.com",
				faceInfo: {
					faceVerified: true,
					riskScore: 0,
					faceVerificationMR: true,
				},
			},
		};
	};
}
