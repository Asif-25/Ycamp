# CampRave - Camping Location Crowdsourced Ratings Website

CampRave is a web platform that allows users to review and view crowd-sourced ratings for camping locations. It provides a user-friendly interface for campers to share their experiences and rate various camping sites. The platform also integrates with Mapbox API to display camping locations on an interactive map.
## Live Demo

Check out CampRave : [camp-rave-live](https://camp-rave.onrender.com/)



![Screenshot 0 Homepage](/public/img/0.png)
![Screenshot 1 camping locations](/public/img/1.png)
![Screenshot 2 camping locations](/public/img/2.png)
![Screenshot 3 campground](/public/img/3.png)
![Screenshot 4 Ratings](/public/img/4.png)


## Features
- Browse camping locations based on user ratings and reviews.
- View camping sites on an interactive map powered by Mapbox API.
- Submit your own reviews and ratings for camping locations.
- User authentication and profile management.
- Responsive design for seamless usage on different devices.

## Technologies Used

- HTML, CSS, and JavaScript for front-end development.
- Node.js and Express for server-side development.
- MongoDB for database management.
- Mapbox API for interactive maps.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB database setup.

### Installation

1. Clone the repository: `git clone https://github.com/asif158/CampRave.git`
2. Navigate to the project directory: `cd CampRave`
3. Install dependencies: `npm install`
4. Add Environment Variables in `/.env` file.

5. Edit the `.env` file to add your environment variables:
    ```plaintext
    # MongoDB
    DB_URL=your_DB_URL

    # Mapbox API
    MAPBOX_TOKEN=your_MAPBOX_API_KEY

    # Cloudinary API
    CLOUDINARY_KEY=your_CLOUDINARY_API_KEY
    CLOUDINARY_CLOUDNAME=your_CLOUDINARY_CLOUDNAME
    CLOUDINARY_SECRET=your_CLOUDINARY_SECRET

    # Secret
    SECRET=anyrandomvalue
    ```
6. run the database connection in `/seeds/index.js`.
7. Start the server: `npm start`

### Usage

1. Visit `http://localhost:3000` in your web browser.
2. Browse camping locations, read reviews, and explore the map.
3. To contribute and submit your own reviews, sign up or log in to your account.

## Contributing
Contributions to CampRave are welcome! If you have any ideas, bug fixes, or enhancements, please feel free to open an issue or submit a pull request on the GitHub repository. Your contributions will be greatly appreciated.

To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request detailing your changes.
