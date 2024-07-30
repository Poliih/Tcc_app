# app.py
from flask import Flask, jsonify
import mysql.connector
from collections import defaultdict
from flask_cors import CORS
from decimal import Decimal
from config import Config
from dotenv import load_dotenv

load_dotenv()  # Carrega as variáveis de ambiente do arquivo .env

app = Flask(__name__)
CORS(app)

@app.route('/data')
def get_data():
    config = {
        'user': Config.MYSQL_USER,
        'password': Config.MYSQL_PASSWORD,
        'host': Config.MYSQL_HOST,
        'database': Config.MYSQL_DB,
        'raise_on_warnings': True
    }
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    query = """
    SELECT
        Referencia,
        Consumo_do_mes,
        Energia_Compensada_CC_mes_1
    FROM
        dados
    """
    cursor.execute(query)
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    data_by_month = defaultdict(lambda: {'total_consumo': 0, 'total_energia': 0})
    
    for row in rows:
        referencia, consumo, energia_compensada = row
        referencia = referencia.strip()  # Remove espaços em branco, se houver
        
        if len(referencia) == 4:
            mes = referencia[:2]
            ano = referencia[2:]
            key = f"{mes}/{ano}"
            
            data_by_month[key]['total_consumo'] += float(consumo) if consumo else 0
            data_by_month[key]['total_energia'] += float(energia_compensada) if energia_compensada else 0

    meses_filtrados = []
    consumo_filtrado = []
    energia_filtrada = []

    # Ordenar chaves (mes/ano) para exibir em ordem
    for key in sorted(data_by_month.keys()):
        if '01/23' <= key <= '11/23':
            meses_filtrados.append(key)
            consumo_filtrado.append(data_by_month[key]['total_consumo'])
            energia_filtrada.append(data_by_month[key]['total_energia'])

    total_consumo = sum(consumo_filtrado)
    total_energia = sum(energia_filtrada)
    geracao_total = total_consumo * 1.1  # Exemplo: Geração é 10% a mais que o consumo
    geracao_total_formatado = round(geracao_total, 2)

    injetado_total = total_energia  # Ajuste conforme necessário
    percent_compensacao = (total_energia / total_consumo) * 100 if total_consumo else 0

    data = {
        "Meses": meses_filtrados,
        "TotalConsumo": consumo_filtrado,
        "TotalEnergiaCompensada": energia_filtrada,
        "ConsumoTotal": round(total_consumo, 2),
        "GeracaoTotal": geracao_total_formatado,
        "InjetadoTotal": round(injetado_total, 2),
        "PercentCompensacao": round(percent_compensacao, 2)
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
