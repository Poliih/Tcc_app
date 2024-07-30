from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Token fornecido pelo INMET (substitua pelo seu token real)
token = "eHcyeUk3S0Q0c0RUVnJrRHRNaVZHZk5oR3h5a0tVams=xw2yI7KD4sDTVrkDtMiVGfNhGxykKUjk"

@app.route('/api/weather', methods=['GET'])
def fetch_weather_data():
    try:
        # Data inicial e final desejada para os dados da estação automática de Goianésia
        data_inicial = "2022-11-01"
        data_final = "2022-11-01"
        
        # Código da estação de Goianésia
        codigo_estacao = "A022"  # Código da estação automática de Goianésia
        
        # URL da API para recuperar os dados desejados
        url = f"https://apitempo.inmet.gov.br/token/estacao/{data_inicial}/{data_final}/{codigo_estacao}/{token}"
        
        # Faz a requisição GET
        response = requests.get(url)
        
        # Verifica se a requisição foi bem sucedida
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': f'Erro na requisição: Código {response.status_code}'}), 500
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Erro na requisição: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
