import mysql.connector

try:
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='outtaspace07012006',
        database='fincare'
    )
    print("✅ Kết nối MySQL thành công với mysql-connector!")
    connection.close()
except Exception as e:
    print(f"❌ Lỗi kết nối: {e}")