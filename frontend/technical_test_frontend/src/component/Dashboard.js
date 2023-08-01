import React, { useState, useEffect } from 'react'


const Dashboard = () => {

  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getAll = async () => {
    
    const res = await fetch('/getallusers', {
      method: "GET",
      headers:{
          "Content-Type" : "application/json"
      }
  })

  const data = await res.json();
  setUserData(data);
  if (filterData.length === 0){
    setFilterData([...data]);
  }else {
    return
  }
  }

  const changeStartDate = (e) => {
    setStartDate(e.target.value);
    // console.log(startDate);
  }

  const changeEndDate = (e) => {
    setEndDate(e.target.value);
    // console.log(startDate);
  }
  
  const handelChange = (e) => {
    var deptFil = e.target.value;
    var filterArr = userData.filter((user) => user.dept === deptFil);
    if (filterArr.length === 0){
      var msg = [{"msg":"No data Found!!!"}]
      setFilterData(msg);
    }else{
      setFilterData(filterArr);
      }

      if (deptFil === "Select"){
        setFilterData(userData);
      }
  }

  const handelClick = () => {
    var filterArr = userData.filter((users) => {
      const userDate = new Date(users.create_date);
      console.log(userDate);
      return userDate >= startDate && userDate <= endDate;
    })
    console.log(filterArr);
    if (filterArr.length === 0){
      var msg = [{"msg":"No data Found!!!"}]
      setFilterData(msg);
    }else{
      setFilterData(filterArr);
      }
  }

  const getDate = (date) => {
    if (!date) return;
    let userDate = new Date(date);
    const year = userDate.getFullYear();
    const month = userDate.getMonth()+1; // Months are zero-based, so we add 1
    const day = userDate.getDate();
     let newDate = day +"-"+month +"-"+ year;
     return newDate;

  }

  


  useEffect(() => {
    getAll();
  })
  

  return (
    <>

<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-3">
            <h1>Technical Test</h1>
          </div>
          <div className="col-sm-2">
          <label>Short by Start Date</label>
          <input type="Date" className="form-control" name='email' placeholder="Date"
          value={startDate}
          onChange={changeStartDate}
          />
          </div>
          <div className="col-sm-2">
          <label>Short by End Date</label>
          <input type="Date" className="form-control" name='email' placeholder="Date"
          value={endDate}
          onChange={changeEndDate}
          />
          </div>
          <div className="col-sm-2">
          <button className='btn btn-block btn-primary' style={{marginTop:"16%"}} onClick={handelClick}>Sort By Date</button>
          </div>

          <div className="col-sm-3">
          <label>Select Department</label>
            <select className="form-control" name='dept' onChange={handelChange}>
                <option value="Select">Select</option>
                <option value="Team">Team</option>
                <option value="Manager">Manager</option>
                <option value="Account">Account</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
          
            {filterData.map(users =>( 
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{users.user_name}</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {users.user_email}
              </div>
              <div className="card-body">
                {getDate(users.create_date)}
              </div>
              <div className="card-footer">
                {users.dept}
              </div>
            </div>
        ))}

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Dashboard