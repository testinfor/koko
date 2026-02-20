$(function () {
  var smokingImagesByTab = {
    tab1: "images/JAP-SOMKING.png",
    tab2: "images/KOR-SOMKING.png",
    tab3: "images/ENG-SOMKING.png"
  };

  function getPreferredTabId() {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ""];
    var primaryLang = String(languages[0] || "").toLowerCase();

    if (primaryLang.indexOf("ja") === 0) {
      return "tab1";
    }
    if (primaryLang.indexOf("ko") === 0) {
      return "tab2";
    }
    return "tab3";
  }

  function setSmokingImage(tabPaneId) {
    var src = smokingImagesByTab[tabPaneId];
    if (src) {
      $("#SMOKING").attr("src", src);
    }
  }

  $(".guide-lang-tabs a[data-toggle='tab']").on("shown.bs.tab", function (event) {
    var target = $(event.target).attr("href");
    if (target) {
      setSmokingImage(target.replace("#", ""));
    }
  });

  var preferredTabId = getPreferredTabId();
  var preferredHref = "#" + preferredTabId;
  var $preferredTab = $(".guide-lang-tabs .nav-link[href='" + preferredHref + "']");

  if ($preferredTab.length && typeof $preferredTab.tab === "function") {
    $preferredTab.tab("show");
  }

  var activeHref = $(".guide-lang-tabs .nav-link.active").attr("href") || preferredHref;
  setSmokingImage(activeHref.replace("#", ""));
});
