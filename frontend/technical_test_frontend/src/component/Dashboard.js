import React from 'react'

const Dashboard = async () => {



    const res = await fetch('/getallusers?dept=', {
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    })

    const data = await res.json();
    console.log(data);


  return (
    <>

<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Boxed Layout</h1>
          </div>
          <div className="col-sm-6">
          <label>Select Department</label>
            <select className="form-control" name="dept">
                <option value="Team">Team</option>
                <option value="Manager">Manager</option>
                <option value="Acount">Acount</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
          
            {data.map(
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">{data.user_name}</h3>
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
                {data.user_email}
              </div>
              <div className="card-footer">
                {data.dept}
              </div>
            </div>
        )}

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Dashboard