export class ArticlesView {
  articlesContainerEl: HTMLDivElement;
  resetButton: HTMLButtonElement;
  searchButton: HTMLButtonElement;
  searchInput: HTMLInputElement;

  constructor() {
    this.articlesContainerEl = document.querySelector("#articles-container")!;
    this.resetButton = document.querySelector("#reset-button")!;
    this.searchButton = document.querySelector("#search-button")!;
    this.searchInput = document.querySelector("#search-query")!;
  }

  displayArticles = (articles: Article[]) => {
    this.#clearArticles();
    for (let i = 0; i < articles.length; i += 2) {
      const rowEl = document.createElement("div");
      rowEl.className = "row";
      rowEl.append(this.#getArticleColumnDiv(articles[i], i));
      if (articles[i + 1]) {
        rowEl.append(this.#getArticleColumnDiv(articles[i + 1], i + 1));
      }
      this.articlesContainerEl.append(rowEl);
    }
  };

  addSearchEventHandler = (
    callback: (searchInput: string) => Promise<void>
  ): void => {
    this.searchButton.addEventListener("click", () => {
      callback(this.searchInput.value);
    });
  };

  addResetEventHandler = (callback: () => Promise<void>): void => {
    this.resetButton.addEventListener("click", () => {
      this.searchInput.value = "";
      callback();
    });
  };

  #clearArticles = (): void => {
    var first = this.articlesContainerEl.firstElementChild;
    while (first) {
      first.remove();
      first = this.articlesContainerEl.firstElementChild;
    }
  };

  #getArticleColumnDiv = (article: Article, index: number): HTMLDivElement => {
    const columnEl = document.createElement("div");
    columnEl.className = "col-sm-6";
    const cardEl = document.createElement("div");
    cardEl.className = "card mb-3";
    if (article.multimedia) {
      cardEl.append(this.#getImageEl(article.multimedia[0]));
    }
    cardEl.append(this.#getBodyEl(article, index));
    columnEl.append(cardEl);
    return columnEl;
  };

  #getBodyEl = (article: Article, index: number): HTMLDivElement => {
    const bodyEl = document.createElement("div");
    bodyEl.className = "card-body";
    bodyEl.id = "article-" + (index + 1);
    bodyEl.append(this.#getTitleEl(article.title));
    bodyEl.append(this.#getSectionEl(article.section));
    bodyEl.append(this.#getDateEl(article.published_date));
    bodyEl.append(this.#getBylineEl(article.byline));
    bodyEl.append(this.#getLinkEl(article.url));
    bodyEl.append(this.#getAbstractEl(article.abstract));
    return bodyEl;
  };

  #getTitleEl = (title: string): HTMLDivElement => {
    const titleEl = document.createElement("h6");
    titleEl.className = "card-title";
    titleEl.textContent = title;
    return titleEl;
  };

  #getAbstractEl = (abstract: string): HTMLParagraphElement => {
    const abstractEl = document.createElement("p");
    abstractEl.className = "card-text";
    abstractEl.textContent = abstract;
    return abstractEl;
  };

  #getSectionEl = (section: string): HTMLParagraphElement => {
    const sectionEl = document.createElement("p");
    sectionEl.className = "card-text mb-0";
    const sectionSmall = document.createElement("small");
    sectionSmall.className = "text-muted";
    sectionSmall.textContent = section.toUpperCase();
    sectionEl.append(sectionSmall);
    return sectionEl;
  };

  #getDateEl = (date: string): HTMLParagraphElement => {
    const dateEl = document.createElement("p");
    dateEl.className = "card-text mb-0";
    const dateSmall = document.createElement("small");
    dateSmall.className = "text-muted";
    dateSmall.textContent = this.#formatDate(date);
    dateEl.append(dateSmall);
    return dateEl;
  };

  #formatDate = (date: string): string => {
    const day = date.split("T")[0];
    const time = date.split("T")[1].split("-")[0].slice(0, 5);
    return day + " " + time;
  };

  #getBylineEl = (byline: string): HTMLParagraphElement => {
    const bylineEl = document.createElement("p");
    bylineEl.className = "card-text mb-0";
    const bylineSmall = document.createElement("small");
    bylineSmall.className = "text-muted";
    bylineSmall.textContent = byline;
    bylineEl.append(bylineSmall);
    return bylineEl;
  };

  #getLinkEl = (url: string): HTMLParagraphElement => {
    const wrapperEl = document.createElement("p");
    wrapperEl.className = "card-text";
    const smallEl = document.createElement("small");
    const linkEl = document.createElement("a");
    linkEl.href = url;
    linkEl.textContent = "LINK";
    smallEl.append(linkEl);
    wrapperEl.append(smallEl);
    return wrapperEl;
  };

  #getImageEl = (imageObj: Multimedia): HTMLImageElement => {
    const imageEl = document.createElement("img");
    imageEl.className = "card-img-top mt-4 mx-auto";
    imageEl.src = imageObj.url;
    imageEl.alt = imageObj.caption;
    imageEl.style.width = "200px";
    return imageEl;
  };
}
