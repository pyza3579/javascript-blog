'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorsColumnLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
  };
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = '.tag-size-',
    optAuthorsListSelector = '.authors.list';
  const generateTitleLinks = function(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] get the title from the title element */
      //const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* [DONE] create HTML of the link */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();
  const calculateTagsParams = function(tags) {
    const params = {
      max: '0',
      min: '999999' //w cudzyslowiie czy bez?
    };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };
  const calculateTagClass = function(count,params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix, classNumber;
  };
  const generateTags = function() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* [DONE] generate HTML of the link */
        //const linkHTML = '<li><a  class="" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the tags into the tags wrapper */
      tagsList.innerHTML = html;
      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [NEW] add html from allTags to tagList */
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTMLMcode */
    const allTagsData = {tags: []};
    /* [NEW] START LOOP: for each tag in allTags*/
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = `<li><a class="tag-size-${calculateTagClass(allTags[tag], tagsParams)}" href="tag-${tag}"><span>${tag}</span></a></li>`;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };
  generateTags();
  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /*[DONE]  make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagHrefs = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagHref of tagHrefs) {
      /* add class active */
      tagHref.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  //tagClickHandler(event);
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  }
  addClickListenersToTags();
  const generateAuthors = function () {
    /* [NEW] create a new variable allAuthors with an empty array[]/object {} */
    let allAuthors = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* [NEW] add articleAuthor to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* [DONE] insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = html;
      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector('.authors');
    /* [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    const allAuthorsData= {allAuthors: []};
    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let articleAuthor in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsData.allAuthors.push ({
        articleAuthor: articleAuthor,
        count: allAuthors[articleAuthor],
      });
      /* [NEW] END LOOP: for each articleAuthor in allAuthors */
    }
    /* [NEW] add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = templates.authorsColumnLink(allAuthorsData);
  };
  generateAuthors();
  const authorClickHandler = function(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] make a new constant "author" and extract author name from the "href" constant */
    const author = href.replace('#author-', '');
    /* [DONE] find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /* [DONE] START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');
      /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all author links with "href" attribute equal to the "href" constant */
    const tagHrefs = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found tag link */
    for (let tagHref of tagHrefs) {
      /* [DONE] add class active */
      tagHref.classList.add('active');
      /* [DONE] END LOOP: for each found author link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };
  const addClickListenersToAuthors = function(){
    /* [DONE] find all links to authors */
    const authors = document.querySelectorAll('a[href^="#author-"]');
    for (let author of authors) {
      /* [DONE] add authorClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
    }
    /* [DONE] END LOOP: for each link */
  };
  addClickListenersToAuthors();
}
