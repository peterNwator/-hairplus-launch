Hairplus_Launch_Kit_v2

Contents:
- app/ (static module-based demo app)
- assets/LOGO.jpg (your logo)
- stylist_seed.csv (5 sample stylists for Port Harcourt)
- .env (pre-filled with Termii key and SMS receiver)
- termii_apps_script.txt (Apps Script for Google Sheets to send Termii SMS)
- marketing_checklist.txt (9-day pre-launch plan)

Quick preview (local):
1. Open app/public/index.html in a browser to run the demo locally.
2. For deployment, upload the 'app' folder to Vercel or Netlify as a static site.
3. After deployment, create a Google Sheet and set up Apps Script to capture bookings and send SMS.

Setup summary:
- Replace BOOKING_SHEET_ID in .env with your Google Sheet ID.
- In Google Sheet: Extensions > Apps Script -> paste termii_apps_script.txt content. Ensure script has permissions and set trigger on form submit.
- Share the sheet with hairpplus@gmail.com as Editor if needed.
- Add Google Maps API key to .env for autocomplete/geocoding features.

Security note:
- Termii API key included at your request. For production, rotate keys and use secret management.
