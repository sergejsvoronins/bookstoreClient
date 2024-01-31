import { Alert, Button, Col, Fade, Form, Row } from "react-bootstrap";
import {
  UserData,
  getCityByZip,
  getOneUser,
  updatePassword,
  updateUserData,
} from "../../transport/user";
import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../../context/userContext";

export function AccountUserDataPage() {
  const { user } = useContext<IUserContext>(UserContext);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    email: "",
    password: "",
    accountLevel: "",
  });
  const [changeData, setChangeData] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    variant: string;
  } | null>(null);
  const [newPassword, setNewPassword] = useState<{
    password: string;
    confirmedPassword: string;
    oldPasswrod: string;
  }>({ password: "", confirmedPassword: "", oldPasswrod: "" });
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    if (user?.id) {
      const getUser = async () => {
        let response = await getOneUser(user.id);
        setUserData(response);
        setDataIsLoaded(true);
      };
      if (dataIsLoaded) return;
      getUser();
    }
  }, [dataIsLoaded]);
  useEffect(() => {
    if (alert) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }, [alert]);
  const updateUserInfo = async () => {
    try {
      const response = await updateUserData(userData);
      response &&
        setAlert({
          message: "Dina uppgifter har uppdaterats",
          variant: "success",
        });
      setDataIsLoaded(false);
      setChangeData(false);
    } catch (e) {
      setAlert({
        message: "Det gick inte uppdatera dina uppgifter",
        variant: "danger",
      });
      console.log(e);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      try {
        let response = await updatePassword({
          id: userData.id,
          password: newPassword.password,
          oldPassword: newPassword.oldPasswrod,
        });

        response &&
          setAlert({
            message: "Ditt lösenord har uppdaterats",
            variant: "success",
          });
      } catch (e) {
        if (e) {
          setAlert({
            message:
              "Ditt gamla lösenordet stämmer inte eller det nya i fel format",
            variant: "danger",
          });
        }
      }
      setChangePassword(false);
    }
  };
  console.log(userData);

  const getCity = async (zipCode: string) => {
    try {
      let response = await getCityByZip(zipCode);
      setUserData({ ...userData, city: response.results[0].city });
    } catch (err) {
      if (err) {
        setUserData({ ...userData, city: "" });
      }
    }
  };
  return (
    <Row>
      <Fade in={!!alert}>
        <div id="alertMessage">
          <Alert variant={alert?.variant}>{alert?.message}</Alert>
        </div>
      </Fade>
      <Col xs={12} md={6}>
        <h4 className="mb-5">Kontoinformation</h4>
      </Col>
      <Col xs={12} lg={6}>
        <Row>
          <Row>
            <Col xs={12} md={6}>
              <h6 className="mb-2">Medlemsnummer</h6>
              <p>{userData.id}</p>
            </Col>
            <Col xs={12} md={6}>
              <h6>Epost</h6>
              <p>{userData.email}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h6 className="mb-2">Förnamn</h6>
              {!changeData ? (
                <p>{userData.firstName ? userData.firstName : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.firstName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              )}
            </Col>
            <Col xs={12} md={6}>
              <h6>Efternamn</h6>
              {!changeData ? (
                <p>{userData.lastName ? userData.lastName : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.lastName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h6>Adress</h6>
              {!changeData ? (
                <p>{userData.address ? userData.address : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.address || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              )}
            </Col>
            <Col xs={12} md={6}>
              <h6>Postnummer</h6>
              {!changeData ? (
                <p>{userData.zipCode ? userData.zipCode : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.zipCode || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, zipCode: e.target.value })
                  }
                  onBlur={(e) => getCity(e.target.value)}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h6>Ort</h6>
              {!changeData ? (
                <p>{userData.city ? userData.city : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.city || ""}
                  disabled
                />
              )}
            </Col>
            <Col xs={12} md={6}>
              <h6>Mobil</h6>
              {!changeData ? (
                <p>{userData.mobile ? userData.mobile : "-"}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-4"
                  value={userData.mobile || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, mobile: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
        </Row>
      </Col>
      {changePassword && (
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="my-5"
        >
          <Row>
            <Col lg={3}>
              <Form.Control
                type="password"
                className="rounded-pill ms-1 px-3 mb-4"
                placeholder="Nuvarande lösenord"
                value={newPassword.oldPasswrod}
                isValid={newPassword.oldPasswrod.length > 5}
                minLength={6}
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    oldPasswrod: e.target.value,
                  })
                }
              />{" "}
              <Form.Control.Feedback
                type="invalid"
                className="position-static ms-3 mb-2"
              >
                Det ska vara minst 6 tecken
              </Form.Control.Feedback>
            </Col>
            <Col lg={3}>
              <Form.Control
                type="password"
                className="rounded-pill ms-1 px-3 mb-4"
                placeholder="Nytt lösenörd"
                value={newPassword.password}
                isValid={newPassword.oldPasswrod.length > 5}
                minLength={6}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, password: e.target.value })
                }
              />
              <Form.Control.Feedback
                type="invalid"
                className="position-static ms-3 mb-2"
              >
                Det ska vara minst 6 tecken
              </Form.Control.Feedback>
            </Col>
            <Col lg={3}>
              <Form.Control
                type="password"
                className="rounded-pill ms-1 px-3 mb-4"
                placeholder="Upprepa nytt lösenord"
                isInvalid={
                  newPassword.password !== newPassword.confirmedPassword &&
                  newPassword.confirmedPassword !== ""
                }
                isValid={
                  newPassword.password === newPassword.confirmedPassword ||
                  newPassword.confirmedPassword !== ""
                }
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    confirmedPassword: e.target.value,
                  })
                }
              />{" "}
              <Form.Control.Feedback
                type="invalid"
                className="position-static ms-3 mb-2"
              >
                Lösenord stämmer inte
              </Form.Control.Feedback>
            </Col>
            <Col lg={3}>
              <Button
                type="submit"
                className="rounded-pill"
                variant="secondary"
                onClick={() => setChangeData(true)}
              >
                Spara
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <Row className="my-3">
        <Col xs={4} md={3} lg={2}>
          {!changeData ? (
            <Button
              className="rounded-pill"
              variant="dark"
              onClick={() => {
                setChangeData(true);
                setChangePassword(false);
              }}
            >
              Ändra uppgifter
            </Button>
          ) : (
            <Button
              className="rounded-pill"
              variant="dark"
              onClick={updateUserInfo}
            >
              Spara uppgifter
            </Button>
          )}
        </Col>
        <Col xs={4} md={3} lg={2}>
          <Button
            className="rounded-pill"
            variant="dark"
            onClick={() => {
              setChangePassword(!changePassword);
              setChangeData(false);
              setNewPassword({
                password: "",
                confirmedPassword: "",
                oldPasswrod: "",
              });
            }}
          >
            Ändra lösenord
          </Button>
        </Col>
      </Row>
    </Row>
  );
}
