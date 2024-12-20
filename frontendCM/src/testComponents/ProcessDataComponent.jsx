import { Tabs, Tab, Table, Card,  } from "react-bootstrap";

const ProcessDataComponent = ({ data }) => {
  return (
    <div className="container mt-4">
      {/* Header Section */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Process Name: {data.processName} ({data.CAS})
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Country: {data.country} ({data.ISOTwoLetterCountryCode})
          </Card.Subtitle>
          <Card.Text>{data.processDescription}</Card.Text>
          <small>
            Declared Unit: {data.declaredUnit} | Reference Period:{" "}
            {data.referencePeriod}
          </small>
        </Card.Body>
      </Card>

      {/* Tabs for Sectioned Data */}
      <Tabs defaultActiveKey="general" id="data-tabs" className="mb-3">
        {/* General Information */}
        <Tab eventKey="general" title="General Info">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Carbon Content</td>
                <td>{data.carbonContent}</td>
              </tr>
              <tr>
                <td>Bio Carbon Content</td>
                <td>{data.bioCarbonContent}</td>
              </tr>
              <tr>
                <td>Conversion Rate</td>
                <td>95%</td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* Energy Usage */}
        <Tab eventKey="energy" title="Energy & Utilities">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Electricity Demand</td>
                <td>1.2 MJ/kg</td>
              </tr>
              <tr>
                <td>Thermal Energy Demand</td>
                <td>2.0 MJ/kg</td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td>Thermal energy, electricity, cement disposal</td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* Environmental Impacts */}
        <Tab eventKey="impact" title="Environmental Impact (GWP100)">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Climate Change (Total GWP100)</td>
                <td>{data["Carbon Minds ISO 14067 (based on IPCC 2021) - climate change - global warming potential (GWP100) [kg CO2-Eq]"]}</td>
              </tr>
              <tr>
                <td>Biogenic Emissions</td>
                <td>{data["Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic emissions - global warming potential (GWP100) [kg CO2-Eq]"]}</td>
              </tr>
              <tr>
                <td>Fossil GWP</td>
                <td>{data["Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: fossil - global warming potential (GWP100) [kg CO2-Eq]"]}</td>
              </tr>
              <tr>
                <td>Land Use GWP</td>
                <td>{data["Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: land use - global warming potential (GWP100) [kg CO2-Eq]"]}</td>
              </tr>
            </tbody>
          </Table>
        </Tab>

        {/* Data Quality */}
        <Tab eventKey="quality" title="Data Quality">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Technical Representativeness</td>
                <td>{data.TechRep}</td>
              </tr>
              <tr>
                <td>Time Representativeness</td>
                <td>{data.TimeRep}</td>
              </tr>
              <tr>
                <td>Geographical Representativeness</td>
                <td>{data.GeoRep}</td>
              </tr>
              <tr>
                <td>Reliability</td>
                <td>{data.Reliability}</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProcessDataComponent;
