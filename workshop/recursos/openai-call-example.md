# Ejemplo — Llamada a Azure OpenAI en Python

Este snippet es el equivalente en Python de una llamada a Azure OpenAI Chat Completions.
Se utiliza en el **Módulo 3** para pedirle a Copilot que lo traduzca a un servicio NestJS con `@nestjs/axios`.

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'api-key': 'YOUR_API_KEY',
}

params = {
    'api-version': '2024-02-15-preview',
}

json_data = {
    'messages': [
        {
            'role': 'system',
            'content': 'You are an ai wizard that helps people create product descriptions.',
        },
        {
            'role': 'user',
            'content': 'nike',
        }
    ],
    'max_tokens': 800,
    'temperature': 0.7,
    'frequency_penalty': 0,
    'presence_penalty': 0,
    'top_p': 0.95,
    'stop': None,
}

response = requests.post(
    'https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT/chat/completions',
    params=params,
    headers=headers,
    json=json_data,
)
```

> ⚠️ La API key está aquí sólo con fines demostrativos. En el ejercicio, Copilot debe pedirla siempre desde `ConfigService` (`OPENAI_API_KEY`) — nunca hardcodeada.
