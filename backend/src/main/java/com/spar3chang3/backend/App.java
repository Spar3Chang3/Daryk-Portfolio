package com.spar3chang3.backend;

import io.javalin.Javalin;

public class App {

    private static final String API_PATH = "/api/";

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.http.defaultContentType = "application/json";
            config.bundledPlugins.enableCors(cors -> {
               cors.addRule(it -> {
                  it.anyHost();
               });
            });
        }).start(7000);

        // Should not need to check matching domain, nginx takes care of that

        // Initialize Database
        H2Database.initDatabase();

        /* --- ENDPOINTS --- */
        app.post((API_PATH + "addStats"), ctx -> {
            Stat newStat = ctx.bodyAsClass(Stat.class);
            System.out.println(newStat.toString());
            final Status<String> message = H2Database.addStat(newStat);
            ctx.status(message.getCode());
            ctx.json(message);
        });

        app.put((API_PATH + "updateStats"), ctx -> {
            StatUpdate update = ctx.bodyAsClass(StatUpdate.class);
            final Status<Void> message = H2Database.updateStat(update);
            ctx.status(message.getCode());
            ctx.json(message);
        });

        app.get("*", ctx -> {
            ctx.html("Why are you here - 404, gtfo");
        });
    }
}
