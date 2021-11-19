import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const { Meta } = Card;

const newsAPI = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

function ScreenArticlesBySource(props) {
  const [articleList, setArticleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const { id } = useParams();
  console.log("USER TOKEN", props.token);
  useEffect(() => {
    newsAPI
      .get("/top-headlines", {
        params: {
          apiKey: "f349b8c728944e15b3bf505ea1ec4cea",
          sources: id,
        },
      })
      .then((response) => setArticleList(response.data.articles));
  }, []);

  console.log(id);
  const showModal = (article) => {
    setIsModalVisible(true);
    setSelectedArticle(article);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isArticleFavorite = (article) => {
    return props.favoriteArticles.some((el) => el.title === article.title);
  };

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleList.map((article, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                style={{
                  width: 300,
                  margin: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <img
                    alt="example"
                    src={
                      article.urlToImage
                        ? article.urlToImage
                        : "../images/back02.jpg"
                    }
                  />
                }
                actions={[
                  <Icon
                    index={index}
                    type="read"
                    key="ellipsis2"
                    onClick={() => showModal(article)}
                  />,
                  <Icon
                    type="like"
                    theme={isArticleFavorite(article) ? "twoTone" : "outlined"}
                    key="ellipsis"
                    onClick={() =>
                      isArticleFavorite(article)
                        ? props.removeFromFavorite(article.title)
                        : props.addToFavorite(article)
                    }
                  />,
                ]}
              >
                <Meta title={article.title} description={article.description} />
              </Card>
            </div>
          );
        })}
      </div>
      <Modal
        title={selectedArticle.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedArticle.content}
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorite: function (article) {
      dispatch({ type: "addArticle", article });
    },
    removeFromFavorite: function (title) {
      dispatch({ type: "removeArticle", title });
    },
  };
};

const mapStateToProps = (state) => {
  return { favoriteArticles: state.favoriteArticles, token: state.token };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
