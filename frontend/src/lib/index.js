import { writable } from 'svelte/store';

export const MOBILE_MATCH_MEDIA = '(max-width: 768px)';
export const REDUCED_MOTION_MEDIA = '(prefers-reduced-motion: reduce)';
export const DARK_MODE_MEDIA = '(prefers-color-scheme: dark)';
export const CONTRAST_MODE_MEDIA = '(prefers-contrast: more)';

export const WORLD_TIME_API = 'http://worldtimeapi.org/api/ip';

export const MediaIsMobile = writable(false);
export const PrefersReducedMotion = writable(false);
export const PrefersDarkMode = writable(false);
export const PrefersContrast = writable(false);

export const SiteLinks = {
    home: '/home',
    about: '/about',
    projects: '/projects',
    contact: '/contact',
    resume: '/resume',
}

export const StdPlatforms = {
    android: 'android',
    ios: 'iOS',
    windowsPhone: 'Windows Phone',
    otherMobile: 'Other Mobile',
    desktop: 'Desktop',
}

let mediaMobileQuery, motionQuery, themeQuery, contrastQuery;
let mediaMobileListener, motionListener, themeListener, contrastListener

// Get current page user is on
export function GetCurrentPagePath() {
    return window.location.pathname + window.location.search + window.location.hash;
}


// Time/location grabbing from worldtimeapi
export function GetWorldTime() {
    return new Promise((resolve, reject) => {
        fetch(WORLD_TIME_API)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

// Low-accuracy location grab for privacy
export function DetectTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// User agent based platform detection
export function DetectPlatform() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection (Safari-based, includes iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) { // <- apparently to make sure you're not matching edge lol
        return StdPlatforms.ios;
    }

    // Android-based detection
    if (/android/i.test(ua)) {
        return StdPlatforms.android;
    }

    // Windows Phone (dead, but for completeness)
    if (/windows phone/i.test(ua)) {
        return StdPlatforms.windowsPhone;
    }

    // Fallbacks
    if (/mobile/i.test(ua)) return StdPlatforms.otherMobile;

    return StdPlatforms.desktop;
}

// Media query based IsMobile
export function startMediaMobileListener() {
    mediaMobileQuery = window.matchMedia(MOBILE_MATCH_MEDIA);
    MediaIsMobile.set(mediaMobileQuery.matches);

    mediaMobileListener = (e) => {
        MediaIsMobile.set(e.matches);
    };

    mediaMobileQuery.addEventListener('change', mediaMobileListener);
}

export function stopMediaMobileListener() {
    if (mediaMobileQuery && mediaMobileListener) {
        mediaMobileQuery.removeEventListener('change', mediaMobileListener);
        mediaMobileQuery = null;
        mediaMobileListener = null;
    }
}

export function startReducedMotionListener() {
    motionQuery = window.matchMedia(MOBILE_MATCH_MEDIA);
    PrefersReducedMotion.set(motionQuery.matches);

    motionListener = (e) => {
        PrefersReducedMotion.set(motionQuery.matches);
    }

    motionQuery.addEventListener('change', mediaMobileListener);
}

export function stopReducedMotionListener() {
    if (motionQuery && motionListener) {
        motionQuery.removeEventListener('change', mediaMobileListener);
        motionQuery = null;
        motionListener = null;
    }
}