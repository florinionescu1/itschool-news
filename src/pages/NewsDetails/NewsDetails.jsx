import React from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../../api/endpoints";
import { getNewsDetails } from "../../api/agreggators";
import Button from "react-bootstrap/Button";
import styles from "./NewsDetails.module.css";
import { getFormattedDate } from "../../utils/date";

function NewsDetails() {
  const {newsId, "*": restOfUrl } = useParams();
  const paramsFromUrl = `${newsId}/${restOfUrl}`;
  const newsDetailsEndpoint = getNewsDetailsEndpoint(paramsFromUrl);
  const newsDetails = useFetch(newsDetailsEndpoint);
  const adaptedNewsDetails = getNewsDetails(newsDetails);

  const { title, description, image, date, author, content } =
    adaptedNewsDetails;
  const formattedDate = getFormattedDate(date);

  return (
    <Layout>
      <Container className={`${styles.newsDetails} my-5`}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            {/* https://medium.com/@uigalaxy7/how-to-render-html-in-react-7f3c73f5cafc */}
            <div className="mb-4">{parse(`${image}`)}</div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button>Adaugă la favorite</Button>
            </div>
            <div>{parse(`${content}`)}</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
