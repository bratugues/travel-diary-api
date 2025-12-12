# 🌍 Travel Diary

![Project Status](https://img.shields.io/badge/status-online-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

> **[🇺🇸 English Version](#-english)** | **[🇧🇷 Versão em Português](#-portuguese)**

---

<a name="-english"></a>
## 🇺🇸 English

**Travel Diary** is a full-stack application designed to help users document, search, and favorite their travel adventures. It features a secure authentication system, image uploads, and an optimized backend search.

🔗 **Live Demo:** https://travel-diary-api-two.vercel.app

### 🖼️ Screenshots
<img width="2672" height="1170" alt="image" src="https://github.com/user-attachments/assets/c3a1fbc7-785e-439a-88fc-9a47d33bc64c" />
<img width="2666" height="1204" alt="image" src="https://github.com/user-attachments/assets/4b58e3c9-a5fc-402b-8267-93ff9ccd2386" />


### 🛠 Tech Stack

This project was built using the **PERN Stack** (Postgres, Express, React, Node) architecture:

* **Frontend:** React, Vite, TailwindCSS, Axios.
* **Backend:** Node.js, Express.js, Prisma ORM.
* **Database:** PostgreSQL (Hosted on NeonDB).
* **Storage:** Cloudinary (Image Uploads).
* **DevOps:** Vercel (Frontend) & Render (Backend).

### ✨ Key Features

* **🔐 Authentication:** Secure Login, Register, and Logout using JWT (JSON Web Tokens).
* **📝 CRUD Operations:** Create, Read, Update, and Delete trips.
* **📷 Image Upload:** Support for cover images (integrated with Cloudinary), handling HEIC/High-Res mobile photos.
* **🔍 Optimized Search:** Backend-side filtering using Prisma `contains` for high performance.
* **⭐ Favorites System:** Mark your best trips as favorites.
* **🛡️ Security:** Protected routes and ownership checks (IDOR protection) to ensure users can only modify their own data.
* **📱 Responsive:** Fully responsive layout with polished UX (Loading states, Custom 404 page).

### 🚀 How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/bratugues/travel-diary-api.git](https://github.com/bratugues/travel-diary-api.git)
    cd travel-diary
    ```

2.  **Setup Backend**
    ```bash
    cd backend # (or your server folder)
    npm install
    
    # Create a .env file based on the example and add your variables:
    # DATABASE_URL="postgresql://..."
    # JWT_SECRET="your_secret"
    # CLOUDINARY_CLOUD_NAME="..."
    # CLOUDINARY_API_KEY="..."
    # CLOUDINARY_API_SECRET="..."
    
    npx prisma generate
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd ../web # (or your frontend folder)
    npm install
    
    # Create a .env file:
    # VITE_API_URL="http://localhost:3000"
    
    npm run dev
    ```

---

<a name="-portuguese"></a>
## 🇧🇷 Portuguese

**Travel Diary** é uma aplicação Fullstack desenvolvida para ajudar usuários a documentar, buscar e favoritar suas aventuras de viagem. O projeto conta com sistema de autenticação seguro, upload de imagens e busca otimizada no backend.

🔗 **Link do Projeto:** https://travel-diary-api-two.vercel.app

### 🛠 Tecnologias

Este projeto foi construído utilizando a arquitetura **PERN Stack**:

* **Frontend:** React, Vite, TailwindCSS, Axios.
* **Backend:** Node.js, Express.js, Prisma ORM.
* **Banco de Dados:** PostgreSQL (Hospedado no NeonDB).
* **Armazenamento:** Cloudinary (Upload de Imagens).
* **Infraestrutura:** Vercel (Frontend) & Render (Backend).

### ✨ Funcionalidades Principais

* **🔐 Autenticação:** Login, Cadastro e Logout seguros utilizando JWT.
* **📝 CRUD Completo:** Criar, Ler, Atualizar e Deletar viagens.
* **📷 Upload de Imagens:** Suporte para capas de viagens (integração com Cloudinary), com tratamento para formatos mobile.
* **🔍 Busca Otimizada:** Filtragem feita no Backend (Server-side) para alta performance.
* **⭐ Favoritos:** Sistema para marcar viagens especiais.
* **🛡️ Segurança:** Rotas protegidas e verificação de propriedade (prevenção contra ataques IDOR).
* **📱 Responsividade:** Layout adaptável com UX refinada (Loading states, Página 404).

### 🚀 Como rodar localmente

Siga os passos listados na seção em inglês acima para configurar as variáveis de ambiente (`.env`) e iniciar os servidores.

---

Made with 💙 by Erick (https://github.com/bratugues)
