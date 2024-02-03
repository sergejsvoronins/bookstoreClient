import { useEffect, useState } from "react";
import { addBook } from "../transport/books";
import { IGoogleBookInfo, getGoogleBooks } from "../transport/googleBooks";
import { Author, NewAuthor, addAuthor, getAuthors } from "../transport/authors";
import {
  Category,
  NewCategory,
  addCategory,
  getCategories,
} from "../transport/categories";

export function LoadGoogleBooks() {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [categoriesAreLoaded, setCategoriesAReLoaded] = useState(true);
  const [authorsIsLoaded, setAuthorsIsloaded] = useState(true);
  const [googleBooks, setGoogleBooks] = useState<IGoogleBookInfo[]>([]);
  const [index, setIndex] = useState(0);
  const [newAuthors, setNewAuthors] = useState<NewAuthor[]>([]);
  const [newCategories, setNewCategories] = useState<NewCategory[]>([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const authors = await getAuthors();
        setAuthorsList(authors);
      } catch (err) {
        if (err) {
          setAuthorsList([]);
          return;
        }
      }
      setAuthorsIsloaded(true);
    };

    if (authorsIsLoaded) return;
    getList();
  }, [authorsIsLoaded]);
  useEffect(() => {
    const getList = async () => {
      try {
        const categories = await getCategories();
        setCategoriesList(categories);
      } catch (err) {
        if (err) {
          setCategoriesList([]);
          return;
        }
      }
      setCategoriesAReLoaded(true);
    };

    if (categoriesAreLoaded) return;
    getList();
  }, [categoriesAreLoaded]);
  const getMyBooks = async () => {
    let response = await getGoogleBooks(index);
    setGoogleBooks([...googleBooks, ...response.items]);
    setIndex(index + 40);
  };

  const getAuthorList = () => {
    const authors: NewAuthor[] = [];
    googleBooks.map((b) => {
      b.volumeInfo.authors &&
        b.volumeInfo.authors.map((a) => {
          const seen = authors.some((f) => f.name === a);
          if (!seen) authors.push({ name: a });
        });
    });
    setNewAuthors(authors);
  };
  const getCategoryList = () => {
    const categories: NewCategory[] = [];
    googleBooks.map((b) => {
      b.volumeInfo.categories &&
        b.volumeInfo.categories.map((c) => {
          const seen = categories.some((f) => f.name === c);
          if (!seen) categories.push({ name: c });
        });
    });
    setNewCategories(categories);
  };
  const loadAuthors = () => {
    newAuthors.map((a) => {
      const addItem = async () => {
        await addAuthor(a);
      };
      addItem();
    });
    setAuthorsIsloaded(false);
  };
  const loadCategories = () => {
    newCategories.map((c) => {
      const addItem = async () => {
        await addCategory(c);
      };
      addItem();
    });
    setCategoriesAReLoaded(false);
  };

  const pushBooks = () => {
    googleBooks.map((b) => {
      const author = authorsList.find((f) => {
        if (b.volumeInfo.authors) {
          return b.volumeInfo.authors.includes(f.name) ? f : null;
        }
      });
      const category = categoriesList.find((f) => {
        if (b.volumeInfo.categories) {
          return b.volumeInfo.categories.includes(f.name) ? f : null;
        }
      });

      if (author && category && b.saleInfo.listPrice) {
        addBook({
          title: b.volumeInfo.title,
          description: b.volumeInfo.description,
          imgUrl: b.volumeInfo.imageLinks.smallThumbnail,
          pages: b.volumeInfo.pageCount,
          year: +b.volumeInfo.publishedDate.slice(0, 4),
          language: b.volumeInfo.language,
          authorId: author.id,
          categoryId: category.id,
          price: b.saleInfo.listPrice.amount,
          isbn: b.volumeInfo.industryIdentifiers[1].identifier,
        });
      }
    });
  };
  return (
    <div className="text-center py-5">
      <input type="number" onChange={(e) => setIndex(+e.target.value)} />
      <br />
      <button onClick={() => getMyBooks()}>Get 40books</button>
      <br />
      <button onClick={() => pushBooks()}>PUSH BOOKS</button>
      <br />
      <button onClick={() => getAuthorList()}>get authors</button>
      <br />
      <button onClick={() => loadAuthors()}>upload authors</button>
      <br />

      <button onClick={() => getCategoryList()}>get categories</button>
      <br />
      <button onClick={() => loadCategories()}>upload categories</button>
    </div>
  );
}
