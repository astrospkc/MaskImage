# Approach to the problem

### Create a simple image inpainting widget where users can:

1. Upload an image.
2. Draw on the image to create a mask.
3. Export and display the original image and the mask image as a pair.

## Core features:

1. Image upload
2. Mask Drawing 
3. Brush Control
4. Export the mask
5. Display the image

## project setup

1. npm create vite@latest
2. npm install
3. npm i fabric
4. npm react-router-dom
5. npm install -D tailwindcss postcss autoprefixer
6. npx tailwindcss init -p

tailwind.config.js -> 
```
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
   
### Problems:

1. got stuck in Static canvas and canvas : which one to use, later found out that static canvas has very little functionality but Canvas has all functionality which is being used in the project, like mouse drag and many more.