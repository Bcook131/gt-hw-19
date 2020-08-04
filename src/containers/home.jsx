import React, { Component } from "react";
import Axios from "axios";
class Home extends Component {
  state = {
    sortFlip: true,
    employees: [],
    searchName: "",
  };
  componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=50").then((result) => {
      const employees = result.data.results;
      employees.forEach((o, i) => (o.key = i + 1));
      employees.forEach(
        (o, i) => (o.employee_name = o.name.first + " " + o.name.last)
      );
      this.setState({ employees: employees });
      console.log(this.state.employees);
    });
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      searchName: value,
    });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const currentSearchName = this.state.searchName;
    const filteredEmployees = this.state.employees.filter((employee) =>
      employee.employee_name
        .toLowerCase()
        .includes(currentSearchName.toLowerCase())
    );
    this.setState({
      employees: filteredEmployees,
    });
  };
  sortEmployeesByAge = () => {
    function sortAsc(a, b) {
      if (a.dob.age > b.dob.age) return 1;
      if (b.dob.age > a.dob.age) return -1;

      return 0;
    }
    function sortDesc(a, b) {
      if (a.dob.age > b.dob.age) return -1;
      if (b.dob.age > a.dob.age) return 1;

      return 0;
    }
    if (this.state.sortFlip) {
      const sortedEmployees = this.state.employees.sort(sortAsc);
      this.setState({
        employees: sortedEmployees,
        sortFlip: false,
      });
    } else {
      const sortedEmployees = this.state.employees.sort(sortDesc);
      this.setState({
        employees: sortedEmployees,
        sortFlip: true,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <span className="navbar-brand">Employee Directory</span>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                id="searchBtn"
                placeholder="Employee Name"
                aria-label="Search"
                onChange={this.handleInputChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 float-right"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Search By Name
              </button>
            </form>
          </nav>
          <br />
          <br />
          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Email</th>
                    <th scope="col">
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          this.sortEmployeesByAge();
                        }}
                      >
                        Age
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee) => (
                    <tr>
                      <th scope="row">{employee.key}</th>
                      <td>{employee.employee_name}</td>
                      <td>{employee.location.country}</td>
                      <td>{employee.email}</td>
                      <td>{employee.dob.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;