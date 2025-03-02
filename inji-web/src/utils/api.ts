import {
    ApiRequest,
    CodeChallengeObject,
    CredentialConfigurationObject,
    IssuerObject, IssuerWellknownObject
} from "../types/data";
import i18n from "i18next";

export enum MethodType {
    GET,
    POST
}

export class api {

    static mimotoHost = window._env_.MIMOTO_HOST;

    static authorizationRedirectionUrl = window.location.origin + "/redirect";


    static fetchIssuers: ApiRequest = {
        url: () => (api.mimotoHost + "/issuers"),
        methodType: MethodType.GET,
        headers: () => {
            return {
                "Content-Type": "application/json"
            }
        }
    }
    static fetchSpecificIssuer: ApiRequest = {
        url: (issuerId: string) => api.mimotoHost + `/issuers/${issuerId}`,
        methodType: MethodType.GET,
        headers: () => {
            return {
                "Content-Type": "application/json"
            }
        }
    }
    static fetchIssuersWellknown: ApiRequest = {
        url: (issuerId: string) => api.mimotoHost + `/issuers/${issuerId}/well-known-proxy`,
        methodType: MethodType.GET,
        headers: () => {
            return {
                "Content-Type": "application/json"
            }
        }
    }
    static fetchTokenAnddownloadVc: ApiRequest = {
        url: () => api.mimotoHost + `/credentials/download`,
        methodType: MethodType.POST,
        headers: () => {
            return {
                'accept': 'application/pdf',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        }
    }
    // static authorization = (currentIssuer: IssuerObject, credentialWellknown: IssuerWellknownObject, filterCredentialWellknown: CredentialConfigurationObject, state: string, code_challenge: CodeChallengeObject) => {
    //     return `${credentialWellknown.authorization_servers[0]}/auth` +
    //         `?response_type=code&` +
    //         `client_id=${currentIssuer.client_id}&` +
    //         `scope=${filterCredentialWellknown.scope}&` +
    //         `redirect_uri=${api.authorizationRedirectionUrl}&` +
    //         `state=${state}&` +
    //         `code_challenge=${code_challenge.codeChallenge}&` +
    //         `code_challenge_method=S256&`+
    //         `ui_locales=${i18n.language}`;
    // }

    static authorization = (
        currentIssuer:IssuerObject,
        credentialWellknown:IssuerWellknownObject,
        filterCredentialWellknown:CredentialConfigurationObject,
        state:string,
        nonce:string,
        code_challenge:CodeChallengeObject
    ) => {
        return `${credentialWellknown.authorization_servers[0]}/auth` + // Ensure this equals "https://stg-id.singpass.gov.sg/auth"
            `?response_type=code&` +
            `client_id=${currentIssuer.client_id}&` +
            `scope=openid uinfin name race dob&` + // e.g., "openid uinfin name race dob" ${filterCredentialWellknown.scope}
            `redirect_uri=${api.authorizationRedirectionUrl}&` +
            `state=${state}&` +
            `code_challenge=${code_challenge.codeChallenge}&` +
            `code_challenge_method=S256&` +
            `nonce=${nonce}`;
    };

    // static authorization = (currentIssuer: IssuerObject,  state: string, code_challenge: CodeChallengeObject) => {
    //    console.log(currentIssuer,state, code_challenge);
    //    return "null";
    // }

    // static authorization: ApiRequest = {
    //     url: (clientId: string) => `${api.mimotoHost}/authorize`,
    //     methodType: MethodType.POST,
    //     headers: () => ({
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     })
    // };
    
}


