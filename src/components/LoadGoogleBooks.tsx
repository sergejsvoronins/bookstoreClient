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
import { getGoogleBooks } from "../transport/googleBooks";

export function LoadGoogleBooks({ amount }: { amount: number }) {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getLists = async () => {
      const authors = await getAuthors();
      const categories = await getCategories();
      setAuthorsList(authors);
      setCategoriesList(categories);
      setIsLoaded(true);
    };
    if (isLoaded) return;
    getLists();
  }, [isLoaded]);
  useEffect(() => {
    const getBooks = async (amount: number) => {
      let response = await getGoogleBooks(amount);
      const authors: NewAuthor[] = [];
      const categories: NewCategory[] = [];
      response.items.map((b) => {
        b.volumeInfo.authors &&
          b.volumeInfo.authors.map((a) => {
            const seen = authors.some((f) => f.name === a);
            if (!seen) authors.push({ name: a });
          });
        b.volumeInfo.categories &&
          b.volumeInfo.categories.map((c) => {
            const seen = categories.some((f) => f.name === c);
            if (!seen) categories.push({ name: c });
          });
      });
      console.log(response);

      console.log(authors);
      console.log(categories);

      //   authors.map((a) => addAuthor(a));
      //   categories.map((c) => addCategory(c));
      // response.items.map((b) => {
      //   const author = authorsList.find((f) => {
      //     if (b.volumeInfo.authors) {
      //       return b.volumeInfo.authors.includes(f.name) ? f : null;
      //     }
      //   });
      //   const category = categoriesList.find((f) => {
      //     if (b.volumeInfo.categories) {
      //       return b.volumeInfo.categories.includes(f.name) ? f : null;
      //     }
      //   });

      //   if (author && category && b.saleInfo.listPrice) {
      //     addBook({
      //       title: b.volumeInfo.title,
      //       description: b.volumeInfo.description,
      //       imgUrl: b.volumeInfo.imageLinks.smallThumbnail,
      //       pages: b.volumeInfo.pageCount,
      //       year: +b.volumeInfo.publishedDate.slice(0, 4),
      //       language: b.volumeInfo.language,
      //       authorId: author.id,
      //       categoryId: category.id,
      //       price: b.saleInfo.listPrice.amount,
      //       isbn: +b.volumeInfo.industryIdentifiers[1].identifier,
      //     });
      //   }
      // });
    };

    getBooks(amount);
  }, []);
  console.log(authorsList);
  console.log(categoriesList);

  return <div>Loading books</div>;
}
