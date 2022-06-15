package com.revature.notecard.servlet;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;

/**
 * Servlet designed for easy sharing
 * Branches off main can use this without DB dependencies
 */
public class TestServlet extends HttpServlet {      // Registered in web.xml
    private static ObjectMapper mapper = new ObjectMapper();
    private static final String name = "TestServlet";
    final private static String complaintsFile = "complaints.log";
    final private static String user1 = "Tester@revature.net";
    final private static String pass1 = "12345";
    final private static String fname1 = "Tester";
    final private static String lname1 = "McTesterson";

    @Override
    public void init() throws ServletException {
        System.out.println("[LOG] - "+name+" instantiated!");
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        // Allow for user-defined logic to process requests
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Send(405,"Method not allowed", resp);
        return;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String destination = "none";
        String[] supportedDestinations = {"login", "register"};

        System.out.println("[LOG] - "+name+" received a POST request!");

        HashMap<String, Object> input = new HashMap<>();

        try {
            input = mapper.readValue(req.getInputStream(), HashMap.class);
            System.out.println("[LOG] - "+name+" received input:");
            System.out.println(new String(new char[20]).replace("\0", "*"));
            for (String name: input.keySet()) { // print out key-value pairs for debugging
                String key = name.toString();
                String value = input.get(name).toString();
                System.out.println(key + " " + value);
            }
            System.out.println(new String(new char[20]).replace("\0", "*"));

        } catch (Throwable t) {
            System.out.println("Couldn't map Input");
            Complain("Couldn't map Input");
            Complain(t);
            t.printStackTrace();
            Send(400, "Bad Input", resp);  // mapper will map legitimate requests, so this shouldn't happen
            return;
        }

        // This code is lengthy and doesn't employ abstraction
        // it's just to make use of the ObjectMapper
        String[] regRequired = {"u","p","f","l"};
        String[] logRequired = {"u","p"};
        Boolean isRegister = true;
        Boolean isLogin = true;

        for (String name: input.keySet()) {
            Boolean found = false;
            for (String s : regRequired) {
                if (s.equals(name)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isRegister = false;
                break;
            }
        }
        for (String name: input.keySet()) {
            Boolean found = false;
            for (String s : logRequired) {
                if (s.equals(name)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isLogin = false;
                break;
            }
        }

        if (isRegister && input.keySet().size()!=regRequired.length) isRegister=false;
        if (isLogin && input.keySet().size()!=logRequired.length) isLogin=false;

        if(isLogin) destination = "login";
        if(isRegister) destination = "register";
        if(isLogin && isRegister) {
            Send(500, "We messed up", resp);
            return;
        }
        System.out.println(name+" identified login was "+((isLogin)?"":"not ")+ "selected");
        System.out.println(name+" identified register was "+((isRegister)?"":"not ")+ "selected");

        Boolean supported = false;
        for (String loc: supportedDestinations) {
            if(destination.equals(loc)) {
                supported = true;
                break;
            }
        }

        if (!supported) { Send(400, "Invalid Request", resp); return;   }

        if (destination.equals("login")) {
            HttpSession session1 = req.getSession(false);
            if (session1 != null) {
                Send(406,"Already logged in as "+session1.getAttribute("auth-user"), resp);
                return;
            }
            String username = input.get("u").toString();
            String password = input.get("p").toString();

            // error codes
            if (!username.equalsIgnoreCase(user1)) {         Send(404, "User not found",                        resp); return; }
            if (username.contains("!")) {                    Send(400, "Input contained an illegal character",  resp); return; }
            if (!(username.endsWith("@revature.net") ||
                    username.endsWith("@Revature.net"))) {   Send(400, "Username must end with @revature.net",  resp); return; }
            if (username.length() == 0 || password.length() == 0) {
                                                             Send(400, "An input field was left blank",         resp); return; }
            if (username.length() < 14 || username.length() > 32 || password.length() < 5 || password.length() > 32) {
                                                             Send(400, "An input was too long or short",        resp); return; }
            if (username.equalsIgnoreCase(user1) && password.equals(pass1)) {
                HttpSession session = req.getSession();
                session.setAttribute("auth-user", username); Send(204, "Logged in",                             resp); return; }
            else {                                           Send(401, "Invalid credentials",                   resp); return; }
            // the comment is unreachable code
        }
        if (destination.equals("register")) {
            String username = input.get("u").toString();
            String password = input.get("p").toString();
            String fname = input.get("f").toString();
            String lname = input.get("l").toString();
            if (username.length() == 0 || password.length() == 0) {
                Send(400, "Form input was blank", resp); return;
            }
            if ( !(username.endsWith("@revature.net") || username.endsWith("@Revature.net")) ) {
                Send(400, "Username must end with @revature.net", resp); return;
            }
            if (username.length() > 32) {
                Send(400, "Username length too long", resp); return;
            }
            if (username.length() < 14) {
                Send(400, "Username length too short", resp); return;
            }
            if (username.contains("!")) {
                Send(400, "Username contained an illegal character: !", resp); return;
            }
            if (username.equalsIgnoreCase(user1)) {
                Send(409, "Username already taken!", resp); return;
            }
            if (password.length() < 5) {
                Send(400, "Password must be at least 5 characters", resp); return;
            }
            Send(204, "Welcome, "+fname+" "+lname+ ", you have been registered.", resp); return;
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession(false);
        System.out.println("[LOG] "+name+" received a DELETE request.");

        if (session != null) {
            session.invalidate(); // Invalidate current session
            Send(204,"Logged out", resp);
            return;
        }

        Send(204,"Already logged out", resp);
        return;
    }

    private static void Send(int code, String msg, HttpServletResponse resp) {
        try {
            HashMap<String, Object> message = new HashMap<>();
            resp.setStatus(code);
            resp.setContentType("application/json");
            message.put("code", code);
            message.put("message", msg);
            message.put("timestamp", LocalDateTime.now().toString());
            resp.getWriter().write(mapper.writeValueAsString(message));
        } catch (Throwable t) {
            Complain(t);
            System.out.println("Error in "+name+". Can't return anything!");
            t.printStackTrace(); // so it's in the logs and Tomcat Server window
        }
        return;
    }

    // log stack traces
    private static void Complain(Throwable ex) {
        try (FileWriter writer = new FileWriter(complaintsFile, true)) {
            SimpleDateFormat formatter= new SimpleDateFormat("MMM dd, yyyy 'at' HH:mm:ss z");
            Date date = new Date(System.currentTimeMillis());
            writer.write(formatter.format(date) + "\n");
            writer.close();

            File file = new File(complaintsFile);
            PrintStream ps = new PrintStream(new FileOutputStream(file, true));
            ex.printStackTrace(ps);
            ps.close();
            System.out.println("Logged an error to " + complaintsFile);
        } catch (Throwable t) { t.printStackTrace(); }
    }

    // Debug messages are handled here
    private static void Complain(String complaint) {
        try (FileWriter writer = new FileWriter(complaintsFile, true)) {
            SimpleDateFormat formatter= new SimpleDateFormat("MMM dd, yyyy 'at' HH:mm:ss z");
            Date date = new Date(System.currentTimeMillis());
            writer.write(formatter.format(date) + "\n" + complaint + "\n");
            writer.close();
            System.out.println("Logged a debug message to " + complaintsFile);
        } catch (Throwable t) { t.printStackTrace(); }
    }
}
