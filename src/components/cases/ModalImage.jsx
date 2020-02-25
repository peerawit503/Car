import React, { useState, useEffect } from 'react'
import photo from '../../img/photo.png';
import url from "../../Utility/url";
import axios from "axios";

const ModalImage = ({ singleCase }) => {

  const [openTrigger, setOpenTrigger] = useState(false);
  const [image, setImage] = useState({
    take_car_picture: "",
    car_license_book_picture: "",
    license_id_picture: ""

  })

  const openAddImageForm = () => {
    setOpenTrigger(true)
  }

  const handleChangeFile1 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage({ ...image, take_car_picture: reader.result });
  };

  const handleChangeFile2 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage({ ...image, car_license_book_picture: reader.result });
  };

  const handleChangeFile3 = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage({ ...image, license_id_picture: reader.result });
  };

  function form() {
    let result = [];

    if (openTrigger) {
      result.push(
        <div>
          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปรถ</label>
            <input
              type="file"
              name="take_car_picture"
              onChange={handleChangeFile1}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปเล่มทะเบียน</label>
            <input
              type="file"
              name="car_license_book_picture"
              onChange={handleChangeFile2}
            />
          </div>

          <div className="col s6 m4 l4 content">
            <label htmlFor="Picture">รูปใบขับขี่</label>
            <input
              type="file"
              name="license_id_picture"
              onChange={handleChangeFile3}
            />
          </div>
        </div>
      )
    }
    return result;
  }

  const save = () => {
    let data = JSON.stringify(image)
    console.log(data)
    axios.post(`${url}/picture?case_id=${singleCase.case_id}`, image)
      .then(res => {
        // M.toast({ html: `${res.data.message}` })
        console.log("######## add image result #########");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const cancel = () => {
    setOpenTrigger(false);
    setImage({
      take_car_picture: "",
      car_license_book_picture: "",
      license_id_picture: ""
    })
  }

  function button() {
    let result = []
    if (openTrigger) {
      result.push(
        <button className="waves-effect btn blue lighten left " onClick={() => save()}>Save</button>

      )
      result.push(<button className="waves-effect btn white black-text right " onClick={() => cancel()}>Cancel</button>);
    } else {
      result.push(
        <button className="waves-effect btn blue lighten left " onClick={() => openAddImageForm()}>Add Image</button>
      );
      result.push(
        <button className="modal-close waves-effect btn white black-text right" >close</button>
      )
    }
    return result;
  }

  return (
    <div>
      <div id="modalImage" className="modal modal-fixed-footer">

        <div className="modal-content modal-content-override">
          <div className="row content">

            <div className="col s12 m12">
              <img src={image.take_car_picture || singleCase.take_car_picture || photo} alt="take_car_picture" className="userImage" />
            </div>
            <div className="col s12 m12">
              <img src={image.car_license_book_picture || singleCase.car_license_book_picture || photo} alt="take_car_picture" className="userImage" />

            </div>
            <div className="col s12 m12">
              <img src={image.license_id_picture || singleCase.license_id_picture || photo} alt="take_car_picture" className="userImage" />


            </div>


            {form()}
          </div>
        </div>
        {/* process bar */}

        {/* body */}







        <div className="modal-footer">
          {/* <button className="waves-effect btn blue lighten left " onClick={() => openAddImageForm()}>Add Image</button> */}
          {button()}
        </div>
      </div>
    </div>


  )
}

export default ModalImage
