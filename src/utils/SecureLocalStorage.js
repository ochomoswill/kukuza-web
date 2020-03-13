import {AES, enc} from "crypto-js";

// TODO: SECRET KEY
const SECRET_KEY = `${process.env.REACT_APP_SECRET_KEY}`;

export const hasSecureStorageItem = (key) => {
	// console.log('SECRET_KEY',SECRET_KEY);
	return !!localStorage.getItem(key);
};

export const getSecureStorageItem = (key) => {
	// console.log('SECRET_KEY',SECRET_KEY);
	const encItem = localStorage.getItem(key);
	return AES.decrypt(`${encItem}`, SECRET_KEY).toString(enc.Utf8);
};

export const deleteSecureStorageItem = (key) => {
	// console.log('SECRET_KEY',SECRET_KEY);
	return localStorage.removeItem(key);
};
export const deleteAllSecureStorageItems = () => {
	// console.log('SECRET_KEY',SECRET_KEY);
	return localStorage.clear();
};

export const setSecureStorageItem = (key, value) => {
	// console.log('SECRET_KEY',SECRET_KEY);
	const item = AES.encrypt(value, SECRET_KEY).toString();
	localStorage.setItem(key, item);
};
