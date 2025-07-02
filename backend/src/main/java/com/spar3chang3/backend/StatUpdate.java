package com.spar3chang3.backend;

import java.util.List;

public class StatUpdate {
    public String id;

    public Long leaveTime = -1L;

    public List<String> pagesVisited;

    // Jackson when there's a no-arg constructor: YES THANK YOU DADDY
    public StatUpdate() {}

    public StatUpdate(String id, List<String> pagesVisited) {
        this.id = id;
        this.pagesVisited = pagesVisited;
        this.leaveTime = -1L;
    }

    public StatUpdate(String id, Long leaveTime) {
        this.id = id;
        this.leaveTime = leaveTime;
        this.pagesVisited = null;
    }

    public StatUpdate(String id, Long leaveTime, List<String> pagesVisited) {
        this.id = id;
        this.leaveTime = leaveTime;
        this.pagesVisited = pagesVisited;
    }

    @Override
    public String toString() {
        return "{" +
                String.format("id: %s, ", id) +
                String.format("leaveTime: %d, ", leaveTime) +
                String.format("pagesVisited: %s ", pagesVisited.toString()) +
                "}";
    }
}
