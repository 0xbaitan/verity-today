$(document).ready(function () {
  loadXML("/data/navigation-bar.xml");
});

function loadXML(filepath) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      getNavigationMenu(this);
    }
  };
  xhttp.open("GET", filepath, true);
  xhttp.send();
}

function hasSubMenu(menu) {
  return menu.childNodes[2].getAttribute("has-sub") === "true";
}

function getMenuHTML(title, link) {
  let menu = `<li class="nav-item">
    <a class="nav-link" href="${link}">${title}</a>
  </li>`;
  return menu;
}

function getNextSiblingM(n) {
  if (n == null) return null;
  var y = n.nextSibling;
  while (y != null && y.nodeType != 1) {
    y = y.nextSibling;
  }
  return y;
}

function getSubmenuHTML(title, link, submenus) {
  let menu = `<li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="${link}"
      id="navbarDropdown_3"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      ${title}
    </a>
    <div
      class="dropdown-menu"
      aria-labelledby="navbarDropdown_2"
    >`;

  let list = [menu];
 
  let node = submenus.firstChild;
  let subtitle, sublink;
  while (node) {
    subtitle = node.firstChild.firstChild.nodeValue;
    sublink = node.firstChild.nextSibling.firstChild.nodeValue;
    list.push(`<a class="dropdown-item" href="${sublink}">
      ${subtitle}
      </a>`);
    node = getNextSiblingM(node);
  }

  list.push(`</div>\
  </li>`);
  console.log(list.join(""));
  return list.join("");
}
function getMenuData(menu) {
  if (!hasSubMenu(menu)) {
    console.log("No submenu");
  }
}

function getNavigationMenu(xml) {
  let response = xml.responseXML;
  let menus = response.getElementsByTagName("menu");
  let title, link, menu;
  let navhtml = [];
  for (let i = 0; i < menus.length; i++) {
    menu = menus[i];
    title = menu.childNodes[0].firstChild.nodeValue;
    link = menu.childNodes[1].firstChild.nodeValue;

    if (hasSubMenu(menu)) {
      navhtml.push(getSubmenuHTML(title, link, menu.childNodes[2]));
    } else {
      navhtml.push(getMenuHTML(title, link));
    }
  }
  $(".navbar-nav").html(navhtml.join(""));
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
  return item;
}
