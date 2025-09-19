import "./Article.css";

import React from 'react'
import adminS from "./../../../Assets/adminSymbol.png";
import article1 from "./../../../Assets/article1.png";
import article2 from "./../../../Assets/article2.png";
import article3 from "./../../../Assets/article3.png";
import backgroundA from "./../../../Assets/background-g1.png";
import technologyS from "./../../../Assets/technologySymbol.png";

function Article() {
  return (
    <div row>
      
        <div className="layout-article">
          <img src={backgroundA} alt="background" className="layout-articleP" />

          <div col-lg-4 col-md-6 col-sm-12 col-12>
            <div className="layout-article1">
              <p className="article-content">
                <span>:::FROM THE BLOG</span>
              </p>
              <p className="article-content1">
                <span>
                  News <span className="article-orange">&</span>Articles
                </span>
              </p>
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <div className="layout-article2">
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="layout-article3">
                      <img
                        src={article1}
                        alt="background"
                        className="layout-articleP1"
                      />
                      <div className="orange-boxA">
                        <p className="article-contentO">20</p>
                        <p className="article-contentO1">OCT</p>
                      </div>
                      <div className="article-boxW">
                        <div className="article-boxW1">
                          <p className="boxW1-content">
                            Professional technology information & solutions are
                            just like…
                          </p>
                        </div>
                        <img src={adminS} alt="logo" className="admin-layout" />
                        <p className="admin-content"> by Admin </p>
                        <img
                          src={technologyS}
                          alt="logo"
                          className="technology-layout"
                        />
                        <p className="technology-content"> Technology</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="layout-article4">
                      <img
                        src={article2}
                        alt="background"
                        className="layout-articleP1"
                      />

                      <div className="orange-boxA">
                        <p className="article-contentO">24</p>
                        <p className="article-contentO1">OCT</p>
                      </div>

                      <div className="article-boxW">
                        <div className="article-boxW1">
                          <p className="boxW1-content">
                            {" "}
                            Professional technology information & solutions are
                            just like…
                          </p>
                        </div>
                        <img src={adminS} alt="logo" className="admin-layout" />
                        <p className="admin-content"> by Admin</p>
                        <img
                          src={technologyS}
                          alt="logo"
                          className="technology-layout"
                        />
                        <p className="technology-content"> Technology</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="layout-article5">
                      <img
                        src={article3}
                        alt="background"
                        className="layout-articleP1"
                      />
                      <div className="orange-boxA">
                        <p className="article-contentO">28</p>
                        <p className="article-contentO1">OCT</p>
                      </div>
                      <div className="article-boxW">
                        <div className="article-boxW1">
                          <p className="boxW1-content">
                            Professional technology information & solutions are
                            just like…
                          </p>
                        </div>
                        <img src={adminS} alt="logo" className="admin-layout" />
                        <p className="admin-content"> by Admin</p>
                        <img
                          src={technologyS}
                          alt="logo"
                          className="technology-layout"
                        />
                        <p className="technology-content"> Technology</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
}

export default Article
