import {
  Alert,
  Button,
  Container,
  Dropdown,
  Fade,
  Nav,
  Table,
} from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ConfirmModal } from "../../components/ConfirmModal";
import { CategoryFormModal } from "../../components/CategoryFormModal";
import {
  Category,
  deleteCategory,
  getCategories,
} from "../../transport/categories";

export function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categryId, setCategoryId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const response = await getCategories();
        setCategoriesList(response);
        setIsLoaded(true);
      } catch (err) {
        if (err instanceof AxiosError) {
          setCategoriesList([]);
          console.log(err.message);
        }
      }
    };
    if (isLoaded) return;
    getCategoriesList();
    setCategoryId(null);
  }, [isLoaded]);
  useEffect(() => {
    if (alertMessage) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setAlertMessage(null);
        console.log("timeout");
      }, 3000);
    }
  }, [alertMessage]);
  const closeModal = () => {
    setOpenModal(false);
    setIsLoaded(false);
    setCategoryId(null);
  };
  const removeCategory = async () => {
    if (deleteCategoryId) {
      try {
        const response = await deleteCategory(deleteCategoryId);
        setIsLoaded(false);
        setAlertMessage(`Kategori med ID: ${deleteCategoryId} är borttagen`);
        setDeleteCategoryId(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Container>
      <Nav className="mb-3 justify-content-between">
        <h3>Kategori hantering</h3>
        <Button
          onClick={() => {
            setAlertMessage(null);
            setOpenModal(true);
          }}
        >
          Skapa ny
        </Button>
      </Nav>
      <Fade in={!!alertMessage}>
        <div id="alertMessage">
          <Alert variant="success">{alertMessage}</Alert>
        </div>
      </Fade>
      <CategoryFormModal
        openModal={openModal}
        id={categryId}
        closeModal={closeModal}
        setAlertMessage={setAlertMessage}
      />
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Namn</th>
            <th>Id</th>
            <th>Alternativ</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>{c.id}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <Gear />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setCategoryId(c.id);
                        setOpenModal(true);
                        setAlertMessage(null);
                      }}
                    >
                      Ändra
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDeleteCategoryId(c.id);
                      }}
                    >
                      Radera
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {deleteCategoryId && (
        <ConfirmModal
          openConfirmModal={!!deleteCategoryId}
          closeConfirmModal={() => {
            setDeleteCategoryId(null);
          }}
          action={removeCategory}
        />
      )}
    </Container>
  );
}
