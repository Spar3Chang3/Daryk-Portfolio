import { writable } from 'svelte/store';

export const MOBILE_MATCH_MEDIA = '(max-width: 768px)';
export const REDUCED_MOTION_MEDIA = '(prefers-reduced-motion: reduce)';
export const DARK_THEME_MEDIA = '(prefers-color-scheme: dark)';
export const CONTRAST_MODE_MEDIA = '(prefers-contrast: more)';

export const WORLD_TIME_API = 'http://worldtimeapi.org/api/ip';

export const MediaIsMobile = writable(false);
export const PrefersReducedMotion = writable(false);
export const PrefersDarkTheme = writable(false);
export const PrefersContrast = writable(false);

export const SiteLinks = {
    home: '/home',
    about: '/about',
    projects: '/projects',
    contact: '/contact',
    resume: '/resume',
}

export const DataLinks = {
    portraitMap: '/portrait-jmap.json',
    portraitInit: '/init-portrait-jmap.png',
    aboutMe: '/about-me.txt'
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
    motionQuery = window.matchMedia(REDUCED_MOTION_MEDIA);
    PrefersReducedMotion.set(motionQuery.matches);

    motionListener = (e) => {
        PrefersReducedMotion.set(motionQuery.matches);
    }

    motionQuery.addEventListener('change', motionListener);
}

export function stopReducedMotionListener() {
    if (motionQuery && motionListener) {
        motionQuery.removeEventListener('change', motionListener);
        motionQuery = null;
        motionListener = null;
    }
}

export function startDarkThemeListener() {
    themeQuery = window.matchMedia(DARK_THEME_MEDIA);
    PrefersDarkTheme.set(themeQuery.matches);

    themeListener = (e) => {
        PrefersDarkTheme.set(themeQuery.matches);
    }

    themeQuery.addEventListener('change', themeListener);
}

export function stopDarkThemeListener() {
    if (themeQuery && themeListener) {
        themeListener.removeEventListener('change', themeListener);
        themeQuery = null;
        themeListener = null;
    }
}

export function startContrastListener() {
    contrastQuery = window.matchMedia(CONTRAST_MODE_MEDIA);
    PrefersContrast.set(contrastQuery.matches);

    contrastListener = (e) => {
        PrefersContrast.set(contrastQuery.matches);
    }

    contrastQuery.addEventListener('change', contrastListener);
}

export function stopContrastListener() {
    if (contrastQuery && contrastListener) {
        contrastListener.removeEventListener('change', contrastListener);
        contrastQuery = null;
        contrastListener = null;
    }
}

export function startAllListeners() {
    startMediaMobileListener();
    startReducedMotionListener();
    startDarkThemeListener();
    startContrastListener();
}

export function stopAllListeners() {
    stopMediaMobileListener();
    stopReducedMotionListener();
    stopDarkThemeListener();
    stopContrastListener();
}