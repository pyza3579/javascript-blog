'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);


    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function() {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';


    /* [DONE] for each article */
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
      console.log();
      //let html = '';

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML:', linkHTML);

      /* [DONE] create HTML of the link */

      titleList.innerHTML = titleList.innerHTML + linkHTML;
      //titleList.insertAdjacentHTML('afterend', '<article id=""></article>');

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
      console.log('html:', html);

    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }


  };


  generateTitleLinks();
 //czy ta funkcja dziala? Dleczego wyswietlaja sie 3 razy tagi?
  const generateTags = function() {
    debugger;
    console.log('generateTags:', generateTags);
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles) {
      console.log('article:', article);
      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log('tagsList;', tagsList);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags:', articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray:', articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray) {
        console.log('tag:', tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + articleTags + '"><span>' + articleTagsArray + '</span></a></li>';
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log('html:', html);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      console.log(tagsList);
      /* END LOOP: for every article: */
    }
  };
  generateTags();
  //ta funkcja wydaje sie nie dzialac w ogole??
  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked!');
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href :', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = document.querySelector(href);
  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

  function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
  }

  addClickListenersToTags();
}
