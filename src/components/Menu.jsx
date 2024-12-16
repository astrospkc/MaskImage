import { Canvas, Circle, FabricImage, Image, PencilBrush } from "fabric";
import React, { useContext, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import * as fabric from "fabric";
import axios from "axios";
import PropTypes from "prop-types";
// import { settingContext } from '../context/ContextProvider';

const Menu = ({ canvas }) => {
  const [imageIconClicked, setImageIconClicked] = useState(false);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const handleUploadImage = (e) => {
    setFile(e.target.files[0]);
    if (canvas) {
      console.log(e.target.files);
      const file = e.target.files[0];
      console.log("file: ", file);
      let reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target?.result;

        let imgElement = document.createElement("img");
        imgElement.src = imgUrl;
        imgElement.onload = function () {
          let fabImage = new FabricImage(imgElement, {
            left: 0,
            top: 0,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          canvas.on("path:created", (e) => {
            console.log("clip path: ", e.path);
          });
          // var clipPath = new Circle({
          //     radius: 40,
          //     top: -40,
          //     left: -40,
          // });
          // fabImage.clipPath = clipPath;

          canvas.add(fabImage);
          canvas.centerObject(fabImage);
          canvas.setActiveObject(fabImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageIcon = () => {
    setImageIconClicked(!imageIconClicked);
  };

  let dataUrl;
  const handleDownload = (e) => {
    if (canvas) {
      dataUrl = canvas.toDataURL({
        format: "png",
        quality: 0.8,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  // is ready to save = true, then
  // save the image button clicked a input tag pops up , write the image name
  // isready to save = true, then formdata, send the image to the backend , like all the data and it gets saved to the db.

  const handleSaveImage = (e) => {
    setIsReadyToSave(!isReadyToSave);
  };

  const handleProceedToUpload = async (e) => {
    e.preventDefault();
    console.log(file, fileName);
    const formData = new FormData();
    const response = await fetch(dataUrl);
    console.log("response: ", response);
    const blob = await response.blob();
    if (file) {
      formData.append("rough_image_media_url", file, file.name);
      formData.append("rough_image_name", fileName);
      console.log("form data: ", formData);
    }

    try {
      const tryUploadImage = await axios.post(
        `${import.meta.env.VITE_URL}/roughImage/uploadImage`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await tryUploadImage.data;
      console.log("data: ", data);
    } catch (error) {
      console.error("error uplaoding image", error);
      throw new Error(error);
    }

    setIsReadyToSave(!isReadyToSave);
  };

  return (
    <div className="flex flex-row gap-4 border-2 border-gray-600 rounded-lg p-1 items-center ">
      <BsCardImage
        onClick={handleImageIcon}
        className=" hover:scale-150 cursor-pointer ease-in-out duration-500 hover:text-yellow-400"
      />
      {imageIconClicked && (
        <div>
          <input type="file" onChange={handleUploadImage} />
        </div>
      )}
      {/* this will save the image to the database of the user */}
      <button onClick={handleSaveImage}>Save the image</button>
      {isReadyToSave && (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="image name"
            onChange={(e) => setFileName(e.target.value)}
          />
          <button onClick={handleProceedToUpload}>Proceed to upload</button>
        </div>
      )}
      <button onClick={handleDownload}>Download the image</button>
    </div>
  );
};

Menu.propTypes = {
  canvas: PropTypes.instanceOf(Canvas).isRequired, // Ensure canvas is of type fabric.Canvas
};

export default Menu;

// image upload section , mask drawing option , download the image, export the image
