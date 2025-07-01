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

}
