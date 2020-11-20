import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { List, Avatar } from "antd";

import Nav from "./Nav";

function ScreenSource() {
  const [sourceList, setsourceList] = useState([]);
  const [language, setLanguage] = useState("fr");
  const [country, setCountry] = useState("fr");

  useEffect(() => {
    const recentNews = async () => {
      let rawResponse = await fetch(
        `https://newsapi.org/v2/sources?language=${language}&country=${country}&apiKey=83d4277d163c4d8680c565f183fcef24`
      );
      let response = await rawResponse.json();
      setsourceList(response.sources);
      console.log(language, country);
    };
    recentNews();
  }, [language, country]);
  // console.log(sourceList);

  return (
    <div>
      <Nav />
      <div className="Banner">
        <div className="flag">
          <Avatar
            style={{ cursor: "pointer" }}
            size={52}
            src="./images/france.png"
            onClick={() => {
              setLanguage("fr");
              setCountry("fr");
            }}
          />
          <Avatar
            style={{ cursor: "pointer" }}
            size={52}
            src="./images/uk.png"
            onClick={() => {
              setLanguage("en");
              setCountry("gb");
            }}
          />
        </div>
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => {
            let avatar;
            if (item.category === "general") {
              avatar = "./images/general.png";
            } else if (item.category === "sports") {
              avatar = "./images/sports.png";
            } else {
              avatar = "./images/business.png";
            }

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={avatar} />}
                  title={
                    <Link to={`/articlesbysource/${item.id}`}>{item.name}</Link>
                  }
                  description={item.description}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
