# Usa una imagen oficial de Python
FROM python:3.12-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY . /app/

# Instala dependencias del sistema (mysql, etc.)
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Instala dependencias del proyecto
COPY .env /app/.env
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Recolecta archivos estáticos
RUN python manage.py collectstatic --noinput

# Ejecuta migraciones (opcional)
# RUN python manage.py migrate

# Expone el puerto
EXPOSE 8080

# Comando por defecto para ejecutar Gunicorn
CMD ["gunicorn", "SteamProyectEF.wsgi", "--bind", "0.0.0.0:8080"]
