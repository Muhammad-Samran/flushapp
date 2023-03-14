import React from 'react'

const ImageUpload = ({imgURL, setFieldValue, text='Change Image'}) => {
    const baseURL = process.env.REACT_APP_API_URL;
    const uploadHandler = (e) => {
        let tempData = e.target.files[0]
        let data = new FormData();
        data.append("image_file", tempData);

        const config = () => {
            return {
                method: "post",
                headers: new Headers({
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                }),
                body: data,
            }
        };

        return fetch(baseURL + "core/user/upload/media/storage/", config())
            .then((response) => response.json())
            .then((res) => {
                // console.log("res from image upload", res)
                if(imgURL){
                    imgURL(res.profile_url.image_file)
                }
                if(setFieldValue){
                    setFieldValue(res.profile_url.image_file)
                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <label htmlFor="fileUpload">
                <h3 className='secondary-font fs-16 c1 btn-green3 py-3 px-4  w-auto h-auto p-radius30 mb-0'>{text}</h3>
            </label>
            <input hidden id="fileUpload" type="file" onChange={e => uploadHandler(e)} />
        </div>
    )
}

export default ImageUpload
