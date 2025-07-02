import { writable } from 'svelte/store';
import { GetCurrentPagePath, GetWorldTime, DetectTimezone, DetectPlatform } from '$lib/index.js';

const StatsLink = 'https://dbaker.analytics.edsmcserv.com/add-stat';
// TODO: make sure backend rejects requests from not my domain :)

const StatsData = writable({});
const StatsId = writable("");
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
    const screen = `${window.innerWidth}x${window.innerHeight}`;

    StatsData.set({
        visitTime: timeStats.unixtime,
        leaveTime: null,
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

export async function sendStats(stats) {
    let res = await fetch(StatsLink, {method: 'POST', body: JSON.stringify(stats)}).then(data => data.json());
    StatsId.set(res.id);
    // TODO: update backend to send the id, status, and message for status, then update this to check the status
}

export async function updateStats(stats) {
    let res = await fetch(StatsLink, {method: 'PUT', body: JSON.stringify({
            id: stats.id,
            leaveTime: stats.leaveTime
        })}).then(data => data.json());

    if (res.status !== 200) {
        console.error('Failed to update stats: ', res.status, res.message);
    }
}

