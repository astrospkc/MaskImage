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
7. npm i font-awesome

tailwind.config.js -> 
```
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
   
### Problems:

1. got stuck in Static canvas and canvas : which one to use, later found out that static canvas has very little functionality but Canvas has all functionality which is being used in the project, like mouse drag and many more.

2. While uploading an image there was an issue:
   ```reader.onload = function () {
            let imgUrl = e.target.result
            console.log("imgurl: ", imgUrl)
            let imgElement = document.createElement("img");
            imgElement.src = imgUrl;
            imgElement.onload = function () {
                let fabImage = new FabricImage(imgElement)

                canvas.add(fabImage);
                canvas.centerObject(fabImage)
                canvas.setActiveObject(fabImage)
            }
        }
        imgElement value undefined```
  
  modified the above code :
  ```reader.onload = (e) => {
            const imgUrl = e.target?.result
            console.log("imgurl: ", imgUrl)
            let imgElement = document.createElement("img");
            imgElement.src = imgUrl;
            imgElement.onload = function () {
                let fabImage = new FabricImage(imgElement)

                canvas.add(fabImage);
                canvas.centerObject(fabImage)
                canvas.setActiveObject(fabImage)
            }
        }
        reader.readAsDataURL(file)```
3. The main problem arises to set up brush control.
4. Clipping mask and now this is the main problem I faced


### Learned:

1. fabric.js render its own getContext, we don't need to explicitly define context
    ``` let ctx = canvas.getContext('2d') // we don't need to do this
    ```
        

### experimented:

```var ctx = canvas.getContext("2d")
  console.log("ctx: ", ctx)
  ctx.strokeStyle = "red"
  ctx.lineWidth = 5
  ctx.beginPath();
  ctx.moveTo(9, 5);
  ctx.lineTo(100, 90);
  ctx.shadowColor = "blue";
  ctx.shadowOffsetX = 1;
  ctx.shadowBlur = 2;
  ctx.closePath();
  ctx.stroke()
```


