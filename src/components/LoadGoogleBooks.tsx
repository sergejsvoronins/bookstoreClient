import { useEffect, useState } from "react";
import {
  Author,
  Category,
  NewAuthor,
  NewCategory,
  addAuthor,
  addBook,
  addCategory,
  getAuthors,
  getCategories,
} from "../transport/books";
import { IGoogleBookInfo, getGoogleBooks } from "../transport/googleBooks";

export function LoadGoogleBooks() {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [authorsAreLoaded, setAuthorsAreLoaded] = useState(false);
  const [categoriesAreLoaded, setCategoriesAReLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listsAreLoaded, setListsAreLoaded] = useState(false);
  const [googleBooks, setGoogleBooks] = useState<IGoogleBookInfo[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getBooks = async (amount: number, index: number) => {
      let response = await getGoogleBooks(amount, index);

      setGoogleBooks([...googleBooks, ...response.items]);
      //   const authors: NewAuthor[] = [];
      //   const categories: NewCategory[] = [];
      //   response.items.map((b) => {
      //     b.volumeInfo.authors &&
      //       b.volumeInfo.authors.map((a) => {
      //         const seen = authors.some((f) => f.name === a);
      //         if (!seen) authors.push({ name: a });
      //       });
      //     b.volumeInfo.categories &&
      //       b.volumeInfo.categories.map((c) => {
      //         const seen = categories.some((f) => f.name === c);
      //         if (!seen) categories.push({ name: c });
      //       });
      //   });
      //   console.log(response);

      //   console.log(authors);
      //   console.log(categories);
      //   console.log(isLoaded);
      //   console.log(authorsAreLoaded);
      //   const addAuthors = () => {
      //     authors.map((a) => addAuthor(a));
      //     setAuthorsAreLoaded(true);
      //   };
      //   const AddCategories = () => {
      //     categories.map((c) => addCategory(c));
      //     setCategoriesAReLoaded(true);
      //   };
      //   // isLoaded && !authorsAreLoaded && addAuthors();
      //   // isLoaded && authorsAreLoaded && !categoriesAreLoaded && AddCategories();
    };
    if (isLoaded) return;
    getBooks(40, 0);
    setIsLoaded(true);
  }, []);
  const getMyBooks = async (index: number) => {
    let response = await getGoogleBooks(40, index);
    console.log(response.items);
  };

  useEffect(() => {
    const authors: NewAuthor[] = [];
    googleBooks.map((b) => {
      b.volumeInfo.authors &&
        b.volumeInfo.authors.map((a) => {
          const seen = authors.some((f) => f.name === a);
          if (!seen) authors.push({ name: a });
        });
    });
    if (isLoaded && !authorsAreLoaded) {
      // authors.map((a) => addAuthor(a));
      setAuthorsAreLoaded(true);
    } else return;
  }, [isLoaded, authorsAreLoaded]);
  useEffect(() => {
    const categories: NewCategory[] = [];
    googleBooks.map((b) => {
      b.volumeInfo.categories &&
        b.volumeInfo.categories.map((c) => {
          const seen = categories.some((f) => f.name === c);
          if (!seen) categories.push({ name: c });
        });
    });
    if (isLoaded && authorsAreLoaded && !categoriesAreLoaded) {
      // categories.map((c) => addCategory(c));
      setCategoriesAReLoaded(true);
    } else return;
  }, [isLoaded, authorsAreLoaded, categoriesAreLoaded]);
  useEffect(() => {
    if (
      isLoaded &&
      authorsAreLoaded &&
      categoriesAreLoaded &&
      !listsAreLoaded
    ) {
      const getLists = async () => {
        try {
          const authors = await getAuthors();
          const categories = await getCategories();
          setAuthorsList(authors);
          setCategoriesList(categories);
        } catch (err) {
          if (err) {
            setAuthorsList([]);
            setCategoriesList([]);
          }
        }
        setListsAreLoaded(true);
      };
      getLists();
    }
    if (isLoaded) return;
  }, [isLoaded, authorsAreLoaded, categoriesAreLoaded, listsAreLoaded]);
  console.log(googleBooks);
  console.log(authorsList);
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
          isbn: +b.volumeInfo.industryIdentifiers[1].identifier,
        });
      }
    });
  };
  return (
    <div>
      <input type="number" onChange={(e) => setIndex(+e.target.value)} />
      <button onClick={() => getMyBooks(index)}>Get 40books</button>;
      <button onClick={pushBooks}>push books</button>;
    </div>
  );
}
