var getCssPath = function(el) {
        if (!(el instanceof Element)) 
            return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                       nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
     }
var onClickSaveCommentCssPath = function(e) {
    console.log(e.target.href);
    var cssPath = getCssPath(e.target);
    if (e.target.href === "javascript:void(0)") {
      console.log(getCssPath(e.target));
      var minimized_comments = [];
      if(window.sessionStorage.getItem(window.location.href) === null) {
        minimized_comments[0] = cssPath;
        window.sessionStorage.setItem(window.location.href, JSON.stringify(minimized_comments));
      }else {
        minimized_comments = JSON.parse(window.sessionStorage.getItem(window.location.href));
        var commentIndex = minimized_comments.indexOf(cssPath);
        if( commentIndex === -1 ) {
            minimized_comments.push(cssPath);
            window.sessionStorage.setItem(window.location.href, JSON.stringify(minimized_comments));
        }else {
            minimized_comments.splice(commentIndex, 1);
            window.sessionStorage.setItem(window.location.href, JSON.stringify(minimized_comments));
        }
      }
    }
};
$(".expand").click(onClickSaveCommentCssPath);
var minimized_comments = [];
if(window.sessionStorage.getItem(window.location.href) !== null) {
    minimized_comments = JSON.parse(window.sessionStorage.getItem(window.location.href));
    for (var i = 0; i < minimized_comments.length; i++) {
        togglecomment($(minimized_comments[i]).first());
    }
}