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
    aboutMe: '/about-me.txt',
    blogMetaPath: '/blog/meta/',
    blogArticlePath: '/blog/articles/'
}

export const ExternalLinks = {
    orionLab: 'https://uisorionlabs.web.app/',
    acidFog: 'https://acidfog.com'
}

export const StdPlatforms = {
    android: 'android',
    ios: 'iOS',
    windowsPhone: 'Windows Phone',
    otherMobile: 'Other Mobile',
    desktop: 'Desktop',
}

export const StdSvgs = {
    star: `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 91 91" height="24px" id="Layer_1" version="1.1" viewBox="0 0 91 91" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M90.561,36.425c-0.332-1.037-1.295-1.742-2.385-1.742H58.514L48.281,3.525   C47.941,2.496,46.982,1.8,45.9,1.8s-2.043,0.697-2.381,1.725L33.287,34.683H3.625c-1.09,0-2.055,0.705-2.387,1.742   c-0.33,1.039,0.047,2.172,0.934,2.805l24.004,17.086l-9.662,29.41c-0.338,1.027,0.023,2.156,0.895,2.799   c0.871,0.641,2.057,0.648,2.938,0.023L45.9,70.356l25.551,18.191c0.436,0.309,0.943,0.465,1.453,0.465   c0.521,0,1.043-0.164,1.484-0.488c0.871-0.643,1.232-1.771,0.896-2.799l-9.66-29.41l24.004-17.086   C90.516,38.597,90.893,37.464,90.561,36.425z" fill="#c7af8a"/></g></svg>`,
    warning: `<?xml version="1.0" ?><svg data-name="Layer 3" id="Layer_3" viewBox="0 0 2050 2050" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#F59E0B;}.cls-2{fill:#fff;}</style></defs><title/><path class="cls-1" d="M1423.4,1502.6H626.6a192.7,192.7,0,0,1-163.9-294.9L861.1,566.6h0a192.9,192.9,0,0,1,327.8,0l398.4,641.1a191.9,191.9,0,0,1,29.3,100.4,192.6,192.6,0,0,1-193.2,194.5Z"/><path class="cls-2" d="M1025,1137.5a45,45,0,0,1-45-45V809.9a45,45,0,0,1,90,0v282.6A45,45,0,0,1,1025,1137.5Z"/><path class="cls-2" d="M1025,1285.1a45,45,0,0,1-45-45v-27.5a45,45,0,0,1,90,0v27.5A45,45,0,0,1,1025,1285.1Z"/></svg>`
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