<%@ page import="java.sql.*" %>
<%
    String driver = "com.mysql.cj.jdbc.Driver";
    String url = "jdbc:mysql://localhost:3306/user_record_db";
    String dbUser = "root";
    String dbPass = "";

    Connection conn = null;
    try {
        Class.forName(driver);
        conn = DriverManager.getConnection(url, dbUser, dbPass);
    } catch (Exception e) {
        e.printStackTrace();
    }
%>
