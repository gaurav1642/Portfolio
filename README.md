# Gaurav Kumar Portfolio 🚀

Welcome to my personal portfolio website! This project showcases my skills, projects, education, and achievements as a Computer Science student and developer. It's designed to be modern, responsive, and easy to use for everyone—whether you're a recruiter, collaborator, or just curious!

---

## 🌟 Live Demo

👉 [View the Live Portfolio](https://your-live-demo-link.com) *(replace with your deployed link)*

---

## 📋 Features

- **Modern, Responsive Design** (works on all devices)
- **Dark/Light Theme Toggle**
- **Animated Sections** (smooth fade/slide effects)
- **Project Gallery** with links to code and live demos
- **Contact Form** (sends real emails via EmailJS)
- **Downloadable Resume**
- **Accessible & Keyboard-Friendly**

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (custom design, no frameworks)
- **JavaScript (Vanilla)**
- [Font Awesome](https://fontawesome.com/) for icons
- [EmailJS](https://www.emailjs.com/) for contact form (no backend needed)

---

## 🚀 Getting Started

### For Non-Technical Users

1. **View Online:**
   - Just open the [Live Demo](https://your-live-demo-link.com) in your browser!

2. **Contact Me:**
   - Use the contact form at the bottom of the page to send a message (it goes directly to my email).

3. **Download Resume:**
   - Click the "Download Resume" button in the Resume section.

---

### For Developers / Tech Users

#### 1. **Clone the Repository**

```bash
git clone https://github.com/gaurav1642/gaurav-kumar-portfolio.git
cd gaurav-kumar-portfolio
```

#### 2. **Run Locally**

- **With Python (any OS):**
  ```bash
  python -m http.server 8000
  # Then open http://localhost:8000 in your browser
  ```
- **With Node.js (if installed):**
  ```bash
  npx serve .
  # Or use any static server
  ```

#### 3. **Deploy Online**
- **GitHub Pages:** Just push to a `gh-pages` branch or use the repository settings
- **Netlify / Vercel / Render:** Drag and drop the folder or connect your repo

---

## ✉️ Contact Form Setup (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages directly to your email **without any backend**.

### How to Set Up (for your own deployment):

1. **Sign up at [EmailJS](https://www.emailjs.com/)** (free)
2. **Create an Email Service** (connect your Gmail/Outlook)
3. **Create an Email Template** (use the variables: `from_name`, `from_email`, `subject`, `message`)
4. **Get your Public Key, Service ID, and Template ID**
5. **Update these in `app.js`**:
   ```js
   const publicKey = "YOUR_PUBLIC_KEY";
   const serviceId = "YOUR_SERVICE_ID";
   const templateId = "YOUR_TEMPLATE_ID";
   ```
6. **Done!** Now the contact form will send real emails to your inbox.

> **Note:** If you just want to test the site, the form will simulate sending and show a success message (no real email sent) if EmailJS is not configured.

---

## 📝 Customization

- **Change your name, projects, education, etc.** in `index.html`
- **Update styles** in `style.css`
- **Edit form logic or animations** in `app.js`

---

## 🙏 Credits

- Designed & developed by **Gaurav Kumar**
- Icons by [Font Awesome](https://fontawesome.com/)
- Email sending by [EmailJS](https://www.emailjs.com/)

---

## 📢 License

This project is open source. Feel free to use, modify, and share it—just give credit!

---

**Thank you for visiting my portfolio!**

If you have any questions or want to collaborate, just use the contact form or connect with me on [LinkedIn](https://www.linkedin.com/in/gaurav-chauhan-431007307) or [GitHub](https://github.com/gaurav1642). 