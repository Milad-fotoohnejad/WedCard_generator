### Custom Wedding Invitation PDF Generator with Secure Guest Access (WordPress + Node.js + Puppeteer)

**Project Overview:**

We created a custom web-based wedding invitation system that automates the generation, hosting, and secure access of personalized PDF invitation cards. The solution is built using a combination of **Node.js**, **Puppeteer**, and **WordPress**, and is designed to deliver a beautiful and secure experience for guests.

---

### 🔧 Key Features:

- ✅ **Automated PDF Generation**
  - Built with Puppeteer to convert styled HTML/CSS into high-resolution PDF cards
  - Personalized for each guest using data from a CSV file
  - Elegant designs using Google Fonts, custom backgrounds, and clean CSS

- 🔒 **Secure Guest Access via Code**
  - Each guest receives a unique 3-digit code
  - Guests enter their code on a custom WordPress page to access their invitation
  - AJAX-based lookup using WordPress backend and MySQL database

- 📁 **File Hosting and Delivery**
  - Generated PDFs are stored on the server and served through a clean URL (e.g., `/cards/John_Doe.pdf`)
  - Guests are redirected to their PDF without exposing the full directory or listing files
  - Optionally tracks timestamp of first access

- 🌐 **Responsive Design**
  - Optimized for both desktop and mobile
  - Background styling includes soft fades and elegant imagery
  - Can support direct download or animated in-page viewing (configurable)

---

### 🛠️ Tech Stack:

- **Node.js** + **Puppeteer**: PDF generation engine
- **HTML/CSS**: Fully customized card design with shadows, fonts, and layout
- **WordPress** (PHP + MySQL): Frontend access + backend logic via AJAX
- **NGINX + Ubuntu Server**: Secure file delivery and deployment
- **Custom Admin Scripts**: File cleanup, upload automation, renaming helpers
