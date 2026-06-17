# WillowCare

WillowCare is a web application designed to support caregivers of people with Williams Syndrome. This project was focused on planning and defining the WillowCare application, with the goal of better understanding user needs and building a solution tailored to the difficulties faced by caregivers.

The platform aims to improve care coordination by connecting caregivers with schools, organizations, and healthcare professionals through role-based dashboards, customizable profiles, and shared activity listings.

## Requirements

- Node.js (for JSON Server)
- PHP 8+ (for the application pages)
- XAMPP or another local PHP server environment

## Installation

1. Open a terminal in the project root:

```bash
cd c:\xampp\htdocs\2526\WillowCare
```

2. Install dependencies:

```bash
npm install --save-dev json-server@0.17.4 json-server-auth@2.1.0
```

This installs the exact versions:

- `json-server@0.17.4`
- `json-server-auth@2.1.0`

## Running JSON Server

JSON Server serves the `db.json` API backend on port `3001`.

Start it with:

```bash
npm run server
```

By default, this command runs:

```bash
json-server --watch db.json --port 3001 --middlewares ./node_modules/json-server-auth
```

## Running the PHP App

### Recommended: Using XAMPP

1. Ensure the project folder (`WillowCare`) is located in your XAMPP `htdocs` directory:
   ```text
   C:\xampp\htdocs\WillowCare
   ```

2. Start XAMPP and enable Apache and MySQL modules.

3. Open your browser and navigate to:
   ```text
   http://localhost/WillowCare
   ```

### Alternative: Using Built-in PHP Server

If you prefer not to use XAMPP, you can run the app with the built-in PHP server from the project root:

```bash
npm start
```

This runs:

```bash
php -S localhost:8000 router.php
```

Then open in your browser:

```text
http://localhost:8000
```

## Project Layout

```text
WillowCare/
├── README.md
├── package.json
├── package-lock.json
├── db.json
├── router.php
├── css/
│   ├── navigation.css
│   └── style.css
├── images/
│   ├── banner.jpg
│   ├── footer_logo.png
│   ├── hand-shake.png
│   ├── open-book.png
│   ├── stethoscope.png
│   ├── willowcare icon BLACK.png
│   ├── willowcare icon WHITE.png
│   ├── willow_care.png
│   └── favicon_io/
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── apple-touch-icon.png
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon.ico
│       └── site.webmanifest
├── includes/
│   ├── footer.php
│   ├── head.php
│   ├── navbar.php
│   └── scripts.php
├── js/
│   ├── auth-nav.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Doctor.js
│   │   ├── Excursion.js
│   │   ├── ForumTopic.js
│   │   ├── Organization.js
│   │   ├── School.js
│   │   ├── User.js
│   │   ├── Voucher.js
│   │   └── Workshop.js
│   ├── services/
│   │   ├── activity-service.js
│   │   ├── admin-service.js
│   │   ├── auth-service.js
│   │   ├── doctor-service.js
│   │   ├── forum-service.js
│   │   ├── organization-service.js
│   │   ├── perks-service.js
│   │   ├── school-service.js
│   │   └── user-service.js
│   └── views/
│       ├── account-view.js
│       ├── admin-view.js
│       ├── doctor-area-view.js
│       ├── doctor-dashboard-view.js
│       ├── doctor-login-view.js
│       ├── doctor-search-view.js
│       ├── doctor-signup-view.js
│       ├── excursions-view.js
│       ├── forum-view.js
│       ├── index-view.js
│       ├── login-view.js
│       ├── organization-dashboard-view.js
│       ├── organization-detail-view.js
│       ├── organizations-view.js
│       ├── perks-view.js
│       ├── saved-doctors-view.js
│       ├── saved-organizations-view.js
│       ├── saved-schools-view.js
│       ├── school-account-view.js
│       ├── school-dashboard-view.js
│       ├── school-search-view.js
│       ├── selected-activity-view.js
│       ├── selected-workshop-view.js
│       ├── signup-view.js
│       ├── voucher-view.js
│       └── workshops-view.js
└── pages/
    ├── about_us.php
    ├── account_page.php
    ├── activity_lobby.php
    ├── admin.php
    ├── doctor_area.php
    ├── doctor_dashboard.php
    ├── doctor_login.php
    ├── doctor_search.php
    ├── doctor_signup.php
    ├── excursions.php
    ├── forum.php
    ├── index.php
    ├── login.php
    ├── organization_dashboard.php
    ├── organization_detail.php
    ├── organizations.php
    ├── perks.php
    ├── saved_doctors.php
    ├── saved_organizations.php
    ├── saved_schools.php
    ├── school_account.php
    ├── school_dashboard.php
    ├── school_search.php
    ├── selected_activity.php
    ├── selected_workshop.php
    ├── signup.php
    ├── voucher_page.php
    └── workshops.php
```

## Test Accounts

The following accounts are available for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gmail.com | admin |
| Caregiver | caregiver@gmail.com | 123456 |
| School | school@gmail.com | 123456 |
| Doctor | doctor@gmail.com | 123456 |

## Notes

- The API backend data lives in `db.json`.
- `json-server-auth` provides authentication routes for the frontend.
- If you need to change ports, update both the `package.json` script and any frontend `BASE` URL values in `js/services/*.js`.
