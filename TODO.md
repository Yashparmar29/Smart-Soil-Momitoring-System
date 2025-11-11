# TODO: Add Modern Admin Panel to Smart Soil Monitoring System

## Steps to Complete

- [x] Update script.js to support multiple users with roles (store as 'smartsoil_users' array, default role 'user', set 'admin' for username 'admin')
- [x] Modify registerUser function to add new users to the array with appropriate role
- [x] Modify loginUser function to authenticate against the users array
- [x] Add role check function and update navigation to show/hide admin link based on role
- [x] Create admin.html with modern responsive design, including sidebar, header, user management table, and system overview links
- [x] Update sidebar in dashboard.html to conditionally include "Admin" link for admins
- [x] Update sidebar in fields.html to conditionally include "Admin" link for admins
- [x] Update sidebar in alerts.html to conditionally include "Admin" link for admins
- [x] Update sidebar in reports.html to conditionally include "Admin" link for admins
- [x] Update sidebar in settings.html to conditionally include "Admin" link for admins
- [x] Update style.css with modern styles for admin panel (responsive grid, cards, tables)
- [x] Test registration, login, admin access, and navigation
