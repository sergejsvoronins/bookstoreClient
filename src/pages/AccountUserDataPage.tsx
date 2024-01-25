import { Button, Col, Form, Row } from "react-bootstrap";
import {
  UserData,
  getOneUser,
  updatePassword,
  updateUserData,
} from "../transport/user";
import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../context/userContext";

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
  const updateUserInfo = async () => {
    try {
      const response = await updateUserData(userData);
      setDataIsLoaded(false);
      setChangeData(false);
    } catch (e) {
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
      let response = await updatePassword({
        id: userData.id,
        password: newPassword.password,
        oldPassword: newPassword.oldPasswrod,
      });
      setChangePassword(false);
      console.log(response);
    }
  };
  return (
    <Row>
      <Col xs={12} md={6}>
        <h4 className="mb-5">Kontoinformation</h4>
        <Row className="gap-5 w-100 mb-5">
          <Col xs={4}>
            {!changeData ? (
              <Button
                className="rounded-pill"
                variant="dark"
                onClick={() => setChangeData(true)}
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
          <Col xs={4}>
            <Button
              className="rounded-pill"
              variant="dark"
              onClick={() => {
                setChangePassword(!changePassword);
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
      </Col>
      <Col xs={12} md={6}>
        <Row>
          <Row>
            <Col xs={12} md={6}>
              <h5 className="mb-2">Medlemsnummer</h5>
              <h6>{userData.id}</h6>
            </Col>
            <Col xs={12} md={6}>
              <h5>Epost</h5>
              <h6>{userData.email}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h5 className="mb-2">Förnamn</h5>
              {!changeData ? (
                <h6>{userData.firstName ? userData.firstName : "-"}</h6>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-2"
                  value={userData.firstName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              )}
            </Col>
            <Col xs={12} md={6}>
              <h5>Efternamn</h5>
              {!changeData ? (
                <h6>{userData.lastName ? userData.lastName : "-"}</h6>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-2"
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
              <h5>Adress</h5>
              {!changeData ? (
                <h6>{userData.address ? userData.address : "-"}</h6>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-2"
                  value={userData.address || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              )}
            </Col>
            <Col xs={12} md={6}>
              <h5>Ort</h5>
              {!changeData ? (
                <h6>{userData.city ? userData.city : "-"}</h6>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-2"
                  value={userData.city || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h5>Mobil</h5>
              {!changeData ? (
                <h6>{userData.mobile ? userData.mobile : "-"}</h6>
              ) : (
                <Form.Control
                  type="text"
                  className="rounded-pill ms-1 px-3 mb-2"
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
                className="rounded-pill ms-1 px-3 mb-2"
                placeholder="Nuvarande lösenord"
                value={newPassword.oldPasswrod}
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    oldPasswrod: e.target.value,
                  })
                }
              />
            </Col>
            <Col lg={3}>
              <Form.Control
                type="password"
                className="rounded-pill ms-1 px-3 mb-2"
                placeholder="Nytt lösenörd"
                value={newPassword.password}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, password: e.target.value })
                }
              />
            </Col>
            <Col lg={3}>
              <Form.Control
                type="password"
                className="rounded-pill ms-1 px-3 mb-2"
                placeholder="Upprepa nytt lösenord"
                isInvalid={
                  newPassword.password !== newPassword.confirmedPassword &&
                  newPassword.confirmedPassword !== ""
                }
                isValid={
                  newPassword.password === newPassword.confirmedPassword &&
                  newPassword.confirmedPassword !== ""
                }
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    confirmedPassword: e.target.value,
                  })
                }
              />{" "}
              <Form.Control.Feedback type="invalid">
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
    </Row>
  );
}
