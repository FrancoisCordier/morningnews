import React, { useEffect, useState } from "react";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const newsAPI = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);
  const [language, setLanguage] = useState("fr");

  console.log(props.state);

  const changeLanguage = (language) => {
    setLanguage(language === "french" ? "fr" : "gb");
  };

  useEffect(() => {
    newsAPI
      .get("/top-headlines/sources", {
        params: {
          apiKey: "f349b8c728944e15b3bf505ea1ec4cea",
          country: language,
        },
      })
      .then((response) => setSourceList(response.data.sources));
  }, [language]);

  return (
    <div>
      <Nav />
      <div
        className="Banner"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../images/france.png"
          style={{
            width: "50px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={() => changeLanguage("french")}
        />
        <img
          src="../images/royaume-uni.png"
          style={{ width: "50px", cursor: "pointer" }}
          onClick={() => changeLanguage("english")}
        />
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`../images/${item.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps, null)(ScreenSource);
