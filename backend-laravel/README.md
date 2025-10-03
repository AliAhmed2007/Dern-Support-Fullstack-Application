# Dern‑Support API

A comprehensive RESTful API for the Dern‑Support IT technical support platform.  
Built with Laravel, Sanctum, Breeze (API only), and MySQL, this backend powers device repair requests, ticketing, billing, subscriptions, technician management, and user accounts.

---

## 📋 Table of Contents

- [Dern‑Support API](#dernsupport-api)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🔧 Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [⚙ Configuration](#-configuration)
  - [Database Setup \& Storage](#database-setup--storage)
  - [3- php artisan storage:link](#3--php-artisan-storagelink)
  - [Running the application](#running-the-application)

---

## 🚀 Features

- **User Accounts:** Registration, login, profile management  
- **Repair Requests:** Multi‑step device → general problem → specific problem → attachments  
- **Ticketing:** CRUD tickets with types & status updates  
- **Technician Management:** Assign technicians, track availability  
- **Billing:** Create, view, update invoices & line‑items, generate courier fees  
- **Subscriptions & Plans:** Monthly & annual plan management  
- **File Serving:** Secure avatar downloads  
- **API Security:** Laravel Sanctum + role‑based (admin) middleware  
- **Docs:** Swagger / OpenAPI for interactive API reference  

---

## 🔧 Prerequisites

- **PHP ≥ 8.1**  
- **Composer**  
- **MySQL or MariaDB**  
- **Node.js & npm** (for optional frontend integration or asset compilation)  
- **Git**  

---

## 📥 Installation

  1- cd backend-laravel
  2- composer install

---

## ⚙ Configuration
  1- cp .env.example .env
  2- php artisan key:generate
  **Edit .env**
  ```
    APP_NAME="Dern-Support API"
    APP_ENV=local
    APP_KEY=base64:GENERATED_KEY
    APP_DEBUG=true
    APP_URL=http://localhost:8000
    FRONTEND_URL=http://localhost:5173

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=dern_support
    DB_USERNAME=root
    DB_PASSWORD=

    SESSION_DRIVER=database
    CACHE_STORE=database

    SANCTUM_STATEFUL_DOMAINS=localhost:5173
    SESSION_DOMAIN=localhost

    MAIL_MAILER=log
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"
  ```

--- 

## Database Setup & Storage
  1- php artisan migrate
  2- php artisan db:seed
  3- php artisan storage:link  
---

## Running the application
  php artisan serve
