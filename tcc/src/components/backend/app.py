from flask import Flask, jsonify
import requests
import pymysql
import pymysql.cursors
from cryptography.fernet import Fernet 

app = Flask(__name__)

# Token fornecido pelo INMET
token = "XXX"

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
        # Data inicial e final
        data_inicial = "2022-11-01"
        data_final = "2022-11-01"
        
        # Código da estação de Goianésia
        codigo_estacao = "A022"  # Código da estação automática de Goianésia
        
        # URL da API para recuperar os dados desejados
        url = f"https://apitempo.inmet.gov.br/token/estacao/{data_inicial}/{data_final}/{codigo_estacao}/{token}"
        
        # Consome a API
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(url, headers=headers)
        data = response.json()
        
        # Conecta ao banco de dados
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()
        
        # SQL para inserção dos dados
        insert_sql = """
        INSERT INTO weather_measurements (
            CD_ESTACAO, CHUVA, DC_NOME, DT_MEDICAO, HR_MEDICAO, PRE_INS, PRE_MAX, PRE_MIN,
            PTO_INS, PTO_MAX, PTO_MIN, RAD_GLO, TEM_CPU, TEM_INS, TEM_MAX, TEM_MIN, TEM_SEN,
            TEN_BAT, UF, UMD_INS, UMD_MAX, UMD_MIN, VEN_DIR, VEN_RAJ, VEN_VEL, VL_LATITUDE, VL_LONGITUDE
        ) VALUES (
            %(CD_ESTACAO)s, %(CHUVA)s, %(DC_NOME)s, %(DT_MEDICAO)s, %(HR_MEDICAO)s, %(PRE_INS)s, %(PRE_MAX)s, %(PRE_MIN)s,
            %(PTO_INS)s, %(PTO_MAX)s, %(PTO_MIN)s, %(RAD_GLO)s, %(TEM_CPU)s, %(TEM_INS)s, %(TEM_MAX)s, %(TEM_MIN)s, %(TEM_SEN)s,
            %(TEN_BAT)s, %(UF)s, %(UMD_INS)s, %(UMD_MAX)s, %(UMD_MIN)s, %(VEN_DIR)s, %(VEN_RAJ)s, %(VEN_VEL)s, %(VL_LATITUDE)s, %(VL_LONGITUDE)s
        )
        """
        
        # Insere os dados no banco de dados
        for record in data:
            cursor.execute(insert_sql, record)
        
        # Confirma as mudanças
        connection.commit()
        
        # Fecha a conexão
        cursor.close()
        connection.close()
        
        return jsonify({"message": "Dados inseridos com sucesso"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
