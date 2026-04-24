<%@ page contentType="application/json; charset=UTF-8" %>
<% 
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
%>
<%@ include file="db_config.jsp" %>
<%@ page import="java.util.*" %>
<%
    List<Map<String, String>> users = new ArrayList<>();
    
    if (conn != null) {
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            
            while (rs.next()) {
                Map<String, String> user = new HashMap<>();
                user.put("id", rs.getString("id"));
                user.put("name", rs.getString("name"));
                user.put("username", rs.getString("username"));
                user.put("email", rs.getString("email"));
                user.put("phone", rs.getString("phone"));
                user.put("website", rs.getString("website"));
                users.add(user);
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    StringBuilder json = new StringBuilder("[");
    for (int i = 0; i < users.size(); i++) {
        Map<String, String> u = users.get(i);
        json.append("{");
        json.append("\"id\":").append(u.get("id")).append(",");
        json.append("\"name\":\"").append(u.get("name")).append("\",");
        json.append("\"username\":\"").append(u.get("username")).append("\",");
        json.append("\"email\":\"").append(u.get("email")).append("\",");
        json.append("\"phone\":\"").append(u.get("phone")).append("\",");
        json.append("\"website\":\"").append(u.get("website")).append("\"");
        json.append("}");
        if (i < users.size() - 1) json.append(",");
    }
    json.append("]");
    
    out.print(json.toString());
%>
