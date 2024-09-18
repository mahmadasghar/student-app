import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";
const App = () => {
  const [data, setData] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpate, setIsUpdate] = useState(false);
  useEffect(() => {
    setData(EmployeeData);
  }, []);
  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete tihs item")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };
  const handleSave = (e) => {
    let error = '';
    if(firstname === '')
      error += 'First name is requried,'
     if(lastname === '')
      error += 'Last name is requried,'
     if(age <= 0)
      error += 'Age is requried.'
    if(error === ''){
    e.preventDefault();
    const dt = [...data];
    const newObject = {
      id:EmployeeData.length + 1,
        firstName: firstname,
        lastName: lastname,
        age: age
    }
    dt.push(newObject);
    setData(dt);
  }else{
    alert(error)
  }
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstname;
    dt[index].lastName = lastname;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };
  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <div>
          <label htmlFor="">
            First Name :
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstname}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Last Name :
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastname}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            Age :
            <input
              type="text"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div />
        <div>
          {!isUpate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
      <table className="table table-hover" style={{ marginTop: 50 }}>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    {" "}
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
