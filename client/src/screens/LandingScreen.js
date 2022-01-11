import React, { useContext } from "react";
import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { useLogin } from "../hooks/useLogin";
import { AuthContext } from "../Auth";
import Footer from "../components/Footer";
import Helper from "../components/Helper";
import heroimage from "../assets/display.svg";

const LandingScreen = () => {
  const user = useContext(AuthContext).user.currentUser;
  const helper = useContext(AuthContext).helper.helper;
  const loginHandler = useLogin();
  let history = useHistory();

  const redirHome = () => {
    history.push("/home");
  };

  return (
    <div className="flex-wrapper">
      {helper && <Helper />}
      <Container className="p-x d-md-flex mt-md-5 justify-content-center align-items-center">
        <Row className=" mt-md-5">
          <Col lg={6} className="mb-2 mb-md-0">
            <h1 className="mt-5 headline-1">
              Attend all your meetings with one link.
            </h1>
            <div className="mt-3 headline-2">
              Goodbye bookmarks. Enter all your links for once and get
              redirected to all your meets in your paper plane!
            </div>
            {user ? (
              <Button
                variant="primary"
                className="mt-3 mt-md-5 px-3 mb-3"
                onClick={redirHome}
              >
                Home
              </Button>
            ) : (
              <GoogleLogin
                // eslint-disable-next-line no-undef
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    variant="primary"
                    className="my-3"
                    onClick={renderProps.onClick}
                  >
                    Sign in
                  </Button>
                )}
                buttonText="Log in with Google"
                onSuccess={loginHandler}
                onFailure={loginHandler}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </Col>
          <Col
            lg={6}
            xs={{ order: "first" }}
            md={{ order: "last" }}
            className="mt-5 d-flex justify-content-center align-items-center"
          >
            <Image src={heroimage} className="mt-5" width="65%" fluid />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingScreen;
