import { FabricImage, Image } from 'fabric';
import React, { useState } from 'react'
import { BsCardImage } from "react-icons/bs";


const Menu = ({ canvas }) => {
    const [imageIconClicked, setImageIconClicked] = useState(false);

    const handleUploadImage = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0];
        console.log("file: ", file)
        let reader = new FileReader();

        reader.onload = (e) => {
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
        reader.readAsDataURL(file)
    }


    const handleImageIcon = () => {
        setImageIconClicked(!imageIconClicked);
    }
    return (
        <div className='flex flex-row gap-4 border-2 border-gray-600 rounded-lg p-1 items-center '>
            <BsCardImage onClick={handleImageIcon} className=' hover:scale-150 cursor-pointer ease-in-out duration-500 hover:text-yellow-400' />
            {imageIconClicked &&
                <div>
                    <input type="file" onChange={handleUploadImage} />

                </div>
            }
            {/* this will save the image to the database of the user */}
            <button>Save the image</button>
            <button>Download the image</button>
        </div>
    )
}

export default Menu

// image upload section , mask drawing option , download the image, export the image
