package com.revature.notecard.filter;


import javax.servlet.FilterChain;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Registered in web.xml
public class CorsFilter extends HttpFilter {

    public void doFilter(HttpServletRequest request, HttpServletResponse res, FilterChain chain){
        try {
            res.setHeader("Access-Control-Allow-Origin", "*"); //http://localhost:8080
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
            res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, " +
                    "Access-Control-Request-Method, Access-Control-Request-Headers");
            res.setHeader("Access-Control-Allow-Credentials", "true");

            chain.doFilter(request, res);

        } catch (Throwable t) {
            t.printStackTrace();
            throw new RuntimeException(t);
        }
    }
}