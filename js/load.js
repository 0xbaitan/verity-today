const nav_menu_template = '<li><a href="{{path}}">{{option}}</a></li>\n';

var nav_menu_list = [];


$.getJSON("/data/navigation-bar.json", function (data) {
	nav_menu_list.push('<ul>\n')
    $.each(data.navigation, function (index) {
      var nav_menu = nav_menu_template ;
      $.each(data.navigation[index], function (key, value) {
        var expression = "{{" + key + "}}";
        nav_menu = nav_menu.replace(expression, value);
      });
     nav_menu_list.push(nav_menu);
    });
	nav_menu_list.push('</ul>\n');
	console.log();
	$("#navigation-bar-list").html(nav_menu_list.join(' '));
});