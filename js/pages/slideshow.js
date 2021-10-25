$(document).ready(function () {
  var events = $(".featured_articles_carousel");
  if (events.length) {
    events.owlCarousel({
      items: 1,
      loop: true,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      mouseDrag: true,
      nav: false,
      rtl: false,
    });

    $(".featured_next").click(function () {
      console.log(true);
      events.trigger("next.owl.carousel");
    });

    $(".featured_prev").click(function () {
      events.trigger("prev.owl.carousel");
    });

//    loadXML("/data/featured-articles.xml", "October", "2021");
  }
});

function processFeaturedArticleInfo(xmlDoc, month, year, property) {
  let xpath = `/root/set[@issue-month='${month}' and @issue-year='${year}']/featuredarticle/${property}`;
  let results = [];

  if (xmlDoc.evaluate) {
    let values = xmlDoc.evaluate(
      xpath,
      xmlDoc,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    let value;
    while ((value = values.iterateNext())) {
      results.push(value.childNodes[0].nodeValue);
    }

    return results;
  }
}

function process(xml, month, year) {
  let xmlDoc = xml.responseXML;
  let properties = [
    "title",
    "excerpt",
    "author",
    "date",
    "category",
    "imgpath",
    "articlepath",
  ];

  let table = [];
  let entry = {};
  for (let i = 0; i < properties.length; i++) {
    table[properties[i]] = processFeaturedArticleInfo(
      xmlDoc,
      month,
      year,
      properties[i]
    );
  }

  let finalOutput = [];

  let numFeaturedArticles = table[properties[0]].length;
  for (let i = 0; i < numFeaturedArticles; i++) {
    let title = table["title"][i];
    let excerpt = table["excerpt"][i];
    let author = table["author"][i];
    let date = table["date"][i];
    let category = table["category"][i];
    let imgpath = table["imgpath"][i];
    let articlepath = table["articlepath"][i];

    finalOutput.push(
      getFeaturedArticleSlideContent(
        title,
        excerpt,
        author,
        date,
        category,
        imgpath,
        articlepath
      )
    );
  }

  $(".owl-stage").html(finalOutput);
}

function loadXML(filepath, month, year) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      process(this, month, year);
    }
  };
  xhttp.open("GET", filepath, true);
  xhttp.send();
}

function getFeaturedArticleSlideContent(
  title,
  excerpt,
  author,
  date,
  category,
  imgpath,
  articlepath
) {
  let item = `<div class="owl-item">\
  <div class="featured_article_slide container">\
    <div class="row align-items-start justify-content-start">\
          <div class="col-lg-6 featured_article_img_section">\
        <img\
          class="featured_article_img"\
          src="${imgpath}"\
          alt="#"\
        />\
      </div>\
      <div class="col-lg-6">\
        <section class="featured_article_info">\
          <div class="featured_article_caption">\
            ${excerpt}\
          </div>\
          <div class="featured_article_title">\
           ${title}\
          </div>\
          <div class="featured_article_author">\
            Written by <span class="italic">${author}</span>\
          </div>\
          <div class="featured_article_meta_data">\
            <span class="featured_article_date">${date} • </span>\
            <span class="featured_article_category">${category}</span>\
          </div>\
          <a\
            href="${articlepath}"\
            class="btn_carousel featured_article_button"\
            >Read Now</a\
          >\
        </section>\
      </div>\
    </div>\
  </div>\
</div>`;

  return item;
}
