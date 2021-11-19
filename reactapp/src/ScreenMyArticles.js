import React, { useState } from "react";
import "./App.css";
import { Card, Icon, Modal, Empty } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});

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
  const favoriteArticles = props.favoriteArticles.map((article, index) => {
    return (
      <div key={index} style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 300,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={<img alt="example" src={article.urlToImage} />}
          actions={[
            <Icon
              type="read"
              key="ellipsis2"
              onClick={() => showModal(article)}
            />,
            <Icon
              type="delete"
              key="ellipsis"
              onClick={() => props.removeFromFavorite(article.title)}
            />,
          ]}
        >
          <Meta title={article.title} description={article.description} />
        </Card>
      </div>
    );
  });

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {favoriteArticles.length > 0 ? (
          favoriteArticles
        ) : (
          <Empty description="No articles" />
        )}
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

const mapStateToProps = (state) => {
  console.log(state);
  return { favoriteArticles: state.favoriteArticles };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromFavorite: function (title) {
      dispatch({ type: "removeArticle", title });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
