import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./App.css";
import { Card, Icon, Row, Col, Modal } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState();

  let { id } = useParams();
  // console.log(id);

  const showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  useEffect(() => {
    const articleSource = async () => {
      let rawResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?apiKey=83d4277d163c4d8680c565f183fcef24&sources=${id}`
      );
      let response = await rawResponse.json();
      setArticleList(response.articles);
    };
    articleSource();
  }, []);
  // console.log(id);
  // console.log(articleList);

  let articleBySource = articleList.map((article) => {
    let reduceContent = article.content;

    if (reduceContent.length > 110) {
      reduceContent = reduceContent.substring(0, 110) + "...";
    }
    // console.log(article);
    return (
      <Col className="gutter-row" span={6}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            style={{
              width: 300,
              height: 400,
              margin: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            cover={
              <img
                style={{
                  width: 300,
                  height: 180,
                }}
                alt="example"
                src={article.urlToImage}
              />
            }
            actions={[
              <div>
                <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)} />{" "}
                <Modal
                  title={title}
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{content}</p>
                </Modal>
              </div>,

              <Icon
                type="like"
                key="ellipsis"
                onClick={() =>
                  props.addToWishList({
                    token: props.userToken,
                    title: article.title,
                    description: article.description,
                    content: article.content,
                    image: article.urlToImage,
                  })
                }
              />,
            ]}
          >
            <Meta title={article.title} description={reduceContent} />
          </Card>
        </div>
      </Col>
    );
  });
  return (
    <div>
      <Nav />

      <div className="Banner" />
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <div className="Card">{articleBySource}</div>
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "addArticle", article });
    },
  };
}

function mapStateToProps(state) {
  console.log(state);
  return { userToken: state.token, language: state.language };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenArticlesBySource);
