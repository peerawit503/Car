import React, { useState, useEffect } from 'react'
import Navbar from './../layout/Navbar';
// import ModalView1 from './ModalView1';
import 'rsuite/dist/styles/rsuite-default.css'

import ModalAddCase from './ModalAddCase';
import ModalAddNote from './ModalAddNote';
import ModalSummary from './ModalSummary';
import ModalFastTrack from './ModalFastTrack';
import ModalDeleteCase from './ModalDeleteCase';
import ModalAddExcel from './ModalAddExcel';
import url from '../../Utility/url'
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js'
// import B from 'bootstrap/dist/css/bootstrap.min.css';
import { useParams} from "react-router";
import { connect } from "react-redux";
import ActionUser from "../../actions/actionUser";

import MaterialTable from 'material-table';
/* modify*/
import '../table.css';
import './style.css';
/* image */

import alert from '../../img/alert.png';
import alertYellow from '../../img/alert-yellow.png';

import confirmIcon from '../../img/confirm.png';
import confirmIconDisable from '../../img/correctDisable.png';
import sumary from '../../img/report.png';
import plus from '../../img/plus-white.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

/* Mockdata */

// import caseData from './data.json';




const Cases = (props) => {


  const [cases, setCases] = useState([])
  const [kpi, setKpi] = useState([])
  const [operatorS, setOperatorS] = useState([])
  const [singleCase, setSingleCase] = useState([])
  let { param } = useParams();


  const [isLoading, setisLoading] = useState(true)

  // page

  const [limitPage, setLimitPage] = useState(20)
  const [totalCase, setTotalCase] = useState(0)
  const [totalPage, setTotalPage] = useState(Math.ceil(totalCase / limitPage))
  const [currentCaseSource , setCurrentCaseSource] = useState("ALL")
  const [caseTable1 , setCaseTable1] = useState(0)
  const [caseTable2 , setCaseTable2] = useState(0)



  const [columnObject , setColumnObject] = useState([
  ]);


  useEffect(() => {
    getKpi()
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
      coverTrigger: false,
      autoTrigger: true,
      constrainWidth: true
    });
    M.Modal.init(document.querySelectorAll('.modal'), {})
    M.Modal.init(document.querySelectorAll('#ModalDeleteCase'), {})
    M.FormSelect.init(document.querySelectorAll('select'), {});
    getAllCase()
   
    getOperatorS()
  }, [])



  const getAllCase = () => {
    setisLoading(true);
    if(param){
      if(param === 'CS'){
        axios.get(`${url}/case_1_3?case_source`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'TF'){
        axios.get(`${url}/case_4_14?case_source`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'FT'){
        axios.get(`${url}/case_15_16?case_source`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }else{
        setCases({});
        setTotalCase(0);
        setisLoading(false);
      }
    }else{
      axios.get(`${url}/case_all`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
    }
    


  }

  const getAllCaseWithCaseSource = (casesource) => {
    setisLoading(true);
    if(param){
      if(param === 'CS'){
        axios.get(`${url}/case_1_3?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'TF'){
        axios.get(`${url}/case_4_14?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'FT'){
        axios.get(`${url}/case_15_16?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }else{
        setCases({});
        setTotalCase(0);
        setisLoading(false);
      }
    }else{
      axios.get(`${url}/search_case?parameter=case_source&value=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
    }
    


  }

  const getKKCase_1_5 = (casesource) => {
    setisLoading(true);
    axios.get(`${url}/case_1_5?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))


  }

  const getKKCase_6_9 = (casesource) => {
    setisLoading(true);
    axios.get(`${url}/case_6_9?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))


  }

  const getKKCase_10_16 = (casesource) => {
    setisLoading(true);
    axios.get(`${url}/case_10_16?case_source=${casesource}`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))


  }

  const getCartrustCase = (casesource) => {
    setisLoading(true);
    if(param){
      if(param === 'CS'){
        axios.get(`${url}/case_1_3?case_source=Cartrust`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'TF'){
        axios.get(`${url}/case_4_14?case_source=Cartrust`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'FT'){
        axios.get(`${url}/case_15_16?case_source=Cartrust`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }else{
        setCases({});
        setTotalCase(0);
        setisLoading(false);
      }
    }else{
    axios.get(`${url}/case_cartrust`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
    }

  }

  const getDealerCase = (casesource) => {

    if(param){
      if(param === 'CS'){
        axios.get(`${url}/case_1_3?case_source=Dealer`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'TF'){
        axios.get(`${url}/case_4_14?case_source=Dealer`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }
      else if(param === 'FT'){
        axios.get(`${url}/case_15_16?case_source=Dealer`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))
      }else{
        setCases({});
        setTotalCase(0);
        setisLoading(false);
      }
    }else{

    setisLoading(true);
    axios.get(`${url}/case_dealer`)
      .then(res => {
        setCases(res.data.message);
        setTotalCase(res.data.message.length);
        setisLoading(false);
        // console.log("in getAllCase")
        // console.log('Case' , res.data.message);
      })
      .catch(err => console.log(err))

    }
  }

  const getSpecificCase = (casesource , group) =>{
    setCurrentCaseSource(casesource)
    if (casesource==='ALL'){
      
      getAllCase()
    }
    else if (casesource === 'KK'){
     if(param){
      getAllCaseWithCaseSource("Kiatnakin")
     }else{
      setCaseTable1(group)
      if(group === 0){
       getAllCaseWithCaseSource("Kiatnakin")
      }
      else if ( group === 1){
        getKKCase_1_5("Kiatnakin")
      }
      else if (group === 2){
        getKKCase_6_9("Kiatnakin")
      }
      else if (group === 3){
        getKKCase_10_16("Kiatnakin")
      }
     }
     
    }
    else if (casesource === 'TB'){
      if(param){
        getAllCaseWithCaseSource("Thanachart")
      }else{
        setCaseTable2(group)
        if(group === 0){
          getAllCaseWithCaseSource("Thanachart")
        }
        else if ( group === 1){
          getKKCase_1_5("Thanachart")
        }
        else if (group === 2){
          getKKCase_6_9("Thanachart")
        }
        else if (group === 3){
          getKKCase_10_16("Thanachart")
        }
      }
      
     }

    if (casesource === 'CT'){
      
      getCartrustCase()
    }

    if (casesource === 'DL'){
     
      getDealerCase()
    }

    console.log(casesource , " : " , group)
  }
const getKpi = () => {
    axios.get(`${url}/date`)
      .then(res => {
        setKpiForUse(res.data.message);

      })
      .catch(err => console.log(err))
  }
  
  const setKpiForUse = (kpiData) => {

    var result = [];
    var red;
    var orange;
    for (var x of kpiData) {
      // var element = {};
      red = x.case_type + '_red';
      orange = x.case_type + '_orange';
      result[red] = x.red;

      result[orange] = x.orange;

    }
    console.log('KPI' , result)
    setColumnObject([
      {
        title: '',
        render: rowData => <div style={{ width: 10, borderRadius: '50%' }}>{displayStarRating(rowData , result)}</div>,
        cellstyle: {
          width: 50
        }
      },
      {
        title:'Total Date',
        field:'total_date',
        defaultSort:'desc',
        render: rowData => <div className={colorFromDate(rowData , result)}>{rowData.total_date}</div>
      },
      {
        title:'Receive Date',
        field:'receive_date',
        render: rowData => <div>{rowData.receive_date.split(" ")[1]+' ' + rowData.receive_date.split(" ")[2] + ' ' + rowData.receive_date.split(" ")[3]}</div>
      },
   
      { title: 'JOB No', field: 'job_id' },
      {
        title: 'Customers Name',
        field: 'name',
        render: rowData => <div className="customer-name-col">{rowData.name}</div>
      },
      { title: 'Car License', field: 'car_license' },
      {
        title: 'Case Status', field: 'next_status',
        lookup: {
          'receive': 'รอรับเคส',
          'contact_customer': 'รอติดต่อลูกค้า',
          'account_closing': 'รอปิดเล่ม',
          'transfer_doc_submitted': 'รอยื่นชุดโอน',
          'book_received': 'รอได้รับเล่ม',
          'submit_book_transfer': 'รอส่งงานโอนทะเบียน',
          'car_check_up': 'รอตรวจสภาพรถ',
          'book_transfer': 'รอโอนเล่มทะเบียน',
          'book_copy_received': 'รอรับสำเนาเล่ม',
          'deposit_doc_to_new_bank': 'รอส่งเอกสารเบิกเงินธนาคารใหม่',
          'cash_received': 'รอเงินเข้าบัญชีคาร์ทรัส',
          'book_received_back': 'รอรับเล่มคืน',
          'submit_book_to_new_finance': 'รอส่งเล่มให้ไฟแนนซ์ใหม่',
          'submit_book_deposit_return': 'รอทำเรื่องเบิกมัดจำคืน',
          'book_deposit_received': 'รอเงินมัดจำคืนเข้าบัญชี',
          'complete':'เสร็จสิ้น'
        },
        //  defaultGroupOrder: 0,
        sorting: false
      },
      {
        title: 'Last Update',
        field: 'status_date',
        render: rowData => <div>{statusDate(rowData)}</div>
      },
      { title: 'Case receiver', field: 'case_receiver' },
      {
        title: 'Case Soure', field: 'case_source',
        lookup: {
          'Kiatnakin': 'Kiatnakin',
          'Thanachart': 'Thanachart',
          'Cartrust': 'Cartrust',
          'Dealer': 'Dealer'
        },
      },
      {
        title: '',
        render: rowData =>
          <div className="menu-icon">
            <a href="#modalSummary" className="modal-trigger" onClick={() => handleSingleCase(rowData)}> <img src={sumary} className="png-icon" alt="sumary-icon" /></a>
            {alertCheck(rowData , result)}
          </div>
      }])
    setKpi(result);

  }
  

  // const getCaseLimit = () => {
  //   axios.get(`${url}/case_limit?size=${limitPage}&page=${currPage}`)

  // }

  const deleteCase = (caseId) => {
    axios.delete(`${url}/delete_case?case_id=${caseId}`)
      .then(res => {
        M.toast({ html: `${res.data.message}` })
        // setisLoading(true);
        getAllCase()
      })
      .then(err => console.log(err))
  }

  const handleSingleCase = (caseInRow) => {
    setSingleCase(caseInRow)
  }
  
  // const prevPage = () => {
  //   setCurrPage(currPage - 1)

  // }

  // const nextPage = () => {
  //   setCurrPage(currPage + 1)
  // }

  // const getAllCustomers = () => {
  //   // setCustomers(fackeCustomer)

  //   axios.get(`${url}/customer_limit?size=50&page=2`)
  //     .then(res => {
  //       setCustomers(res.data.message)
  //     })
  //     .catch(err => { console.log(err) })
  //   // setCustomers(customerData.message);
  // }

  // const filter = (filter,value) =>{
  //   axios.get(`${url}/search_case?parameter=${filter}&value=${value}`)
  //     .then(res => {
  // console.log(res.data.message)
  // setCases(res.data.message)
  //     })
  //     .catch(err => console.log(err))

  // }
  const getOperatorS = () => {

    axios.get(`${url}/dropdown?table=finance_staff`)
      .then(res => {
        setOperatorS(res.data.message);
      })
    }

  const saveProcess = (data) =>{
    let sendData = {
      ...data,
      user_id: props.user.id
    }
    axios.post(`${url}/fast_tracking2?case_id=${data.case_id}` , sendData)
    .then(res => {
      getSpecificCase(currentCaseSource,currentCaseSource==='KK'?caseTable1:caseTable2)
      console.log(res)
    }).catch(err => console.log(err))
  }
  
    

  const confirm = (singleCase,date,checkCar) => {
    //console.log("deposit"+singleCase.f2_deposit_12);
    
    if(singleCase.status === 'contact_customer' ||singleCase.status === 'deposit_doc_to_new_bank'||singleCase.status ==='submit_book_to_new_finance'  || singleCase.status === 'cash_received'){ // status contack_customer send tracking = account_closing and deposit_12
      var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date , deposit_12:singleCase.f2_deposit_12});
    }else if(singleCase.status === 'account_closing' && singleCase.f2_deposit_12 > 0){ //status = account_closing send tracking = book_received 
      var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date });
      }else if((singleCase.status === "book_received" )){ // status = book_received send tracking = subnit_book_transfer and submit_book_transfer_check
        var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date, submit_book_transfer_check:singleCase.submit_book_transfer_check});
      }else if(singleCase.status === 'submit_book_transfer'){// status = submit_book_transfer send tracking car_check_up and yes_no
      var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date, yes_no:checkCar.d1?"yes":"no"});
      }else if(singleCase.status === 'deposit_doc_to_new_bank'){// status = submit_book_transfer send tracking car_check_up and yes_no
      var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date, deposit_12:singleCase.f2_deposit_12});
      // if ((singleCase.status === "car_check_up" && (singleCase.case_source === "Cartrust" || singleCase.case_source === "Dealer"))){
    //   var data = JSON.stringify({ tracking: 'submit_book_deposit_return', user_id: props.user.id ,date:date , deposit_12:singleCase.f2_deposit_12});
    // }else if ((singleCase.status === "submit_book_deposit_return" && (singleCase.case_source === "Cartrust" || singleCase.case_source === "Dealer"))){
    //   var data = JSON.stringify({ tracking: 'book_copy_received', user_id: props.user.id ,date:date});
    // }else if ((singleCase.status === "book_copy_received" && (singleCase.case_source === "Cartrust" || singleCase.case_source === "Dealer"))){
    //   var data = JSON.stringify({ tracking: 'deposit_doc_to_new_bank', user_id: props.user.id ,date:date});
    //   }else if((singleCase.status === "transfer_doc_received" || singleCase.status === "deposit_doc_to_new_bank")){
    //     console.log("incase 2");
    //     var data = JSON.stringify({ tracking: nextStep(singleCase.status), user_id: props.user.id ,date:date, deposit_12:singleCase.f2_deposit_12});
    //   }else if((singleCase.status === "account_closing" )){
    //     console.log("incase 2");
    //     var data = JSON.stringify({ tracking: nextStep(nextStep(singleCase.status)), user_id: props.user.id ,date:date});
    //   }else if (singleCase.status === 'book_received_back') {
    //     var data = JSON.stringify({ tracking: nextStep(nextStep(singleCase.status)), user_id: props.user.id ,date:date ,deposit_12:singleCase.f2_deposit_12 });
      }else{
        //nomal fasttrack
        console.log("ft normal");
        
        var data = JSON.stringify({ tracking: caseStatusShift(singleCase.status), user_id: props.user.id ,date:date});
      } 
      console.log('###### data ########');
      console.log(data);
      axios.post(`${url}/fast_tracking?case_id=${singleCase.case_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        console.log('#####  RES  ######');
        console.log('Case', res.data.message);
        M.toast({ html: `${res.data.message}` })
      // setisLoading(true);
      getSpecificCase(currentCaseSource,currentCaseSource==='KK'?caseTable1:caseTable2)
      })
        .catch(err => console.log(err))
  }

  const confirm_sub = (singleCase,date) => {
    
    var data = JSON.stringify({ tracking: 'transfer_doc_received', user_id: props.user.id ,date:date});
    console.log('###### data ########');
    console.log(data);
    axios.post(`${url}/fast_tracking2?case_id=${singleCase.case_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('#####  RES  ######');
      console.log('Case', res.data.message);
      M.toast({ html: `${res.data.message}` })
      getAllCase()
      // setisLoading(true);
    })
      .catch(err => console.log(err))
}

  const saveNote = (newNote, singleCase) => {
    // setNewNote({note : newNote.note, tracking: singleCase.status , user_id : 'mock'})
    var data = JSON.stringify({ note_status: newNote.note, tracking: singleCase.next_status, user_id: 'mock' });
    console.log('###### data ########');
    console.log(data);
    axios.post(`${url}/note?case_id=${singleCase.case_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log('#####  RES  ######');
      console.log('Case', res.data.message);
 
      getSpecificCase(currentCaseSource,currentCaseSource==='KK'?caseTable1:caseTable2)
    })
      .catch(err => console.log(err))
  }

  

  const saveNewCase = (newCase, customer, difference , setAllblank) => {


    if (customer.customer_id != null && customer.customer_id != "") {
      console.log('######### customer not null ########')
      var data = {
        ...newCase,
        customer_id:customer.customer_id,
        difference: difference.d1,
        document_id : newCase.document_id?newCase.document_id :"",       
        case_receiver : props.user.nickname,
        user_id: props.user.id, 
        vat7_fee:((parseInt(newCase.book_closing_fee) + parseInt(newCase.transfer_fee)) * 0.07),
        old_finance_closing_fee:newCase.close_amount
        
      };

      axios
        .post(`${url}/add_case`, data)
        .then(res => {
          M.toast({ html: `${res.data.message}` })
          getAllCase()
          setAllblank()
          return true;
        })
        .catch(err => {
          M.toast({ html: 'fail to add case Case error' })
          return false;
        });
    } else {  
      console.log(' ######## customer null #########')
      let customerData = ({ ...customer })
      console.log(JSON.stringify(customer))
      axios
        .post(`${url}/add_customer`, customerData)
        .then(res => {
          console.log(res)
          var data = {
            ...newCase,
            customer_id: res.data.customer_id,
            difference: difference.d1,
            document_id : newCase.document_id?newCase.document_id :"",
            case_receiver : props.user.nickname,
            user_id: props.user.id,
            vat7_fee:((parseInt(newCase.book_closing_fee) + parseInt(newCase.transfer_fee)) * 0.07),
            old_finance_closing_fee:newCase.close_amount
            
          };
          if (res.data.message === 'success_addCustomer'){
            console.log(JSON.stringify(data))
          axios
            .post(`${url}/add_case`, data)
            .then(res => {
              console.log("######## add case result #########");
              console.log(res);
              M.toast({ html: `${res.data.message}` })
              getAllCase()
              setAllblank()
              return true;
            })
            .catch(err => {
              M.toast({ html: 'fail to add case Case error' })
              return false;
            });
          }else{
            M.toast({ html: 'fail to add Customer ' + res.data.message })
          }
        })
        .catch(err => {
          M.toast({ html: 'fail to add case Customer error' })
          return false;
        });
    }

  }

  function nextStep(state) {
    var prevDate = '';
    //1 -> 2
    if (state === 'receive') { prevDate = 'contact_customer'; }
    //2 -> 3
    else if (state === 'contact_customer') { prevDate = 'account_closing' }
    //3 -> 5
    else if (state === 'account_closing') { prevDate = 'transfer_doc_submitted' }
    //5 -> 6
    else if (state === 'transfer_doc_submitted') { prevDate = 'book_received' }
    //6 -> 7
    else if (state === 'book_received') { prevDate = 'submit_book_transfer' }
    //7 -> 8
    else if (state === 'submit_book_transfer') { prevDate = 'car_check_up' }
    //8 -> 9
    else if (state === 'car_check_up') { prevDate = 'book_transfer' }
    //9 -> 10
    else if (state === 'book_transfer') { prevDate = 'book_copy_received' }
    //10 ->11
    else if (state === 'book_copy_received') { prevDate = 'deposit_doc_to_new_bank' }
    //11 ->14
    else if (state === 'deposit_doc_to_new_bank') { prevDate = 'cash_received' }
    //14 -> 13 
    else if (state === 'cash_received') { prevDate = 'book_received_back' }
    //13 -> 16
    else if (state === 'book_received_back') { prevDate = 'submit_book_to_new_finance' }
    //16 -> 12
    else if (state === 'submit_book_to_new_finance') { prevDate = 'submit_book_deposit_return' }
    //12 -> 15
    else if (state === 'submit_book_deposit_return') { prevDate = 'book_deposit_received' }
 
    return prevDate;
  }

  function translate(state) {
    var trans = '';
    if (state === 'receive') { trans = 'รับเคส'; }
    else if (state === 'contact_customer') { trans = 'ติดต่อลูกค้า' }
    else if (state === 'account_closing') { trans = 'ปิดเล่ม' }
    else if (state === 'transfer_doc_received') { trans = 'รับชุดโอน' }
    else if (state === 'transfer_doc_submitted') { trans = 'ยื่นชุดโอน' }
    else if (state === 'book_received') { trans = 'ได้รับเล่ม' }
    else if (state === 'submit_book_transfer') { trans = 'ส่งงานโอนทะเบียน' }
    else if (state === 'car_check_up') { trans = 'ตรวจสภาพรถ' }
    else if (state === 'book_transfer') { trans = 'โอนเล่มทะเบียน' }
    else if (state === 'book_copy_received') { trans = 'รับสำเนาเล่ม' }
    else if (state === 'deposit_doc_to_new_bank') { trans = 'ส่งเอกสารเบิกเงินธนาคารใหม่' }
    else if (state === 'submit_book_deposit_return') { trans = 'ทำเรื่องเบิกมัดจำคืน' }
    else if (state === 'book_received_back') { trans = 'รับเล่มคืน' }
    else if (state === 'cash_received') { trans = 'เงินเข้าบัญชีคาร์ทรัส' }
    else if (state === 'book_deposit_received') { trans = 'เงินมัดจำคืนเข้าบัญชี' }
    else if (state === 'submit_book_to_new_finance') { trans = 'ส่งเล่มให้ไฟแนนซ์ใหม่' }

    return trans;
  }


  function statusDate(c) {
    var DateString = c.status + '_date';
    // console.log("#########")
    // console.log(c.status);
    var pDate = c[DateString];
    if (pDate == null) {
      return " ";
    } else {
      return (pDate.split(" ")[1] + ' ' + pDate.split(" ")[2] + ' ' + pDate.split(" ")[3])
    }

  }

// function previousDate(state){
  //   var prevDate = '';
  //   if(state === 'receive'){ prevDate = 'receive_date'}
  //   else if(state === 'contact_customer'){prevDate = 'receive_date'}
  //   else if(state === 'account_closing'){prevDate = 'contact_customer_date'}
  //   else if(state === 'transfer_doc_received'){prevDate = 'transfer_doc_received_date'}
  //   else if(state === 'transfer_doc_submitted'){prevDate = 'transfer_doc_submitted_date'}
  //   else if(state === 'book_received'){prevDate = 'book_received_date'}
  //   else if(state === 'submit_book_transfer'){prevDate = 'book_received_date'}
  //   else if(state === 'car_check_up'){prevDate = 'submit_book_transfer_date'}
  //   else if(state === 'book_transfer'){prevDate = 'car_check_up_date'}
  //   else if(state === 'book_copy_received'){prevDate = 'book_transfer_date'}
  //   else if(state === 'deposit_doc_to_new_bank'){prevDate = 'book_copy_received_date'}
  //   else if(state === 'submit_book_deposit_return'){prevDate = 'deposit_doc_to_new_bank_date'}
  //   else if(state === 'book_received_back'){prevDate = 'submit_book_deposit_return_date'}
  //   else if(state === 'cash_received'){prevDate = 'book_received_back_date'}
  //   else if(state === 'book_deposit_received'){prevDate = 'cash_received_date'}
  //   else if(state === 'submit_book_to_new_finance'){prevDate = 'book_deposit_received_date'}
  //   return prevDate;
  // }

  function dateToNow(caseDate) {
    if (caseDate == null) {
      return 0;
    } else {
      var mountCaracterString = caseDate.split(" ")[2];
      var dayString = caseDate.split(" ")[1];
      var yearString = caseDate.split(" ")[3];
      var month;
      if (mountCaracterString === 'Jan') {
        month = 0;
      }
      else if (mountCaracterString === 'Feb') {
        month = 1;
      }
      else if (mountCaracterString === 'Mar') {
        month = 2;
      }
      else if (mountCaracterString === 'Apr') {
        month = 3;
      }
      else if (mountCaracterString === 'May') {
        month = 4;
      }
      else if (mountCaracterString === 'Jun') {
        month = 5;
      }
      else if (mountCaracterString === 'Jul') {
        month = 6;
      }
      else if (mountCaracterString === 'Aug') {
        month = 7;
      }
      else if (mountCaracterString === 'Sep') {
        month = 8;
      }
      else if (mountCaracterString === 'Oct') {
        month = 9;
      }
      else if (mountCaracterString === 'Nov') {
        month = 10;
      }
      else if (mountCaracterString === 'Dec') {
        month = 11;
      }
      // var month = parseInt(mountString) - 1;
      var day = parseInt(dayString);
      var year = parseInt(yearString);

      var date2 = new Date(year, month, day);


      var date1 = new Date();
      // console.log("#########")
      // console.log(date2)
      // console.log(date1)
      // console.log(case_id)
      console.log(Math.floor((date1 - date2) / (24 * 3600 * 1000)))
      return (Math.floor((date1 - date2) / (24 * 3600 * 1000)));
      // console.log(Math.floor((date1-date2)/(24*3600*1000)));
    }


  }

  function displayStarRating(caseInRow , kpiforuse) {
    // console.log(caseInRow.date_update)
    let result = [];
    let statusDateString = caseInRow.status + '_date';
    let datetomow = dateToNow(caseInRow[statusDateString]);
    // console.log('case Id', caseInRow.case_id)
    let noteDateString = caseInRow.next_status + "_note";
    let alertRed = caseInRow.next_status + "_red";
    let alertOrange = caseInRow.next_status + "_orange";

    // console.log('date to now' ,caseInRow.case_id, datetomow )
    // console.log('date to now orange' , caseInRow.next_status )
    if(caseInRow.next_status !== 'complete' && caseInRow.process ==='process'){
      if (datetomow > kpiforuse[alertOrange] && datetomow <= kpiforuse[alertRed]) {
        if (caseInRow[noteDateString] === null || caseInRow[noteDateString] === '') {
          result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)} ><img src={alertYellow} className="alert-icon blink-image" alt="fireSpot" /></a>);
        } else {
          result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)} ><img src={alertYellow} className="alert-icon" alt="fireSpot" /></a>);
        }
      }
  
      else if (datetomow > kpiforuse[alertRed] ) {
        if ((caseInRow[noteDateString] == null || caseInRow[noteDateString] === '') ) {
          result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)}><img src={alert} className="alert-icon blink-image" alt="fireSpot" /></a>);
        } else {
          result.push(<a className="modal-trigger" href="#modalAddNote" onClick={() => handleSingleCase(caseInRow)}><img src={alert} className="alert-icon " alt="fireSpot" /></a>);
        }
      }
    }
    


    return result;
  }


function colorFromDate(caseInRow , kpiforuse){
    // console.log(caseInRow.date_update)
   
    let statusDateString = caseInRow.status + '_date';
    let datetomow = dateToNow(caseInRow[statusDateString]);
    // console.log('case Id', caseInRow.case_id)
   
    let alertRed = caseInRow.next_status + "_red";
    let alertOrange = caseInRow.next_status + "_orange";

    console.log('date to now' ,caseInRow.case_id, datetomow )
    console.log('date to now orange' , caseInRow.next_status )
    if (datetomow > kpiforuse[alertOrange] && datetomow <= kpiforuse[alertRed] && caseInRow.next_status !== 'complete' && caseInRow.process ==='process') {
      return 'color-yellow'
    }

    else if (datetomow > kpiforuse[alertRed]  && caseInRow.next_status !== 'complete' && caseInRow.process ==='process') {
     return 'color-red'
    }
  }

    

  
  function tabPanel(){
    let result = [];
    if(!param){
      result.push(<TabPanel>
        </TabPanel>
        )
      result.push(<TabPanel >
          
        <Tabs defaultIndex={caseTable1} >
        <TabList >
          <div class="tabslist">
            <Tab onClick={() => getSpecificCase('TB',0)}>All</Tab>
            <Tab onClick={() => getSpecificCase('TB',1)}>1</Tab>
            <Tab onClick={() => getSpecificCase('TB',2)}>2</Tab>
            <Tab onClick={() => getSpecificCase('TB',3)}>3</Tab>
            
          </div>
        </TabList>
        </Tabs>
        </TabPanel>
       );
       result.push( <TabPanel>
        <Tabs defaultIndex={caseTable2}>
        <TabList >
          <div class="tabslist">
            <Tab onClick={() => getSpecificCase('KK',0)}>All</Tab>
            <Tab onClick={() => getSpecificCase('KK',1)}>1</Tab>
            <Tab onClick={() => getSpecificCase('KK',2)}>2</Tab>
            <Tab onClick={() => getSpecificCase('KK',3)}>3</Tab>
            
          </div>
        </TabList>
        </Tabs>
        </TabPanel>)
    }
    return result;
  }
  function alertCheck(caseInRow , kpiforuse) {


    let statusDateString = caseInRow.status + '_date';
    let datetomow = dateToNow(caseInRow[statusDateString]);

    let noteDateString = caseInRow.next_status + "_note";
    let alertRed = caseInRow.next_status + "_red";
    let alertOrange = caseInRow.next_status + "_orange";

// if(
//   ((caseInRow.status === 'submit_book_to_new_finance' && caseInRow.f2_deposit_12 === 0) || //in case 16 และ ไม่มีมัดจำ
//     (caseInRow.status === 'book_deposit_received' && caseInRow.f2_deposit_12 > 0) || //in case 15 และ มีมัดจำ
//     ((caseInRow.status === 'cash_received' && caseInRow.f2_deposit_12 === 0) && (caseInRow.case_source ==='Cartrust' || caseInRow.case_source ==='Dealer')))||// in case p14ไม่มีมัดจำ และ ct/dl

//     ((datetomow > kpiforuse[alertOrange]  && (caseInRow[noteDateString] === null || caseInRow[noteDateString] ===''))  ||//check alert
//       caseInRow.process === 'cancel' || caseInRow.next_status==='complete' )){ //check alert
//       console.log("f2_deposit_12:"+caseInRow.f2_deposit_12);
      
//       return (<a disabled ><img src={confirmIconDisable} className="png-icon" alt="confirm-icon" /></a>);
//     }
//     else {
//       return (<a href="#modalFastTrack" className="modal-trigger" onClick={() => handleSingleCase(caseInRow)}><img src={confirmIcon} className="png-icon" alt="confirm-icon" /></a>);
//     }

  if( (datetomow > kpiforuse[alertOrange]  && (caseInRow[noteDateString] === null || caseInRow[noteDateString] ==='')) ||caseInRow.process === 'complete'|| caseInRow.process === 'cancel' || caseInRow.next_status==='complete'){
    return (<a disabled ><img src={confirmIconDisable} className="png-icon" alt="confirm-icon" /></a>);
  }else{
    return (<a href="#modalFastTrack" className="modal-trigger" onClick={() => handleSingleCase(caseInRow)}><img src={confirmIcon} className="png-icon" alt="confirm-icon" /></a>);
  }


  }




  function caseStatusShift(state) {
    let status = ""
    //in case DEALER & Cartrust
    if (singleCase.case_source === 'Dealer' || singleCase.case_source === 'Cartrust') {
      if (singleCase.f2_deposit_12 > 0) {//in case มีมีดจำ
        if (state === 'book_received') { status = 'deposit_doc_to_new_bank' } //6 -> 11
        else if (state === 'deposit_doc_to_new_bank') { status = 'cash_received' } // 11 -> 14
        else if (state === 'cash_received') { status = 'submit_book_deposit_return' }//14 -> 12 
        else if (state === 'submit_book_deposit_return') { status = 'book_deposit_received' } // 12-> 15
      }
      else if (singleCase.f2_deposit_12 == 0) { //in case ไม่มีมัดจำ
        if (state === 'book_transfer') { status = 'book_received_back' } //9 ->13
        else if (state === 'book_received_back') { status = 'deposit_doc_to_new_bank' } //13-> 11
        else if (state === 'deposit_doc_to_new_bank') { status = 'cash_received' } // 11->14
      }
    }

    else if (state === 'account_closing' 
    && singleCase.f2_deposit_12 > 0
     && (singleCase.case_source === 'Thanachart' || singleCase.case_source === 'Kiatnakin')
     ) {
      status = 'book_received' //3->6
    }
   
    if(status===''){
      return nextStep(state)
    }else{
      return status
    }

  }

  return (
    <>
      <Navbar />
      <main>
        <div className="nContainer">



          {/* SEARCH */}
          <div className="row">
            <div className="col s12 m6">
              <h3>Cases : <span className="chip  orange">{totalCase}</span></h3>
            </div>
            <div className="col m6 ">
            <div className="col m4"></div>
            <div className="new-button col m4">
              <div className="new-button-iner">
                <a className="btn modal-trigger tde" href="#modalAddCase" ><img src={plus} style={{ marginBottom: '3px' }} className="alert-icon" alt="fireSpot" />Add Case</a>
              </div>

            </div>
            <div className="new-button col m4 right">
              <div className="new-button-iner col m12">
                <a className='modal-trigger btn tde-g'
                  href='#modalAddExcel'
                  
                  style={{ width: '100%' }}
                >Excel
  
              </a>

                {/* <!-- Dropdown Structure --> */}
                {/* <ul id='dropdown1' class='dropdown-content'>
                  <li><a href={`${url}/case_excel_file?parameter=team&value=adc1&date=${Date()}`} target="_blank">Team ADC1</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=team&value=adc2&date=${Date()}`} target="_blank" >Team ADC2</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=team&value=adc3&date=${Date()}`} target="_blank" >Team ADC3</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=team&value=adc4&date=${Date()}`} target="_blank" >Team ADC4</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=team&value=ทีมใหญ่KK&date=${Date()}`} target="_blank" >ทีมใหญ่ KK</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=case_source&value=Thanachart&date=${Date()}`} target="_blank">Thanachart Bank</a></li>
                  <li><a href={`${url}/case_excel_file?parameter=all&value=all&date=${Date()}`} target="_blank">All</a></li>
                </ul> */}
              </div>

            </div>
            </div>


          

          </div>

          {/* TABALE */}
          <div className="row" class="input-table">

          <Tabs  >
                <TabList >
                  <div class="tabslist">
                    <Tab onClick={() => getSpecificCase('ALL',caseTable1)}>All</Tab>
                    <Tab onClick={() => getSpecificCase('TB',caseTable1)}>Thanachart</Tab>
                    <Tab onClick={() => getSpecificCase('KK',caseTable2)}>Kiatnakin</Tab>
                    <Tab onClick={() => getSpecificCase('CT',0)}>Cartrust</Tab>
                    <Tab onClick={() => getSpecificCase('DL',0)}>Dealer</Tab>
                    
                    
                  </div>
                </TabList>
                {tabPanel()}
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>

              </Tabs>


            <br />
            <MaterialTable
              title="Case"
              columns={columnObject}
              isLoading={isLoading}
              data={cases}
              options={{
                filtering: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                grouping: true
              }}
            />

            {/* 
            <div>
              <ul className="pagination">
                <li className={'disabled'}><a href="#!"><i className="material-icons" onClick={prevPage}>chevron_left</i></a></li>
                <li className="active waves-effect"><a href="#!">1</a></li>

                <li className={'disabled'}><a href="#!"><i className="material-icons" onClick={nextPage}>chevron_right</i></a></li>
              </ul>
            </div> */}
          </div>
          
          <ModalAddNote singleCase={singleCase} translate={translate} caseStatusShift={caseStatusShift} saveNote={saveNote} setSingleCase={setSingleCase}/>
          <ModalFastTrack singleCase={singleCase} confirm={confirm} translate={translate} statusDate={statusDate} caseStatusShift={caseStatusShift} confirm_sub={confirm_sub}/>
          <ModalSummary singleCase={singleCase} kpi={kpi} getAllCase={getAllCase} operatorS={operatorS} getOperatorS={getOperatorS} translate={translate} saveProcess={saveProcess}/>
          <ModalAddCase saveNewCase={saveNewCase} getAllCase={getAllCase} operatorS={operatorS} getOperatorS={getOperatorS} />
          <ModalDeleteCase singleCase={singleCase} deleteCase={deleteCase} getAllCase={getAllCase} />
          <ModalAddExcel />



        </div>
      </main>
    </>
  )
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  storeUserInfo: (
    id,
    firstName,
    lastName,
    username,
    position,
    team,
    picture,
    token,
    nickname
  ) => {
    dispatch({
      type: ActionUser.STORE_USER_INFO,
      id: id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      position: position,
      team: team,
      picture: picture,
      token: token,
      nickname: nickname
    });
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Cases);
