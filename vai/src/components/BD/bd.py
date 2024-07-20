from flask import Flask, jsonify
import mysql.connector
from collections import defaultdict
from flask_cors import CORS  # Importar CORS

app = Flask(__name__)
CORS(app)  # Adicionar suporte a CORS

@app.route('/data')
def get_data():
    config = {
        'user': 'root',
        'password': 'Relaxa111@',
        'host': 'localhost',
        'database': 'bdtcc',
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
            
            data_by_month[key]['total_consumo'] += consumo if consumo else 0
            data_by_month[key]['total_energia'] += energia_compensada if energia_compensada else 0

    meses_filtrados = []
    consumo_filtrado = []
    energia_filtrada = []

    # Ordenar chaves (mes/ano) para exibir em ordem
    for key in sorted(data_by_month.keys()):
        if '01/23' <= key <= '11/23':
            meses_filtrados.append(key)
            consumo_filtrado.append(data_by_month[key]['total_consumo'])
            energia_filtrada.append(data_by_month[key]['total_energia'])

    data = {
        "Meses": meses_filtrados,
        "TotalConsumo": consumo_filtrado,
        "TotalEnergiaCompensada": energia_filtrada
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
