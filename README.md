# Maple Events - Event Planning Website

This project is a bespoke, responsive website created for "Maple Events", a luxury Canadian event planning company.

## Setup Instructions

1. **No build tools required!** This project uses pure HTML5, CSS3, and vanilla JavaScript.
2. Simply open `index.html` in your web browser to view the site.
3. For the best experience, you can serve it locally using a simple HTTP server (e.g., VS Code Live Server, or running `npx serve` in this directory).

## Innovative UI Features Included

1. **Scroll-Triggered Reveal Animations**: Built completely from scratch using the native Intersection Observer API (`script.js`). Elements gracefully fade in and slide up as you scroll down the page, providing a premium, modern feel without relying on bloated external libraries like AOS.
2. **Interactive Timeline Process**: The "Our Event Process" section features a dynamic timeline where steps light up in sequence as the user scrolls into view, making the service explanation highly engaging.
3. **Parallax/Color Reveal Portfolio**: The portfolio grid utilizes CSS filters starting in grayscale. On hover, the images smoothly transition to full color while slightly scaling up, and a luxurious gold overlay reveals the event details. 

## Design Choices

- **Color Palette**: Deep Forest Green (`#1B4332`), Gold (`#D4AF37`), and Off-White (`#F8F9FA`). This palette reflects the Canadian landscape (pine trees, autumn warmth) while maintaining a high-end, luxurious aesthetic.
- **Typography**: A striking contrast between the elegant, serif *Playfair Display* for headings and the highly readable, modern *Inter* for body text.
- **Performance**: High-quality Unsplash images and a background video are utilized, combined with `loading="lazy"` attributes to ensure the site meets the under 3 seconds load time constraint.
