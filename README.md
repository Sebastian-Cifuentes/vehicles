# Vehicles (NestJS + Angular + Docker para el backend)

Este repositorio contiene dos aplicaciones principales:  

- **Backend**: [NestJS](https://nestjs.com/) con PostgreSQL (Docker)  
- **Frontend**: [Angular](https://angular.io/) (ejecutado localmente con Node)  

---

## 📂 Estructura del Proyecto
```plaintext
/project-root
│── /vehicles-back
│── /vehicles-front
│── README.md
```

## Ejecutar con Docker

### 1. Construir dentro de vehicles-back
```bash
npm i
docker-compose up -d
npm run start
```

### 2. Construir dentro del vehicles-front
```bash
npm i
npm run start
```

## 3. Servicios disponibles

- **Vehicles back** → [http://localhost:3000](http://localhost:3000)  
- **Vehicles front** → [http://localhost:4200](http://localhost:4200)  