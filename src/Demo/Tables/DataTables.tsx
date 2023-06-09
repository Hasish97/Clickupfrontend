import * as React from 'react';
import { Row, Col, Card, Table } from "react-bootstrap";

import * as $ from 'jquery';
import Breadcrumb from "../../App/components/Breadcrumb";
// @ts-ignore
$.DataTable = require("datatables.net-bs");
require("jszip");
require("pdfmake/build/pdfmake.js");
require("pdfmake/build/vfs_fonts.js");
require("datatables.net-autofill");
require("datatables.net-buttons-bs");
require("datatables.net-buttons/js/buttons.colVis.js");
require("datatables.net-buttons/js/buttons.flash.js");
require("datatables.net-buttons/js/buttons.html5.js");
require("datatables.net-buttons/js/buttons.print.js");
require("datatables.net-colreorder");
require("datatables.net-keytable");
require("datatables.net-responsive-bs");
require("datatables.net-rowgroup");
require("datatables.net-rowreorder");
require("datatables.net-scroller");
require("datatables.net-select");
require("datatables.net-fixedcolumns");
require("datatables.net-fixedheader");
const names = [
  {
    id: 1,
    name: "System Architect",
    position: "Edinburgh",
    office: "Tiger Nixon",
    age: 61,
    date: "2011/04/25",
    salary: "$320,800"
  },
  {
    id: 2,
    name: "Garrett Winters",
    position: "Accountant",
    office: "Tokyo",
    age: 63,
    date: "2011/07/25",
    salary: "$170,750"
  },
  {
    id: 3,
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: 66,
    date: "2009/01/12",
    salary: "$86,000"
  },
  {
    id: 4,
    name: "Cedric Kelly",
    position: "Senior Javascript Developer",
    office: "Edinburgh",
    age: 22,
    date: "2012/03/29",
    salary: "$433,060"
  },
  {
    id: 5,
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: 33,
    date: "2008/11/28",
    salary: "$162,700"
  },
  {
    id: 6,
    name: "Brielle Williamson",
    position: "Integration Specialist",
    office: "New York",
    age: 61,
    date: "2012/12/02",
    salary: "$372,000"
  },
  {
    id: 7,
    name: "Herrod Chandler",
    position: "Sales Assistant",
    office: "San Francisco",
    age: 59,
    date: "2012/08/06",
    salary: "$137,500"
  },
  {
    id: 8,
    name: "Garrett Winters",
    position: "Accountant",
    office: "Tokyo",
    age: 63,
    date: "2011/07/25",
    salary: "$170,750"
  },
  {
    id: 9,
    name: "Rhona Davidson",
    position: "Integration Specialist",
    office: "Tokyo",
    age: 55,
    date: "2010/10/14",
    salary: "$327,900"
  },
  {
    id: 10,
    name: "Colleen Hurst",
    position: "Javascript Developer",
    office: "San Francisco",
    age: 39,
    date: "2009/09/15",
    salary: "$205,500"
  },
  {
    id: 11,
    name: "Sonya Frost",
    position: "Software Engineer",
    office: "Edinburgh",
    age: 23,
    date: "2008/12/13",
    salary: "$103,600"
  },
  {
    id: 12,
    name: "Jena Gaines",
    position: "Office Manager",
    office: "London",
    age: 30,
    date: "2008/12/19",
    salary: "$90,560"
  },
  {
    id: 13,
    name: "Quinn Flynn",
    position: "Support Lead",
    office: "Edinburgh",
    age: 22,
    date: "2013/03/03",
    salary: "$342,000"
  },
  {
    id: 14,
    name: "Charde Marshall",
    position: "Regional Director",
    office: "San Francisco",
    age: 36,
    date: "2008/10/16",
    salary: "$470,600"
  },
  {
    id: 15,
    name: "Haley Kennedy",
    position: "Senior Marketing Designer",
    office: "London",
    age: 43,
    date: "2012/12/18",
    salary: "$313,500"
  },
  {
    id: 16,
    name: "Tatyana Fitzpatrick",
    position: "Regional Director",
    office: "London",
    age: 19,
    date: "2010/03/17",
    salary: "$385,750"
  },
  {
    id: 17,
    name: "Marketing Designer",
    position: "Accountant",
    office: "London",
    age: 66,
    date: "2012/11/27",
    salary: "$198,500"
  },
  {
    id: 18,
    name: "Paul Byrd",
    position: "Chief Financial Officer (CFO)",
    office: "New York",
    age: 64,
    date: "2010/06/09",
    salary: "$725,000"
  },
  {
    id: 19,
    name: "Gloria Little",
    position: "Systems Administrator",
    office: "New York",
    age: 59,
    date: "2009/04/10",
    salary: "$237,500"
  },
  {
    id: 20,
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: 41,
    date: "2012/10/13",
    salary: "$132,000"
  },
  {
    id: 21,
    name: "Dai Rios",
    position: "Personnel Lead",
    office: "Edinburgh",
    age: 35,
    date: "2012/09/26",
    salary: "$217,500"
  },
  {
    id: 22,
    name: "Jenette Caldwell",
    position: "Development Lead",
    office: "New York",
    age: 30,
    date: "2011/09/03",
    salary: "$345,000"
  },
  {
    id: 22,
    name: "Yuri Berry",
    position: "Chief Marketing Officer (CMO)",
    office: "New York",
    age: 40,
    date: "2009/06/25",
    salary: "$675,000"
  },
  {
    id: 23,
    name: "Caesar Vance",
    position: "Pre-Sales Support",
    office: "New York",
    age: 21,
    date: "2011/12/12",
    salary: "$106,450"
  },
  {
    id: 23,
    name: "Doris Wilder",
    position: "Sales Assistant",
    office: "Sidney",
    age: 23,
    date: "2010/09/20",
    salary: "$85,600"
  },
  {
    id: 24,
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: 47,
    date: "2009/10/09",
    salary: "$1,200,000"
  },
  {
    id: 25,
    name: "Gavin Joyce",
    position: "Developer",
    office: "Edinburgh",
    age: 42,
    date: "2010/12/22",
    salary: "$92,575"
  },
  {
    id: 26,
    name: "Jennifer Chang",
    position: "Regional Director",
    office: "Singapore",
    age: 28,
    date: "2010/11/14",
    salary: "$357,650"
  },
  {
    id: 27,
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: 28,
    date: "2011/06/07",
    salary: "$206,850"
  },
  {
    id: 28,
    name: "Fiona Green",
    position: "Chief Operating Officer (COO)",
    office: "San Francisco",
    age: 48,
    date: "2010/03/11",
    salary: "$850,000"
  },
  {
    id: 29,
    name: "Shou Itou",
    position: "Regional Marketing",
    office: "Tokyo",
    age: 20,
    date: "2011/08/14",
    salary: "$163,000"
  },
  {
    id: 30,
    name: "Michelle House",
    position: "Integration Specialist",
    office: "Sidney",
    age: 37,
    date: "2011/06/02",
    salary: "$95,400"
  },
  {
    id: 31,
    name: "Suki Burks",
    position: "Developer",
    office: "London",
    age: 53,
    date: "2009/10/22",
    salary: "$114,500"
  },
  {
    id: 32,
    name: "Prescott Bartlett",
    position: "Accountant",
    office: "Tokyo",
    age: 63,
    date: "2011/07/25",
    salary: "$170,750"
  },
  {
    id: 33,
    name: "Garrett Winters",
    position: "Technical Author",
    office: "London",
    age: 27,
    date: "2011/05/07",
    salary: "$145,000"
  },
  {
    id: 34,
    name: "Gavin Cortez",
    position: "Team Leader",
    office: "San Francisco",
    age: 22,
    date: "2008/10/26",
    salary: "$235,500"
  },
  {
    id: 35,
    name: "Martena Mccray",
    position: "Post-Sales support",
    office: "Edinburgh",
    age: 46,
    date: "2011/03/09",
    salary: "$324,050"
  },
  {
    id: 36,
    name: "Unity Butler",
    position: "Marketing Designer",
    office: "San Francisco",
    age: 47,
    date: "2009/12/09",
    salary: "$85,675"
  },
  {
    id: 37,
    name: "Howard Hatfield",
    position: "Office Manager",
    office: "San Francisco",
    age: 51,
    date: "2008/12/16",
    salary: "$164,500"
  },
  {
    id: 38,
    name: "Hope Fuentes",
    position: "Secretary",
    office: "San Francisco",
    age: 41,
    date: "2010/02/12",
    salary: "$109,850"
  },
  {
    id: 39,
    name: "Vivian Harrell",
    position: "Financial Controller",
    office: "San Francisco",
    age: 62,
    date: "2009/02/14",
    salary: "$452,500"
  },
  {
    id: 40,
    name: "Timothy Mooney",
    position: "Office Manager",
    office: "London",
    age: 37,
    date: "2008/12/11",
    salary: "$136,200"
  },
  {
    id: 41,
    name: "Jackson Bradshaw",
    position: "Director",
    office: "New York",
    age: 65,
    date: "2008/09/26",
    salary: "$645,750"
  },
  {
    id: 42,
    name: "Olivia Liang",
    position: "Support Engineer",
    office: "Singapore",
    age: 64,
    date: "2011/02/03",
    salary: "$234,500"
  },
  {
    id: 43,
    name: "Bruno Nash",
    position: "Software Engineer",
    office: "London",
    age: 38,
    date: "2011/05/03",
    salary: "$163,500"
  },
  {
    id: 44,
    name: "Sakura Yamamoto",
    position: "Support Engineer",
    office: "Tokyo",
    age: 37,
    date: "2009/08/19",
    salary: "$139,575"
  },
  {
    id: 45,
    name: "Thor Walton",
    position: "Developer",
    office: "New York",
    age: 61,
    date: "2013/08/11",
    salary: "$98,540"
  },
  {
    id: 46,
    name: "Finn Camacho",
    position: "Support Engineer",
    office: "San Francisco",
    age: 47,
    date: "2009/07/07",
    salary: "$87,500"
  },
  {
    id: 47,
    name: "Serge Baldwin",
    position: "Data Coordinator",
    office: "Singapore",
    age: 64,
    date: "2012/04/09",
    salary: "$138,575"
  },
  {
    id: 48,
    name: "Zenaida Frank",
    position: "Software Engineer",
    office: "New York",
    age: 63,
    date: "2010/01/04",
    salary: "$125,250"
  },
  {
    id: 49,
    name: "Zorita Serrano",
    position: "Software Engineer",
    office: "San Francisco",
    age: 56,
    date: "2012/06/01",
    salary: "$115,000"
  },
  {
    id: 50,
    name: "Jennifer Acosta",
    position: "Junior Javascript Developer",
    office: "Edinburgh",
    age: 43,
    date: "2013/02/01",
    salary: "$75,650"
  },
  {
    id: 51,
    name: "Cara Stevens",
    position: "Sales Assistant",
    office: "New York",
    age: 46,
    date: "2011/12/06",
    salary: "$145,600"
  },
  {
    id: 52,
    name: "Hermione Butler",
    position: "Regional Director",
    office: "London",
    age: 47,
    date: "2011/03/21",
    salary: "$356,250"
  },
  {
    id: 53,
    name: "Lael Greer",
    position: "Systems Administrator",
    office: "London",
    age: 21,
    date: "2009/02/27",
    salary: "$103,500"
  },
  {
    id: 54,
    name: "Jonas Alexander",
    position: "Developer",
    office: "San Francisco",
    age: 30,
    date: "2010/07/14",
    salary: "$86,500"
  },
  {
    id: 55,
    name: "Shad Decker",
    position: "Regional Director",
    office: "Edinburgh",
    age: 51,
    date: "2008/11/13",
    salary: "$183,000"
  },
  {
    id: 56,
    name: "Michael Bruce",
    position: "Javascript Developer",
    office: "Singapore",
    age: 29,
    date: "2011/06/27",
    salary: "$183,000"
  },
  {
    id: 57,
    name: "Donna Snider",
    position: "Customer Support",
    office: "New York",
    age: 27,
    date: "2011/01/25",
    salary: "$112,000"
  }
];
function atable() {
  let tableZero = "#data-table-zero";
  $.fn.dataTable.ext.errMode = "throw";
  // @ts-ignore
  $(tableZero).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ]
  });
  let tableButton = "#datatable-button";
  let tableBtns = [
    {
      text: "Clear Filters",
      className: "clr-filters-btn btn btn-danger",
      action: function (e: any, dt: any, node: any, config: any) {
        // make function clear all text inputs on page via jquery
        clearfilter();
      }
    },
    {
      extend: "copyHtml5",
      text: "Copy",
      className: "btn btn-secondary"
    },
    {
      extend: "csvHtml5",
      text: "CSV",
      className: "btn btn-secondary"
    },
    {
      extend: "print",
      text: "Print",
      className: "btn btn-secondary"
    }
  ];
  // @ts-ignore
  let buttonTable = $(tableButton).DataTable({
    dom: "Bfrti",
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    buttons: tableBtns
  });
  function clearfilter() {
    // @ts-ignore
    $(".search-it")
      .find("input:text")
      .val("");
    buttonTable
      .search("")
      .columns()
      .search("")
      .draw();
  }
  // @ts-ignore
  new $.fn.dataTable.Buttons(buttonTable, {
    buttons: [
      {
        extend: "columnsToggle",
        text: "Toggle Cols"
      }
    ]
  });
  buttonTable
    .buttons(1, null)
    .container()
    .appendTo("#toggle");
  let tableColumnOrder = "#datatable-column-order";
  // @ts-ignore
  $(tableColumnOrder).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    colReorder: true
  });
  let tableScroll = "#data-table-scroll";
  // @ts-ignore
  $.fn.dataTable.ext.errMode = "throw";
  // @ts-ignore
  $(tableScroll).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    scrollY: "325px",
    scrollX: true,
    scrollCollapse: true,
    paging: false
  });
  let tableResponsive = "#data-table-responsive";
  // @ts-ignore
  $(tableResponsive).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    responsive: {
      responsive: {
        details: {
          // @ts-ignore
          display: $.fn.dataTable.Responsive.display.childRowImmediate,
          type: ""
        }
      }
    }
  });
  let tableFixedHeader = "#data-table-fixed-header";
  // @ts-ignore
  $(tableFixedHeader).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    fixedHeader: true
  });
  let tableFixedColumn = "#data-table-fixed-Column";
  // @ts-ignore
  $(tableFixedColumn).DataTable({
    data: names,
    order: [[0, "asc"]],
    columns: [
      {
        data: "id",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "name",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "position",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "office",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "age",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "date",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      },
      {
        data: "salary",
        render: function(data: any, type: any, row: any) {
          return data;
        }
      }
    ],
    scrollY: "300px",
    scrollX: true,
    scrollCollapse: true,
    paging: false,
    fixedColumns: {
      leftColumns: 1,
      rightColumns: 1
    }
  });
}
class DataTables extends React.Component<{}, {}> {
  componentDidMount() {
    atable();
  }
  render() {
    return (
      <>
        <Row className="align-items-center page-header">
          <Col>
            <Breadcrumb />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Zero Configuration</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  id="data-table-zero"
                  className="table-condensed"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">HTML5 Export Button</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="table table-condensed"
                  id="datatable-button"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Columns Reorder</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="table table-condensed"
                  id="datatable-column-order"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Fixed Column</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  className="table table-condensed"
                  id="data-table-fixed-Column"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Fixed Header</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="table table-condensed"
                  id="data-table-fixed-header"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Scrolling Table</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="table table-condensed"
                  id="data-table-scroll"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Responsive Table</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  striped
                  hover
                  responsive
                  bordered
                  className="table table-condensed"
                  id="data-table-responsive"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Date</th>
                      <th>Salary</th>
                    </tr>
                  </tfoot>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default DataTables;
