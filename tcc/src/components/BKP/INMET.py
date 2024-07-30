import requests

def get_weather_data():
    try:
        # Defina as variáveis necessárias
        token = "xxx"
        cod_estacao = "A022"
        data_inicial = "2023-06-22"
        data_final = "2023-06-22"
        
        # Construa a URL com base nas variáveis
        url = f"https://apitempo.inmet.gov.br/token/estacao/diaria/{data_inicial}/{data_final}/{cod_estacao}/{token}"

        # Faça a requisição GET à API
        response = requests.get(url)

        # Verifique se a requisição foi bem-sucedida (código 200)
        if response.status_code == 200:
            # Extraia os dados JSON da resposta
            data = response.json()

            # Verifique se os dados não estão vazios
            if data:
                # Supondo que os dados retornem apenas um registro para a data especificada
                dados_diarios = data[0]

                # Extraia os dados individuais
                umid_med = dados_diarios.get("UMID_MED")
                dt_medicao = dados_diarios.get("DT_MEDICAO")
                dc_nome = dados_diarios.get("DC_NOME")
                umid_min = dados_diarios.get("UMID_MIN")
                temp_med = dados_diarios.get("TEMP_MED")
                chuva = dados_diarios.get("CHUVA")
                vl_latitude = dados_diarios.get("VL_LATITUDE")
                temp_min = dados_diarios.get("TEMP_MIN")
                temp_max = dados_diarios.get("TEMP_MAX")
                uf = dados_diarios.get("UF")
                vel_vento_med = dados_diarios.get("VEL_VENTO_MED")
                cd_estacao = dados_diarios.get("CD_ESTACAO")
                vl_longitude = dados_diarios.get("VL_LONGITUDE")

                # Imprima os dados formatados
                print("Dados meteorológicos:")
                print(f"Umidade Média: {umid_med}%")
                print(f"Data de Medição: {dt_medicao}")
                print(f"Cidade: {dc_nome}")
                print(f"Umidade Mínima: {umid_min}%")
                print(f"Temperatura Média: {temp_med}°C")
                print(f"Chuva: {chuva} mm")
                print(f"Latitude: {vl_latitude}")
                print(f"Temperatura Mínima: {temp_min}°C")
                print(f"Temperatura Máxima: {temp_max}°C")
                print(f"Estado: {uf}")
                print(f"Velocidade do Vento Média: {vel_vento_med} m/s")
                print(f"Código da Estação: {cd_estacao}")
                print(f"Longitude: {vl_longitude}")
            else:
                print("Dados retornados pela API estão vazios.")
        else:
            print(f"Erro ao fazer a requisição para a API: Código {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"Erro ao fazer a requisição para a API: {e}")

# Chamada da função para obter e imprimir os dados meteorológicos
get_weather_data()
