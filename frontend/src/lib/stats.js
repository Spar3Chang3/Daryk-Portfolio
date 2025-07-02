import { writable } from 'svelte/store';
import { GetCurrentPagePath, GetWorldTime, DetectTimezone, DetectPlatform } from '$lib/index.js';

const StatsLink = 'http://localhost:7000/api/';
// TODO: make sure backend rejects requests from not my domain :)

export const StatsData = writable({});
export const StatsId = writable("");
export const StatsInitialized = writable(false);

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

    const stats = {
        visitTime: timeStats.unixtime,
        leaveTime: timeStats.unixtime,
        timezone: timeStats.timezone,
        userAgent,
        platform,
        screen,
        pagesVisited: [
            GetCurrentPagePath()
        ]
    }

    StatsData.set(stats);
    await sendStats(stats).then(() => {
        StatsInitialized.set(true);
    });
}

export async function sendStats(stats) {
    let res = await fetch(StatsLink + "addStats", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stats)
    }).then(data => data.json());
    if (res.status != 201 || res.status != 200) {
        console.error('Failed to send stats:', res.status, res.message);
    } else {
        StatsId.set(res.content);
    }
    console.log(res);
}

export async function updateStats(stats) {
    let res = await fetch(StatsLink + "updateStats", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: stats.id,
            leaveTime: stats.leaveTime,
            pagesVisited: stats.pagesVisited
        })
    }).then(data => data.json());
    if (res.status !== 200) {
        console.error('Failed to update stats:', res.status, res.message);
    }
}

