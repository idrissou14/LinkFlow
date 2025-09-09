# ✨ Link-Hub: One Page to Rule Them All ✨

[![Tests](https://github.com/idriss-14/link-hub/actions/workflows/tests.yml/badge.svg)](https://github.com/idriss-14/link-hub/actions/workflows/tests.yml)
[![Lint](https://github.com/idriss-14/link-hub/actions/workflows/lint.yml/badge.svg)](https://github.com/idriss-14/link-hub/actions/workflows/lint.yml)

Tired of juggling multiple links for your social profiles, projects, and personal sites? **LinkFlow** is the elegant, self-hosted solution to consolidate your digital presence into a single, beautiful, and easily manageable page.

Take control of your online identity. Own your data, customize your page, and present a professional, unified front to your audience. 

![Screenshot of Link-Hub](https://raw.githubusercontent.com/idriss-14/link-hub/main/public/images/screen.png)

---

## 🤔 Why Choose LinkFlow?

In a world of paid services and data privacy concerns, Link-Hub stands out by putting you in control.

- **🔒 Own Your Data:** By self-hosting, you are the sole owner of your data. No third-party tracking, no selling of your information. Your privacy is paramount.

- **🎨 Completely Customizable:** From light/dark modes to color themes, the appearance is yours to command. Match your personal brand perfectly.

- **🚀 Blazing Fast & Modern:** Built on a cutting-edge tech stack (Laravel, React, Vite), the user experience is incredibly fast and responsive on any device.

- **🌐 Truly Open Source:** Link-Hub is 100% free and open-source. Contribute to its development, add your own features, and be part of the community. No premium tiers, no hidden costs.

- **🏢 Professional Admin Panel:** Manage users and links with ease through a powerful and intuitive admin dashboard built with Filament.

---

## 🎯 Who is LinkFlow For?

- **Developers** who want a powerful, open-source foundation for their own link-in-bio tool.
- **Content Creators** who need a professional and custom-branded page for their social media profiles.
- **Privacy Advocates** who want to control their own data and avoid proprietary, closed-source platforms.
- **Teams & Businesses** looking for a self-hosted solution to manage official company links.

---

## 🏁 Get Your Hub Up in Minutes

Ready to create your own central link page? Get started with our simple installation process.

### Prerequisites

- PHP 8.2+
- Composer
- Node.js & npm

### 1. Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/idriss-14/link-hub.git
    cd link-hub
    ```

2.  **Install dependencies:**
    ```bash
    composer install
    npm install
    ```

3.  **Set up environment:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Launch the database & run the app:**
    ```bash
    touch database/database.sqlite
    php artisan migrate --seed
    composer dev
    ```

Your Link-Hub is now live at [http://127.0.0.1:8000](http://127.0.0.1:8000)!

### 2. Docker Installation

Prefer Docker? We've got you covered.

1.  **Clone, and set up your `.env` file** as shown above.
2.  **Build & Run:**
    ```bash
    docker build -t link-hub .
    docker run -p 8000:80 -d --name link-hub-app --env-file .env link-hub
    ```
    Access your instance at [http://localhost:8000](http://localhost:8000).

---

## 🤝 Join the Community & Contribute

LinkFlow is built by the community, for the community. We welcome contributions of all kinds, from bug fixes to new features. Check out our issues tab or submit a pull request!

## 🛠️ Tech Stack

For those who love the technical details:

- **Backend:** [Laravel 12](https://laravel.com/)
- **Frontend:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/), styled with [Tailwind CSS](https://tailwindcss.com/)
- **Framework:** [Inertia.js](https://inertiajs.com/)
- **Admin Panel:** [Filament 4](https://filamentphp.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).