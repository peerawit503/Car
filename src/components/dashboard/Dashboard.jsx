import React, { useState, useEffect } from 'react'
import Navbar from '../layout/Navbar'
import imgeProrofile from '../../img/imageProfile.jpg'
import Bootstrap from '../../img/Bootstrap.png'
import Chart from "react-apexcharts";
import MaterializeCSS from '../../img/Materialize-CSS-01.png'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import M from 'materialize-css/dist/js/materialize.min.js'

const Dashboard = () => {
  const [state, setState] = useState({
    date: new Date(),
    options: {
      chart: { id: "basic-bar" },
      xaxis: { categories: ['Mon', "TU", "WEN", 'TH', 'FRI',] }
    },
    series: [
      { name: "series-1", data: [40, 40, 45, 50, 49,] }
    ]

  })

  useEffect(() => {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
  }, [])
  return (
    <>
      <Navbar />
      <main>
        <div className="nContainer">
          <div className="row ">
            <div className="col s12 m6 l4">
              <div className="card-panel blue lighten-2 white-text col s12">
                <h3>
                  <i className="material-icons white-text  prefix  medium ml-1">face</i><span>Customers : 3000</span>
                </h3>
              </div>
              <div className="card-panel pink lighten-2 col white-text  s12">
                <h3>
                  <i className="material-icons white-text prefix medium ml-1">work</i><span>Case : 30,000</span>
                </h3>
              </div>
            </div>
            <div className="col s12 m6 l4">
              <Calendar value={ state.date } className="reactCalenda" />
            </div>

            <div className="col s12 m6 l4">
              <h6>work complete</h6>
              <Chart options={ state.options } series={ state.series } type="line" width="400" />
            </div>

          </div>

          <div className="row">

            <div className="col s12 cyan m4  card-panel white-text ">
              <h4>Work to day</h4>
            </div>

            <div className="col s12 m4 light-blue card-panel white-text ">
              <h4>Message</h4>
            </div>

            <div className="col s12 teal m3 card-panel  black-text">
              <h4>Post</h4>
              <div className="announceBox">
                <img src={ imgeProrofile } alt="imgeProrofile" className="circle" style={ { width: "50px" } } />
                <ul>
                  <li>Name : Mohex</li>
                  <li>Pos : Maneger</li>
                  <li>Date : 21/01/2020</li>
                </ul>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt quisquam deserunt repellendus tempora necessitatibus! Inventore quis deleniti delectus facilis!</p>

              </div>
              <div className="announceBox">
                <img src={ MaterializeCSS } alt="imgeProrofile" className="circle" style={ { width: "50px" } } />
                <ul>
                  <li>Name : MaterilizeCss</li>
                  <li>Pos : Maneger</li>
                  <li>Date : 21/01/2020</li>
                </ul>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt quisquam deserunt repellendus tempora necessitatibus! Inventore quis deleniti delectus facilis!</p>

              </div>
              <div className="announceBox">

                <img src={ Bootstrap } alt="imgeProrofile" className="circle" style={ { width: "50px" } } />
                <ul>
                  <li>Name : Bootstrap</li>
                  <li>Pos : Maneger</li>
                  <li>Date : 21/01/2020</li>
                </ul>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt quisquam deserunt repellendus tempora necessitatibus! Inventore quis deleniti delectus facilis!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">mode_edit</i>
          </a>
          <ul>
            <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
            <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
            <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
            <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
          </ul>
        </div>
      </main>

    </>
  )
}

export default Dashboard