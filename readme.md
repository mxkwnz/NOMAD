# Nomad Cars 🚗

**Nomad Cars** — a static website for **car sales and rentals**.  
The project includes catalog pages, booking form, profile system, contact page, and theme switching.  
Built using **HTML, CSS, and JavaScript (with jQuery + Bootstrap)**.  
No backend — all logic runs on the client side (browser).

---

## 📁 Project Structure

├── index.html
├── catalog.html
├── rent.html
├── profile.html
├── contact.html
├── style_mc.css
│
├── js/
│ ├── api_integration.js
│ ├── auth.js
│ ├── auth_forms.js
│ ├── auth_ui.js
│ ├── catalog.js
│ ├── catalog_enhanced.js
│ ├── contact.js
│ ├── index.js
│ ├── jquery_addons.js
│ ├── profile.js
│ ├── rent.js
│ └── theme.js
│
├── images/
│ ├── Audi Q5.jpg
│ ├── BMW M5.jpg
│ ├── Hyundai Tucson.jpg
│ ├── Kia Sportage.jpg
│ ├── Lexus ES.png
│ ├── Mercedes G63.jpg
│ ├── Nissan X-Trail.jpg
│ ├── Porsche 911.jpg
│ └── Toyota Camry.jpg
│
└── sound/
├── audi.mp3
├── bell.mp3
├── bentley.mp3
├── bmw.mp3
├── booked_sound.mp3
├── bugatti.mp3
├── ferra.mp3
├── lambo.mp3
├── merc.mp3
├── porschesound.mp3
└── rolls.mp3


---

## ⚙️ Description of Main Files

### HTML Pages
- **index.html** — main homepage with navigation and intro section.  
- **catalog.html** — displays available cars for sale and rent (cards + modals).  
- **rent.html** — booking form with live validation, date/time fields, and form reset logic.  
- **profile.html** — user profile page that reads data from `window.auth.getCurrentUser()` and `localStorage`.  
- **contact.html** — contact info and form.

### CSS
- **style_mc.css** — main styles (layout, buttons, theme colors, responsive design).

### JavaScript
- **api_integration.js** — defines `carsList` and fetches data from the external API  
  `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{make}?format=json`.
- **auth.js**, **auth_forms.js**, **auth_ui.js** — client-side authentication simulation (store users in `localStorage`, validate phone numbers, etc.).
- **rent.js** — handles form validation and booking logic:
  - Checks required fields (name, phone, car, dates).
  - Prevents invalid dates.
  - Saves booking info in localStorage for the current user.
  - Shows a success alert.
- **profile.js** — loads current user data, shows user info or redirects if not logged in.
- **theme.js** — switches light/dark theme and saves the choice in `localStorage`.
- **catalog.js / catalog_enhanced.js** — handle catalog interactions (cards, car sounds, modals).
- **jquery_addons.js**, **index.js**, **contact.js** — extra UI scripts and interactions.

### Media
- **/images/** — car images used in catalog and booking pages.  
- **/sound/** — audio effects for booking confirmation and car previews.

---

## How to Run the Project

### Option — Open directly
Just open `index.html` in your browser.

