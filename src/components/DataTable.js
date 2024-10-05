// FRUIT-GRADING/src/components/DataTable.js
import React from "react";
import axios from "axios";

class DataTable extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        console.log("Fetched data:", response.data)
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th> ID </th> <th> Sample </th> <th> Quality </th> <th> Date </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {this.state.data.map((item) => (
            <tr key={item.id}>
              <td> {item.id} </td> <td> {item.sample} </td>{" "}
              <td> {item.quality} </td> <td> {item.date} </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>
    );
  }
}

export default DataTable;
