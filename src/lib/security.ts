export const TRUSTED_DEVICE_COOKIE_NAME = 'wise_wealth_device_trusted';
export const TRUSTED_DEVICE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Helper to check if the cookie exists (client-side)
export function isTrustedDevice(cookies: Partial<{ [key: string]: string }>) {
    return !!cookies[TRUSTED_DEVICE_COOKIE_NAME];
}
