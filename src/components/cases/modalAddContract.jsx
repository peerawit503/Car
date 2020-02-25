import React, { useState, useEffect } from "react";
import {
    financeInstitution,
    caseSourceAll,
    caseTypeAll,
    caseStatus,
    provinceAll
  } from "../../Utility/dataCase";
  import uuid from "uuid";
  import M from 'materialize-css/dist/js/materialize.min.js'


const ModalAddContract = ({singleCase }) => {


    const [newContract , setNewContract] = useState({
        receive_date:"",
        case_type:"",
        firstname:"",
        lastname:"",
        tel:"",
        tel2:"",
        car_license:"",
        car_province:"",
        car_brand:"",
        car_model:"",
        car_sub_model:"",
        car_year:"",
        old_bank:"",
        new_bank:"",
        approve_amount:"",
        close_amount:"",
        down_amount:"",
        old_finance_total_cost:"",
        total_cost:"",
        amount_received:"",
    })
    const handleChange = (e) => {
        setNewContract({...newContract , [e.target.name] : e.target.value});
    }

    const saveContract = () =>{
        let data = {
        receive_date:newContract.receive_date?newContract.receive_date:singleCase.receive_date,
        case_type:newContract.case_type?newContract.case_type:singleCase.case_type,
        firstname:newContract.firstname?newContract.firstname:firstname(singleCase.firstname),
        lastname:newContract.lastname?newContract.lastname:lastname(singleCase.lastname),
        tel:newContract.tel?newContract.tel:singleCase.cus_tel,
        tel2:newContract.tel2?newContract.tel2:singleCase.cus_tel2,
        car_license:newContract.car_license?newContract.car_license:singleCase.car_license,
        car_province:newContract.car_province?newContract.car_province:singleCase.car_province,
        car_brand:newContract.car_brand?newContract.car_brand:singleCase.car_brand,
        car_model:newContract.car_model?newContract.car_model:singleCase.car_model,
        car_sub_model:newContract.car_sub_model?newContract.car_sub_model:singleCase.car_sub_model,
        car_year:newContract.car_year?newContract.car_year:singleCase.car_year,
        old_bank:newContract.old_bank?newContract.old_bank:singleCase.old_bank,
        new_bank:newContract.new_bank?newContract.new_bank:singleCase.new_bank,
        approve_amount:newContract.approve_amount?newContract.approve_amount:singleCase.approve_amount,
        close_amount:newContract.close_amount?newContract.close_amount:singleCase.close_amount,
        down_amount:newContract.down_amount?newContract.down_amount:singleCase.down_amount,
        old_finance_total_cost:newContract.old_finance_total_cost?newContract.old_finance_total_cost:singleCase.old_finance_total_cost,
        total_cost:newContract.total_cost?newContract.total_cost:singleCase.total_cost,
        amount_received:newContract.amount_received?newContract.amount_received:singleCase.amount_received,
        customer_id : singleCase.customer_id
        }

        let case_id = singleCase.case_id;

        console.log(JSON.stringify(data))
// แก้ api ที่นี่
    //     axios.post(`${url}/note?case_id=${case_id}`, JSON.stringify(data), {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         }
    //       }).then(res => {
    //         M.toast({ html: `${res.data.message}` })
    //    console.log('add success')
            
    //       })
    //         .catch(err => console.log(err))


    }

    const firstname = (name) => {
        if (name){
            return name.split(" ")[0];
        }else{
            return ""
        }
    }

    const lastname = (name) => {
        if (name){
            return name.split(" ")[1];
        }else{
            return ""
        }
    }

    function dateFormat(caseDate) {
        if(caseDate == null){
          return 0;
        }else{
          var mountCaracterString = caseDate.split(" ")[2];
          var dayString = caseDate.split(" ")[1];
          var yearString = caseDate.split(" ")[3];
          var month;
          if (mountCaracterString === 'Jan') {
            month = "01";
          }
          else if (mountCaracterString === 'Feb') {
            month = "02";
          }
          else if (mountCaracterString === 'Mar') {
            month = "03";
          }
          else if (mountCaracterString === 'Apr') {
            month = "04";
          }
          else if (mountCaracterString === 'May') {
            month = "05";
          }
          else if (mountCaracterString === 'Jun') {
            month = "06";
          }
          else if (mountCaracterString === 'Jul') {
            month = "07";
          }
          else if (mountCaracterString === 'Aug') {
            month = "08";
          }
          else if (mountCaracterString === 'Sep') {
            month = "09";
          }
          else if (mountCaracterString === 'Oct') {
            month = "10";
          }
          else if (mountCaracterString === 'Nov') {
            month = "11";
          }
          else if (mountCaracterString === 'Dec') {
            month = "12";
          }
    
          return (caseDate.split(" ")[3]+'-'+month+'-'+caseDate.split(" ")[1]);
         
          }
        }

    return (<div><div id="modalAddContract" className="modal modal-fixed-footer">


        <div className="modal-content modal-content-override">
            <div className="row">
                <div className="header-title">
                    <div className="col s12 m12 no-col-padding">
                        <h4>Contract Information </h4>
                    </div>
                </div>
            </div>
            {/* process bar */}

            {/* body */}
            <div className="cotent-field">
                <div className="row content">


                    <div className="col s6 m4 l4 content">
                        <label>Receiver Date/ วันที่รับเคส</label>
                        <input
                            type="date"
                            name="receive_date"
                            value={newContract.receive_date || dateFormat(singleCase.receive_date) }
                            onChange={handleChange}
                        />
                    </div>



                    <div className="col s6 m4 l4 content">
                        <label>Case Type / ประเภทเคส</label>
                        <select
                            name="case_type"
                            value={newContract.case_type || singleCase.case_type}
                            onChange={handleChange}
                            className="browser-default"
                        >
                            <option value="DEFAULT" disabled>
                                เลือกประเภทเคส{" "}
                            </option>
                            {caseTypeAll.map(ct => (
                                <option key={uuid.v4()} value={ct}>
                                    {ct}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col s12 m12  head-section no-col-padding">
                        <h5>Case Information</h5>
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={newContract.firstname || firstname(singleCase.name)}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={newContract.lastname || lastname(singleCase.name)}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="tel"
                            value={newContract.tel || singleCase.cus_tel}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Phone Number2</label>
                        <input
                            type="text"
                            name="tel2"
                            value={newContract.tel2 || singleCase.cus_tel2}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s12 m12  head-section no-col-padding">
                        <h5>Contract Information</h5>
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Licence Plate No. หมายเลขป้ายทะเบียน</label>
                        <input
                            type="text"
                            name="car_license"
                            value={newContract.car_license || singleCase.car_license}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Province / ป้ายทะเบียนจังหวัด</label>
                        <select
                            name="car_province"
                            value={newContract.car_province || singleCase.car_province}
                            className="browser-default"
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled>
                                เลือกป้ายทะเบียนจังหวัด{" "}
                            </option>
                            {provinceAll.map(pv => (
                                <option key={uuid.v4()} value={pv}>
                                    {pv}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Brand / ยี่ห้อ</label>
                        <input
                            type="text"
                            name="car_brand"
                            value={newContract.car_brand || singleCase.car_brand}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Model / รุ่นรถ</label>
                        <input
                            type="text"
                            name="car_model"
                            value={newContract.car_model || singleCase.car_model}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Sub-model / รุ่นย่อย</label>
                        <input
                            type="text"
                            name="car_sub_model"
                            value={newContract.car_sub_model || singleCase.car_sub_model}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Car Year / ปีรถ</label>
                        <input
                            type="text"
                            name="car_year"
                            value={newContract.car_year || singleCase.car_year}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Current Finance ไฟแนนซ์เดิม</label>
                        <select
                            name="old_bank"
                            value={newContract.old_bank || singleCase.old_bank|| "DEFAULT"}
                            className="browser-default"
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled>
                                เลือกไฟแนนซ์เดิม{" "}
                            </option>
                            {financeInstitution.map(ct => (
                                <option key={uuid.v4()} value={ct}>
                                    {ct}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Finance Institution / สถาบันการเงิน</label>
                        <select
                            name="new_bank"
                            value={newContract.new_bank ||singleCase.new_bank || "DEFAULT"}
                            className="browser-default"
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled>
                                เลือกสถาบันการเงิน{" "}
                            </option>
                            {financeInstitution.map(ct => (
                                <option key={uuid.v4()} value={ct}>
                                    {ct}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Approved Amount / ยอดจัด </label>
                        <input
                            type="number"
                            min="0"
                            name="approve_amount"
                            value={newContract.approve_amount || singleCase.approve_amount}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Close Amount / ยอดปิด </label>
                        <input
                            type="number"
                            min="0"
                            name="close_amount"
                            value={newContract.close_amount || singleCase.close_amount}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>Down Payment / ยอดดาวน์</label>
                        <input
                            type="number"
                            min="0"
                            name="down_amount"
                            value={newContract.down_amount || singleCase.down_amount}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    

                    <div className="col s6 m4 l4 content">
                        <label>ภาระหนี้</label>
                        <input
                            type="text"
                            name="debt"
                            value={newContract.old_finance_total_cost || singleCase.old_finance_total_cost}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>กู้ยืม</label>
                        <input
                            type="text"
                            disabled
                            value={newContract.total_cost || singleCase.total_cost}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>

                    <div className="col s6 m4 l4 content">
                        <label>ชำระให้ผู้กู้ยืม</label>
                        <input
                            type="text"
                            name="amount_received"
                            value={newContract.amount_received || singleCase.amount_received}
                            onChange={handleChange}
                            className="validate"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect btn blue lighten left " onClick={() => saveContract()} > Save </button>
          <button className="modal-close waves-effect btn white black-text right" >close</button>
        </div>
    </div>
    </div>

    );
}
export default ModalAddContract;