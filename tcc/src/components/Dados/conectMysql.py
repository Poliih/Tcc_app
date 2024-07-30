from flask import Flask, jsonify
from flask_cors import CORS  # Importa o CORS do Flask-CORS
import pymysql
import pymysql.cursors
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Aplica o CORS à sua aplicação Flask

# Configurações do banco de dados MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'xxx',
    'database': 'weather_data',
    'cursorclass': pymysql.cursors.DictCursor
}

@app.route('/api/weather', methods=['GET'])
def fetch_weather_data():
    try:
        # Conecta ao banco de dados
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # SQL para selecionar os dados meteorológicos mais recentes
        select_sql = """
        SELECT CD_ESTACAO, CHUVA, DC_NOME, DATE_FORMAT(DT_MEDICAO, '%Y-%m-%d') AS DT_MEDICAO,
            HR_MEDICAO, PRE_INS, PRE_MAX, PRE_MIN,
            PTO_INS, PTO_MAX, PTO_MIN, RAD_GLO, TEM_CPU, TEM_INS, TEM_MAX, TEM_MIN, TEM_SEN,
            TEN_BAT, UF, UMD_INS, UMD_MAX, UMD_MIN, VEN_DIR, VEN_RAJ, VEN_VEL, VL_LATITUDE, VL_LONGITUDE
        FROM weather_measurements
        ORDER BY DT_MEDICAO DESC, HR_MEDICAO DESC
        """

        # Executa a consulta SQL
        cursor.execute(select_sql)
        weather_data = cursor.fetchall()  # Obtém todos os registros

        # Fecha a conexão
        cursor.close()
        connection.close()

        # Verifica se há dados retornados
        if weather_data:
            # Convertendo os tipos de dados necessários para serialização JSON
            for data in weather_data:
                data['DT_MEDICAO'] = datetime.strptime(data['DT_MEDICAO'], '%Y-%m-%d').date()

                # Convertendo campos que precisam de tratamento especial
                for key, value in data.items():
                    if isinstance(value, timedelta):
                        data[key] = str(value)  # Converte timedelta para string

            return jsonify(weather_data), 200
        else:
            return jsonify({"message": "Nenhum dado encontrado"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
