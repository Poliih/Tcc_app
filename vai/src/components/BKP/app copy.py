from flask import Flask, jsonify, request
from flask_cors import CORS  # Adicione esta linha
import requests

app = Flask(__name__)
CORS(app)  # Adicione esta linha

@app.route('/api/weather', methods=['GET'])
def get_weather_data():
    try:
        token = "eHcyeUk3S0Q0c0RUVnJrRHRNaVZHZk5oR3h5a0tVams=xw2yI7KD4sDTVrkDtMiVGfNhGxykKUjk"
        cod_estacao = "A022"
        data_inicial = "2023-06-22"
        data_final = "2023-06-22"
        
        url = f"https://apitempo.inmet.gov.br/token/estacao/diaria/{data_inicial}/{data_final}/{cod_estacao}/{token}"
        
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            if data:
                return jsonify(data[0])
            else:
                return jsonify({'error': 'Dados retornados pela API estão vazios.'}), 500
        else:
            return jsonify({'error': f'Erro ao fazer a requisição para a API: Código {response.status_code}'}), 500
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Erro ao fazer a requisição para a API: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)