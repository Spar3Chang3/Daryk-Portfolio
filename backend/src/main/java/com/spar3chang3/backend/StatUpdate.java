package com.spar3chang3.backend;

import java.util.List;

public class StatUpdate {
    public String id;

    public Long leaveTime;

    public List<String> pagesVisited;

    // Jackson when there's a no-arg constructor: YES THANK YOU DADDY
    public StatUpdate() {}

    public StatUpdate(String id, List<String> pagesVisited) {
        this.id = id;
        this.pagesVisited = pagesVisited;
    }

    public StatUpdate(String id, Long visitTime) {
        this.id = id;
        this.leaveTime = visitTime;
    }

    public StatUpdate(String id, Long leaveTime, List<String> pagesVisited) {
        this.id = id;
        this.leaveTime = leaveTime;
        this.pagesVisited = pagesVisited;
    }
}
