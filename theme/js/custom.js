$(".nav-toggle").click(function () {
  $(".header-nav").addClass("show");
  $(".overlay-common").addClass("show");
});

$(".overlay-common").click(function () {
  $(".header-nav").removeClass("show");
  $(this).removeClass("show");
});

var TxtType = function (a, b, c) {
  this.toRotate = b;
  this.el = a;
  this.loopNum = 0;
  this.period = parseInt(c, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};
TxtType.prototype.tick = function () {
  var a = this.loopNum % this.toRotate.length;
  var c = this.toRotate[a];
  if (this.isDeleting) {
    this.txt = c.substring(0, this.txt.length - 1);
  } else {
    this.txt = c.substring(0, this.txt.length + 1);
  }
  this.el.attr("placeholder", this.txt);
  var b = this;
  var d = 200 - Math.random() * 100;
  if (this.isDeleting) {
    d /= 2;
  }
  if (!this.isDeleting && this.txt === c) {
    d = this.period;
    this.isDeleting = true;
  } else {
    if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      d = 500;
    }
  }
  setTimeout(function () {
    b.tick();
  }, d);
};
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $(".modal").on("click", "[data-toggle='modal']", function () {
    var parent = $(this).parents(".modal");
    parent.modal("hide");
    console.log("demosdsdsdsdsds");
  });
});
$(".menus li").each(function () {
  if ($(this).find("ul").length) {
    $(this).find(">a").append("<span class='down'></span>");
  }
});
$(".menus a").click(function (e) {
  if ($(this).parent().find("ul").length) {
    e.preventDefault();
    $(this).parent().siblings().removeClass("active");
    $(this).parent().toggleClass("active");
  }
});
$(".list-expand .item .title")
  .unbind()
  .click(function () {
    if ($(this).parent().hasClass("active")) {
      $(this).parent().siblings().removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(this).parent().addClass("active");
      $(this).parent().siblings().removeClass("active");
    }
  });
$(document).on("hidden.bs.modal", function (event) {
  if ($(".modal:visible").length) {
    $("body").addClass("modal-open");
  }
});
