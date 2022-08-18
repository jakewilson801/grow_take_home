const ARTICLE_KEY = "ARTICLE_KEY";
export default function pinOrReadArticles(article?: {
  article: string;
  views: number;
  rank: number;
}) {
  const pinnedArticles = JSON.parse(localStorage.getItem(ARTICLE_KEY) || "[]");
  if (!article) {
    return pinnedArticles;
  }
  let isAlreadyPinned = false;
  let indexToDelete = -1;
  pinnedArticles.forEach((value: { article: string }, index: number) => {
    if (value?.article === article?.article) {
      isAlreadyPinned = true;
      indexToDelete = index;
    }
  });
  if (isAlreadyPinned) {
    pinnedArticles.splice(indexToDelete, 1);
    localStorage.setItem(ARTICLE_KEY, JSON.stringify(pinnedArticles));
    return pinnedArticles;
  } else {
    const newArticles = [...pinnedArticles, article];
    localStorage.setItem(ARTICLE_KEY, JSON.stringify(newArticles));
    return newArticles;
  }
}
