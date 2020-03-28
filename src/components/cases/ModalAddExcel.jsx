import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from '../../Utility/url'

const ModalAddExcel = () => {

  const [data, setData] = useState({
    case_source: 'all',
    kk_team: 'all',
    date: 'all',
    s_date: '',
    e_date: ''
  })
 
  const [closeAble , setCloseAble] = useState(false)

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }



  const save = () => {
    if(data.s_date === '' && data.date === 'specific' ){
      alert('กรุณาระบุวันเริ่มต้น');
      
    }
    else if(data.e_date === '' && data.date === 'specific'){
      alert('กรุณาระบุวันสิ้นสุด');
      
    }else{
      let url2 = '';
      if(data.case_source === 'all'){
        url2 = url2 + 'parameter=all&value=all';
        
      }else if (data.case_source === 'Kiatnakin'){
          if (data.kk_team === 'all'){
              url2 = url2 + 'parameter=case_source&value=Kiatnakin'
          }else if(data.kk_team === 'KK'){
              url2 = url2 + 'parameter=team&value=ทีมใหญ่KK'
          }else{
            url2 = url2 + 'parameter=team&value=' + data.kk_team
          }
      }else{
            url2 = url2 + 'parameter=case_source&value=' + data.case_source
      }

      if(data.date === 'all'){
        url2 = url2 + '&date&timestamp=' + Date();
      }else{
        let s_dates = data.s_date.split("-")
        let s_date = s_dates[2] + "/" + s_dates[1] + "/" + s_dates[0];
        let e_dates = data.e_date.split("-")
        let e_date = e_dates[2] + "/" + s_dates[1] + "/" + s_dates[0];
        url2 = url2 + '&date=' + s_date + '-' + e_date + '&timestamp=' + Date();
      }
      var win = window.open(url+'/case_excel_file?'+url2, '_blank');
      win.focus();
      console.log(url2)
    }
    
    

  }
  
  const close = () => {

  }

  function teamGen() {
    let result = [];
    if (data.case_source === 'Kiatnakin') {
      result.push(
        <div className="col s6 m6 l4 content">
          <label>Team</label>
          <select
            type="text"
            value={data.kk_team || 'all'}
            name="kk_team"
            onChange={handleChange}
            className="browser-default"
          >
            <option value="all">
              ALL
                </option>
            <option value="ADC1">
              ADC1
                </option>
            <option value="ADC2">
              ADC2
                </option>
            <option value="ADC3">
              ADC3
                </option>
            <option value="KK">
              ทีมใหญ่KK
                </option>

          </select>
        </div>
      );
    }
    return result;
  }


  function dateGen() {
    let result = [];
    if (data.date === 'specific') {
      result.push(
        <div className="col s6 m4 l4 ">
          <label htmlFor="birthday">ตั้งแต่วันที่</label>
          <input
            type="date"
            name="s_date"
            value={data.s_date}
            onChange={handleChange}
          />
         
         
        </div>
      );
      result.push(
        <div className="col s6 m4 l4 ">
          <label htmlFor="birthday">ถึงวันที่</label>
          <input
            type="date"
            name="e_date"
            value={data.e_date}
            onChange={handleChange}
          />
           
        </div>
      );
    }
    return result;
  }

  




  return (
    <div>
      <div id="modalAddExcel" className="modal modal-fixed-footer">

        <div className="row">
          <div className="header-title">
            <div className="col s12 m12 no-col-padding">
              <h5>Excel</h5><br />


            </div>
          </div>
        </div>
        {/* process bar */}

        {/* body */}
        <div className="cotent-field">
          <div className="row content">
            <div className="row col s12 crop">
              <div className="col s6 m6 l4 content">
                <label>Case Source</label>
                <select
                  type="text"
                  value={data.case_source || 'all'}
                  name="case_source"
                  onChange={handleChange}
                  className="browser-default"
                >
                  <option value="all">
                    ALL
                </option>
                  <option value="Thanachart">
                    Thanachart
                </option>
                  <option value="Kiatnakin">
                    Kiatnakin
                </option>
                  <option value="Cartrust">
                    Cartrust
                </option>
                  <option value="Dealer">
                    Dealer
                </option>

                </select>
              </div>
              {teamGen()}
            </div>

            <div className="row col s12 crop">
              <div className="col s6 m6 l4 content">
                <label>Date</label>
                <select
                  type="text"
                  value={data.date || 'all'}
                  name="date"
                  onChange={handleChange}
                  className="browser-default"
                >
                  <option value="all">
                    ทุกช่วงเวลา
                </option>
                  <option value="specific">
                    ระบุช่วงเวลา
                </option>


                </select>
              </div>
              {dateGen()}
            </div>

          </div>

        </div>





        <div className="modal-footer">
          <button className="waves-effect btn white black-text left" onClick={() => save()}>Save</button>
          <button className="modal-close waves-effect btn white black-text right" onClick={() => close()} >close</button>
        </div>
      </div>

    </div >
  )
}

export default ModalAddExcel
