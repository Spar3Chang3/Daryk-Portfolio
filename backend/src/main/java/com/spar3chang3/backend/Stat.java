package com.spar3chang3.backend;

import java.util.List;

public class Stat {

    public String id;

    public Long visitTime;
    public Long leaveTime;

    public String timezone;
    public String userAgent;
    public String platform;
    public String screen;

    public List<String> pagesVisited;

    // Jackson needs a no-arg constructor
    public Stat() {}

    public Stat(Long visitTime, Long leaveTime, String timezone, String userAgent, String platform, String screen, List<String> pagesVisited) {
        this.id = Utils.CreateId();
        this.visitTime = visitTime;
        this.leaveTime = leaveTime;
        this.timezone = timezone;
        this.userAgent = userAgent;
        this.platform = platform;
        this.screen = screen;
        this.pagesVisited = pagesVisited;
    }

    @Override
    public String toString() {
        return "{" + String.format("id: %s, ", id) +
                String.format("visitTime: %d, ", visitTime) +
                String.format("leaveTime: %d, ", leaveTime) +
                String.format("timezone: %s, ", timezone) +
                String.format("userAgent: %s, ", userAgent) +
                String.format("platform: %s, ", platform) +
                String.format("screen: %s, ", screen) +
                String.format("pagesVisited: %s", pagesVisited.toString()) +
                "}";
    }

}
