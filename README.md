# invoice-tracker

A simple invoice tracking application to keep track of the invoices raised and their corresponding amounts

## Technologies Used:
  - Front-end
    - VueJS
  - Back-end
    - Firebase

## Features

- [x] Authentication
  - Sign up with email, password
  - SignIn
  - SignOut
- [x] Registered users can create/update/delete invoices
- [x] Updation/Deletion of invoice is restricted only to the created user.
- [x] Admin can view the list of all invoices in a tabular view
- [x] Admin can filter the invoices by selecting a date range
- [x] Users can view the list of their own invoices in a tabular view.
- [x] Users can filter the invoices by selecting a date range.
- [x] Admin can view the list of all invoices in a bar chart view with date on x-axis and number of invoices on y-axis.
- [x] Users can view the list of their own invoices in a bar chart view with date on x-axis and number of invoices on y-axis.
- [x] Admin can view the list of all invoices in a bar chart view with users on x-axis and number of invoices on y-axis.

## Future Works
- Optimize code
- Implement DRY approach
- Implement store
- Reduce queries to the backend
- Implement PWA



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
