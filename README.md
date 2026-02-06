# Build Your First App 26

This project uses [@arcgis/map-components](https://developers.arcgis.com/map-components/), a set of web components for building mapping applications with the [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/). It uses [Vite](https://vitejs.dev/) for building a modern web application.

## View Live

https://sagewall.github.io/build-your-first-app-26/

## Project Structure

```
index.html
package.json
vite.config.js
public/
src/
  main.js
  style.css
```

- **index.html**: The main HTML file.
- **package.json**: Project metadata and dependencies.
- **vite.config.js**: Vite configuration file.
- **public/**: Static assets.
- **src/**: Source code for your app.
  - **main.js**: Entry point for the application.
  - **style.css**: Main stylesheet.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and go to [http://localhost:5173](http://localhost:5173) (default Vite port).

### Build for Production

To build the app for production:

```sh
npm run build
# or
yarn build
```

The output will be in the `dist/` directory.

### Resources

- [@arcgis/map-components documentation](https://developers.arcgis.com/map-components/)
- [ArcGIS Maps SDK for JavaScript Guide](https://developers.arcgis.com/javascript/latest/)
- [API Reference](https://developers.arcgis.com/javascript/latest/api-reference/)

These tools make it easy to add advanced mapping and GIS features to your web applications.

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [Vite Config Reference](https://vitejs.dev/config/)
