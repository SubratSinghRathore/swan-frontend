import React, { useEffect, useState } from 'react'

export default function Cloudinary() {

  const [image, setImage] = useState("")
  function fileHandle() {

    const file = image[0]
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "aman_preset")
    data.append("cloud_name", "dfaweaiq5")

    fetch('https://api.cloudinary.com/v1_1/dfaweaiq5/image/upload', {
      method: 'POST',
      body: data
    })
      .then(async (res) => {
        const json = await res.json()
        console.log(json)
        window.location = json.url
      })
      

  }




  return (
    <>
      <input className='border-1' type="file" onChange={(e) => { setImage(e.target.files) }} />
      <button onClick={fileHandle}>upload</button>
    </>
  )
}
