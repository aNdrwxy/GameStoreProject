# Usa una imagen oficial de Python
FROM python:3.12-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . /app/

# Instala dependencias del sistema para PostgreSQL
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala dependencias de Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Recolecta archivos estáticos de Django
RUN python manage.py collectstatic --noinput

# Expone el puerto de la app
EXPOSE 8080

# Comando para iniciar la app en producción
CMD ["gunicorn", "SteamProyectEF.wsgi", "--bind", "0.0.0.0:8080"]
