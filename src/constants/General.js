export const AUTH_DETAILS_LOCAL_STORAGE_KEY = "portal.meta";
export const LOG_IN_TIME_LOCAL_STORAGE_KEY = "portal.init";

export const API_URL = process.env.REACT_APP_API_URL
export const EXPIRY_ALLOWANCE = process.env.REACT_APP_EXPIRY_ALLOWANCE ? parseInt(process.env.REACT_APP_EXPIRY_ALLOWANCE): 300; // 5 minutes
export const EXPIRY_ALLOWANCE_SI_UNIT = process.env.REACT_APP_EXPIRY_ALLOWANCE_SI_UNIT ? process.env.REACT_APP_EXPIRY_ALLOWANCE_SI_UNIT : "minutes" ;

export const IDLE_TIMEOUT = parseInt(!!process.env.REACT_APP_IDLE_TIMEOUT ? process.env.REACT_APP_IDLE_TIMEOUT: "300000"); // 5 minutes
