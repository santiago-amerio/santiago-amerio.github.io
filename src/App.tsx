import "./App.scss";
import "./css/integrator.scss";

import Brief from "./components/Brief";
import { useState } from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";
import Text_highlighter from "./components/Text_highlighter";
import classNames from "classnames";
import es from "./lang/spanish.json";
import en from "./lang/english.json";
import Proyects from "./components/proyects";

function App() {
  const land_language = window.location.pathname.replace("/", "");

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const [isTranslating, setIsTranslating] = useState("");

  const [currentLanguage, setCurrentLanguage] = useState(land_language);
  const handleLanguageSwitch = async () => {
    
    setIsTranslating("translating");
    await timeout(500);
    setCurrentLanguage(currentLanguage === "es" ? "en" : "es");
    setIsTranslating("");

    
  };

  const languageData = currentLanguage === "es" ? es : en;
  const introduction = languageData.introduction;
  const brief_content = languageData.brief_content;
  const proyects_content = languageData.proyects_content;
  return (
    <>
      <div id="app">
        <div id="language_toggler_container">
          <Router>
            <Link to={currentLanguage === "en" ? "es" : "en"} onClick={handleLanguageSwitch}>
              {currentLanguage === "es" ? "EN" : "ES"}
            </Link>
          </Router>
        </div>
        <div className={classNames("sec", { ["translating"]: isTranslating })} id="head">
          <div>
            <div className="title-left">
              <Text_highlighter content={introduction[0].title}></Text_highlighter>
            </div>
            <div className="text-left subtitle">
              <Text_highlighter content={introduction[0].content}></Text_highlighter>
            </div>
          </div>
          <div className="title-left">
            <Text_highlighter content={introduction[1].title}></Text_highlighter>
            <Text_highlighter content={introduction[1].content}></Text_highlighter>
          </div>
        </div>
        <div id="proyects" >
          <h1>{proyects_content.title}</h1>
          {proyects_content.content.map((item, index) => (
            <div className="sec" key={index}>
              <Proyects content={item}></Proyects>
            </div>
          ))}
        </div>

        <div id="brief" className={classNames("sec brief", { ["translating"]: isTranslating })}>
          <div id="brief-title" >
            <h1 >{brief_content.title}</h1>
          </div>
          {brief_content.content.map((item, index) => (
            <div key={index}>
              <Brief list={item.list} category={item.category}></Brief>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
