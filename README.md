# DevTinder

- Created a vite + React application
- Remove unecessary code
- Install Tailwind Css
- install daisy ui
- Add Navbar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react-router
- Create BrowserRouter and inside the BrowserRouter have Routes Component, inside Routes Component we have Route , this route refers to Body or home page and inside Body have multiple route children

Create BrowserRouter > Routes > Route = /Body > RouteChildren

- Create an Outlet in your Body Component
- Create a login page
- - Install axios --> npm i axios
- CORS - install cors in backend => add middleware to with configuration : origin, withCredentials : true
- whenever you are passing API call so pass in axios => {withCredentials : true }
- Install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => add Provider to your root file(app.jsx) => createSlice => add reducer to store
- Add redux devtool in chrome
- login and see if your data is coming properly in the store
- NavBar should update as soon as user logged in
- Refactor our code to constants file + create component folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and the feed into the store
- Build the UserCard on the feed
- Edit Profile Feature

Body
NavBar
Route = / => Feed
Route = /login => Login
Route = /connections => Connections
Route = /profile => profile
