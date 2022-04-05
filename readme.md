# Exemplo com DLX
1. Subir o docker-compose comentado
2. Criar o exchange WHATSAPP
3. Criar a fila WHATSAPP_RECEIVE_MESSAGE
4. Bind da WHATSAPP_RECEIVE_MESSAGE para o exchange WHATSAPP topico WHATSAPP_RECEIVE_MESSAGE
5. Enviar mensagem pro exchange WHATSAPP
6. Criar fila WHATSAPP_RECEIVE_MESSAGE_TTL_5000 
7. Enviar mensagem pra fila WHATSAPP_RECEIVE_MESSAGE_TTL_5000

# Exemplo com propriedade expiration
1. Criar fila WHATSAPP_RECEIVE_MESSAGE_EXPIRATION
2. Enviar mensagem pra fila WHATSAPP_RECEIVE_MESSAGE_EXPIRATION 

# Exemplo com controle de tentativas
1. Subir docker-compose descomentado
2. Mostrar as filas e explicá-las
3. http://localhost:3000/producer/10
4. Mostrar o resultado