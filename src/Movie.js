import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


function Movie() {
  const [mymovie, setMymovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFilteredData] = useState([]);

  const apikey = "04c35731a5ee918f014970082a0088b1";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apikey}&page=1`
      )
      .then((response) => {
        setMymovie(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log("errorfetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = mymovie.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, mymovie]);

  return (
    <>
     <InputGroup className="mt-2 text-center w-50 mb-2 searchbar">
        <Form.Control
          placeholder="Search by Title.."
          aria-label="Username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

 <Container   >
        <Row className="movierow" >
          {filtered.map((item) => (
            <Col lg={3} md={6} sm={4} className=" mt-3 mb-3 p-4"   >
              <Card
                style={{
                  width: "18rem",
                  height: "20rem",
                  borderRadius: "20px",
                }}
                className="shadow"
              >
                <Card.Img
                  className="img-fluid"
                  style={{
                    borderRadius: "20px",
                  }}
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.title.slice(0, 10)}..</Card.Title>
                  <Card.Text>
                    Rating{" "}
                    <span className="px-2 bg-info">{item.vote_average}</span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    href={`https://www.themoviedb.org/movie/${item.id}`}
                    target="_blank"
                    size="sm"
                  >
                    Watch
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> 
       

    

    </>
     


  );
}


export default Movie;
