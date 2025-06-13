import { writable } from 'svelte/store';
import { GetCurrentPagePath, GetWorldTime, DetectTimezone, DetectPlatform } from '$lib/index.js';

const StatsLink = 'https://dbaker.analytics.edsmcserv.com/add-stat';
// TODO: make sure backend rejects requests from not my domain :)

const StatsData = writable({});
const StatsInitialized = writable(false);

export async function initStats() {
    let timeStats;

    try {
        timeStats = await GetWorldTime();
    } catch (error) {
        console.error('Failed to fetch world time:', error);
        timeStats = {
            unixtime: Date.now(),
            timezone: DetectTimezone()
        };
    }

    const userAgent = navigator.userAgent;
    const platform = DetectPlatform();
    const screen = { height: window.innerHeight, width: window.innerWidth };

    StatsData.set({
        visitTime: timeStats.unixtime,
        leaveTime: -1,
        timezone: timeStats.timezone,
        userAgent,
        platform,
        screen,
        pagesVisited: [
            GetCurrentPagePath()
        ]
    });

    StatsInitialized.set(true);
}