var pic_right_format =
  '<div class="col-md-12 blog-wrap">\n\
    <div class="row no-gutters align-items-center">\n\
  <div\n\
    class="col-md-6 img js-fullheight"\n\
    style="\n\
    background-image: url({{URL}});\n\
    "\n\
    ></div>\n\
  <div class="col-md-6">\n\
    <div class="text p-md-5 p-4 ftco-animate">\n\
      <div\n\
        class="heading"\n\
        style="background-color: rgba(30, 30, 30, 1)"\n\
      >\n\
        <div class="meta-wrap">\n\
          <p class="meta">\n\
            <span\n\
              ><i class="icon-calendar mr-2"></i>{{DATE}}</span\n\
            >\n\
            <span><i class="{{TYPE}} mr-2"></i>{{DEPARTMENT}}</span>\n\
          </p>\n\
        </div>\n\
        <h2 class="mb-2">\n\
          <a href="{{PAGE URL}}" style="color: #bf9b30"\n\
            >{{TITLE}}</a\n\
          >\n\
        </h2>\n\
        <h4 class="mb-5" style="color: #bf9b30">\n\
          {{AUTHOR}}\n\
        </h4>\n\
    </div>\n\
    <br /><br />\n\
    <p>\n\
        {{TEXT}}...<br /><a\n\
        href="{{PAGE URL}}"\n\
        style="color: #bf9b30"\n\
        >Read More <span class="icon-arrow-right small"></span\n\
      ></a>\n\
    </p>\n\
  </div>\n\
</div>\n\
</div>\n\
</div>';

var pic_right_format =
  '<div class="col-md-12 blog-wrap">\n\
<div class="row no-gutters align-items-center">\n\
  <div class="col-md-6" style="z-index: 1">\n\
    <div class="text p-md-5 p-4 ftco-animate">\n\
      <div\n\
        class="headingright"\n\
        style="background-color: rgba(30, 30, 30, 1)"\n\
      >\n\
        <div class="meta-wrap">\n\
          <p class="meta">\n\
            <span\n\
              ><i class="icon-calendar mr-2"></i>{{DATE}}</span\n\
            >\n\
            <span><i class="{{ICON}} mr-2"></i>{{DEPARTMENT}}</span>\n\
          </p>\n\
        </div>\n\
        <h2 class="mb-2">\n\
          <a href="{{TYPE}}" style="color: #bf9b30"\n\
            >{{TITLE}}</a\n\
          >\n\
        </h2>\n\
        <h4 class="mb-5" style="color: #bf9b30">\n\
        {{AUTHOR}}\n\
        </h4>\n\
    </div>\n\
    <br /><br />\n\
    <p>\n\
    {{TEXT}}<br /><a\n\
        href="{{PAGE URL}}"\n\
        style="color: #bf9b30"\n\
      >\n\
        Read More <span class="icon-arrow-right small"></span\n\
      ></a>\n\
    </p>\n\
  </div>\n\
</div>\n\
<div\n\
  class="col-md-6 img js-fullheight"\n\
  style="background-image: url({{URL}})"\n\
></div>\n\
</div>\n\
</div>';

var project_bubbles = [];

$.getJSON("assets/data/our-projects/our-projects.json", function (data) {
  $.each(data.projects, function (index) {
    var project_bubble = project_bubble_format;
    $.each(data.projects[index], function (key, value) {
      var expression = "{{" + key + "}}";
      project_bubble = project_bubble.replace(expression, value);
    });
    project_bubbles.push(project_bubble);
  });

  $(".m-section-bubble").html(project_bubbles);
});
