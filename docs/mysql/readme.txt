�ļ�˵����
1 MySql���ݿⴴ�������뼰jdbc��������.txt ��װ˵��
2 public_mysql_backup.sql                 MySql�����ļ�
3 mysql-essential-5.1.55-win32.msi 				MySql��װ�ļ�
4 mysql-connector-java-5.1.6-bin.jar 			���ݿ�����

1 �������ݿ�
DROP DATABASE public;

CREATE DATABASE public;

GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON public.* TO public@localhost IDENTIFIED BY '123456';

SET PASSWORD FOR 'public'@'localhost' = OLD_PASSWORD('123456');

USE public;

2 �������ݿ�
C:\Program Files\MySQL\MySQL Server 5.1\bin>mysql -u root -p123456 public<public_mysql_backup.sql

3  �޸����ݿ����������ļ���bhtsys\src\proxool.xml 7-18��
  
<!--driver-url>jdbc:postgresql://localhost:5432/bhtec</driver-url>
  <driver-class>org.postgresql.Driver</driver-class>
  <driver-properties>
    <property name="user" value="postgres"/>
    <property name="password" value="123456"/>
  </driver-properties-->
  <driver-url>jdbc:mysql://localhost:3306/public</driver-url>
  <driver-class>com.mysql.jdbc.Driver</driver-class>
  <driver-properties>
    <property name="user" value="root"/>
    <property name="password" value="123456"/>
  </driver-properties>

4  ��mysql-connector-java-5.1.6-bin.jar�ֱ𿽱���bhtsys\WEB-INF\lib\��Tomcat\server\lib\��

5 ����tomcat,mysql ���ݿ�汾���ԡ����Ǻܳ�֡�