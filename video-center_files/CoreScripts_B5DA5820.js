function getGeoData(n) {
    function i(n) {
        var t = "//www.microsoft.com/windowsazure/handlers/phone.ashx?group=waz&ip=" + window.requestIP;
        $.getJSON(t + "&callback=?", function (t) {
            return n(r(t));
        });
    }
    function r(n) {
        return n.hasOwnProperty("phone") || (n.phone = ""), n.hasOwnProperty("country_name") || (n.country_name = "unknown"), $.cookie("geoc", requestIP + "|" + n.phone + "|" + n.country_name, { expires: 365, path: "/" }), n;
    }
    var t = $.cookie("geoc");
    try {
        return t !== null && (t = t.split("|")) && t.length === 3 && requestIP === t[0] ? n({ phone: t[1], country_name: t[2] }) : i(n);
    }
    catch (u) {
        return i(n);
    }
}
function strip(n) {
    var t = document.createElement("DIV");
    return t.innerHTML = n, t.textContent || t.innerText;
}
function checkForEnterKey(n, t) {
    var r = !0, i = 0;
    return typeof n != "undefined" && n != null && (typeof n.keyCode != "undefined" && n.keyCode != null ? i = n.keyCode : typeof n.which != "undefined" && n.which != null ? i = n.which : typeof n.charCode != "undefined" && n.charCode != null && (i = n.charCode)), i == 13 && (doSearch(t), r = !1), r;
}
function doSearch(n) {
    var r = document.getElementById(n), t, i;
    r != null && (t = r.value, t.length > 0 && !/^\s*$/.test(t) && $("#" + n).attr("placeholder") != t && (i = "", $(".sr-options").length > 0 && ($("#search-msdn").prop("checked") && (i += "&search-msdn=true"), $("#search-forums").prop("checked") && (i += "&search-forums=true"), $("#search-wacom").prop("checked") || (i += "&search-wacom=false")), $(document).trigger("search-submitted"), window.location.href = "/" + window.Acom.currentCulture + "/searchresults/?query=" + escape(t) + i));
}
function getParameterByName(n) {
    var t = RegExp("[?&]" + n + "=([^&]*)").exec(window.location.search);
    return t && decodeURIComponent(t[1].replace(/\+/g, " "));
}
function setParameterByName(n, t) {
    location.href = location.href.split("?")[0] + updateQueryString(location.search, n, t);
}
function updateQueryString(n, t, i) {
    var u, r;
    return i !== null ? (i = i.toString(), u = RegExp("[?&]" + t + "=([^&]*)").exec(n), u !== null ? n.replace(new RegExp("([?&]" + t + "=)([^&]*)"), "$1" + i.replace(/ /g, "+")) : (r = n.length > 0 ? "&" : "?", r += t + "=" + i.replace(/ /g, "+"), n + r)) : (n = n.replace(new RegExp("([?&]" + t + "=)([^&]*)"), ""), n[0] === "&" && (n = "?" + n.slice(1)), n);
}
function softLoadUrl(n) {
    return $("html.history").length !== 0 ? (window.history.replaceState(null, null, n), !0) : (window.location = n, !1);
}
function softLoadQueryString(n) {
    var i = location.search, t = i;
    return $.each(n, function (n, i) {
        t = updateQueryString(t, n, i);
    }), t !== i ? softLoadUrl(location.href.split("?")[0] + t) : !0;
}
var clcids;
$(function () {
    "use strict";
    document.cookie = "WT_NVR=; Domain=.microsoft.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "WT_NVR=; Domain=.azure.microsoft.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    $("body").on("tabbed.tabs toggled.showLessMore", function () {
        $("[data-control~='dropdown-jumpto']").trigger("reset");
    });
    $("body").on("filtered.dropdownfilter", function () {
        $("[data-control='pagination.next']").filter(":visible").trigger("page.pagination", 1);
    });
}), function (n, t) {
    "use strict";
    t.Core = {};
}(jQuery, window), function (n) {
    "use strict";
    n.LocalTime = function (n) {
        var i = n, e = i.data("utc-time"), t = "", u = "", r = i.data("pattern"), f = function (n) {
            var t = parseInt(n, 10);
            return t < 10 ? "0" + t : t;
        }, o = function (n) {
            switch (n) {
                case "d": return f(t.getDate());
                case "M": return f(t.getMonth() + 1);
                case "y": return t.getFullYear();
                default: return n;
            }
        }, s = function () {
            for (var t = "", i = "", n = 0; n < r.length; n++)
                i = r[n], t += o(i);
            return t;
        };
        try {
            t = new Date(e);
            u = r ? s() : t.toLocaleString(navigator.language, { month: "numeric", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
            i.text(u);
        }
        catch (h) {
        }
    };
    $(function () {
        var t = this;
        $("[data-utc-time]").each(function () {
            n.LocalTime.call(t, $(this));
        });
    });
}(Core), function (n, t) {
    "use strict";
    t.Util = function () {
        return { EncodeAttribute: function (n) {
            return t.Util.EncodeHtml(n).replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/`/g, "&#96;");
        }, EncodeHtml: function (n) {
            return n ? n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
        }, EscapeHtml: function (n) {
            var t = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
            return n.replace(/[&<>"'\/]/g, function (n) {
                return t[n];
            });
        }, SanitizeString: function (t) {
            return n.trim(t).toLowerCase();
        }, SoftLoadUrl: function (n, t, i) {
            var r = window.location.href.split(window.location.host)[1];
            if (r !== i)
                return window.history && window.history.pushState ? (window.history.pushState(n, t, i), !0) : (window.location = i, !1);
        }, SoftLoadQueryStringPairs: function (n) {
            var i = t.Util.GetQueryStringFromPairs(n);
            return i !== window.location.search ? t.Util.SoftLoadUrl(null, null, location.href.split("?")[0] + i) : !0;
        }, UpdateQueryString: function (n, t, i) {
            var u, r;
            return i && i !== null ? (i = i.toString(), u = RegExp("[?&]" + t + "=([^&]*)").exec(n), u !== null ? n.replace(new RegExp("([?&]" + t + "=)([^&]*)"), "$1" + i.replace(/ /g, "+")) : (r = n.length > 0 ? "&" : "?", r += t + "=" + i.replace(/ /g, "+"), n + r)) : (n = n.replace(new RegExp("([?&]" + t + "=)([^&]*)"), ""), n[0] === "&" && (n = "?" + n.slice(1)), n);
        }, GetParameterByName: function (n) {
            var t = RegExp("[?&]" + n + "=([^&]*)").exec(window.location.search);
            return t && decodeURIComponent(t[1].replace(/\+/g, " "));
        }, GetQueryStringFromPairs: function (i) {
            var r = location.search;
            return n.each(i, function (n, i) {
                r = t.Util.UpdateQueryString(r, n, i);
            }), r;
        }, SetCookie: function (t, i, r) {
            return r && typeof r == "number" || (r = 365), t && i ? (n.cookie(t, i, { expires: r, path: "/" }), !0) : !1;
        }, GetCookie: function (t) {
            return n.cookie(t);
        }, SetStorage: function (n, t) {
            window.localStorage && localStorage.setItem(n, t);
        }, GetStorage: function (n) {
            return window.localStorage ? localStorage.getItem(n) : null;
        }, RemoveStorage: function (n) {
            if (window.localStorage)
                return localStorage.removeItem(n);
        }, Sluggify: function (n) {
            return n.replace(/[,. :]/g, "-").toLowerCase();
        } };
    }();
}(jQuery, Core), function (n) {
    "use strict";
    function i() {
        return !!document.createElement("video").canPlayType;
    }
    function r() {
        var r, i, u, f;
        t.each(function () {
            r = n(this);
            i = r.find("video");
            f = i.width() / i.height();
            n(window).on("resize.background-video", function () {
                u = r.outerWidth(!0) / r.outerHeight(!0);
                u < f ? i.css({ height: "100%", width: "auto" }) : i.css({ height: "auto", width: "100%" });
            });
            n(window).trigger("resize");
        });
    }
    function u() {
        t.each(function () {
            n(this).remove();
        });
    }
    var t = n(".background-video-holder");
    i() ? r() : u();
}($);
clcids = { "en-us": "0x409", "es-es": "0x40a", "da-dk": "0x406", "de-de": "0x407", "fr-fr": "0x40c", "it-it": "0x410", "ja-jp": "0x411", "ko-kr": "0x412", "nl-nl": "0x413", "pt-br": "0x416", "ru-ru": "0x419", "sv-se": "0x41d", "zh-cn": "0x804", "zh-tw": "0x404", "pl-pl": "0x415", "tr-tr": "0x41f" }, function (n) {
    n(function () {
        var t = Acom.currentCulture || "en-us", i;
        typeof clcids[t] != "undefined" && n.each(n("a"), function () {
            var i = n(this).attr("href");
            i !== undefined && (i = i.toLowerCase(), i.indexOf("http://go.microsoft.com/") === 0 && i.indexOf("?linkid=") !== -1 && (i.indexOf("clcid=") !== -1 ? n(this).attr("href", i.replace(new RegExp("([?&]clcid=)([^&]*)"), "$1" + clcids[t])) : n(this).attr("href", i + "&clcid=" + clcids[t])));
        });
        i = getParameterByName("WT.mc_id");
        i !== null && n.each(n("#content-container a"), function () {
            var t = n(this).attr("href");
            t.indexOf("WT.mc_id") !== -1 && n(this).attr("href", updateQueryString(t, "WT.mc_id", i));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Util.JsonQuery = function () {
        return { FirstOrDefault: function (t, i, r) {
            var u = {};
            return n.each(t, function (n, t) {
                if (t[i] && t[i] === r)
                    return u = t, !1;
            }), u;
        }, Where: function (t, i, r) {
            var u = [];
            return n.each(t, function (n, t) {
                t[i] && t[i] === r && u.push(t);
            }), u;
        }, Select: function (t, i) {
            var r = [];
            return n.each(t, function (n, t) {
                t[i] && r.push(t[i]);
            }), r;
        } };
    }();
}(jQuery, Core), function (n) {
    "use strict";
    Core.Util.PageAnchors = function (t) {
        function o(n) {
            n.preventDefault();
            var t = n.currentTarget.hash.replace("#", "");
            u(t);
        }
        function u(t) {
            var i = n("[id='_" + t + "']"), r = 0, u = 0;
            i.length > 0 && (Core.Util.SoftLoadUrl(null, null, "#" + t), u = i.offset().top, r = u - f - e, n("html, body").animate({ scrollTop: r }, 10));
        }
        var r = window.location.hash.replace("#", ""), f = n("header").outerHeight(), e = 10, i;
        i = t.find("a[href^='#']").filter(function () {
            return !!this.hash.replace("#", "");
        });
        i.each(function () {
            var r = this.hash.replace("#", ""), t = Core.Util.EncodeAttribute(r), i = n("[id='" + t + "'], [name='" + t + "']");
            i.length > 0 && i.attr("id", "_" + t);
        });
        i.on("click", o);
        r && u(r);
    };
    n(function () {
        n(".wa-container").each(function () {
            new Core.Util.PageAnchors(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Util.Scroll = function (t, i) {
        function e(t, i) {
            var e = t || u, o = i || f, s = n(e), h = s.offset().top - r;
            n("html, body").animate({ scrollTop: h }, o);
        }
        var u = t || "", f = i || 1e3, r = 15;
        return n("header").each(function (t, i) {
            r += n(i).outerHeight();
        }), { To: e };
    };
}(jQuery), function (n) {
    "use strict";
    Core.Util.Uservoice = function (t) {
        function u(n) {
            UserVoice = window.UserVoice || [];
            (typeof n == "undefined" || n === null) && (n = 34192);
            UserVoice.push(["showLightbox", "classic_widget", { mode: "feedback", primary_color: "#404040", link_color: "#ffffff", forum_id: n, custom_template_id: 14813 }]);
        }
        var i = document.createElement("script"), r;
        i.type = "text/javascript";
        i.async = !0;
        i.src = "//widget.uservoice.com/R7H5zX5HKGZRsSCWxTl2A.js";
        r = document.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(i, r);
        t.on("click", function (t) {
            t.preventDefault();
            u(n(this).data("forum"));
        });
    };
    n(function () {
        var t = n(".uservoice");
        t && t.length > 0 && new Core.Util.Uservoice(t);
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Util.Delay = function () {
        var n = 0, t = this;
        this.inc = function () {
            return ++n;
        };
        this.wait = function (i, r) {
            var u = t.inc(), f = function () {
                u === n && i();
            };
            setTimeout(f, r);
        };
        this.waitOneSecond = function (n) {
            t.wait(n, 1e3);
        };
    };
}(jQuery, Core), function (n, t) {
    "use strict";
    t.Controls = {};
}(jQuery, Core), function (n, t) {
    "use strict";
    function r(t) {
        var i = n(t.target).closest("[data-form-redirect]").data("form-redirect");
        return this.submitFormAsync(i, null, "get"), !1;
    }
    function u() {
        var n = this.element.attr("target"), t = this.getFormContent();
        return this.validateForm() && this.submitFormAsync(n, t), !1;
    }
    function f(n) {
        var t = this.container;
        this.container.is("form") ? (t = this.container.parent(), this.container.replaceWith(n)) : this.container.html(n);
        this.element.removeClass("wa-loader");
        this.parseNewForms(t);
    }
    function e(n, t, i) {
        this.element.removeClass("wa-loader");
        this.formControls && this.formControls.attr("disabled", !1);
        this.errorMessage && this.errorMessage.show();
        console.error("Unable to submit form. " + i.status + " " + i.statusText);
    }
    var i = function (n) {
        if (n) {
            var t = n.data("form-callback-container");
            this.element = n;
            this.httpMethod = (this.element.attr("method") || "").toLowerCase();
            this.container = t ? this.element.closest(t) : this.element;
            this.errorMessage = this.element.find(".wa-error-message");
            this.formControls = this.element.find(":submit, input:not([name=__RequestVerificationToken]), select");
            this.element.on("submit", u.bind(this));
            this.element.on("click", "[data-form-redirect]", r.bind(this));
        }
    };
    i.prototype.submitFormAsync = function (t, i, r) {
        r = r || this.httpMethod || i && "post" || "get";
        var u = n.ajax({ url: t, data: i, method: r });
        return u.done(f.bind(this)).fail(e.bind(this)), this.formControls.attr("disabled", !0), u.promise();
    };
    i.prototype.validateForm = function () {
        var n = this.element.valid();
        return n && this.errorMessage && this.errorMessage.hide(), n;
    };
    i.prototype.getFormContent = function () {
        var r = this.element.find(".wa-checkbox").serializeArray(), t = this.element.serializeArray(), i = {};
        return t = t.concat(r), n.each(t, function (n, t) {
            i[t.name] = t.value;
        }), t.length > 0 ? i : undefined;
    };
    i.prototype.parseNewForms = function (n) {
        i.parseForms(n || this.container, !0);
    };
    i.parseForms = function (r, u) {
        r = r || document;
        n(r).find("form[data-control=ajax-form]").each(function () {
            new i(n(this));
            u && (n.validator.unobtrusive.parse(r), n(r).find("[data-control='checkbox']").each(function () {
                new t.Controls.Checkbox(n(this));
            }));
        });
    };
    i.parseForms();
    t.Controls.AjaxForm = i;
}(jQuery, Core), function (n) {
    "use strict";
    Core.Controls.BoxGrid = function (t) {
        var r = t.find("li a"), i = "active", u = "disabled", f = "navigate", e = function (e) {
            var o = n(this);
            o.hasClass(f) || (e.preventDefault(), o.hasClass(i) ? (o.removeClass(i), t.trigger("unchecked.boxgrid")) : o.hasClass(u) || (r.removeClass(i), o.not(u).addClass(i), t.trigger("checked.boxgrid", o.data("value"))));
        };
        r.on("click", e);
    };
    n(function () {
        n("[data-control='boxgrid']").each(function () {
            new Core.Controls.BoxGrid(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    Core.Controls.Carousel = function (i) {
        var u = i.find(".slides"), f = u.children("li"), o = f.length, w = i.find(".carousel-control ul"), s = w.children("li"), tt = i.find(".next-arrow"), it = i.find(".prev-arrow"), l = 0, h = null, c = null, a = 0, r = 0, rt = n(t), e = u.width(), ut = i.data("autoscroll") === "off", ft = 7e3, b = 600, k = function () {
            f = u.children("li");
            s = w.children("li");
            o = f.length;
            v();
            d();
            p();
        }, et = function () {
            c || (c = setTimeout(function () {
                v();
                clearTimeout(c);
                c = null;
            }, 200));
        }, d = function () {
            var n = a + 1;
            s.removeClass("active").filter(":nth-child(" + n + ")").addClass("active");
        }, v = function () {
            l = (e - i.width()) / 2;
            u.css("left", -l);
        }, ot = function () {
            r++;
            r = r % o;
            i.css("display") !== "none" && y();
        }, st = function (t) {
            t.preventDefault();
            var i = n(t.target);
            r = parseInt(i.text(), 10);
            r !== a && (y(), p());
        }, y = function () {
            var n = r + 1, t = -e - l;
            u.hasClass("sliding") || (u.css("width", e * 2).addClass("sliding"), f.filter(":nth-child(" + n + ")").css("z-index", 1).addClass("next"), u.animate({ left: t }, b, "swing", g));
        }, ht = function () {
            var i = r, t;
            r = --r;
            r < 0 && (r = o - 1);
            t = 0;
            u.hasClass("sliding") || (n(f[i]).css({ right: 0, left: "auto" }), u.css({ width: e * 2, "margin-left": "-1600px" }).addClass("sliding"), n(f[r]).css("z-index", 2).addClass("prev"), u.animate({ "margin-left": t }, b, "swing", g));
        }, g = function () {
            var n = r + 1;
            a = parseInt(r, 10);
            f.attr("style", "").css({ "z-index": 1 }).removeClass("next").removeClass("prev").filter(":nth-child(" + n + ")").css("z-index", 2);
            v();
            u.css({ width: e, "margin-left": 0 }).removeClass("sliding");
            d();
        }, p = function () {
            ut || (h !== null && clearInterval(h), h = setInterval(ot, ft));
        }, nt = function () {
            clearInterval(h);
        }, ct = function (t, i) {
            n(slides[i]).remove();
            n(s[controls.length - 1]).remove();
            nt();
            k();
            t.preventDefault();
        }, lt = function (n) {
            n.preventDefault();
            r = ++r % o;
            y();
        }, at = function (n) {
            n.preventDefault();
            ht();
        };
        k();
        i.on("remove.carousel", ct);
        rt.on("resize", et);
        s.on("click", st);
        tt.on("click", lt);
        it.on("click", at);
        i.on("mouseenter", nt);
        i.on("mouseleave", p);
    };
    n(function () {
        var t = this;
        n('[data-control="carousel"]').each(function () {
            Core.Controls.Carousel.call(t, n(this));
        });
    });
}(jQuery, window), function (n) {
    "use strict";
    Core.Controls.CopyToClipboard = function (t, i) {
        var u = t, r = "clipboard-element-" + i;
        u.wrap('<div class="pre-wrap" />').attr("id", r).parent(".pre-wrap").prepend(n("<div />", { "class": "copy-button", html: '<span class="copy-tooltip">Copy to clipboard<\/span><span>Copy<\/span><svg><use xlink:href="#clipboard"><\/use><\/svg>', "data-clipboard-target": r })).end().siblings(".copy-button").css({ top: "10px" });
        new ZeroClipboard(n(".copy-button"));
    };
    n(function () {
        if (!ZeroClipboard.isFlashUnusable()) {
            var t = 0;
            ZeroClipboard.config({ swfPath: Acom.ContentUrl + "Scripts/opensource/zeroclipboard/ZeroClipboard.swf" });
            n(".copy-to-clipboard").each(function () {
                new Core.Controls.CopyToClipboard(n(this), t);
                t++;
            });
            n(".copy-button").on("click", function () {
                n(".copy-tooltip", n(this)).text("Copied!");
            }).on("mouseout", function () {
                n(".copy-tooltip", n(this)).text("Copy to clipboard");
            });
        }
    });
} (jQuery), function (n) {
    "use strict";
    Core.Controls.Dropdown = function (n, t) {
        function f() {
            return n.find("option:selected");
        }
        function r() {
            var n = f();
            u.text(n.text());
            i.trigger("changed", n.val());
        }
        var i = n.parent(), u = i.find(".wa-dropdown-value");
        t && t.data && (n.empty(), t.data.forEach(function (i) {
            t.selected && t.selected === i.label ? n.append("<option value='" + i.value + "' selected='selected'>" + i.label + "<\/option>") : n.append("<option value='" + i.value + "'>" + i.label + "<\/option>");
        }));
        i.hasClass("wa-dropdown-disabled") && n.prop("disabled", !0);
        n.on("focus", function () {
            i.addClass("wa-dropdown-focus");
        });
        n.on("blur", function () {
            i.removeClass("wa-dropdown-focus");
        });
        n.on("change", r);
        return r.call(n), { el: n, disable: function () {
            i.addClass("wa-dropdown-disabled");
            n.prop("disabled", !0);
        }, enable: function () {
            i.removeClass("wa-dropdown-disabled");
            n.prop("disabled", !1);
        }, reset: function () {
            n.children("option:first-child").prop("selected", !0);
            r.call(n);
        } };
    };
    n(function () {
        n("[data-control~='dropdown']").each(function () {
            new Core.Controls.Dropdown(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DropdownDepender = function (t) {
        var e = t.parent(), r = t.attr("data-dropdown-depender-set"), i = n("[data-dropdown-depender-set='" + r + "']").not(t), o = i.find("[data-depender]").detach(), u = new Acom.UserManager, f = function () {
            i.find("[data-depender]").remove();
            i.append(o.filter(function () {
                return n(this).attr("data-depender") === t.val();
            }));
            i.each(function () {
                h(t.val(), n(this).attr("data-dropdown-depender-set"), n(this));
            });
            i.trigger("change");
        }, s = function () {
            u.SetValue("dropdown.depender." + r, t.val());
        }, h = function (t, i, r) {
            var f = u.GetValue("dropdown.dependent." + i), e = r.find("option[data-depender='" + t + "']").filter(function () {
                return n(this).text().toLowerCase() === f;
            });
            f && e.length === 1 && e.prop("selected", "selected");
        }, c = function () {
            var n = u.GetValue("dropdown.depender." + r);
            return n && t.find("option[value='" + n + "']").length > 0 ? (t.val(n).trigger("change"), !0) : !1;
        };
        e.on("changed", f);
        i.on("change", s);
        c() || f();
    };
    n(function () {
        n("[data-control~='dropdown-depender']").each(function () {
            new Core.Controls.DropdownDepender(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DropdownMultipleFilter = function (t) {
        var f = t.parent(), i = t.attr("data-dropdown-filter-set"), e = n("[data-control~='dropdown-multiple-filter'][data-dropdown-filter-set='" + i + "']"), r = n("[data-dropdown-filter-set='" + i + "']").not(n("select")), u = function () {
            var i = r;
            r.attr("data-control-hide", "true");
            e.each(function (t, r) {
                i = i.filter("[data-filter-value~='" + n(r).val() + "']");
            });
            i.attr("data-control-hide", "false");
            t.trigger("filtered.dropdownfilter");
        };
        f.on("changed", u);
        u();
    };
    n(function () {
        n("[data-control~='dropdown-multiple-filter']").each(function () {
            new Core.Controls.DropdownMultipleFilter(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DropdownFilter = function (t) {
        var u = t.parent(), f = t.attr("data-dropdown-filter-set"), i = n("[data-dropdown-filter-set='" + f + "']").not(n("select")), r = function () {
            i.attr("data-control-hide", "true");
            i.filter("[data-filter-value~='" + t.val() + "']").attr("data-control-hide", "false");
            t.trigger("filtered.dropdownfilter");
        };
        u.on("changed", r);
        r();
    };
    n(function () {
        n("[data-control~='dropdown-filter']").each(function () {
            new Core.Controls.DropdownFilter(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DropdownJumpTo = function (t) {
        function u() {
            n("html, body").animate({ scrollTop: t.val() }, r);
        }
        function f() {
            i.on("changed", u);
            t.on("reset", o);
            e();
        }
        function e() {
            var i = n("[data-jumpTo-stop='true']:visible"), r = n("header").height();
            i.each(function () {
                var i = n(this), u = i.offset().top - r - i.height();
                t.append("<option value='" + u + "'>" + i.text() + "<\/option>");
            });
        }
        function o() {
            var n = t.find("option:gt(0)");
            i.off("changed");
            t.off("reset");
            t.val("default").trigger("change");
            n.remove();
            new Core.Controls.DropdownJumpTo(t);
        }
        var i = t.parent(), r = 1e3;
        f();
    };
    n(function () {
        n("[data-control~='dropdown-jumpto']").each(function () {
            new Core.Controls.DropdownJumpTo(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DropdownLinker = function (t) {
        var i = t.parent(), r = t.attr("data-linker"), u = n("a[data-linker='" + r + "']"), f = function () {
            u.attr("href", t.val());
        };
        i.on("changed", f);
    };
    n(function () {
        n("[data-control~='dropdown-linker']").each(function () {
            new Core.Controls.DropdownLinker(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.DynamicTableCollection = function (t) {
        var i = t.find("[data-control='dynamictable']"), e = t.find(".wa-tableDynamic-tables"), r = t.find(".wa-tableDynamic-scroll.actual"), u = t.find(".wa-tableDynamic-scroll.dummy"), f = function () {
            var t = 0;
            i.filter(".showing, .show").each(function (i, r) {
                t += n(r).data("width");
            });
            e.width(t);
        }, o = function () {
            i.trigger("init.dynamictable");
        }, s = function () {
            u.scrollLeft(r.scrollLeft());
        }, h = function () {
            r.scrollLeft(u.scrollLeft());
        };
        i.on("hidden.dynamictable showing.dynamictable", f);
        u.on("scroll", h);
        r.on("scroll", s);
        t.on("init.dynamictablecollection", o);
        t.on("draw.dynamictablecollection", f);
    };
    n(function () {
        n("[data-control='dynamictablecollection']").each(function () {
            new Core.Controls.DynamicTableCollection(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    function t(t) {
        n("[data-faq='" + t + "'] > li").addClass("wa-faq-active").trigger("expanded");
    }
    function i(t) {
        n("[data-faq='" + t + "'] > li").removeClass("wa-faq-active").trigger("collapsed");
    }
    n("body").on("click", ".wa-faq-question > a", function (t) {
        t.preventDefault();
        var i = n(this), r = i.parents("li");
        r.toggleClass("wa-faq-active");
        r.hasClass("wa-faq-active") ? i.trigger("expanded") : i.trigger("collapsed");
    });
    n(function () {
        n(".wa-faq-expandAll").each(function () {
            var r = n(this), u = r.data("faq");
            r.on("click", ".expand", function (n) {
                n.preventDefault();
                t(u);
            });
            r.on("click", ".collapse", function (n) {
                n.preventDefault();
                i(u);
            });
        });
    });
}(jQuery), function (n) {
    "use strict";
    var u = function () {
        this.updateStatus(t.SuccessStatus);
        this.setContentAlreadyVoted();
        n("[data-vote-key=" + this.key + "]").trigger("voteSubmitted");
    }, i = function () {
        this.updateStatus(t.ErrorStatus);
    }, e = function (t) {
        var i = n(t.target).val().length;
        this.remainingCharLabel.text(this.maxChars - i);
    }, o = function (r) {
        var f = !1, o = n(r.target), e = o.data("action");
        r.preventDefault();
        e === "submit" ? (o.data("vote-value") === "positive" && (f = !0), this.submitVote(f, null, u, i)) : e === "additional" ? (f = o.data("vote-value") === "positive", this.submitVote(f, null, this.setContentAlreadyVoted, i), this.updateStatus(t.AdditionalStatus)) : e === "submit-with-comment" ? this.submitVote(!1, this.commentTextbox.val(), u, i) : e === "skip-comment" && this.updateStatus(t.SuccessStatus);
    }, r = function (n) {
        n.css({ visibility: "visible" });
        n.fadeIn();
    }, f = function (n) {
        n.css({ visibility: "hidden" });
        n.hide();
    }, t = Core.Controls.FeedbackVote = function (n) {
        this.storage = new Acom.UserManager;
        this.element = n;
        this.key = this.element.data("vote-key");
        this.endpoint = this.element.data("vote-endpoint");
        this.commentTextbox = this.element.find('input[name="comment"]');
        this.maxChars = parseInt(this.commentTextbox.attr("maxlength"));
        this.remainingCharLabel = this.element.find('[data-vote-label="remaining-chars"]');
        this.element.on("keyup.FeedbackVote", 'input[name="comment"]', e.bind(this)).on("click.FeedbackVote", "a[data-action]", o.bind(this)).on("voteSubmitted", this.updateStatus.bind(this, t.SuccessStatus));
        this.statusBeforeSending;
        this.updateStatus(t.NoVoteStatus);
        this.element.show();
    };
    t.prototype.submitVote = function (i, r, u, f) {
        this.statusBeforeSending = this.status;
        this.updateStatus(t.InProgressStatus);
        var o = this.element.find('input[name="__RequestVerificationToken"]'), e = o.serializeArray();
        return e.push({ name: "isPositiveVote", value: i }), e.push({ name: "correlationId", value: this.element.find('input[name="correlationId"]').val() }), r && r.length > 0 && e.push({ name: "comment", value: r.substring(0, this.maxChars) }), n.post(this.endpoint, e).done(u && u.bind(this)).fail(f && f.bind(this)), !1;
    };
    t.prototype.updateStatus = function (n) {
        var i = this.element.find("[data-vote-part]"), u = this.element.find("[data-vote-status]");
        f(i);
        n === t.ErrorStatus ? this.statusBeforeSending && (r(i.filter('[data-vote-part="' + this.statusBeforeSending + '"]')), this.status = this.statusBeforeSending) : (r(i.filter('[data-vote-part="' + n + '"]')), this.status = n);
        f(u);
        r(u.filter('[data-vote-status="' + n + '"]'));
    };
    t.prototype.getContentAlreadyVoted = function () {
        return this.storage.GetValue("vote." + this.key);
    };
    t.prototype.setContentAlreadyVoted = function () {
        this.storage.SetValue("vote." + this.key, !0);
    };
    t.NoVoteStatus = "novote";
    t.InProgressStatus = "inprogress";
    t.SuccessStatus = "voted";
    t.AdditionalStatus = "additional";
    t.ErrorStatus = "error";
    n(function () {
        var i = n('[data-control="feedback-vote-container"]'), r, u, f;
        i.length && (r = new Acom.UserManager, u = i.data("vote-key"), r.GetValue("vote." + u) || (f = i.data("content-endpoint"), n.get(f).done(function (r) {
            i.html(r);
            n('[data-control="feedback-vote"]').each(function (i, r) {
                new t(n(r));
            });
        })));
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Filter = function (t) {
        var h = t.data("filter-set"), f = n("#" + h), r = f.find("[data-filter-term]"), e = f.siblings(".wa-filter-empty"), i = "", o = "", c = t.find(".clear"), s = t.find(".text-input"), l = function () {
            s.val("");
            s.trigger("clear.text");
        }, a = function () {
            i = Core.Util.SanitizeString(t.children().val());
            i !== o && u(i);
            o = i;
        }, v = function (n, i) {
            var r = i || Core.Util.SanitizeString(t.children().val());
            u(r);
        }, u = function (i) {
            i ? r.each(function (t, r) {
                var u = n(r), f = Core.Util.SanitizeString(u.data("filter-term"));
                f.indexOf(i) === -1 ? u.attr("data-filter-hide", "true") : u.attr("data-filter-hide", "false");
            }) : r.attr("data-filter-hide", "false");
            r.filter(function () {
                return n(this).css("display") !== "none";
            }).length === 0 ? e.show() : e.hide();
            t.trigger("filtered.filter");
        };
        t.on("change keyup", a);
        c.on("click", l);
        t.on("filter.filter", v);
        u();
    };
    n(function () {
        n("[data-control~='filter']").each(function () {
            new Core.Controls.Filter(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    function t() {
        function e() {
            var i = parseInt(t.css("width").replace("px", ""), 10);
            return t.hasClass("wa-navigationScroll") && i >= (n(".wa-spacer-docContent").width() || n(".wa-content-article").width());
        }
        function l() {
            e() && t.attr("style", "");
        }
        function o() {
            var n = t.outerHeight(!0), o = s || f.offset().top;
            e() ? t.attr("style", "") : (i.scrollTop() > o - u && t.css({ position: "fixed", top: u + "px" }).addClass("fixed").siblings(".wa-table").css("margin-top", n + 30 + "px"), i.scrollTop() < o - u ? t.css({ position: c, top: "" }).removeClass("fixed").siblings(".wa-table").css("margin-top", "0px") : i.scrollTop() + h > r.offset().top + r.outerHeight(!0) - n && t.css({ position: "absolute", top: r.outerHeight(!0) - n + "px" }));
        }
        var i = n(window), t = n(this), r = t.parents(".fixed-parent"), f = n('<div class="fixed-poition" />'), s = t.data("custom-offset"), u = t.data("top-spacing") || 90, h = t.data("bottom-spacing") || 90, c = t.data("resting-position") || "";
        f.insertBefore(t);
        o();
        i.on("scroll", o);
        i.on("resize", l);
    }
    n(".fixed-element").each(t);
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Checkbox = function (t) {
        function r(r) {
            var u;
            t.hasClass("disabled") || t.hasClass("checking") || t.hasClass("unchecking") || (r.type === "change" && i.is(":checked") || r.type === "check" ? (t.addClass("checking"), u = n.Event("checking"), t.trigger(u), u.isDefaultPrevented() ? (t.removeClass("checking"), e()) : f()) : (r.type !== "change" || i.is(":checked")) && r.type !== "uncheck" || (t.addClass("unchecking"), u = n.Event("unchecking"), t.trigger(u), u.isDefaultPrevented() ? (t.removeClass("unchecking"), f()) : e()));
        }
        function f() {
            var n = t.hasClass("checking");
            i.prop("checked", !0);
            t.addClass("checked");
            n && (t.trigger("checked.checkbox", u), t.removeClass("checking"));
        }
        function e() {
            var n = t.hasClass("unchecking");
            i.prop("checked", !1);
            t.removeClass("checked");
            n && (t.trigger("unchecked.checkbox", u), t.removeClass("unchecking"));
        }
        var i = t.find("input[type='checkbox']"), u = i.attr("value");
        i.on("change", r);
        t.on("check.checkbox", r);
        t.on("uncheck.checkbox", r);
        i.trigger("change");
    };
    n(function () {
        n("[data-control='checkbox']").each(function () {
            new Core.Controls.Checkbox(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.LinkList = function (t) {
        function o() {
            i.hide();
            for (var f = 0; f < r; f++)
                n(i[f]).show();
            t.append(u);
            u.on("click", "a", s);
        }
        function s(n) {
            n.preventDefault();
            u.remove();
            i.show();
        }
        var r = t.data("limit"), f = t.attr("data-more-text"), i = t.children("li"), e = i.length, u = n("<li><a href='#'>" + f + "<\/a><\/li>");
        r && f && e > r && o();
    };
    n(function () {
        n("[data-control='linkList']").each(function () {
            new Core.Controls.LinkList(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    n("[data-move-to-selector]").each(function () {
        var t = n(this), i = t.data("move-to-selector"), r = t.data("insert-before") || !0;
        t.removeAttr("data-move-to-selector").removeAttr("data-insert-before");
        r === !0 ? t.detach().insertBefore(i) : t.detach().insertAfter(i);
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Pagination = function (t) {
        function b(n, t) {
            h(t);
        }
        function k(t) {
            var i = n(t.currentTarget), r = i.data("page");
            t.preventDefault();
            i.hasClass("disabled") || h(r);
        }
        function d(n) {
            n.keyCode === v ? (n.preventDefault(), r.children().last().find("a").trigger("click")) : n.keyCode === a && (n.preventDefault(), r.children().first().find("a").trigger("click"));
        }
        function h(n) {
            e = t.data("items") === 0 ? t.data("items") : t.data("items") || e;
            f = t.data("pagesize") || f;
            n = parseInt(n, 10) || 1;
            i = n > Math.ceil(e / f) ? 1 : n;
            o = i - 1;
            s = i + 1;
            u = Math.ceil(e / f);
            nt();
        }
        function g(n) {
            return n === i || n === o || n === s || n === u && !y || n === p || u < w;
        }
        function c(n) {
            return n === 1 && (n = null), Core.Util.UpdateQueryString(window.location.search, "page", n);
        }
        function nt() {
            var h = !1, l = t.data("smart-href") !== "off", e, w = l ? window.location.pathname + c(i - 1) : "#", b = l ? window.location.pathname + c(i + 1) : "#", a, p, v, y;
            if (t.empty(), r.empty(), u > 1) {
                for (a = n("<a>", { "data-page": o }), i !== 1 && a.attr("href", w), r.append(n("<li />").append(a.append('<span class="wa-icon-triangleDarkPrev"><\/span>'))), e = 1; e <= u; e++)
                    g(e) ? (p = l ? window.location.pathname + c(e) : "#", v = n("<a>", { "data-page": e }), i !== e && v.attr("href", p), r.append(n("<li />").append(v.text(e))), h = !1) : h || (r.append("<li>&hellip;<\/li>"), h = !0);
                y = n("<a>", { "data-page": s, "class": i === u ? "disabled" : "" });
                i !== u && y.attr("href", b);
                r.append(n("<li />").append(y.append('<span class="wa-icon-triangleDarkNext"><\/span>')));
                t.append(r);
                t.show();
            }
            else
                t.hide();
            t.data({ pagesize: f, current: i });
            t.trigger("paged.pagination", [i]);
        }
        var r = n("<ul />"), l = typeof t.data("keyboard") == "undefined" ? !1 : !0, a = 37, v = 39, y = typeof t.data("hidemax") == "undefined" ? !1 : !0, i = 1, o = 1, s = 1, u = 1, p = 1, e = 0, f = 10, w = 7;
        t.on("click", "a", k);
        t.on("page.pagination", b);
        l && n(document).keydown(d);
        h();
    };
    n(function () {
        n("[data-control='pagination']").each(function () {
            new Core.Controls.Pagination(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Controls.PaginationNext = function (i) {
        var u = n("<ul />"), w = typeof i.data("keyboard") == "undefined" ? !1 : !0, b = 37, k = 39, s = i.data("clientid"), h = n("#" + s), p = h.children(), l, ht = p.length, d = i.data("size") || 10, g = typeof i.data("hidemax") == "undefined" ? !1 : !0, r = 1, c = 1, a = 1, e = 1, nt = 1, o = 0, f = 10, tt = 7, it = function (n, t) {
            v(t);
        }, rt = function (t) {
            var i = n(t.currentTarget), r = i.data("page");
            t.preventDefault();
            i.hasClass("disabled") || v(r);
        }, ut = function (n) {
            n.keyCode === k ? (n.preventDefault(), u.children().last().find("a").trigger("click")) : n.keyCode === b && (n.preventDefault(), u.children().first().find("a").trigger("click"));
        }, v = function (t) {
            o = i.data("items") === 0 ? i.data("items") : i.data("items") || o;
            f = i.data("pagesize") || f;
            t = parseInt(t, 10) || 1;
            h = n("#" + s);
            s && (l = p.not("[data-filter-hide='true'], [data-control-hide='true']"), o = h.data("total") === undefined ? l.length : h.data("total"), f = d);
            r = t > Math.ceil(o / f) ? 1 : t;
            c = r - 1;
            a = r + 1;
            e = Math.ceil(o / f);
            ot();
            s && st();
        }, ft = function (n) {
            return n === r || n === c || n === a || n === e && !g || n === nt || e < tt;
        }, et = function (n) {
            return n < r * f && n >= c * f;
        }, y = function (n) {
            return n === 1 && (n = null), t.Util.UpdateQueryString(window.location.search, "page", n);
        }, ot = function () {
            var o = !1, s = i.data("smart-href") !== "off", t, w = s ? window.location.pathname + y(r - 1) : "#", b = s ? window.location.pathname + y(r + 1) : "#", h, p, l, v;
            if (i.empty(), u.empty(), e > 1) {
                for (h = n("<a>", { "data-page": c }), r !== 1 && h.attr("href", w), u.append(n("<li />").append(h.append('<span class="wa-icon-triangleDarkPrev"><\/span>'))), t = 1; t <= e; t++)
                    ft(t) ? (p = s ? window.location.pathname + y(t) : "#", l = n("<a>", { "data-page": t }), r !== t && l.attr("href", p), u.append(n("<li />").append(l.text(t))), o = !1) : o || (u.append("<li>&hellip;<\/li>"), o = !0);
                v = n("<a>", { "data-page": a, "class": r === e ? "disabled" : "" });
                r !== e && v.attr("href", b);
                u.append(n("<li />").append(v.append('<span class="wa-icon-triangleDarkNext"><\/span>')));
                i.append(u);
                i.show();
            }
            else
                i.empty();
            i.data({ pagesize: f, current: r });
            i.trigger("paged.pagination", [r]);
        }, st = function () {
            l.each(function (t, i) {
                et(t) ? n(i).attr("data-pagination", "") : n(i).attr("data-pagination", "hidden");
            });
        };
        i.on("click", "a", rt);
        i.on("page.pagination", it);
        w && n(document).keydown(ut);
        v();
    };
    n(function () {
        n("[data-control='pagination.next']").each(function () {
            new t.Controls.PaginationNext(n(this));
        });
    });
}(jQuery, Core), function (n) {
    "use strict";
    function t() {
        function f() {
            var n = r.scrollTop() - 90;
            t = 0;
            u.each(function (i) {
                var r = o.filter(this.hash.replace("#", "#_")), u = Infinity;
                r.length && (u = r.position().top);
                n > u && (t = i);
            });
            u.parent().removeClass("active");
            t >= 0 && u.eq(t).parent().addClass("active");
        }
        var e = n(this), o = n("h2 a[href]"), u = e.find("li a[href]"), t = 0;
        f();
        i.on("scroll", f);
    }
    var i = n(window), r = n(document);
    n(".wa-navigationScroll > ul").each(t);
    n(".scrollspy").each(t);
}(jQuery), function (n) {
    "use strict";
    Core.Controls.ShowLessMore = function (t) {
        function f(r) {
            r.preventDefault();
            var f = n(this);
            f.hasClass(i) || (n("[data-control='showLessMore']").removeClass(i), f.addClass(i), u.toggle(), t.trigger("toggled.showLessMore"));
            e();
        }
        function e() {
            var t = "less";
            n("[data-control='showLessMore'].active").hasClass("wa-showMore") && (t = "more");
            n.cookie(r, t, { expires: 10, path: "/" });
        }
        function o() {
            n.cookie(r) === "more" && n(".wa-showMore").click();
        }
        var i = "active", u = n("[data-show-less-more-member='true']"), r = "wa.settings.showLessMore";
        t.on("click", f);
        o();
    };
    n(function () {
        n("[data-control='showLessMore']").each(function () {
            new Core.Controls.ShowLessMore(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Steps = function (t) {
        var f, u = t.children(), e = u.length - 1, i = n("<div />", { "class": "wa-step-legend" }), r = "", o, s, h, c = n("<div class='empty'><\/div>");
        n("body").append(c);
        r += "<ul><li><a href='#' class='wa-step-prev' data-id='0'><i class='wa-icon-triangleDarkPrev'><\/i><\/a><\/li>";
        r += "<li>Step <span class='wa-step-current'><\/span> of " + e + "<\/li>";
        r += "<li><a href='#' class='wa-step-next' data-id='2'><i class='wa-icon-triangleDarkNext'><\/i><\/a><\/li><\/ul>";
        r += "<a href='#' class='wa-arrowLink' data-id='1'>View all<\/a>";
        i.append(r);
        i.hide();
        t.append(i);
        o = i.find(".wa-step-prev");
        s = i.find(".wa-step-next");
        h = i.find(".wa-step-current");
        f = t.find("[data-id]");
        f.on("click", function (t) {
            t.preventDefault();
            var l = n(this), r = l.data("id"), f;
            r > e + 1 && (r = 1);
            f = u.filter(":nth-child(" + r + ")");
            h.text(r - 1);
            o.data("id", r - 1);
            s.data("id", r + 1);
            i.hide();
            r > 1 && i.show();
            f.length > 0 && (u.hide(), f.show(), c.html(" "));
        });
    };
    n(function () {
        n("[data-control='steps']").each(function () {
            new Core.Controls.Steps(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    Core.Controls.Tabs = function (i) {
        var e = i.data("tab-panel"), r = i.find("li .wa-tab"), u = n("[data-tab-panel-id='" + e + "']"), o = i.data("timer"), f = !0, s = i.data("baseurl") || t.location.pathname, c = document.title, h = function (t, u) {
            var s = n.Event("tabbing.tabs"), e = "", h = 0, o = "", c = "";
            t.preventDefault();
            f = !1;
            t.type === "click" ? e = n(t.currentTarget) : t.type === "tab" && typeof u == "string" ? e = r.filter(function (t, i) {
                return n(i).data("slug") === u;
            }) : t.type === "tab" && typeof u == "number" && (e = r.filter(function (t, i) {
                return n(i).data("id") === u;
            }));
            h = parseInt(e.data("id"), 10);
            o = e.data("slug");
            c = e.data("href");
            e.length > 0 && !e.hasClass("active") && (i.trigger(s, [o]), s.isDefaultPrevented() || a(h, o, c));
        }, l = function (n, t) {
            var i = n.width(), r = 750;
            t.animate({ left: i * -1, right: i }, r, function () {
                t.hide();
            });
            n.css("left", i).css("right", i * -1).show().animate({ left: 0, right: 0 }, r);
        }, a = function (t, f, e) {
            var o = r.filter(".active").data("id") || 1, h = e && e.length > 0;
            e && e === "#" ? e = "" : e && e.indexOf("#") === -1 && (e = (e + "/").replace("//", "/"));
            r.removeClass("active").attr("href", "#");
            r.filter(function (i, r) {
                return n(r).data("id") === t;
            }).addClass("active").removeAttr("href");
            u.length > 0 && u.each(function () {
                var i = n(this), r = i.children().filter(":nth-child(" + t + ")"), u = i.children().filter(":nth-child(" + o + ")"), f = i.attr("data-transition");
                f === "fade" ? u.fadeOut(375, function () {
                    r.fadeIn(375);
                }) : f === "slideshow" ? l(r, u) : (u.removeClass("active"), r.addClass("active"));
            });
            h && Core.Util.SoftLoadUrl(null, c, s + e);
            i.trigger("tabbed.tabs", [f]);
        }, v = function () {
            var t = r.filter(".active"), n = r.index(t) + 2;
            n > r.length && (n = 1);
            f && (r.trigger("tab.tabs", n), f = !0);
        }, y = function () {
            r.each(function (t, i) {
                var r = n(i);
                r.data("slug", r.data("slug") || Core.Util.Sluggify(r.text()) || "");
                r.data("id", r.data("id") || t + 1);
            });
            u.children().hasClass("active") || u.children().filter(":first-child").addClass("active");
        };
        y();
        n("a[data-tab-panel='" + e + "']").on("click", function (t) {
            t.preventDefault();
            var u = n(this), r = u.data("tab-id"), f = i.find(".wa-tab");
            n(f[r - 1]).trigger("tab.tabs", r);
        });
        i.on("click", ".wa-tab", h);
        i.on("tab.tabs", h);
        o && t.setInterval(v, o);
        t.onpopstate = function () {
            var n = t.location.pathname.replace(s, "").replace("/", "") || t.location.hash.substring(1) || 1;
            i.trigger("tab.tabs", n);
        };
    };
    n(function () {
        var t = this;
        n("[data-control='tabs']").each(function (i, r) {
            Core.Controls.Tabs.call(t, n(r));
        });
    });
}(jQuery, window), function (n) {
    "use strict";
    Core.Controls.Textbox = function (n) {
        function r() {
            n.trigger("changed.textbox");
        }
        var t = n.find("button"), i = n.find(".text-input");
        if (t && t.length > 0)
            t.on("click", function (n) {
                n.preventDefault();
                i.trigger("submitted.textbox");
            });
        i.on("change", r);
    };
    n(function () {
        n("[data-control='textbox']").each(function () {
            new Core.Controls.Textbox(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Toggle = function (n) {
        function u(r) {
            r.preventDefault();
            r.stopPropagation();
            n.hasClass("open") ? t() : i();
        }
        function t() {
            n.removeClass("open");
            n.find("a.toggler").attr({ "ms.nav1": "expand", "ms.interactiontype": "14" });
            n.trigger("collapsed.toggle");
        }
        function i() {
            n.addClass("open");
            n.find("a.toggler").attr({ "ms.nav1": "collapse", "ms.interactiontype": "15" });
            n.trigger("expanded.toggle");
        }
        var r = n.children(".toggler"), f = n.children(".toggled");
        r.on("click", u);
        n.on("expand.toggle", i);
        n.on("collapse.toggle", t);
    };
    n(function () {
        n("[data-control='toggle']").each(function () {
            new Core.Controls.Toggle(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.Tooltip = function (n) {
        function u() {
            t.show("fast");
        }
        function r() {
            setTimeout(function () {
                t.hide();
            }, 200);
        }
        function f(t) {
            if (t.preventDefault(), n.hasClass(i)) {
                n.removeClass(i);
                n.on("mouseleave", r);
            }
            else
                n.addClass(i), n.off("mouseleave");
        }
        function e(n) {
            n.stopPropagation();
        }
        var t = n.children("span"), i = "active";
        t.css("display", "inline-block").css("width", t.width()).hide().css("position", "absolute");
        n.on("mouseenter", u);
        n.on("mouseleave", r);
        n.on("click", f);
        t.on("click", e);
    };
    n(function () {
        n("[data-control='tooltip']").each(function () {
            new Core.Controls.Tooltip(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.VideoPlayer = function (t) {
        var a = t.parent(), u = t.height(), f = t.width(), i = {}, e = {}, v = t.find("[data-control='thumbnail']"), o = n("<a />", { "class": "close" }), h = 960, c = 540, y = 200, p = 200, w = u, b = f, r = t.parents(".wa-spacer"), l = r.parents(".wa-content"), s = l.children(".wa-spacer"), et = s.length, k = s.index(r), g = function () {
            var o = n("<iframe />"), i = t.attr("data-ch9"), r = t.attr("data-caption"), s = (i.indexOf("?") > -1 ? "&w=" : "?w=") + f, h = "&h=" + u, e = "";
            return r && r.length > 0 && (e = "#ccLang=" + r), i = i.replace("https:", "").replace("http:", ""), o.attr("src", i + s + h + "#autoplay" + e).attr("frameBorder", "0").attr("scrolling", "no").attr("allowFullScreen", "allowFullScreen").css("height", u).css("width", f);
        }, d = function () {
            e = g();
            i = n("<div />", { "class": "wa-videoWrapper", height: u, width: f });
            e.on("load", function () {
                t.hide();
            });
            a.prepend(i);
            i.append(t.detach());
            i.append(e);
        }, nt = function () {
            a.append(t.detach());
            i.remove();
            e.remove();
            t.show();
            ft();
        }, tt = function (i) {
            var r = t.attr("data-playLink-id"), u = t.data("expanding") === !0;
            r && n("#" + r).hide();
            i.preventDefault();
            u ? rt() : d();
        }, it = function () {
            var i = k === 0 ? "left" : "right";
            l.prepend(r.detach());
            t.css("float", i);
            r.addClass("wa-spacer-fullWidth");
            s.each(function (t, i) {
                var u = n(i);
                u !== r && u.addClass("wa-spacer-marginSwap");
            });
        }, rt = function () {
            it();
            v.css({ width: h + "px", maxWidth: "none", height: c + "px" });
            f = h;
            u = c;
            t.animate({ width: h }, y, "linear").animate({ height: parseInt(c, 10) }, p, "linear", function () {
                d();
                i.append(o);
                i.addClass("expanded");
            });
            o.attr("href", "#");
            o.on("click", function (n) {
                n.preventDefault();
                nt();
            });
        }, ut = function () {
            k !== 0 && l.append(r.detach());
            t.css("float", "none");
            r.removeClass("wa-spacer-fullWidth");
            s.each(function (t, i) {
                var u = n(i);
                u !== r && u.removeClass("wa-spacer-marginSwap");
            });
        }, ft = function () {
            o.remove();
            t.animate({ height: w }, p, "linear").animate({ width: b }, y, "linear", function () {
                i.removeClass("expanded");
                v.css({ width: b + "px", maxWidth: "100%", height: w + "px" });
                ut();
            });
        };
        t.on("click", tt);
    };
    n(function () {
        n("[data-control='video']").each(function () {
            new Core.Controls.VideoPlayer(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.VideoContainer = function (t) {
        function f(n) {
            if (n && n.length > 0) {
                if (t.html(n), t.find(".thumbnail"))
                    t.find(".thumbnail").on("load", function () {
                        Core.Controls.VideoPlayer.call(null, t.find("[data-control='video']"));
                    });
            }
            else
                r();
        }
        function r() {
            t.html("<h4>Video cannot be loaded: " + i + "<\/h4>");
        }
        var i = t.data("slug"), u = n("<div />", { "class": "wa-loader" });
        t.append(u);
        Acom.Util.Render.VideoThumbnail(i).done(f).fail(r);
    };
    n(function () {
        n("[data-control='video-container'][data-slug]").each(function () {
            new Core.Controls.VideoContainer(n(this));
        });
    });
}(jQuery), function (n) {
    "use strict";
    Core.Controls.VideoSwitcher = function (t) {
        function u(r) {
            var e = n(r.currentTarget), o = e.clone(), u = e.parent(".video-container"), f = "active";
            r.preventDefault();
            u.hasClass(f) || (u.siblings().removeClass(f), u.addClass(f), t.find("iframe").remove(), i.html(o), Core.Controls.VideoPlayer.call(t, i.find(".wa-video-thumbnail")));
        }
        var i = t.find(".player"), r = t.find(".selector");
        r.on("click", ".wa-video-thumbnail", u);
    };
    n(function () {
        n("[data-control='video-switcher']").each(function () {
            new Core.Controls.VideoSwitcher(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Acom = t.Acom || {};
}(jQuery, window), function (n, t, i) {
    "use strict";
    (t.UserManager = function () {
        function v() {
            var n = +new Date;
            t[e] = n;
            Core.Util.SetStorage(u(e), n);
        }
        function y(n, i) {
            v();
            typeof i == "undefined" || i === null ? (delete t[n], Core.Util.RemoveStorage(u(n))) : (t[n] = i, Core.Util.SetStorage(u(n), i));
        }
        function p(n) {
            return Core.Util.GetStorage(u(n));
        }
        function w(n) {
            return t[n] = null, Core.Util.RemoveStorage(u(n));
        }
        function b() {
            var t = p(l), n = JSON.parse(t || null), i = n && n.version == c && d(n);
            return i ? n : null;
        }
        function k(t) {
            var i = n.extend({}, t, { version: c });
            if (d(i))
                y(l, JSON.stringify(i));
            else
                throw "Invalid contact information format.";
        }
        function nt(n) {
            var t = b();
            t && (t.workEmail = n, k(t));
        }
        function d(n) {
            for (var i = !0, t = 0; t < a.length; t++)
                i = i && n[a[t]];
            return i;
        }
        for (var r = "acomuser", t = i[r] || {}, g = i.localStorage ? i.localStorage.length : 0, f = 0, e = "__updated", h, u = function (n) {
            return r + "." + n;
        }, c = "20150302", l = "contact-info", a = ["firstName", "lastName", "companyName", "jobTitle", "workPhone", "workEmail", "country"], o, s, f = 0; f < g; f++)
            o = i.localStorage.key(f), o.indexOf(r) > -1 && (t[o.replace(r + ".", "")] = localStorage[o]);
        if (t[e]) {
            if (s = new Date, s.setMonth(s.getMonth() - 3), +s >= parseInt(t[e], 10))
                for (h in t)
                    w(h);
            v();
        }
        return i[r] = t, { SetValue: y, GetValue: p, DeleteValue: w, SetContactInformation: k, SetEmailContactInfo: nt, GetContactInformation: b };
    })();
}(jQuery, Acom, window), function (n, t) {
    "use strict";
    t.Components = {};
}(jQuery, Acom), function (n, t, i) {
    "use strict";
    function u(t) {
        var i = n(t.target), r = this.getFormContent(), u = i.find("option:selected").data("contactme-default");
        this.toggleConditionalElements(r);
        this.element.find("[name=consentContact]").prop("checked", u ? "checked" : null).trigger("change");
    }
    var r = i.Components.ContactForm = function (n) {
        if (n) {
            t.Controls.AjaxForm.call(this, n);
            this.displayCondition = this.element.data("form-show");
            this.formSlug = this.element.data("contact-slug");
            this.element.on("change", "[name=country]", u.bind(this));
            this.storage = new i.UserManager;
            this.loadPersistedForm();
        }
    }, f = t.Controls.AjaxForm.prototype;
    r.prototype = new t.Controls.AjaxForm;
    r.prototype.submitFormAsync = function (n, t, i) {
        return this.validateForm() && (f.submitFormAsync.call(this, n, t, i), t && this.saveForm(t)), !1;
    };
    r.prototype.loadPersistedForm = function () {
        var t = this.storage.GetContactInformation(), i = "unregistered", r;
        t && (t.firstName.length > 0 && (i = "registered"), r = this.container.find("[data-contact-field]"), r.each(function (i, r) {
            var u = n(r), e = u.data("contact-field"), f = t[e];
            u.is(":checkbox") ? f ? u.attr("checked", "checked") : u.removeAttr("checked") : u.is("input, select, textarea") ? u.val(f) : u.text(f);
        }), this.element.find(".wa-checkbox input:checkbox").trigger("change"), this.toggleConditionalElements(t));
        this.displayCondition && this.element.toggle(this.displayCondition === i);
    };
    r.prototype.saveForm = function (t) {
        t = n.extend({}, t);
        delete t.__RequestVerificationToken;
        this.storage.SetContactInformation(t);
        this.storage.SetValue("contact." + this.formSlug, "registered");
    };
    r.prototype.toggleConditionalElements = function (n) {
        var t = this.element.find("[data-contact-conditional-country]").hide();
        t.filter("[data-contact-conditional-country~=" + n.country + "]").show();
    };
    r.prototype.parseNewForms = function (n) {
        r.parseForms(n || this.container, !0);
    };
    r.parseForms = function (i, u) {
        i = i || document;
        n(i).find("form[data-control=contact-form]").each(function () {
            new r(n(this));
            u && (n.validator.unobtrusive.parse(i), n(i).find("[data-control='checkbox']").each(function () {
                new t.Controls.Checkbox(n(this));
            }));
        });
    };
    r.parseForms();
}(jQuery, Core, Acom), function (n, t, i) {
    "use strict";
    (i.Components.Header = function () {
        function u() {
            i.children("li").removeClass("open");
            n("body").off("click", u);
        }
        for (var i = n("header .menu"), h = i.find(".menu-drop"), e = n("header .menu-tools"), c = n("header .small-hamburger"), l = n("header .small-search"), a = t.location.pathname, o = n("header").find(".menu li, .menu-drop li, .menu-pop li").children("a"), s, f, r = 0; r < o.length; r++)
            f = n(o[r]), a.indexOf(f.attr("href")) === 0 && (f.parents("li").addClass("active"), s = i.find("li.active"));
        h.each(function () {
            var i = n(this), t = i.find("[href='#']").parent();
            t.length > 0 && !t.hasClass("active") && n(t[0]).addClass("active");
        });
        i.on("click", "a", function (n) {
            n.stopPropagation();
        });
        i.on("click", "a[href='#']", function (t) {
            var i = n(t.target), r = i.parents("ul")[0];
            if (i.parent("li").siblings("li").removeClass("active open"), i.parent("li").addClass("active").toggleClass("open"), i.parent("li").hasClass("open")) {
                n("body").off("click", u);
                n("body").on("click", function () {
                    u();
                    i.parent("li").removeClass("active");
                    s.addClass("active");
                });
            }
            t.preventDefault();
        });
        c.on("click", function (n) {
            e.removeClass("open");
            i.toggleClass("open");
            n.preventDefault();
            n.stopPropagation();
        });
        l.on("click", function (n) {
            i.removeClass("open");
            e.toggleClass("open");
            n.preventDefault();
            n.stopPropagation();
        });
    })();
}(jQuery, window, Acom), function (n, t) {
    "use strict";
    n(function () {
        function u(n, i) {
            var r = "/" + i + "/";
            t.document.location = t.document.location.pathname.replace(/^\/[a-z]{2}-[a-z]{2}\//, r);
        }
        function f(t, i) {
            changeCurrency(i);
            n(".wa-dropdown-currency").val(currencyMetrics.name).trigger("change");
        }
        var r = n("footer #dropdown-cultures"), i = n("footer #dropdown-currency");
        i.find("select").val(n.cookie("defaultCurrency") || currencyMetrics.name).trigger("change");
        r.on("changed", u);
        i.on("changed", f);
    });
}(jQuery, window, Acom), function (n, t) {
    "use strict";
    t.Components.PlatformDropdownList = function (i) {
        function v(t) {
            var u = n(t.target), f = u.find("select"), i = f.val(), o = r.find(":selected").text();
            i && i !== "select" && (a.SetValue(e, i.toLowerCase()), s && s.appendTo(r.find("select")), s = r.find(c.replace("{value}", i)).detach(), r.find("option").filter(function () {
                return this.text == o;
            }).prop("selected", !0), r.find("[data-control='dropdown']").trigger("change"));
        }
        function y(t) {
            var u = n(t.target), r = u.find("select"), i = r.val();
            i && i !== "select" && (a.SetValue(e, r.find(":selected").text().toLowerCase()), window.location = i);
        }
        function p() {
            var t = n(this).val();
            return t += "/", t.replace("//", "/"), t.indexOf(u) !== -1;
        }
        function w() {
            var i = r.find("select").children(), t = n(i.filter(p)), u = n(t).data(l);
            o.find("select").children().filter(function () {
                return this.value === u;
            }).prop("selected", !0);
            o.find("[data-control='dropdown']").trigger("change");
            t.prop("selected", !0);
            r.find("[data-control='dropdown']").trigger("change");
        }
        var f = "#wa-dropdown-platform", h = "#wa-dropdown-backend", c = "option:not([data-platform='{value}']):not(:first-child)", l = "platform", e = "dropdown.depender.platform";
        i.find(f).length || (f = "#wa-dropdown-selector-1", h = "#wa-dropdown-selector-2", c = "option:not([data-depends-on-value='{value}']):not(:first-child)", l = "depends-on-value", e = "dropdown.depender." + i.find(f).data("storage"));
        var o = i.find(f).parent(), a = new t.UserManager, r = i.find(h).parent(), s, u = window.location.href.split("/documentation/articles/")[1];
        u && u.indexOf("?") > -1 && (u = u.split("?")[0]);
        o.on("changed.dropdown", v);
        w();
        r.on("changed.dropdown", y);
    };
    n(function () {
        n(".wa-dropdownList").each(function () {
            new t.Components.PlatformDropdownList(n(this));
        });
    });
}(jQuery, Acom), function (n, t, i) {
    "use strict";
    var r = i.Components.SignupForm = function (n) {
        n && (t.Controls.AjaxForm.call(this, n), this.displayCondition = this.element.data("form-show"), this.formSlug = this.element.data("contact-slug"), this.storage = new i.UserManager, this.loadPersistedForm());
    }, u = t.Controls.AjaxForm.prototype;
    r.prototype = new t.Controls.AjaxForm;
    r.prototype.submitFormAsync = function (n, t, i) {
        return this.validateForm() && (u.submitFormAsync.call(this, n, t, i), t && this.saveForm(t)), !1;
    };
    r.prototype.loadPersistedForm = function () {
        var n = this.storage.GetContactInformation();
        n && this.container.find("#gd-email").val(n.workEmail);
    };
    r.prototype.saveForm = function (n) {
        this.storage.SetEmailContactInfo(n.Email);
        this.storage.SetValue("contact." + this.formSlug, "registered");
    };
    r.prototype.parseNewForms = function (n) {
        ContactForm.parseForms(n || this.container, !0);
    };
    r.parseForms = function (t, i) {
        t = t || document;
        n(t).find("form[data-control=signup-form]").each(function () {
            new r(n(this));
            i && n.validator.unobtrusive.parse(t);
        });
    };
    r.parseForms();
}(jQuery, Core, Acom);
Acom.EventManagerConfig = [{ id: "main-menu-click", name: "Main Menu Clicked", description: "Tracks when user clicks on a main menu navigational item.", category: "Main Menu", action: "click", label: "main menu", value: null, ga: !1, km: !0 }, { action: "Remove Service", category: "Azure Status", description: "Track when a visitor removes a service from their view.  The label is the service slug for the service that was removed.", id: "status-service-removed", label: "service-slug", value: null }, { id: "status-region-collapsed", description: "Track when a visitor removes a region from their view.  The label is the slug of the region that was removed.", category: "Azure Status", action: "Remove Region", label: "region-slug", value: null }, { id: "acom-region", description: "Track the region a user is on.", category: "ACOM Region", action: "visited", label: "", value: null }, { id: "azure-status", description: "Track the visitor's interaction with the refresh time dropdown.", category: "Azure Status", action: "Auto Refresh date changed", label: "", value: null }, { id: "azure-status-tab", description: "Track the visitor's interaction with the Azure status tabs.", category: "Azure Status", action: "Tab Switch", label: "", value: null }, { id: "documentation-articles-feedback-top", description: "Track the visitor's interaction with feedback panel.", category: "Doc Articles Feedback", action: "Feedback - Top", label: "", value: null }, { id: "documentation-articles-feedback-bottom", description: "Track the visitor's interaction with feedback panel.", category: "Doc Articles Feedback", action: "Feedback - Bottom", label: "", value: null }, { id: "azure-status-region-collape", description: "tracks the event of users collapsing regions on the Status Page", category: "Azure Status", action: "Collapse Region", label: "", value: null }, { id: "azure-status-service-collapse", description: "tracks the event of users collapsing services on the Status Page", category: "Azure Status", action: "Collapse Service", label: "", value: null }, { id: "marketplace-virtual-machine-create", description: ' Visitor begins the work to provision a new VM from a VM marketplace detail page by clicking on the  main "Create a Virtual Machine" CTA on the top of the page', category: "Marketplace - Virtual Machines", action: "Create Virtual Machine", label: "", value: null }, { id: "marketplace-application-services-create", description: 'Visitor begins the work to provision a new Add-On from an Applications Services marketplace detail page by clicking on the  main "Sign Up" CTA on the top of the page', category: "Marketplace - Application services", action: "Create Application Service", label: "", value: null }, { id: "marketplace-apiapps-create", description: 'Visitor begins the work to create a new app from an ApiApp marketplace detail page by clicking on the  main "Sign Up" CTA on the top of the page', category: "Marketplace - ApiApp", action: "Create ApiApp", label: "", value: null }, { id: "marketplace-web-applications-create", description: 'Visitor begins the work to create a new website from a Web Applications marketplace detail page by clicking on the  main "Create Web app" CTA on the top of the page', category: "Marketplace - Web applications", action: "Create Web App", label: "", value: null }, { id: "calculator-virtual-machines-type-select", description: "Visitor using the Virtual Machines calculator will select either Windows or Linux when configuring their VM.", category: "Calculator - Virtual Machines", action: "Select Type", label: "", value: null }, { id: "calculator-virtual-machines-instance-size-select", description: "Visitor using the Virtual Machines calculator will select an instance size when configuring their VM.", category: "Calculator - Virtual Machines", action: "Select Instance Size", label: "", value: null }, { id: "calculator-add-more", description: "Visitor using the calculator will selects to add another configuration panel.", category: "Calculator", action: "Add More", label: "", value: null }, { id: "marketplace-vm-search-filters", description: "Visitor using the VM Marketplace search filters selects one of more categories.", category: "Marketplace - Virtual Machines Filter", action: "Select Search Filter", label: "", value: null }, { id: "docarticles-leftnav-sections-expand", description: "Tracks expanding and collapsing of the sections in the left nav", category: "", action: "expand", label: "", value: null }, { id: "docarticles-leftnav-sections-collapse", description: "Tracks expanding and collapsing of the sections in the left nav", category: "", action: "collapse", label: "", value: null }, { id: "docarticles-leftnav-articles-links", description: "Tracks clicks on links in the left nav", category: "left-nav- + {name of the service} (category per service)", action: "click", label: "", value: null }, { id: "desktop-mode-switch", description: "Track when a visitor using mobile opts to view the page in desktop view.", category: "Desktop view button", action: "click", label: "", value: null }, { id: "doc-landing-page-hero-tutorial-dropdown", description: "Tracks the selected values of the doc landing pages hero tutorials drop downs", category: "hero-tutorial- + <service-slug>", action: "start-tutorial", label: "", value: null }, { id: "search-top-search-box", description: "Tracks what people are searching on the site using the search box at the top", category: "search", action: "top-search-box", label: "", value: null }], function (n, t, i) {
    "use strict";
    t.EventManager = function () {
        var r = function (n) {
            return t.EventManagerConfig.filter(function (t) {
                return t.id === n;
            })[0];
        }, u = function (n, t, r, u) {
            i.ga && (typeof u == "undefined" && (u = null), typeof r == "object" ? i.ga("send", "event", n, t, r) : i.ga("send", "event", n, t, r, u));
        }, f = function (n, t) {
            i._kmq && i._kmq.push(["record", n, t]);
        };
        return { MainMenuClick: function (t) {
            var i = r("main-menu-click");
            i = n.extend(i, t);
            i.ga && u(i.category, i.action, i.label);
            i.km && f(i.name, { "menu-item": i.value });
        }, GooglePageview: function () {
            i.ga && i.ga("send", "pageview");
        }, GoogleEventRegion: function () {
            var n = r("acom-region");
            u(n.category, n.action, i.requestRegion);
        }, GoogleEventRegionRefresh: function (n) {
            var t = r("azure-status");
            u(t.category, t.action, n + " minutes");
        }, GoogleEventRegionTab: function (n) {
            var t = r("azure-status-tab");
            u(t.category, t.action, n);
        }, GoogleEventArticleFeedbackTop: function (n) {
            var t = r("documentation-articles-feedback-top");
            u(t.category, t.action, n);
        }, GoogleEventArticleFeedbackBottom: function (n) {
            var t = r("documentation-articles-feedback-bottom");
            u(t.category, t.action, n);
        }, GoogleEventRegionCollapse: function (n) {
            var t = r("azure-status-region-collape");
            u(t.category, t.action, n);
        }, GoogleEventServiceCollapse: function (n) {
            var t = r("azure-status-service-collapse");
            u(t.category, t.action, n);
        }, GoogleEventMarketplaceVirtualMachineCreate: function (n) {
            var t = r("marketplace-virtual-machine-create");
            u(t.category, t.action, n);
        }, GoogleEventMarketplaceApplicationServicesCreate: function (n) {
            var t = r("marketplace-application-services-create");
            u(t.category, t.action, n);
        }, GoogleEventMarketplaceApiAppCreate: function (n) {
            var t = r("marketplace-apiapps-create");
            u(t.category, t.action, n);
        }, GoogleEventMarketplaceWebApplicationsCreate: function (n) {
            var t = r("marketplace-web-applications-create");
            u(t.category, t.action, n);
        }, GoogleEventCalculatorTypeSelect: function (n) {
            var t = r("calculator-virtual-machines-type-select");
            u(t.category, t.action, n);
        }, GoogleEventCalculatorInstanceSizeSelect: function (n) {
            var t = r("calculator-virtual-machines-instance-size-select");
            u(t.category, t.action, n);
        }, GoogleEventCalculatorServiceAdd: function (n) {
            var t = r("calculator-add-more");
            u(t.category, t.action, n);
        }, GoogleEventMarketplaceFilterSelect: function (n) {
            var t = r("marketplace-vm-search-filters");
            u(t.category, t.action, n);
        }, GoogleEventDocumentationLeftNavExpand: function (n, t) {
            var i = r("docarticles-leftnav-sections-expand");
            u(n, i.action, t);
        }, GoogleEventDocumentationLeftNavCollapse: function (n, t) {
            var i = r("docarticles-leftnav-sections-collapse");
            u(n, i.action, t);
        }, GoogleEventDocumentationLeftNavArticleClick: function (n, t) {
            var i = r("docarticles-leftnav-articles-links");
            u(n, i.action, t);
        }, GoogleEventDesktopViewClick: function () {
            var n = r("desktop-mode-switch");
            u(n.category, n.action, i.location.pathname || "unknown");
        }, GoogleEventDocumentationServiceLandingPageTutorialSelect: function (n, t) {
            var i = r("doc-landing-page-hero-tutorial-dropdown");
            u(n, i.action, t);
        }, GoogleEventTopSearch: function (n) {
            var t = r("search-top-search-box");
            u(t.category, t.action, n);
        } };
    }();
}(jQuery, Acom, window), function (n, t) {
    "use strict";
    n(function () {
        n('.menu a:not([href="#"])').on("mousedown", function () {
            var i = { value: n(this).attr("km.title") || "" };
            t.EventManager.MainMenuClick(i);
        });
        n("[data-event='marketplace-virtual-machine-create']").on("mousedown", function () {
            t.EventManager.GoogleEventMarketplaceVirtualMachineCreate(n(this).data("eventLabel"));
        });
        n("[data-event='marketplace-application-services-create']").on("mousedown", function () {
            t.EventManager.GoogleEventMarketplaceApplicationServicesCreate(n(this).data("eventLabel"));
        });
        n("[data-event='marketplace-api-app-create']").on("mousedown", function () {
            t.EventManager.GoogleEventMarketplaceApiAppCreate(n(this).data("eventLabel"));
        });
        n("[data-event='marketplace-web-applications-create']").on("mousedown", function () {
            t.EventManager.GoogleEventMarketplaceWebApplicationsCreate(n(this).data("eventLabel"));
        });
        n(".wa-navigationLeft").on("mousedown", "li:not(.open)[data-tag-name] > a", function () {
            var i = n(this).parent(), r = "left-nav-" + i.data("service-name");
            t.EventManager.GoogleEventDocumentationLeftNavExpand(r, { eventLabel: i.data("tag-name"), page: document.location.pathname });
        });
        n(".wa-navigationLeft").on("mousedown", "li.open[data-tag-name] > a", function () {
            var i = n(this).parent(), r = "left-nav-" + i.data("service-name");
            t.EventManager.GoogleEventDocumentationLeftNavCollapse(r, { eventLabel: i.data("tag-name"), page: document.location.pathname });
        });
        n(".wa-navigationLeft").on("mousedown", "a[data-link-tag-name]", function () {
            var i = "left-nav-" + n(this).data("link-service-name");
            t.EventManager.GoogleEventDocumentationLeftNavArticleClick(i, { eventLabel: n(this).data("link-tag-name"), page: document.location.pathname });
        });
        n("#desktopSwitch").on("mousedown", function () {
            t.EventManager.GoogleEventDesktopViewClick();
        });
        n(".wa-button-primary", ".wa-container-documentation").on("mousedown", function () {
            var i = "hero-tutorial-" + n(this).data("service-name"), r = n(this).siblings(".wa-dropdown-container").find(".wa-dropdown-value").text();
            t.EventManager.GoogleEventDocumentationServiceLandingPageTutorialSelect(i, r);
        });
        n(document).on("search-submitted", function () {
            var i = n("#MainSearchBox").val();
            t.EventManager.GoogleEventTopSearch(i);
        });
        n(".nav-has-submenu > a").on("mousedown", function () {
            var t = n(this).attr("km.title") || "";
            kissMetricsEvent("click-menu-feature", { "feature-menu-category": t });
        });
    });
}(jQuery, Acom, window), function (n, t, i) {
    "use strict";
    (t.GeoPhone = function () {
        var u = new t.UserManager, r = i.GeoPhoneOverride || u.GetValue("geo-phone") || "", f = u.GetValue("geo-country") || "", e = "united states", o = function (t, i) {
            t && (n("[data-control='geophone']").text(t), n("[data-control='geophone']").parents("a[href='tel:']").attr("href", "tel:" + t));
            i && (n("[data-control='geocountry']").text(i), i === e && n("[data-control='united-states-sales-phone']").hide());
        }, s = { australia: "1-800-765-471", austria: "0800-802127", belgium: "0800-718-35", brazil: "0800-591-6057", canada: "1-800-867-1389", colombia: "01-800-710-2238", "czech-republic": "800-701-208", denmark: "8082-6831", finland: "0800-552-049", france: "0800-916-603", germany: "0800-180-8941", "hong-kong": "800-908-680", india: "91-80-40103000", ireland: "1-800-947-246", israel: "1-809-494226", italy: "800-788-741", japan: "0120-952-593", luxemburg: "800-2-7961", malaysia: "1-800-815-289", mexico: "01-800-681-5371", netherlands: "0-800-022-9265", "new-zealand": "0800-440-910", norway: "800-19-656", peru: "0800-55027", philippines: "1-800-1-116-1155", poland: "00800-112-4161", portugal: "800-180-126", "puerto-rico": "1-855-800-1106", russia: "8-800-100-6347", singapore: "800-1301-963", spain: "900-809756", sweden: "020-889-875", switzerland: "0800-802-551", taiwan: "0800-00-88-33#2#9", "trinidad-and-tobago": "1-800-206-3672", turkey: "00-800-1420-77473", "united-kingdom": "0-800-098-8435", "united-states": "1-800-867-1389" };
        r && f ? o(r, f) : n.ajax({ dataType: "json", url: "//www.microsoft.com/windowsazure/handlers/phone.ashx?callback=?", success: function (n) {
            var t = n.country_name && n.country_name !== "unknown" ? n.country_name : e;
            r = s[t.replace(" ", "-")];
            u.SetValue("geo-phone", r);
            u.SetValue("geo-country", t);
            o(r, t);
        } });
    })();
}(jQuery, Acom, window), function (n, t, i) {
    "use strict";
    t.PageRefresh = function () {
        function e() {
            i.location.reload(!0);
        }
        function r(t) {
            f.SetValue("pagerefresh", t);
            i.clearTimeout(n);
            n = i.setTimeout(e, parseInt(t));
        }
        function u() {
            acomuser.pagerefresh && r(acomuser.pagerefresh);
        }
        function o() {
            i.clearTimeout(n);
        }
        var n, f = new t.UserManager;
        return u(), { SetTime: r, StartTime: u, StopTime: o };
    };
}(jQuery, Acom, window), function (n, t) {
    "use strict";
    t.Util = {};
}(jQuery, Acom);
Acom.Util.Api = function (n) {
    "use strict";
    var t = "/api/videos/", i = "/api/filters/", r = "/api/scripts/", u = "/api/videoseries/";
    return { GetVideo: function (i, r, u) {
        n.ajax({ url: t + i, success: r, error: u, dataType: "json" });
    }, GetVideos: function (i, r, u) {
        n.ajax({ url: t, data: { pagesize: i }, success: r, error: u, dataType: "json" });
    }, GetFilteredVideos: function (i, r, u, f, e, o, s, h, c) {
        n.ajax({ url: t, data: { services: r, solutions: i, "video-series": u, "video-events": f, pagenumber: o, pagesize: s, keyword: e }, success: h, error: c, dataType: "json" });
    }, GetAllFilters: function (t, r) {
        n.ajax({ url: i, success: t, error: r, dataType: "json" });
    }, GetFilters: function (t, r, u, f) {
        return n.ajax({ url: i, data: { type: t }, success: u, error: f, dataType: "json", async: r });
    }, GetVideoSeries: function (t, i, r) {
        n.ajax({ url: u + t, success: i, error: r, dataType: "json" });
    }, GetVideoSeriesVideos: function (i, r, u, f) {
        n.ajax({ url: t, data: { "video-series": i, pagesize: r }, success: u, error: f, dataType: "json" });
    }, GetScripts: function (t, i, u, f, e, o) {
        n.ajax({ url: r, data: { services: i, solutions: t, pagenumber: u, pagesize: f }, success: e, error: o, dataType: "json" });
    }, GetScript: function (t, i, u, f, e, o) {
        n.ajax({ url: r, data: { services: i, solutions: t, pagenumber: u, pagesize: f }, success: e, error: o, dataType: "json" });
    } };
}(jQuery);
Acom.Util.Render = function (n) {
    "use strict";
    var i = "/videoapi/home/", r = "/videoapi/index/", u = "/blogapi/", f = "/en-us/videoapi/videothumbnail/", e = "/searchapi/", o = "/search/azure-friday/", s = "/statushistoryapi/", h = "/marketplaceapi/", c = "/marketplaceapi/virtual-machines/", l = "/marketplaceapi/application-services/", a = "/marketplaceapi/web-applications/", v = "/marketplaceapi/data-services/", y = "/marketplaceapi/active-directory/", p = "/marketplaceapi/api-apps/", w = "/casestudiesapi/", b = "/documentationarticlesapi/", k = "/documentation/templatesapi/", d = "/partners/partnersapi/", nt = function (t, i) {
        return n.ajax({ url: "/" + window.Acom.currentCulture + t, type: "POST", dataType: "html", data: i });
    }, t = function (t, i) {
        return n.ajax({ url: "/" + window.Acom.currentCulture + t, type: "GET", dataType: "html", data: i });
    }, g = function (t, i) {
        return n.ajax({ url: "/" + window.Acom.currentCulture + t, type: "POST", contentType: "application/json; charset=utf-8", data: JSON.stringify(i) });
    };
    return { GalleryVideosHomeResults: function (t, r, u, f) {
        n.ajax({ url: "/" + window.Acom.currentCulture + i, type: "GET", dataType: "html", data: { service: t, series: r }, success: u, error: f });
    }, GalleryVideosIndexResults: function (t, i, u, f, e) {
        n.ajax({ url: "/" + window.Acom.currentCulture + r, type: "GET", dataType: "html", data: { service: t, series: i, pageNumber: u }, success: f, error: e });
    }, BlogPostsItemsResults: function (t, i, r, f, e) {
        var o = { pageNumber: t };
        r && (o.slug = r);
        n.ajax({ url: "/" + window.Acom.currentCulture + u + i + "/", type: "GET", dataType: "html", data: o, success: f, error: e });
    }, VideoThumbnail: function (t) {
        return n.ajax({ url: f, type: "GET", data: { VideoSlug: t }, dataType: "html" });
    }, SiteSearchResults: function (t, i, r, u, f, o, s) {
        n.ajax({ url: "/" + window.Acom.currentCulture + e, type: "GET", dataType: "html", data: { query: t, page: i, azure: r, msdn: u, forums: f }, success: o, error: s });
    }, AzureFridaySearchResults: function (n, t, i) {
        return g(o + "?query=" + encodeURIComponent(n) + "&page=" + i, { services: t });
    }, StatusHistoryResults: function (t, i, r, u, f, e) {
        n.ajax({ url: "/" + window.Acom.currentCulture + s, type: "GET", dataType: "html", data: { serviceSlug: t, regionSlug: i, startDate: r, page: u }, success: f, error: e });
    }, Gallery: function (n, i) {
        var r = { term: n, pageNumber: i };
        return t(h, r);
    }, GalleryVirtualMachines: function (n, i, r, u, f) {
        var e = { term: n, pageNumber: f, operatingSystems: i, publisherTypes: r, categories: u };
        return t(c, e);
    }, GalleryApplicationServices: function (n, i) {
        var r = { term: n, pageNumber: i };
        return t(l, r);
    }, GalleryApiApps: function (n, i) {
        var r = { term: n, pageNumber: i };
        return t(p, r);
    }, GalleryWebApplications: function (n, i) {
        var r = { term: n, pageNumber: i };
        return t(a, r);
    }, GalleryDataServices: function (n, i) {
        var r = { term: n, pageNumber: i };
        return t(v, r);
    }, GalleryActiveDirectory: function (n, i, r) {
        var u = { term: n, pageNumber: r, categories: i };
        return t(y, u);
    }, CaseStudies: function (n) {
        return t(w, n);
    }, DocArticles: function (n) {
        return t(b, n);
    }, DocTemplates: function (n, i, r) {
        var u = { term: n, sort: i, pageNumber: r };
        return t(k, u);
    }, Partners: function (n, i, r) {
        var u = { term: n, filter: i, pageNumber: r };
        return t(d, u);
    } };
}(jQuery), function (n) {
    "use strict";
    function t() {
        n(".wa-conditionalDisplay").each(function () {
            function r(n, i) {
                return t.filter("[data-" + n + "~='" + i + "']").length > 0;
            }
            function h(n, i) {
                for (var u = !1, f = t.data(n).split(" "), r = 0; r < f.length && !u; r++)
                    u = i.indexOf(f[r]) !== -1;
                return u;
            }
            var t = n(this), i = !0, u = "condition-currency", f = "condition-locale", e = "condition-region", o = "condition-useragent", s = t.hasClass("wa-conditionalDisplay-invertMatch");
            (t.data(f) && !r(f, Acom.currentCulture) || t.data(o) && !h(o, window.navigator.userAgent.toLowerCase()) || t.data(e) && !r(e, pricingRegion) || t.data(u) && !r(u, currencyMetrics.name)) && (i = !1);
            s && (i = !i);
            i ? t.addClass("active") : t.removeClass("active");
        });
    }
    n("html").on("globalInitComplete", function () {
        t();
        n("html").on("changed.region changeCurrency", t);
    });
}(jQuery), function (n, t, i) {
    "use strict";
    (t.RegionDropdown = function () {
        var f = new t.UserManager, r = n(".wa-dropdown-region"), u = r.parent(), e = f.GetValue("region") || r.val(), o = function () {
            f.SetValue("region", r.val());
            i.pricingRegion = r.val();
            i.updateCurrency && i.updateCurrency();
            u.trigger("changed.region");
        }, s = function () {
            var t = r.find("option:not('.fake-disabled')"), n = r.find("option[value='" + e + "']");
            t.filter(n).val() || (n = t.first());
            n.prop("selected", !0);
            u.trigger("change");
            i.pricingRegion = r.val();
        };
        s();
        n(function () {
            u.on("changed", o);
        });
    })();
}(jQuery, Acom, window), function (n) {
    n(function () {
        function y(t) {
            n(t).click(function (t) {
                t.preventDefault();
                var i = n(this), r = i.parent().css("width"), u = i.css("height");
                i.parent().addClass("expanding").data("originalWidth", r).animate({ width: 780 }, 250, function () {
                    i.data("originalHeight", u).animate({ height: 440 }, 250, function () {
                        p(i);
                        b(i);
                        i.click();
                    });
                }).siblings(".section-sliding-content").addClass("full");
            });
        }
        function b(t) {
            n(t).click(function (t) {
                var i, r;
                t.preventDefault();
                i = n(this);
                i.unbind("click");
                i.click(function (n) {
                    n.preventDefault();
                });
                r = '<div class="vwrap"><iframe style="height:440px;width:780px;position:absolute;top:0;left:0;z-index:1;" src="' + i.attr("href") + 'player/?w=780&h=440#autoplay=1" frameBorder="0" scrolling="no" ><\/iframe><\/div>';
                i.parent().append(r);
                window.setInterval(function () {
                    i.siblings(".vwrap").fadeIn(300);
                }, 2e3);
            });
        }
        function p(t) {
            n(t).unbind("click");
        }
        function k(t, i) {
            n("a.channel9-popup").click(function (r) {
                r.preventDefault();
                var u = i;
                n(this).hasClass("vid-fix") && (u += 15);
                n("body").append('<div class="popup-video-shader"><div class="popup-video-wrapper"><div class="popup-video-close">&nbsp;<\/div><div class="popup-video-frame"><\/div><\/div><\/div>');
                videoContents = '<iframe style="height:' + u + "px;width:" + t + 'px" src="' + n(this).attr("href") + "player/?w=" + t + "&h=" + i + '#autoplay=1" frameBorder="0" scrolling="no" ><\/iframe>';
                n(".popup-video-wrapper").css({ width: t, height: u, "margin-top": u / -2, "margin-left": t / -2 });
                n(".popup-video-frame").append(videoContents);
                n(".popup-video-shader, .popup-video-close").click(function () {
                    n(".popup-video-shader").hide();
                    n(".popup-video-frame").children().attr("src", "");
                    n(".popup-video-frame").empty();
                    n(".popup-video-shader").remove();
                });
            });
        }
        function d() {
            n(".section.video-gallery .video-wrapper .video-overlay").click(function (t) {
                var i, r, u;
                t.preventDefault();
                n(this).unbind("click");
                n(this).click(function (n) {
                    n.preventDefault();
                });
                i = 439;
                n(this).hasClass("fix-vid") && (i = 455, n(".section.video-gallery .video-wrapper").addClass("wrap-fix").append('<div class="video-fix"><\/div>'));
                r = '<div class="video-player"><iframe style="height:' + i + 'px;width:780px" src="' + n(this).attr("href") + 'player?w=780&amp;h=439#autoplay=1" frameBorder="0" scrolling="no" ><\/iframe><\/div>';
                n(".section.video-gallery .video-wrapper").append(r);
                u = this;
                window.setInterval(function () {
                    n(u).fadeOut(300);
                }, 1e3);
            });
        }
        var t, f, i, o, h, v, r, c, e, u, a;
        try {
            typeof window.external.msAddSiteMode != "undefined" && window.external.msIsSiteMode() && (window.external.msSiteModeCreateJumplist("Resources"), window.external.msSiteModeAddJumpListItem("Customer Support", "http://www.windowsazure.com/en-us/support/contact/?jl=t", "http://az83882.vo.msecnd.net/favicon.ico"), window.external.msSiteModeAddJumpListItem("Your Billing Account", "https://account.windowsazure.com/?jl=t", "http://az83882.vo.msecnd.net/favicon.ico"), window.external.msSiteModeAddJumpListItem("Management Portal", "https://go.microsoft.com/fwlink/?LinkId=236045&jl=t", "http://az83882.vo.msecnd.net/favicon.ico"), window.external.msSiteModeShowJumplist());
        }
        catch (it) {
        }
        if (n(".wizard-style").each(function () {
            var t = "." + n(this).attr("id"), i = "#" + n(this).attr("id");
            n(t).click(function (t) {
                t.preventDefault();
                n(i).fadeToggle(200);
            });
        }), t = ".step-by-step-guide", n(t).length > 0) {
            f = n(t + " .guide-steps > div").length;
            n(t + " .legend .total").html(f);
            i = 0;
            o = n("<div class='empty'><\/div>");
            n("body").append(o);
            n(t + " .view-all").click(function (i) {
                i.preventDefault();
                n(t + " .active").removeClass("active");
                n(t + " .default").addClass("active");
                o.html(" ");
            });
            n(t + " .default a").click(function (t) {
                t.preventDefault();
                s("." + n(this).attr("class"));
            });
            n(t + " .previous").click(function (n) {
                n.preventDefault();
                i > 1 && s(".step-" + (parseInt(i) - 1));
            });
            n(t + " .next").click(function (n) {
                n.preventDefault();
                i < f && s(".step-" + (parseInt(i) + 1));
            });
            function s(r) {
                i = r.substr(r.length - 1);
                n(t + " .disabled").removeClass("disabled");
                parseInt(i) === 1 ? n(t + " .legend .previous").addClass("disabled") : parseInt(i) === f && n(t + " .legend .next").addClass("disabled");
                n(t + " .active").removeClass("active");
                n(t + " .legend .current").html(i);
                n(t + " .legend").addClass("active");
                n(t + " " + r).addClass("active");
            }
        }
        if (n(".service-doc-page").length !== 0) {
            n(".section.videos .vid-thumb").click(function (t) {
                if (t.preventDefault(), !n(this).hasClass("active")) {
                    n(".videos .video-player iframe").attr("src", "");
                    n(".videos .video-wrapper").empty();
                    n(".videos .video-wrapper").removeClass("wrap-fix");
                    var i = '<a class="video-overlay ' + n(this).attr("class").match(/vt\d/) + '" href="' + n(this).attr("href") + '"><span class="play-btn">&nbsp;<\/span><span class="desc">' + n(this).data("tooltip") + "<\/span><\/a>";
                    n(".videos .video-wrapper").append(i);
                    n(".section.videos .vid-thumb").removeClass("active");
                    n(this).addClass("active");
                    n(this).hasClass("fix-vid") && n(".videos .video-wrapper .video-overlay").addClass("fix-vid");
                }
                w();
            });
            function w() {
                n(".videos .video-wrapper .video-overlay").click(function (t) {
                    var i, r, u;
                    t.preventDefault();
                    n(this).unbind("click");
                    n(this).click(function (n) {
                        n.preventDefault();
                    });
                    i = 349;
                    n(this).hasClass("fix-vid") && (i = 365, n(".videos .video-wrapper").addClass("wrap-fix").append('<div class="video-fix"><\/div>'));
                    r = '<div class="video-player"><iframe style="height:' + i + 'px;width:620px" src="' + n(this).attr("href") + 'player?w=620&amp;h=349#autoplay=1" frameBorder="0" scrolling="no" ><\/iframe><\/div>';
                    n(".videos .video-wrapper").append(r);
                    u = this;
                    window.setInterval(function () {
                        n(u).fadeOut(300);
                    }, 1e3);
                });
            }
            n(".section.videos .vid-thumb.vt1").click();
            n(".section.videos .vid-thumb").each(function () {
                var t = n(this).data("tooltip");
                typeof t != "undefined" && n(this).append('<div class="tooltip-wrap"><span class="vid-tooltip">' + t + '<\/span><\/div><span class="triangle"><\/span>');
            });
            n(".article-group .seemorelink, .article-group .seelesslink").click(function (t) {
                t.preventDefault();
                var i = n(this).parentsUntil(".article-group");
                i.find(".seemorelink").toggle();
                i.find(".seelesslink").toggle();
                i.prev(".group-toggle").toggle();
            });
        }
        if (n(".wizard-close, .wizard-exit, .wizard-style ").click(function () {
            n(".wizard-style").fadeToggle(200);
        }), n(".wizard-style div").click(function (n) {
            n.stopPropagation();
        }), n(".dynamic-leftnav").length !== 0 && (h = "default", n("h1").attr("id") !== undefined && (h = n("h1").attr("id")), v = ".static-nav ." + h, n(v).addClass("active"), n("#content h2").each(function (t, i) {
            var u = "header-" + t, r;
            n(i).attr("id", u);
            r = n(i).find("span");
            r.length === 0 && (r = i);
            n(".floating-nav.jump-to > ul").append("<li><a href='#" + u + "'>" + strip(n(r).html()) + "<\/a><\/li>");
        }), typeof offerID != "undefined" && n(".offer-plan").length !== 0 ? (offerID === "ms-azr-0051p" ? n(".left-nav .site-arrowboxcta").attr("href", "https://mspartner.microsoft.com/en/us/pages/solutions/premium/windows-azure-cloud-partner-benefits.aspx") : n(".left-nav .site-arrowboxcta").attr("href", "https://account.windowsazure.com/signup?offer=" + offerID), typeof offerActivate != "undefined" && offerActivate && (n(".left-nav .offer-btn-buy").hide(), n(".left-nav .offer-btn-activate").show())) : n(".left-nav .site-arrowboxcta").hide()), n(".solutions-picker").length !== 0 && n(".solutions-picker .solutions-blocks a").hover(function () {
            n(".solutions-picker .solutions-blocks a").removeClass("selected");
            n(".solutions-hover-contents > div").hide();
            n(".solutions-hover-contents ." + n(this).attr("class").split(" ")[0] + "-cont").show();
            n(this).addClass("selected");
        }), n(".page-overview-enterprise-it").length !== 0 && (n(".solutions-blocks .backup").addClass("selected"), n(".solutions-hover-contents .backup-cont").show()), n(".page-overview-application-hosting").length !== 0 && (n(".solutions-blocks .web").addClass("selected"), n(".solutions-hover-contents .web-cont").show()), n(document).ready(function () {
            n(".dev-callout-new-expanded").addClass("dev-callout-new");
            n(".dev-callout-new-expanded").addClass("expanded");
            n(".dev-callout-new").addClass("expanded");
        }), n(".dev-callout-new > strong").click(function () {
            n(this).parent().toggleClass("expanded");
        }), n(".dev-callout-new-collapsed > strong").click(function () {
            n(this).parent().toggleClass("expanded");
        }), n(".dev-callout-expand-all").click(function (t) {
            t.preventDefault();
            n(".dev-callout-new").addClass("expanded");
            n(".dev-callout-new-collapsed").addClass("expanded");
        }), n(".dev-callout-collapse-all").click(function (t) {
            t.preventDefault();
            n(".dev-callout-new").removeClass("expanded");
            n(".dev-callout-new-collapsed").removeClass("expanded");
        }), n(".section-expanding-video .close-btn").click(function () {
            var t = n(this).siblings(".channel9-expander"), i = n(this).siblings(".vwrap").find("iframe");
            i.attr("src", "").parent().empty();
            t.animate({ height: t.data("originalHeight") }, 250, function () {
                t.parent().animate({ width: t.parent().data("originalWidth") }, 250, function () {
                    t.parent().removeClass("expanding").siblings(".section-sliding-content").removeClass("full");
                    p(t);
                    y(t);
                });
            });
        }), n("a.channel9-expander").length !== 0 && n(".section-expanding-video.tutorial-video").length === 0 && y("a.channel9-expander"), n("a.video-popup").click(function (t) {
            t.preventDefault();
            n("body").append('<div class="popup-video-shader"><div class="popup-video-wrapper"><div class="popup-video-close">&nbsp;<\/div><div class="popup-video-frame"><\/div><\/div><\/div>');
            var i = n(this).attr("id").split("-"), r;
            switch (i[0]) {
                case "mscasestudy":
                    r = '<iframe width="' + i[2] + '" height="' + i[3] + '" scrolling="no" frameborder="0" src="http://www.microsoft.com/casestudies/video/Embed.aspx?fr=' + i[1] + '"><\/iframe>';
                    n(".popup-video-wrapper").css({ width: i[2], height: i[3], "margin-top": i[3] / -2, "margin-left": i[2] / -2 });
                    break;
                case "youtube":
                    r = '<iframe width="640" height="360" src="http://www.youtube.com/embed/i8MOJho5TDs?rel=0" frameborder="0" allowfullscreen><\/iframe>';
                    n(".popup-video-wrapper").css({ width: 640, height: 360, "margin-top": -180, "margin-left": -320 });
            }
            n(".popup-video-frame").append(r);
            n(".popup-video-shader, .popup-video-close").click(function () {
                n(".popup-video-shader").hide();
                n(".popup-video-frame").children().attr("src", "");
                n(".popup-video-frame").empty();
                n(".popup-video-shader").remove();
            });
        }), n(".service-doc-page").length === 0 && k(640, 360), n(".section.video-gallery .vid-block > a").click(function (t) {
            if (t.preventDefault(), !n(this).hasClass("active")) {
                n(".section.video-gallery .video-player iframe").attr("src", "");
                n(".section.video-gallery .video-wrapper").empty();
                n(".section.video-gallery .video-wrapper").removeClass("wrap-fix");
                var i = '<a class="video-overlay ' + n(this).parent().attr("class").match(/vb\d/) + '" href="' + n(this).attr("href") + '"><span class="play-btn">&nbsp;<\/span><span class="desc">' + n(this).find(".desc").text() + "<\/span><\/a>";
                n(".section.video-gallery .video-wrapper").append(i);
                n(".section.video-gallery .vid-block > a").removeClass("active");
                n(this).addClass("active");
                n(this).hasClass("fix-vid") && n(".section.video-gallery .video-wrapper .video-overlay").addClass("fix-vid");
            }
            d();
        }), n(".section.video-gallery .vid-block:first-child > a").click(), n(".solution-template").length !== 0 && (solutionTabSet = n(".solution-template .tabs a"), solutionSectionSet = n(".solution-template .section"), solutionTabSet.click(function (t) {
            t.preventDefault();
            n(this).hasClass("active") || (solutionTabSet.removeClass("active"), solutionSectionSet.removeClass("active"), window.location.hash = "#" + n(this).attr("class"), newActive = ".section." + n(this).attr("class"), n(this).addClass("active"), n(newActive).addClass("active"));
        }), last_known_hash = location.hash, window.setInterval(function () {
            last_known_hash != location.hash && (!n('.solution-template .tabs a[href="#benefits"]').hasClass("active") && location.hash.length <= 0 ? (solutionTabSet.removeClass("active"), solutionSectionSet.removeClass("active"), n('.solution-template .tabs a[href="#benefits"]').addClass("active"), n(".solution-template .section.benefits").addClass("active")) : n('.solution-template .tabs a[href="' + location.hash + '"]').click(), last_known_hash = location.hash);
        }, 300)), n(".solution-template").length !== 0 && window.location.hash && n("a." + window.location.hash.slice(1).replace(/\W/g, "")).trigger("click"), r = ".paragraph-toggle", n(r).length !== 0 && (n(r).click(function () {
            n(r).toggleClass("paragraph-show");
            n(r + " span").toggleClass("selected");
            n(".article-group p, p.p-toggle").toggleClass("display-block");
            n(r).hasClass("paragraph-show") ? n.cookie("docshowmore", "1", { expires: 365, path: "/" }) : n.cookie("docshowmore", "0", { expires: 365, path: "/" });
        }), c = n.cookie("docshowmore"), c !== null && c === "1" && n(r).click()), n(".pricing-details-page").length !== 0) {
            function rt(t, i) {
                var r = ".s2 .details." + t;
                typeof i != "undefined" && (r += "." + i);
                n(r).hasClass("active") || n(".s2 .details.active").fadeOut(300, function () {
                    n(this).removeClass("active");
                    n(r).fadeIn(300, function () {
                        n(r).addClass("active");
                    });
                });
            }
            if (window.location.hash) {
                var g = "#service-", nt = 15, tt = n("header").outerHeight(), l = window.location.hash;
                /^#service-/.test(l) && n("a#" + l.slice(g.length).replace(/\W/g, "-")).trigger("click");
                l === "#faq" && n(window).scrollTop(n("#scroll-faq").offset().top - tt - nt);
            }
        }
        if (n(".wa-dropdown-currency").length !== 0 && (new Core.Controls.Dropdown(n(".wa-dropdown-currency")), n(".wa-dropdown-currency").change(function () {
            if (n(".page-pricing-calculator").length < 1) {
                changeCurrency(n(this).val());
                var t = n("footer #dropdown-currency");
                t.find("select").val(currencyMetrics.name);
                t.find(".wa-dropdown-value").text(t.find("option:selected").text());
            }
        })), e = window.location.href, e.indexOf("searchresults/?query=") != -1) {
            u = e.substring(e.indexOf("query=") + 6);
            u = u.split("&")[0];
            try {
                typeof decodeURIComponent != "undefined" ? n("#MainSearchBox").val(decodeURIComponent(u)) : n("#MainSearchBox").val(unescape(u));
            }
            catch (it) {
                n("#MainSearchBox").val("");
            }
        }
        a = n(".search-box");
        n("#MainSearchBox").focus(function () {
            a.addClass("focus");
        });
        n("#MainSearchBox").blur(function () {
            a.removeClass("focus");
        });
        n(".prettyprint").length > 0 && prettyPrint();
    });
}(jQuery);
var priceDict = { hoursInAMonth: 744, maxDiscount: .68, minDiscount: .8, annualSavings: { professional: { price: 600 }, premium: { price: 1200 }, ultimate: { price: 1800 } }, monetaryCredit: { freeTrial: { overrideConversion: !0, USD: 200, EUR: 170, GBP: 125, CAD: 250, DKK: 1300, NZD: 250, NOK: 1450, SEK: 1600, CHF: 190, JPY: 20500, AUD: 260, RUB: 1e4, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 560, HKD: 1600, INR: 12100, MXN: 3100, MYR: 750 }, msdn: { professional: { firstMonth: { overrideConversion: !0, USD: 200, EUR: 170, GBP: 125, CAD: 250, DKK: 1300, NZD: 250, NOK: 1450, SEK: 1600, CHF: 190, JPY: 20500, AUD: 260, RUB: 1e4, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 560, HKD: 1600, INR: 12100, MXN: 3100, MYR: 750 }, perMonth: { overrideConversion: !0, USD: 50, EUR: 45, GBP: 35, CAD: 70, DKK: 350, NZD: 70, NOK: 400, SEK: 400, CHF: 50, JPY: 5500, AUD: 70, RUB: 2500, KRW: 6e4, ZAR: 600, TRY: 115, SAR: 190, ARS: 450, IDR: 6e5, TWD: 1600, BRL: 140, HKD: 400, INR: 3100, MXN: 800, MYR: 200 }, annualSavings: { overrideConversion: !0, USD: 600, EUR: 480, GBP: 420, CAD: 720, DKK: 3600, NZD: 840, NOK: 4200, SEK: 4200, CHF: 600, JPY: 66e3, AUD: 720, RUB: 21600, KRW: 72e4, ZAR: 7200, TRY: 1380, SAR: 2280, ARS: 5400, IDR: 72e5, TWD: 19200 } }, premium: { firstMonth: { overrideConversion: !0, USD: 200, EUR: 170, GBP: 125, CAD: 250, DKK: 1300, NZD: 250, NOK: 1450, SEK: 1600, CHF: 190, JPY: 20500, AUD: 260, RUB: 1e4, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 560, HKD: 1600, INR: 12100, MXN: 3100, MYR: 750 }, perMonth: { overrideConversion: !0, USD: 100, EUR: 85, GBP: 65, CAD: 130, DKK: 650, NZD: 130, NOK: 750, SEK: 800, CHF: 100, JPY: 10500, AUD: 130, RUB: 5e3, KRW: 12e4, ZAR: 1150, TRY: 230, SAR: 380, ARS: 850, IDR: 12e5, TWD: 3200, BRL: 280, HKD: 800, INR: 6100, MXN: 1600, MYR: 400 }, annualSavings: { overrideConversion: !0, USD: 1200, EUR: 900, GBP: 780, CAD: 1320, DKK: 7200, NZD: 1560, NOK: 7800, SEK: 8400, CHF: 1200, JPY: 126e3, AUD: 1320, RUB: 42e3, KRW: 144e4, ZAR: 13800, TRY: 2760, SAR: 4560, ARS: 10200, IDR: 144e5, TWD: 38400 } }, ultimate: { firstMonth: { overrideConversion: !0, USD: 200, EUR: 170, GBP: 125, CAD: 250, DKK: 1300, NZD: 250, NOK: 1450, SEK: 1600, CHF: 190, JPY: 20500, AUD: 260, RUB: 1e4, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 560, HKD: 1600, INR: 12100, MXN: 3100, MYR: 750 }, perMonth: { overrideConversion: !0, USD: 150, EUR: 130, GBP: 95, CAD: 190, DKK: 950, NZD: 190, NOK: 1100, SEK: 1200, CHF: 140, JPY: 15500, AUD: 200, RUB: 7500, KRW: 18e4, ZAR: 1750, TRY: 345, SAR: 570, ARS: 1250, IDR: 18e5, TWD: 4700, BRL: 420, HKD: 1200, INR: 9100, MXN: 2300, MYR: 550 }, annualSavings: { overrideConversion: !0, USD: 1800, EUR: 1380, GBP: 1140, CAD: 1920, DKK: 10200, NZD: 2280, NOK: 11400, SEK: 12600, CHF: 1680, JPY: 186e3, AUD: 1920, RUB: 62400, KRW: 216e4, ZAR: 21e3, TRY: 4140, SAR: 6840, ARS: 15e3, IDR: 216e5, TWD: 56400 } } }, bizspark: { firstMonth: { overrideConversion: !0, USD: 200, EUR: 150, GBP: 125, CAD: 220, DKK: 1150, NZD: 250, NOK: 1250, SEK: 1350, CHF: 190, JPY: 20500, AUD: 210, RUB: 7e3, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 460, HKD: 1600, INR: 12100, MXN: 2500, MYR: 650 }, perMonth: { overrideConversion: !0, USD: 150, EUR: 130, GBP: 95, CAD: 190, DKK: 950, NZD: 190, NOK: 1100, SEK: 1200, CHF: 140, JPY: 15500, AUD: 200, RUB: 7500, KRW: 18e4, ZAR: 1750, TRY: 345, SAR: 570, ARS: 1250, IDR: 18e5, TWD: 4700, BRL: 420, HKD: 1200, INR: 9100, MXN: 2300, MYR: 550 } }, bizsparkPlus0034: { overrideConversion: !0, USD: 5e3, EUR: 4220, GBP: 3055, CAD: 6080, DKK: 31500, NZD: 6120, NOK: 35300, SEK: 39400, CHF: 4520, JPY: 51e4, AUD: 6370, RUB: 25e4, KRW: 6e6, ZAR: 57e3, TRY: 11500, SAR: 18750, ARS: 41500, IDR: 6e7, TWD: 155200, BRL: 14e3, HKD: 38800, INR: 300500, MXN: 76500, MYR: 18250 }, bizsparkPlus: { overrideConversion: !0, USD: 1e4, EUR: 8435, GBP: 6110, CAD: 12160, DKK: 62950, NZD: 12240, NOK: 70600, SEK: 78750, CHF: 9040, JPY: 102e4, AUD: 12740, RUB: 5e5, KRW: 12e6, ZAR: 114e3, TRY: 23e3, SAR: 37500, ARS: 83e3, IDR: 12e7, TWD: 310300, BRL: 28e3, HKD: 77600, INR: 600900, MXN: 153e3, MYR: 36500 }, mpn: { firstMonth: { overrideConversion: !0, USD: 200, EUR: 170, GBP: 125, CAD: 250, DKK: 1300, NZD: 250, NOK: 1450, SEK: 1600, CHF: 190, JPY: 20500, AUD: 260, RUB: 1e4, KRW: 24e4, ZAR: 2300, TRY: 460, SAR: 750, ARS: 1700, IDR: 24e5, TWD: 6300, BRL: 560, HKD: 1600, INR: 12100, MXN: 3100, MYR: 750 }, perMonth: { overrideConversion: !0, USD: 100, EUR: 85, GBP: 65, CAD: 130, DKK: 650, NZD: 130, NOK: 750, SEK: 800, CHF: 100, JPY: 10500, AUD: 130, RUB: 5e3, KRW: 12e4, ZAR: 1150, TRY: 230, SAR: 380, ARS: 850, IDR: 12e5, TWD: 3200, BRL: 280, HKD: 800, INR: 6100, MXN: 1600, MYR: 400 }, perMonth0035: { overrideConversion: !0, USD: 100, EUR: 85, GBP: 65, CAD: 130, DKK: 650, NZD: 130, NOK: 750, SEK: 800, CHF: 100, JPY: 10500, AUD: 130, RUB: 5e3, KRW: 12e4, ZAR: 1150, TRY: 230, SAR: 380, ARS: 850, IDR: 12e5, TWD: 3200, BRL: 280, HKD: 800, INR: 6100, MXN: 1600, MYR: 400 }, silver: { overrideConversion: !0, USD: 250, EUR: 215, GBP: 155, CAD: 310, DKK: 1600, NZD: 310, NOK: 1800, SEK: 2e3, CHF: 230, JPY: 25500, AUD: 320, RUB: 12500, KRW: 3e5, ZAR: 2850, TRY: 575, SAR: 940, ARS: 2100, IDR: 3e6, TWD: 7800, BRL: 700, HKD: 1950, INR: 15100, MXN: 3900, MYR: 950 }, gold: { overrideConversion: !0, USD: 500, EUR: 425, GBP: 310, CAD: 610, DKK: 3150, NZD: 620, NOK: 3550, SEK: 3950, CHF: 460, JPY: 51e3, AUD: 640, RUB: 25e3, KRW: 6e5, ZAR: 5700, TRY: 1150, SAR: 1880, ARS: 4150, IDR: 6e6, TWD: 15600, BRL: 1400, HKD: 3900, INR: 30100, MXN: 7700, MYR: 1850 } } }, commitmentDiscountTiers: { firstTierLow: { overrideConversion: !0, USD: 500, CAD: 550, GBP: 300, DKK: 2800, EUR: 350, NOK: 3050, SEK: 3350, CHF: 450, JPY: 51e3, AUD: 500, NZD: 600, KRW: 6e5, RUB: 16500, ZAR: 5700, TRY: 1150, SAR: 1900, ARS: 4150, IDR: 6e6, TWD: 15500 }, firstTierHigh: { overrideConversion: !0, USD: 14999, CAD: 15799, GBP: 9149, DKK: 83399, EUR: 11149, NOK: 92049, SEK: 100699, CHF: 13549, JPY: 1529999, AUD: 15149, NZD: 18349, KRW: 17999999, RUB: 494999, ZAR: 170999, TRY: 34499, SAR: 56249, ARS: 124499, IDR: 179999999, TWD: 465399 }, secondTierLow: { overrideConversion: !0, USD: 15e3, CAD: 15800, GBP: 9150, DKK: 83400, EUR: 11150, NOK: 92050, SEK: 100700, CHF: 13550, JPY: 153e4, AUD: 15150, NZD: 18350, KRW: 18e6, RUB: 495e3, ZAR: 171e3, TRY: 34500, SAR: 56250, ARS: 124500, IDR: 18e7, TWD: 465400 }, secondTierHigh: { overrideConversion: !0, USD: 39999, CAD: 15800, GBP: 24449, DKK: 222449, EUR: 29799, NOK: 245499, SEK: 268499, CHF: 36099, JPY: 4079999, AUD: 40349, NZD: 48949, KRW: 47999999, RUB: 1319999, ZAR: 455999, TRY: 91999, SAR: 149999, ARS: 331999, IDR: 479999999, TWD: 1241099 }, thirdTierLow: { overrideConversion: !0, USD: 4e4, CAD: 42200, GBP: 24450, DKK: 222450, EUR: 29800, NOK: 245500, SEK: 268500, CHF: 36100, JPY: 408e4, AUD: 40350, NZD: 48950, KRW: 48e6, RUB: 132e4, ZAR: 456e3, TRY: 92e3, SAR: 15e4, ARS: 332e3, IDR: 48e7, TWD: 1241100 } }, commitmentDiscountTiers6MonthPrePay: { firstTierLow: { overrideConversion: !0, ARS: 24900, AUD: 3e3, CAD: 3300, CHF: 3e3, DKK: 16800, EUR: 2100, GBP: 1800, IDR: 36e6, JPY: 306e3, KRW: 36e5, NOK: 17100, NZD: 3600, RUB: 104100, SAR: 11400, SEK: 20100, TRY: 6900, TWD: 93e3, USD: 3e3, ZAR: 34200 }, firstTierHigh: { overrideConversion: !0, ARS: 746999, AUD: 90899, CAD: 94799, CHF: 87299, DKK: 500399, EUR: 66899, GBP: 54899, IDR: 1079999999, JPY: 9179999, KRW: 107999999, NOK: 516299, NZD: 110099, RUB: 3118499, SAR: 337499, SEK: 604199, TRY: 206999, TWD: 2792399, USD: 89999, ZAR: 1025999 }, secondTierLow: { overrideConversion: !0, ARS: 747e3, AUD: 90900, CAD: 94800, CHF: 87300, DKK: 500400, EUR: 66900, GBP: 54900, IDR: 108e7, JPY: 918e4, KRW: 108e6, NOK: 516300, NZD: 110100, RUB: 3118500, SAR: 337500, SEK: 604200, TRY: 207e3, TWD: 2792400, USD: 9e4, ZAR: 1026e3 }, secondTierHigh: { overrideConversion: !0, ARS: 1991999, AUD: 242099, CAD: 253199, CHF: 233099, DKK: 1334699, EUR: 178799, GBP: 146699, IDR: 2879999999, JPY: 24479999, KRW: 287999999, NOK: 1376699, NZD: 293699, RUB: 8315999, SAR: 899999, SEK: 1610999, TRY: 551999, TWD: 7446599, USD: 239999, ZAR: 2735999 }, thirdTierLow: { overrideConversion: !0, ARS: 1992e3, AUD: 242100, CAD: 253200, CHF: 233100, DKK: 1334700, EUR: 178800, GBP: 146700, IDR: 288e7, JPY: 2448e4, KRW: 288e6, NOK: 1376700, NZD: 293700, RUB: 8316e3, SAR: 9e5, SEK: 1611e3, TRY: 552e3, TWD: 7446600, USD: 24e4, ZAR: 2736e3 } }, commitmentDiscountTiers12MonthPrePay: { firstTierLow: { overrideConversion: !0, ARS: 49800, AUD: 6e3, CAD: 6600, CHF: 5400, DKK: 33600, EUR: 4200, GBP: 3600, IDR: 72e6, JPY: 612e3, KRW: 72e5, NOK: 36600, NZD: 7200, RUB: 208200, SAR: 22800, SEK: 40200, TRY: 13800, TWD: 186e3, USD: 6e3, ZAR: 68400 }, firstTierHigh: { overrideConversion: !0, ARS: 1493999, AUD: 181799, CAD: 189599, CHF: 162599, DKK: 1000799, EUR: 133799, GBP: 109799, IDR: 2159999999, JPY: 18359999, KRW: 215999999, NOK: 1104599, NZD: 220199, RUB: 6236999, SAR: 674999, SEK: 1208399, TRY: 413999, TWD: 5584799, USD: 179999, ZAR: 2051999 }, secondTierLow: { overrideConversion: !0, ARS: 1494e3, AUD: 181800, CAD: 189600, CHF: 162600, DKK: 1000800, EUR: 133800, GBP: 109800, IDR: 216e7, JPY: 1836e4, KRW: 216e6, NOK: 1104600, NZD: 220200, RUB: 6237e3, SAR: 675e3, SEK: 1208400, TRY: 414e3, TWD: 5584800, USD: 18e4, ZAR: 2052e3 }, secondTierHigh: { overrideConversion: !0, ARS: 3983999, AUD: 484199, CAD: 506399, CHF: 433199, DKK: 2669399, EUR: 357599, GBP: 293399, IDR: 5759999999, JPY: 48959999, KRW: 575999999, NOK: 2945999, NZD: 587399, RUB: 16631999, SAR: 1799999, SEK: 3221999, TRY: 1103999, TWD: 14893199, USD: 479999, ZAR: 5471999 }, thirdTierLow: { overrideConversion: !0, ARS: 3984e3, AUD: 484200, CAD: 506400, CHF: 433200, DKK: 2669400, EUR: 357600, GBP: 293400, IDR: 576e7, JPY: 4896e4, KRW: 576e6, NOK: 2946e3, NZD: 587400, RUB: 16632e3, SAR: 18e5, SEK: 3222e3, TRY: 1104e3, TWD: 14893200, USD: 48e4, ZAR: 5472e3 } }, services: { virtualMachines: { windows: { a0: { price: .02 }, a1: { price: .09 }, a2: { price: .18 }, a3: { price: .36 }, a4: { price: .72 }, a5: { price: .4 }, a6: { price: .8 }, a7: { price: 1.6 }, msdn: { a1: { price: .06 }, a2: { price: .12 }, a3: { price: .24 }, a4: { price: .48 } }, basic: { a0: { price: 0 }, a1: { price: 0 }, a2: { price: 0 }, a3: { price: 0 }, a4: { price: 0 } }, standard: { a0: { price: .02 }, a1: { price: .09 }, a2: { price: .18 }, a3: { price: .36 }, a4: { price: .72 }, a5: { price: .4 }, a6: { price: .8 }, a7: { price: 1.6 }, a8: { price: 2.45 }, a9: { price: 4.9 } }, standardNew: { a5: { price: 0 }, a6: { price: 0 }, a7: { price: 0 } } }, windowsPromo: { a0: { price: .0133 }, a1: { price: .08 }, a2: { price: .16 }, a3: { price: .32 }, a4: { price: .64 } }, linux: { a0: { price: .02 }, a1: { price: .06 }, a2: { price: .12 }, a3: { price: .24 }, a4: { price: .48 }, a5: { price: .32 }, a6: { price: .64 }, a7: { price: 1.29 }, basic: { a0: { price: 0 }, a1: { price: 0 }, a2: { price: 0 }, a3: { price: 0 }, a4: { price: 0 } }, standard: { a0: { price: .02 }, a1: { price: .06 }, a2: { price: .12 }, a3: { price: .24 }, a4: { price: .48 }, a5: { price: .32 }, a6: { price: .64 }, a7: { price: 1.29 }, a8: { price: 1.97 }, a9: { price: 4.47 } }, standardNew: { a5: { price: 0 }, a6: { price: 0 }, a7: { price: 0 } }, support: { SLES: { a0: { price: .1 }, a1: { price: .1 }, a2: { price: .2 }, a3: { price: .2 }, a4: { price: .32 }, a5: { price: .32 }, a6: { price: .32 }, a7: { price: .32 } } } }, enterpriseLinux: { SLES: { basic: { a0: { price: .01 }, a1: { price: .025 }, a2: { price: .05 }, a3: { price: .05 }, a4: { price: .08 }, a5: { price: .08 }, a6: { price: .08 }, a7: { price: .08 } }, premium: { a0: { price: .1 }, a1: { price: .1 }, a2: { price: .2 }, a3: { price: .2 }, a4: { price: .32 }, a5: { price: .32 }, a6: { price: .32 }, a7: { price: .32 } } }, canonical: { basic: { a0: { price: 0 }, a1: { price: 0 }, a2: { price: 0 }, a3: { price: 0 }, a4: { price: 0 }, a5: { price: 0 }, a6: { price: 0 }, a7: { price: 0 } }, standard: { a0: { price: .04 }, a1: { price: .04 }, a2: { price: .08 }, a3: { price: .16 }, a4: { price: .32 }, a5: { price: .08 }, a6: { price: .16 }, a7: { price: .32 } }, premium: { a0: { price: .08 }, a1: { price: .08 }, a2: { price: .16 }, a3: { price: .32 }, a4: { price: .64 }, a5: { price: .16 }, a6: { price: .32 }, a7: { price: .64 } } }, openLogic: { basic: { a0: { price: 0 }, a1: { price: 0 }, a2: { price: 0 }, a3: { price: 0 }, a4: { price: 0 }, a5: { price: 0 }, a6: { price: 0 }, a7: { price: 0 } }, standard: { a0: { price: .0188 }, a1: { price: .0188 }, a2: { price: .0188 }, a3: { price: .0188 }, a4: { price: .0188 }, a5: { price: .0188 }, a6: { price: .0188 }, a7: { price: .0188 } } } }, sql: { web: { t1: { price: .032 }, t2: { price: .032 }, t3: { price: .032 }, t4: { price: .064 }, t5: { price: .128 } }, standard: { t1: { price: .4 }, t2: { price: .4 }, t3: { price: .4 }, t4: { price: .8 }, t5: { price: 1.6 } }, enterprise: { t1: { price: 1.5 }, t2: { price: 1.5 }, t3: { price: 1.5 }, t4: { price: 3 }, t5: { price: 6 } } }, biztalk: { standard: { t1: { price: .48 }, t2: { price: .48 }, t3: { price: .48 }, t4: { price: .96 }, t5: { price: 1.92 } }, enterprise: { t1: { price: 2.1 }, t2: { price: 2.1 }, t3: { price: 2.1 }, t4: { price: 4.2 }, t5: { price: 8.4 } } }, oracle: { java: { c1: { price: .08 }, c2: { price: .16 }, c4: { price: .32 }, c8: { price: .64 }, c16: { price: 1.28 } }, weblogic: { standard: { c1: { price: .5 }, c2: { price: .5 }, c4: { price: 1 }, c8: { price: 2 }, c16: { price: 4 } }, enterprise: { c1: { price: 1.28 }, c2: { price: 1.28 }, c4: { price: 2.56 }, c8: { price: 5.12 }, c16: { price: 10.24 } } }, database: { standard: { c1: { price: 1.11 }, c2: { price: 1.11 }, c4: { price: 1.28 }, c8: { price: 2.55 }, c16: { price: 5.1 } }, enterprise: { c1: { price: 3.16 }, c2: { price: 3.16 }, c4: { price: 6.32 }, c8: { price: 12.63 }, c16: { price: 25.27 } } } } }, cloudServices: { a0: { price: .02 }, a1: { price: .08 }, a2: { price: .16 }, a3: { price: .32 }, a4: { price: .64 }, a5: { price: .35 }, a6: { price: .71 }, a7: { price: 1.41 }, a8: { price: 2.45 }, a9: { price: 4.9 }, msdn: { a1: { price: .06 }, a2: { price: .12 }, a3: { price: .24 }, a4: { price: .48 } } }, biztalkServices: { developer: { price: .09 }, basic: { price: .48 }, standard: { price: 2.93 }, premium: { price: 5.86 }, promo: { developer: { price: .065 }, basic: { price: .335 }, standard: { price: 2.015 }, premium: { price: 4.03 } }, dataTransferOverage: { price: 1 } }, reservedIp: { reserved: { price: .004 }, remap: { price: .1 } }, apiManagement: { developer: { daily: { price: 1.59 }, monthly: { price: 49 } }, standard: { daily: { price: 22.55 }, monthly: { price: 699 } }, preview: { developer: { daily: { price: 1.59 }, monthly: { price: 49 } }, standard: { daily: { price: 11.26 }, monthly: { price: 349 } } } }, webSites: { shared: { price: .013 }, basic: { small: { price: .075 }, medium: { price: .15 }, large: { price: .3 } }, standard: { msdn: { small: { price: .06 }, medium: { price: .12 }, large: { price: .24 } }, small: { price: .1 }, medium: { price: .2 }, large: { price: .4 } }, ssl: { sni: { price: 9 }, ip: { price: 39 }, promo: { sni: { price: 6 }, ip: { price: 26 } } } }, mobileServices: { basic: { price: 14.99 }, standard: { price: 139.99 } }, storage: { block: { LRS: { t1: { price: .024 }, t2: { price: .0236 }, t3: { price: .0232 }, t4: { price: .0228 }, t5: { price: .0224 }, t5plus: { price: .022 } }, GRS: { t1: { price: .048 }, t2: { price: .0472 }, t3: { price: .0464 }, t4: { price: .0456 }, t5: { price: .0448 }, t5plus: { price: .044 } }, RAGRS: { t1: { price: .061 }, t2: { price: .0599 }, t3: { price: .0589 }, t4: { price: .0579 }, t5: { price: .0569 }, t5plus: { price: .056 } }, ZRS: { t1: { price: .03 }, t2: { price: .0295 }, t3: { price: .029 }, t4: { price: .0285 }, t5: { price: .028 }, t5plus: { price: .028 } } }, page: { LRS: { t1: { price: .05 }, t2: { price: .05 }, t3: { price: .05 }, t4: { price: .05 }, t5: { price: .045 } }, GRS: { t1: { price: .095 }, t2: { price: .08 }, t3: { price: .07 }, t4: { price: .065 }, t5: { price: .06 } }, RAGRS: { t1: { price: .12 }, t2: { price: .1 }, t3: { price: .09 }, t4: { price: .08 }, t5: { price: .075 } } }, table: { LRS: { t1: { price: .07 }, t2: { price: .065 }, t3: { price: .06 }, t4: { price: .055 }, t5: { price: .045 } }, GRS: { t1: { price: .095 }, t2: { price: .08 }, t3: { price: .07 }, t4: { price: .065 }, t5: { price: .06 } }, RAGRS: { t1: { price: .12 }, t2: { price: .1 }, t3: { price: .09 }, t4: { price: .08 }, t5: { price: .075 } } }, files: { LRS: { t1: { price: .04 } }, GRS: { t1: { price: .05 } } }, transactions: { price: .0036 } }, sqlDatabase: { basic: { oct31monthly: { price: 3 }, oct31daily: { price: .08 }, monthly: { price: 5 }, hourly: { price: .0067 } }, standard: { s0: { oct31monthly: { price: 7.5 }, oct31daily: { price: .24 }, monthly: { price: 15 }, hourly: { price: .0202 } }, s1: { oct31monthly: { price: 20 }, oct31daily: { price: .65 }, monthly: { price: 30 }, hourly: { price: .0403 } }, s2: { oct31monthly: { price: 100 }, oct31daily: { price: 3.23 }, monthly: { price: 75 }, hourly: { price: .1008 } } }, premium: { p1: { oct31monthly: { price: 465 }, oct31daily: { price: 15 }, monthly: { price: 465 }, hourly: { price: .625 } }, p2: { oct31monthly: { price: 930 }, oct31daily: { price: 30 }, monthly: { price: 930 }, hourly: { price: 1.25 } }, p3: { oct31monthly: { price: 3720 }, oct31daily: { price: 120 }, monthly: { price: 3720 }, hourly: { price: 5 } } }, webAndBusiness: { t1: { price: 4.995 }, t2: { price: 9.99 }, t3: { first: { price: 9.99 }, add: { price: 3.996 } }, t4: { first: { price: 45.954 }, add: { price: 1.996 } }, t5: { first: { price: 125.874 }, add: { price: .999 } } } }, sqlReporting: { price: .16 }, hdInsight: { head: { a3: { price: .64 }, a4: { price: 1.28 } }, compute: { price: .32 }, msdn: { head: { price: .48 }, compute: { price: .24 } }, hbase: { price: .48 } }, backup: { price: .2 }, automation: { price: 20 }, mediaServices: { encoding: { encoder: { t1: { price: 1.99 }, t2: { price: 1.89 }, t3: { price: 1.69 }, t4: { price: 1.49 }, t5: { price: 1.29 } }, dataProcessed: { t1: { price: 1.39 }, t2: { price: 1.19 }, t3: { price: 1.09 }, t4: { price: .89 }, t5: { price: .69 } } }, encodingReservedUnits: { basic: { price: 69 }, standard: { price: 139 }, premium: { price: 399 } }, indexing: { t1: { price: 10 }, t2: { price: 8 }, t3: { price: 6 }, t4: { price: 3 } }, streamingUnits: { price: 139 }, liveChannels: { price: .49 }, playReady: { price: .2 }, aesKeys: { price: .05 }, packaging: { t1: { price: 1.49 }, t2: { price: 1.2 }, t3: { price: .97 }, t4: { price: .77 } }, streaming: { price: 139 } }, cdn: { transfers: { zone1: { t1: { price: .087 }, t2: { price: .08 }, t3: { price: .06 }, t4: { price: .04 }, t5: { price: .03 }, t6: { price: .025 } }, zone2: { t1: { price: .138 }, t2: { price: .13 }, t3: { price: .12 }, t4: { price: .1 }, t5: { price: .08 }, t6: { price: .07 } } }, transactions: { price: .01 } }, serviceBus: { queue: { price: .01 }, "brokered-messaging": { basic: { operations: { price: .05 } }, standard: { base: { price: 10 }, operations: { t1: { price: .8 }, t2: { price: .5 }, t3: { price: .2 } } } }, "brokered-connections": { t1: { price: .03 }, t2: { price: .025 }, t3: { price: .015 }, "example-total": { price: 120 } }, relay: { hours: { price: .1 }, messages: { price: .01 } } }, notificationHubs: { basic: { price: 20 }, standard: { price: 199 }, base: { basic: { price: 10 }, standard: { price: 200 } }, pushes: { t1: { basic: { price: 1 }, standard: { price: 10 } }, t2: { basic: { price: 1 }, standard: { price: 2.5 } } } }, cache: { basic: { price: 18 }, standard: { price: 72 }, premium: { price: 290 }, basicRedis250MB: { price: .022 }, basicRedis1GB: { price: .055 }, basicRedis28GB: { price: .09 }, basicRedis6GB: { price: .18 }, basicRedis13GB: { price: .21 }, basicRedis26GB: { price: .42 }, basicRedis55GB: { price: .84 }, standardRedis250MB: { price: .055 }, standardRedis1GB: { price: .138 }, standardRedis28GB: { price: .225 }, standardRedis6GB: { price: .45 }, standardRedis13GB: { price: .525 }, standardRedis26GB: { price: 1.05 }, standardRedis55GB: { price: 2.1 }, basicOld: { price: 12.5 }, standardOld: { price: 50 }, premiumOld: { price: 200 }, preview: { basicRedis250MB: { price: .011 }, basicRedis1GB: { price: .0275 }, basicRedis28GB: { price: .056 }, basicRedis6GB: { price: .113 }, basicRedis13GB: { price: .151 }, basicRedis26GB: { price: .302 }, basicRedis55GB: { price: .6035 }, standardRedis250MB: { price: .0275 }, standardRedis1GB: { price: .069 }, standardRedis28GB: { price: .14 }, standardRedis6GB: { price: .2825 }, standardRedis13GB: { price: .3775 }, standardRedis26GB: { price: .755 }, standardRedis55GB: { price: 1.509 } } }, caching: { t1: { price: 45 }, t2: { price: 55 }, t3: { price: 75 }, t4: { price: 110 }, t5: { price: 180 }, t6: { price: 325 } }, dataTransfers: { zone1: { t1: { price: .087 }, t2: { price: .083 }, t3: { price: .07 }, t4: { price: .05 } }, zone2: { t1: { price: .138 }, t2: { price: .135 }, t3: { price: .13 }, t4: { price: .12 } }, zone3: { t1: { price: .181 }, t2: { price: .175 }, t3: { price: .17 }, t4: { price: .16 } } }, trafficManager: { t1: { price: .54 }, t2: { price: .375 }, healthChecks: { price: .36 }, healthChecksExternal: { price: .54 } }, virtualNetwork: { "vpn-gateway": { price: .036 }, "outbound-inter": { zone1: { price: .035 }, zone2: { price: .09 }, zone3: { price: .16 } } }, multiFactorAuthentication: { perUser: { price: 1.4 }, perAuthentication: { price: 1.4 } }, recoveryManager: { price: 16, promo: { price: 8 } }, scheduler: { standard: { price: 13.99 }, premium: { price: 139.99 } }, importExport: { price: 80, support: { price: 29 }, old: { price: 40 } }, visualStudioOnline: { basic: { price: 20 }, professional: { price: 45 }, advanced: { price: 60 }, build: { price: .05 }, loadTesting: { price: .002 }, preview: { basic: { price: 10 }, professional: { price: 22.5 }, advanced: { price: 30 }, build: { price: .025 }, loadTesting: { price: .001 } } }, expressRoute: { exchange: { t1: { price: 436 }, t2: { price: 7200 }, t3: { price: 145 }, t4: { price: 290 }, dataTransfer: { zone1: { price: .025 }, zone2: { price: .05 } } }, network: { t1: { price: 436 }, t2: { price: 872 }, t3: { price: 1300 }, t4: { price: 5200 }, t5: { price: 8700 } } }, support: { developer: { price: 29 }, standard: { price: 300 }, professional: { price: 1e3 } }, siteRecovery: { t1: { price: 16 }, t2: { price: 27 } }, "machine-learning": { "studio-service": { hourly: { price: .38 } }, "api-service": { hourly: { price: .75 }, predictions: { price: .18 } } }, "event-hubs": { basic: { ingress: { price: .014 }, throughput: { hourly: { price: .0075 }, monthly: { price: 5.6 } } }, standard: { ingress: { price: .014 }, throughput: { hourly: { price: .015 }, monthly: { price: 11.2 } } } }, documentdb: { standard: { t1: { daily: { price: .73 }, monthly: { price: 22.5 } } } }, search: { standard: { hourly: { price: .168 } } } } }, currency, currencyMetrics, useDecimalComma = !1, amtOfDecimals = 2, invertGlyph = !1, groupSeparator = ",";
(function (n) {
    n.ajax({ url: "/api/v1/currencies/conversion/", type: "GET", success: function (n) {
        currency = n.currencies;
        currencyMetrics = currency.usd;
    }, error: function () {
        currency = { usd: { name: "USD", locale: "en-us", glyph: "$", conversion: 1, commitmentBase: { firstTierLow: 500, firstTierHigh: 14999, secondTierLow: 15e3, secondTierHigh: 39999, thirdTierLow: 4e4 } } };
        currencyMetrics = currency.usd;
    }, async: !1 });
    n(function () {
        getGeoData(function (t) {
            var r = getParameterByName("currency-locale"), i = getParameterByName("currency-code");
            r !== null ? setDefaultCurrencyByLangLocale(r) : i !== null && typeof currency[i.toLowerCase()] != "undefined" ? currencyMetrics = currency[i.toLowerCase()] : n.cookie("defaultCurrency") && typeof currency[n.cookie("defaultCurrency").toLowerCase()] != "undefined" ? currencyMetrics = currency[n.cookie("defaultCurrency").toLowerCase()] : t && t.country_name && t.country_name !== "unknown" ? setDefaultCurrencyByGeoIpCountry(t.country_name.toLowerCase()) : setDefaultCurrencyByLangLocale(Acom.currentCulture);
            currencyMetrics || (currencyMetrics = currency.usd);
            n("#currency-choice").length !== 0 && (n("#currency-choice").val().length === 5 ? (n("#currency-choice").val(currencyMetrics.locale), n("#currency-choice").change(function () {
                var t = n("#currency-choice").val();
                n("html").removeClass("currency" + currencyMetrics.name);
                setDefaultCurrencyByLangLocale(t);
                changeCurrency(currencyMetrics.name);
            })) : (n("#currency-choice").val(currencyMetrics.name), n("#currency-choice").change(function () {
                changeCurrency(n("#currency-choice").val());
            })));
            n("html").addClass("currency" + currencyMetrics.name);
            setNumberFormatByLangLocale(Acom.currentCulture);
            updateCurrency();
            n(".wa-dropdown-currency").val(currencyMetrics.name).trigger("change");
            n("html").trigger("globalInitComplete");
        });
    });
})(jQuery);
getStoredPrice = function (n) {
    var t = $(n), r = t.data("pricekey"), i = priceDict, u = !1, f = !1, e = !1, o;
    for (t.hasClass("price-mod-monthly") && (u = !0), t.hasClass("price-mod-max-discount") ? f = !0 : t.hasClass("price-mod-min-discount") && (e = !0), o = retrieveStoredPriceByString(r, u, f, e), r = r.split("."); r.length > 0;)
        try {
            i = i[r.splice(0, 1)[0]];
        }
        catch (s) {
            return console.log("price lookup failure", priceKeyString), null;
        }
    if (typeof i == "undefined")
        return null;
    typeof i.overrideConversion != "undefined" && i.overrideConversion === !0 && (typeof i[currencyMetrics.name] != "undefined" ? t.addClass("no-convert") : t.removeClass("no-convert"));
    t.data("amount", o);
    t.addClass("price-data");
};
retrieveStoredPriceByString = function (n, t, i, r) {
    var u = getGlobalPriceObject(n);
    return u ? (price = typeof u.overrideConversion != "undefined" && u.overrideConversion === !0 ? typeof u[currencyMetrics.name] != "undefined" ? u[currencyMetrics.name] : u.usd : u.price, t && (price = price * priceDict.hoursInAMonth), i && (price = price * priceDict.maxDiscount), r && (price = price * priceDict.minDiscount), price) : null;
};
getGlobalPriceObject = function (n) {
    for (var i = n.split("."), t = priceDict; i.length > 0;)
        try {
            t = t[i.splice(0, 1)[0]];
        }
        catch (r) {
            return console.log("price lookup failure", n), null;
        }
    return t;
};
costCalc = function (n, t, i) {
    var r, u;
    return n = n * currencyMetrics.conversion, t ? (n > 10 && i > 2 && (i = 2), currencyMetrics.conversion > 50 && i > 2 && (i = 2), r = (Math.ceil((n * Math.pow(10, i)).toFixed(3)) / Math.pow(10, i)).toFixed(i)) : r = n.toFixed(i), u = $(".page-pricing-calculator").length === 1 ? !1 : !0, r = localizeNumber(r, u), addGlyph(r);
};
addGlyph = function (n) {
    var t = !1;
    return typeof currencyMetrics.invertGlyph != "undefined" && currencyMetrics.invertGlyph && (t = !0), Acom.currentCulture == "fr-fr" && currencyMetrics.name == "EUR" && (t = !0), t ? n + "&nbsp;" + currencyMetrics.glyph : currencyMetrics.glyph + n;
};
localizeNumber = function (n, t) {
    var r, f, u, e, i;
    if (n = n.toString(), r = n.indexOf("."), r !== -1) {
        for (f = n.length - r - 3, u = 1; u <= f; u++)
            if (n.slice(-1) == "0")
                n = n.slice(0, -1);
            else
                break;
        t && n.slice(-3) == ".00" && (n = n.slice(0, -3));
        useDecimalComma && (n = n.replace(".", ","));
    }
    for (e = useDecimalComma ? "," : ".", i = n.indexOf(e) - 3, i === -4 && (i = n.length - 3); i > 0;)
        n = n.slice(0, i) + groupSeparator + n.slice(i), i -= 3;
    return n;
};
updateCurrency = function () {
    var n = currencyMetrics.name;
    updatePrices();
};
updatePrices = function () {
    $(".stored-price").length !== 0 && $.each($(".stored-price"), function () {
        getStoredPrice(this);
    });
    $(".price-data").each(function () {
        var n = $(this), t, i = 4;
        n.hasClass("commitment-first-tier-low") ? t = addGlyph(localizeNumber(currencyMetrics.commitmentBase.firstTierLow)) : n.hasClass("commitment-first-tier-high") ? t = addGlyph(localizeNumber(currencyMetrics.commitmentBase.firstTierHigh)) : n.hasClass("commitment-second-tier-low") ? t = addGlyph(localizeNumber(currencyMetrics.commitmentBase.secondTierLow)) : n.hasClass("commitment-second-tier-high") ? t = addGlyph(localizeNumber(currencyMetrics.commitmentBase.secondTierHigh)) : n.hasClass("commitment-third-tier-low") ? t = addGlyph(localizeNumber(currencyMetrics.commitmentBase.thirdTierLow)) : (typeof n.data("decimals") != "undefined" && (i = parseInt(n.data("decimals"), 10)), t = n.hasClass("no-convert") ? addGlyph(localizeNumber(n.data("amount"))) : costCalc(n.data("amount"), !n.hasClass("no-round"), i));
        n.html(t);
    });
};
changeCurrency = function (n) {
    currency[n.toLowerCase()] ? ($("html").removeClass("currency" + currencyMetrics.name), currencyMetrics = currency[n.toLowerCase()], $.cookie("defaultCurrency", currencyMetrics.name, { path: "/", expires: 365 })) : currencyMetrics = currency.usd;
    updateCurrency();
    $("html").addClass("currency" + currencyMetrics.name);
    $("html").trigger("changeCurrency");
};
setNumberFormatByLangLocale = function (n) {
    switch (n) {
        case "da-dk":
        case "de-de":
        case "es-es":
        case "fr-fr":
        case "it-it":
        case "nl-nl":
        case "pt-br":
        case "tr-tr":
        case "ru-ru":
        case "sv-se": useDecimalComma = !0;
    }
    switch (n) {
        case "da-dk":
        case "de-de":
        case "es-es":
        case "it-it":
        case "nl-nl":
        case "pt-br":
        case "tr-tr":
            groupSeparator = ".";
            break;
        case "fr-fr":
        case "pl-pl":
        case "ru-ru":
        case "sv-se":
            groupSeparator = "&nbsp;";
            break;
        default: groupSeparator = ",";
    }
};
setDefaultCurrencyByLangLocale = function (n) {
    switch (n) {
        case "en-us":
            currencyMetrics = currency.usd;
            break;
        case "pt-br":
            currencyMetrics = currency.brl;
            break;
        case "en-ca":
            currencyMetrics = currency.cad;
            break;
        case "en-gb":
            currencyMetrics = currency.gbp;
            break;
        case "en-au":
            currencyMetrics = currency.aud;
            break;
        case "en-nz":
            currencyMetrics = currency.nzd;
            break;
        case "en-za":
            currencyMetrics = currency.zar;
            break;
        case "es-ar":
            currencyMetrics = currency.ars;
            break;
        case "da-dk":
            currencyMetrics = currency.dkk;
            break;
        case "de-ch":
            currencyMetrics = currency.chf;
            break;
        case "ar-sa":
            currencyMetrics = currency.sar;
            break;
        case "id-id":
            currencyMetrics = currency.idr;
            break;
        case "ms-my":
            currencyMetrics = currency.myr;
            break;
        case "de-de":
        case "fr-fr":
        case "it-it":
        case "nl-nl":
        case "pl-pl":
        case "es-es":
            currencyMetrics = currency.eur;
            break;
        case "sv-se":
            currencyMetrics = currency.sek;
            break;
        case "ja-jp":
            currencyMetrics = currency.jpy;
            break;
        case "ko-kr":
            currencyMetrics = currency.krw;
            break;
        case "ru-ru":
            currencyMetrics = currency.rub;
            break;
        case "tr-tr":
            currencyMetrics = currency.try;
            break;
        case "zh-tw":
            currencyMetrics = currency.twd;
            break;
        case "zh-hk":
            currencyMetrics = currency.hkd;
            break;
        case "hi-in":
            currencyMetrics = currency.inr;
            break;
        case "es-mx":
            currencyMetrics = currency.mxn;
            break;
        default: currencyMetrics = currency.usd;
    }
};
setDefaultCurrencyByGeoIpCountry = function (n) {
    switch (n) {
        case "united states":
            currencyMetrics = currency.usd;
            break;
        case "canada":
            currencyMetrics = currency.cad;
            break;
        case "united kingdom":
            currencyMetrics = currency.gbp;
            break;
        case "australia":
            currencyMetrics = currency.aud;
            break;
        case "new zealand":
            currencyMetrics = currency.nzd;
            break;
        case "south africa":
            currencyMetrics = currency.zar;
            break;
        case "argentina":
            currencyMetrics = currency.ars;
            break;
        case "denmark":
            currencyMetrics = currency.dkk;
            break;
        case "switzerland":
            currencyMetrics = currency.chf;
            break;
        case "saudi arabia":
            currencyMetrics = currency.sar;
            break;
        case "brazil":
            currencyMetrics = currency.brl;
            break;
        case "hong kong":
            currencyMetrics = currency.hkd;
            break;
        case "india":
            currencyMetrics = currency.inr;
            break;
        case "mexico":
            currencyMetrics = currency.mxn;
            break;
        case "malaysia":
            currencyMetrics = currency.myr;
            break;
        case "indonesia":
            currencyMetrics = currency.idr;
            break;
        case "austria":
        case "belgium":
        case "croatia":
        case "cyprus":
        case "estonia":
        case "finland":
        case "france":
        case "germany":
        case "greece":
        case "ireland":
        case "italy":
        case "luxembourg":
        case "malta":
        case "netherlands":
        case "portugal":
        case "slovakia":
        case "slovenia":
        case "spain":
            currencyMetrics = currency.eur;
            break;
        case "norway":
            currencyMetrics = currency.nok;
            break;
        case "sweden":
            currencyMetrics = currency.sek;
            break;
        case "japan":
            currencyMetrics = currency.jpy;
            break;
        case "korea":
            currencyMetrics = currency.krw;
            break;
        case "russia":
            currencyMetrics = currency.rub;
            break;
        case "turkey":
            currencyMetrics = currency.try;
            break;
        case "taiwan":
            currencyMetrics = currency.twd;
            break;
        default: currencyMetrics = currency.usd;
    }
};
!function () {
    var n = null;
    window.PR_SHOULD_USE_CONTINUATION = !0, function () {
        function d(n) {
            function e(n) {
                var i = n.charCodeAt(0), t;
                return i !== 92 ? i : (t = n.charAt(1), (i = a[t]) ? i : "0" <= t && t <= "7" ? parseInt(n.substring(1), 8) : t === "u" || t === "x" ? parseInt(n.substring(2), 16) : n.charCodeAt(1));
            }
            function r(n) {
                return n < 32 ? (n < 16 ? "\\x0" : "\\x") + n.toString(16) : (n = String.fromCharCode(n), n === "\\" || n === "-" || n === "]" || n === "^" ? "\\" + n : n);
            }
            function h(n) {
                var u = n.substring(1, n.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), n = [], i = u[0] === "^", s = ["["], f, t, o;
                for (i && s.push("^"), i = i ? 1 : 0, f = u.length; i < f; ++i)
                    t = u[i], /\\[bdsw]/i.test(t) ? s.push(t) : (t = e(t), i + 2 < f && "-" === u[i + 1] ? (o = e(u[i + 2]), i += 2) : o = t, n.push([t, o]), o < 65 || t > 122 || (o < 65 || t > 90 || n.push([Math.max(65, t) | 32, Math.min(o, 90) | 32]), o < 97 || t > 122 || n.push([Math.max(97, t) & -33, Math.min(o, 122) & -33])));
                for (n.sort(function (n, t) {
                    return n[0] - t[0] || t[1] - n[1];
                }), u = [], f = [], i = 0; i < n.length; ++i)
                    t = n[i], t[0] <= f[1] + 1 ? f[1] = Math.max(f[1], t[1]) : u.push(f = t);
                for (i = 0; i < u.length; ++i)
                    t = u[i], s.push(r(t[0])), t[1] > t[0] && (t[1] + 1 > t[0] && s.push("-"), s.push(r(t[1])));
                return s.push("]"), s.join("");
            }
            function c(n) {
                for (var i, u = n.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), s = u.length, f = [], t = 0, e = 0; t < s; ++t)
                    i = u[t], i === "(" ? ++e : "\\" === i.charAt(0) && (i = +i.substring(1)) && (i <= e ? f[i] = -1 : u[t] = r(i));
                for (t = 1; t < f.length; ++t)
                    -1 === f[t] && (f[t] = ++l);
                for (e = t = 0; t < s; ++t)
                    i = u[t], i === "(" ? (++e, f[e] || (u[t] = "(?:")) : "\\" === i.charAt(0) && (i = +i.substring(1)) && i <= e && (u[t] = "\\" + f[i]);
                for (t = 0; t < s; ++t)
                    "^" === u[t] && "^" !== u[t + 1] && (u[t] = "");
                if (n.ignoreCase && o)
                    for (t = 0; t < s; ++t)
                        i = u[t], n = i.charAt(0), i.length >= 2 && n === "[" ? u[t] = h(i) : n !== "\\" && (u[t] = i.replace(/[A-Za-z]/g, function (n) {
                            return n = n.charCodeAt(0), "[" + String.fromCharCode(n & -33, n | 32) + "]";
                        }));
                return u.join("");
            }
            for (var t, l = 0, o = !1, u = !1, i = 0, f = n.length; i < f; ++i)
                if (t = n[i], t.ignoreCase)
                    u = !0;
                else if (/[a-z]/i.test(t.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    o = !0;
                    u = !1;
                    break;
                }
            for (var a = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 }, s = [], i = 0, f = n.length; i < f; ++i) {
                if (t = n[i], t.global || t.multiline)
                    throw Error("" + t);
                s.push("(?:" + c(t) + ")");
            }
            return RegExp(s.join("|"), u ? "gi" : "g");
        }
        function g(n, t) {
            function e(n) {
                var s = n.nodeType;
                if (s == 1) {
                    if (!o.test(n.className)) {
                        for (s = n.firstChild; s; s = s.nextSibling)
                            e(s);
                        s = n.nodeName.toLowerCase();
                        ("br" === s || "li" === s) && (u[i] = "\n", r[i << 1] = f++, r[i++ << 1 | 1] = n);
                    }
                }
                else
                    (s == 3 || s == 4) && (s = n.nodeValue, s.length && (s = t ? s.replace(/\r\n?/g, "\n") : s.replace(/[\t\n\r ]+/g, " "), u[i] = s, r[i << 1] = f, f += s.length, r[i++ << 1 | 1] = n));
            }
            var o = /(?:^|\s)nocode(?:\s|$)/, u = [], f = 0, r = [], i = 0;
            return e(n), { a: u.join("").replace(/\n$/, ""), d: r };
        }
        function s(n, t, i, r) {
            t && (n = { a: t, e: n }, i(n), r.push.apply(r, n.g));
        }
        function nt(n) {
            for (var r, t = void 0, i = n.firstChild; i; i = i.nextSibling)
                r = i.nodeType, t = r === 1 ? t ? n : i : r === 3 ? it.test(i.nodeValue) ? n : t : t;
            if (t !== n)
                return t;
        }
        function u(t, i) {
            function r(n) {
                for (var h, p, w, v = n.e, y = [v, "pln"], k = 0, d = n.a.match(f) || [], g = {}, b = 0, nt = d.length; b < nt; ++b) {
                    var l = d[b], o = g[l], a = void 0, t;
                    if (typeof o == "string")
                        t = !1;
                    else {
                        if (h = u[l.charAt(0)], h)
                            a = l.match(h[1]), o = h[0];
                        else {
                            for (t = 0; t < e; ++t)
                                if (h = i[t], a = l.match(h[1])) {
                                    o = h[0];
                                    break;
                                }
                            a || (o = "pln");
                        }
                        !(t = o.length >= 5 && "lang-" === o.substring(0, 5)) || a && typeof a[1] == "string" || (t = !1, o = "src");
                        t || (g[l] = o);
                    }
                    h = k;
                    k += l.length;
                    t ? (t = a[1], p = l.indexOf(t), w = p + t.length, a[2] && (w = l.length - a[2].length, p = w - t.length), o = o.substring(5), s(v + h, l.substring(0, p), r, y), s(v + h + p, t, c(o, t), y), s(v + h + w, l.substring(w), r, y)) : y.push(v + h, o);
                }
                n.g = y;
            }
            var u = {}, f, e;
            return function () {
                for (var r, e, h, c = t.concat(i), o = [], l = {}, s = 0, a = c.length; s < a; ++s) {
                    if (r = c[s], e = r[3], e)
                        for (h = e.length; --h >= 0;)
                            u[e.charAt(h)] = r;
                    r = r[1];
                    e = "" + r;
                    l.hasOwnProperty(e) || (o.push(r), l[e] = n);
                }
                o.push(/[\S\s]/);
                f = d(o);
            }(), e = i.length, r;
        }
        function i(t) {
            var f = [], r = [], i, e;
            return t.tripleQuotedStrings ? f.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, n, "'\""]) : t.multiLineStrings ? f.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, n, "'\"`"]) : f.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, n, "\"'"]), t.verbatimStrings && r.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, n]), i = t.hashComments, i && (t.cStyleComments ? (i > 1 ? f.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, n, "#"]) : f.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, n, "#"]), r.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, n])) : f.push(["com", /^#[^\n\r]*/, n, "#"])), t.cStyleComments && (r.push(["com", /^\/\/[^\n\r]*/, n]), r.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, n])), (i = t.regexLiterals) && (e = (i = i > 1 ? "" : "\n\r") ? "." : "[\\S\\s]", r.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + i + "])(?:[^/\\x5B\\x5C" + i + "]|\\x5C" + e + "|\\x5B(?:[^\\x5C\\x5D" + i + "]|\\x5C" + e + ")*(?:\\x5D|$))+/") + ")")])), (i = t.types) && r.push(["typ", i]), i = ("" + t.keywords).replace(/^ | $/g, ""), i.length && r.push(["kwd", RegExp("^(?:" + i.replace(/[\s,]+/g, "|") + ")\\b"), n]), f.push(["pln", /^\s+/, n, " \r\n\t "]), i = "^.[^\\s\\w.$@'\"`/\\\\]*", t.regexLiterals && (i += "(?!s*/)"), r.push(["lit", /^@[$_a-z][\w$@]*/i, n], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, n], ["pln", /^[$_a-z][\w$@]*/i, n], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, n, "0123456789"], ["pln", /^\\[\S\s]?/, n], ["pun", RegExp(i), n]), u(f, r);
        }
        function h(n, t, i) {
            function s(n) {
                var t = n.nodeType, r, u;
                if (t != 1 || c.test(n.className))
                    (t == 3 || t == 4) && i && (r = n.nodeValue, u = r.match(l), u && (t = r.substring(0, u.index), n.nodeValue = t, (r = r.substring(u.index + u[0].length)) && n.parentNode.insertBefore(e.createTextNode(r), n.nextSibling), h(n), t || n.parentNode.removeChild(n)));
                else if ("br" === n.nodeName)
                    h(n), n.parentNode && n.parentNode.removeChild(n);
                else
                    for (n = n.firstChild; n; n = n.nextSibling)
                        s(n);
            }
            function h(n) {
                function i(n, t) {
                    var e = t ? n.cloneNode(!1) : n, r = n.parentNode, f, u;
                    if (r)
                        for (r = i(r, 1), f = n.nextSibling, r.appendChild(e), u = f; u; u = f)
                            f = u.nextSibling, r.appendChild(u);
                    return e;
                }
                for (; !n.nextSibling;)
                    if (n = n.parentNode, !n)
                        return;
                for (var n = i(n.nextSibling, 0), t; (t = n.parentNode) && t.nodeType === 1;)
                    n = t;
                f.push(n);
            }
            for (var f, r, o, c = /(?:^|\s)nocode(?:\s|$)/, l = /\r\n?|\n/, e = n.ownerDocument, u = e.createElement("li"); n.firstChild;)
                u.appendChild(n.firstChild);
            for (f = [u], r = 0; r < f.length; ++r)
                s(f[r]);
            t === (t | 0) && f[0].setAttribute("value", t);
            o = e.createElement("ol");
            o.className = "linenums";
            for (var t = Math.max(0, t - 1 | 0) || 0, r = 0, a = f.length; r < a; ++r)
                u = f[r], u.className = "L" + (r + t) % 10, u.firstChild || u.appendChild(e.createTextNode(" ")), o.appendChild(u);
            n.appendChild(o);
        }
        function t(n, t) {
            for (var i, r = t.length; --r >= 0;)
                i = t[r], o.hasOwnProperty(i) ? f.console && console.warn("cannot override language handler %s", i) : o[i] = n;
        }
        function c(n, t) {
            return n && o.hasOwnProperty(n) || (n = /^\s*</.test(t) ? "default-markup" : "default-code"), o[n];
        }
        function l(n) {
            var b = n.h, r, u, e, i, h, ft, tt, a, it;
            try {
                r = g(n.c, n.i);
                u = r.a;
                n.a = u;
                n.d = r.d;
                n.e = 0;
                c(b, u)(n);
                var v = /\bMSIE\s(\d+)/.exec(navigator.userAgent), v = v && +v[1] <= 8, b = /\n/g, k = n.a, d = k.length, r = 0, y = n.d, ot = y.length, u = 0, t = n.g, l = t.length, nt = 0;
                for (t[l] = d, i = e = 0; i < l;)
                    t[i] !== t[i + 2] ? (t[e++] = t[i++], t[e++] = t[i++]) : i += 2;
                for (l = e, i = e = 0; i < l;) {
                    for (var st = t[i], ut = t[i + 1], o = i + 2; o + 2 <= l && t[o + 1] === ut;)
                        o += 2;
                    t[e++] = st;
                    t[e++] = ut;
                    i = o;
                }
                t.length = e;
                h = n.c;
                h && (ft = h.style.display, h.style.display = "none");
                try {
                    for (; u < ot;) {
                        var p = y[u + 2] || d, et = t[nt + 2] || d, o = Math.min(p, et), s = y[u + 1], w;
                        s.nodeType !== 1 && (w = k.substring(r, o)) && (v && (w = w.replace(b, "\r")), s.nodeValue = w, tt = s.ownerDocument, a = tt.createElement("span"), a.className = t[nt + 1], it = s.parentNode, it.replaceChild(a, s), a.appendChild(s), r < p && (y[u + 1] = s = tt.createTextNode(k.substring(o, p)), it.insertBefore(s, a.nextSibling)));
                        r = o;
                        r >= p && (u += 2);
                        r >= et && (nt += 2);
                    }
                }
                finally {
                    h && (h.style.display = ft);
                }
            }
            catch (rt) {
                f.console && console.log(rt && rt.stack || rt);
            }
        }
        var f = window, r = ["break,continue,do,else,for,if,return,while"], e = [[r, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"], a = [e, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], v = [e, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"], y = [v, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"], e = [e, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"], p = [r, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], w = [r, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], tt = [r, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"], r = [r, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], b = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, it = /\S/, rt = i({ keywords: [a, y, e, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", p, w, r], hashComments: !0, cStyleComments: !0, multiLineStrings: !0, regexLiterals: !0 }), o = {}, k;
        t(rt, ["default-code"]);
        t(u([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\S\s]*?(?:--\>|$)/], ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/], ["lang-", /^<%([\S\s]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
        t(u([["pln", /^\s+/, n, " \t\r\n"], ["atv", /^(?:"[^"]*"?|'[^']*'?)/, n, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/], ["pun", /^[/<->]+/], ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i], ["lang-js", /^on\w+\s*=\s*'([^']+)'/i], ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i], ["lang-css", /^style\s*=\s*"([^"]+)"/i], ["lang-css", /^style\s*=\s*'([^']+)'/i], ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]]), ["in.tag"]);
        t(u([], [["atv", /^[\S\s]+/]]), ["uq.val"]);
        t(i({ keywords: a, hashComments: !0, cStyleComments: !0, types: b }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
        t(i({ keywords: "null,true,false" }), ["json"]);
        t(i({ keywords: y, hashComments: !0, cStyleComments: !0, verbatimStrings: !0, types: b }), ["cs"]);
        t(i({ keywords: v, cStyleComments: !0 }), ["java"]);
        t(i({ keywords: r, hashComments: !0, multiLineStrings: !0 }), ["bash", "bsh", "csh", "sh"]);
        t(i({ keywords: p, hashComments: !0, multiLineStrings: !0, tripleQuotedStrings: !0 }), ["cv", "py", "python"]);
        t(i({ keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", hashComments: !0, multiLineStrings: !0, regexLiterals: 2 }), ["perl", "pl", "pm"]);
        t(i({ keywords: w, hashComments: !0, multiLineStrings: !0, regexLiterals: !0 }), ["rb", "ruby"]);
        t(i({ keywords: e, cStyleComments: !0, regexLiterals: !0 }), ["javascript", "js"]);
        t(i({ keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", hashComments: 3, cStyleComments: !0, multilineStrings: !0, tripleQuotedStrings: !0, regexLiterals: !0 }), ["coffee"]);
        t(i({ keywords: tt, cStyleComments: !0, multilineStrings: !0 }), ["rc", "rs", "rust"]);
        t(u([], [["str", /^[\S\s]+/]]), ["regex"]);
        k = f.PR = { createSimpleLexer: u, registerLangHandler: t, sourceDecorator: i, PR_ATTRIB_NAME: "atn", PR_ATTRIB_VALUE: "atv", PR_COMMENT: "com", PR_DECLARATION: "dec", PR_KEYWORD: "kwd", PR_LITERAL: "lit", PR_NOCODE: "nocode", PR_PLAIN: "pln", PR_PUNCTUATION: "pun", PR_SOURCE: "src", PR_STRING: "str", PR_TAG: "tag", PR_TYPE: "typ", prettyPrintOne: f.prettyPrintOne = function (n, t, i) {
            var r = document.createElement("div");
            return r.innerHTML = "<pre>" + n + "<\/pre>", r = r.firstChild, i && h(r, i, !0), l({ h: t, j: i, c: r, i: 1 }), r.innerHTML;
        }, prettyPrint: f.prettyPrint = function (t, i) {
            function a() {
                for (var i, r, ut, ft = f.PR_SHOULD_USE_CONTINUATION ? u.now() + 250 : Infinity; c < e.length && u.now() < ft; c++) {
                    for (var s = e[c], rt = b, v = s; v = v.previousSibling;) {
                        if (r = v.nodeType, i = (r === 7 || r === 8) && v.nodeValue, i ? !/^\??prettify\b/.test(i) : r !== 3 || /\S/.test(v.nodeValue))
                            break;
                        if (i) {
                            rt = {};
                            i.replace(/\b(\w+)=([\w%+\-.:]+)/g, function (n, t, i) {
                                rt[t] = i;
                            });
                            break;
                        }
                    }
                    if (v = s.className, (rt !== b || w.test(v)) && !d.test(v)) {
                        for (r = !1, i = s.parentNode; i; i = i.parentNode)
                            if (it.test(i.tagName) && i.className && w.test(i.className)) {
                                r = !0;
                                break;
                            }
                        if (!r) {
                            if (s.className += " prettyprinted", r = rt.lang, r || (r = v.match(p), !r && (ut = nt(s)) && tt.test(ut.tagName) && (r = ut.className.match(p)), r && (r = r[1])), g.test(s.tagName))
                                i = 1;
                            else
                                var i = s.currentStyle, o = k.defaultView, i = (i = i ? i.whiteSpace : o && o.getComputedStyle ? o.getComputedStyle(s, n).getPropertyValue("white-space") : 0) && "pre" === i.substring(0, 3);
                            o = rt.linenums;
                            (o = o === "true" || +o) || (o = (o = v.match(/\blinenums\b(?::(\d+))?/)) ? o[1] && o[1].length ? +o[1] : !0 : !1);
                            o && h(s, o, i);
                            y = { h: r, c: s, j: o, i: i };
                            l(y);
                        }
                    }
                }
                c < e.length ? setTimeout(a, 250) : "function" == typeof t && t();
            }
            for (var s, v, u, r = i || document.body, k = r.ownerDocument || document, r = [r.getElementsByTagName("pre"), r.getElementsByTagName("code"), r.getElementsByTagName("xmp")], e = [], o = 0; o < r.length; ++o)
                for (s = 0, v = r[o].length; s < v; ++s)
                    e.push(r[o][s]);
            r = n;
            u = Date;
            u.now || (u = { now: function () {
                return +new Date;
            } });
            var c = 0, y, p = /\blang(?:uage)?-([\w.]+)(?!\S)/, w = /\bprettyprint\b/, d = /\bprettyprinted\b/, g = /pre|xmp/i, tt = /^code$/i, it = /^(?:pre|code|xmp)$/i, b = {};
            a();
        } };
        typeof define == "function" && define.amd && define("google-code-prettify", [], function () {
            return k;
        });
    }();
}();
/*!
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (n, t, i) {
    var f, r, e, o, u, s;
    if (typeof t != "undefined") {
        i = i || {};
        t === null && (t = "", i.expires = -1);
        f = "";
        i.expires && (typeof i.expires == "number" || i.expires.toUTCString) && (typeof i.expires == "number" ? (r = new Date, r.setTime(r.getTime() + i.expires * 864e5)) : r = i.expires, f = "; expires=" + r.toUTCString());
        var h = i.path ? "; path=" + i.path : "", c = i.domain ? "; domain=" + i.domain : "", l = i.secure ? "; secure" : "";
        document.cookie = [n, "=", encodeURIComponent(t), f, h, c, l].join("");
    }
    else {
        if (e = null, document.cookie && document.cookie != "")
            for (o = document.cookie.split(";"), u = 0; u < o.length; u++)
                if (s = jQuery.trim(o[u]), s.substring(0, n.length + 1) == n + "=") {
                    e = decodeURIComponent(s.substring(n.length + 1));
                    break;
                }
        return e;
    }
}, function (n) {
    function i(i) {
        n("#mooncakeAlert").length !== 0 ? (i.country_name && i.country_name.toLowerCase() === "china" || typeof i == "undefined" || typeof i.country_name == "undefined" || i.country_name === "unknown") && (document.referrer.split("/")[2] === "windowsazure.cn" || document.referrer.split("/")[2] === "www.windowsazure.cn" ? t() : n.cookie("azureMC") === "perm" && n.cookie("azureMCSession") === null && (window.location = "http://www.windowsazure.cn"), n.cookie("azureMCSession") === null && n.cookie("azureMC") === null && (n(".mooncakeAlert").click(), t()), n("#mooncakeAlert .site-arrowboxcta").click(function () {
            n(".add-mooncake-cookie.active").length !== 0 && u();
        })) : (document.referrer.split("/")[2] === "windowsazure.cn" || document.referrer.split("/")[2] === "www.windowsazure.cn") && t();
    }
    function t() {
        n.cookie("azureMCSession", "true", { expires: 0, path: "/" });
    }
    function r() {
        n.cookie("azureMC") === null ? n.cookie("azureMC", "nevergo", { expires: 30, path: "/" }) : n.cookie("azureMC", null, { path: "/" });
    }
    function u() {
        n.cookie("azureMC", "perm", { expires: 30, path: "/" });
    }
    n(function () {
        getGeoData(function (t) {
            t && t.phone && t.phone !== "" && (n(".geo-phone-number").text(t.phone), n(".site-login .phone").show(), n(".geo-support-number").each(function () {
                n(this).html(t.phone);
            }), t.country_name && t.country_name.toLowerCase() === "australia" && n(".free-trial-au-disclaimer").show());
            i(t);
        });
    });
    n(".add-mooncake-cookie").click(function (t) {
        t.preventDefault();
        n(this).toggleClass("active");
        r();
    });
    n(".mooncakeAlert").click(function () {
        n.cookie("azureMC") !== null && n(".add-mooncake-cookie").addClass("active");
    });
}(jQuery), function (n) {
    n(function () {
        function e(t) {
            if (!i) {
                i = !0;
                var f = n(t).parents(".wa-section"), r = f.find(".slideshow-secondary"), u = n(".slideshow-control div.active").width();
                n(".slideshow-control div.active").animate({ left: -1 * u }, 500, "linear", function () {
                    n(this).removeClass("active");
                    n(this).css("left", "");
                    i = !1;
                });
                n(r).find(".active").fadeOut(250, function () {
                    n(this).removeClass("active");
                    n(r).find(t).fadeIn(250, function () {
                        n(this).addClass("active");
                    });
                });
                n(".slideshow-control div" + t).css({ display: "block", left: u });
                n(".slideshow-control div" + t).animate({ left: 0 }, 500, "linear", function () {
                    n(this).addClass("active");
                    n(this).css({ left: "", display: "" });
                });
                n(".s-ctrl .active").removeClass("active");
                n(".s-ctrl " + t).addClass("active");
            }
        }
        var r = ".bjqs", u = !1, f = !1, s, i, t;
        if (n(".home-hero-slideshow").length > 0) {
            s = function () {
                controlHtml = ['<ul class="slide-controls">'];
                for (var t = 1; t <= n(r + " li").length; t++)
                    controlHtml.push('<li><a href="#" id="sc' + t + '"><\/a><\/li>');
                controlHtml.push("<\/ul>");
                n(".home-hero-slideshow").append(controlHtml.join(""));
                n(".slide-controls a").first().addClass("active");
            }();
            function o(t) {
                if (typeof t == "undefined") {
                    var i = n(r + " li.active").next();
                    i.length !== 1 && (i = n(r + " li").first());
                    t = i.attr("class");
                }
                control = "sc" + t.replace("banner-", "");
                n(".slide-controls a.active").removeClass("active");
                n("#" + control).addClass("active");
                u = !0;
                n(r + " li.active").fadeOut(500, function () {
                    n(this).removeClass("active");
                });
                n("." + t + " .color-block").css({ left: 126, opacity: 0 });
                n("." + t).fadeIn(500, function () {
                    n(this).addClass("active");
                    n("." + t + " .color-block").animate({ left: 106, opacity: 1 }, 200, "linear", function () {
                        u = !1;
                    });
                });
            }
            n(".slide-controls a").click(function (t) {
                t.preventDefault();
                n(this).hasClass("active") || (o("banner-" + n(this).attr("id").replace("sc", "")), f = !0);
            });
            n(".home-hero-slideshow").hover(function () {
                n(this).toggleClass("hover");
            });
            setInterval(function () {
                n(".home-hero-slideshow").hasClass("hover") || u || f || o();
                f = !1;
            }, 6e3);
        }
        i = !1;
        n(".s-ctrl a").click(function (t) {
            if (t.preventDefault(), !n(this).parent().hasClass("active"))
                if (i) {
                    var r = this;
                    setTimeout(function () {
                        e("." + n(r).parent().attr("class"));
                    }, 500);
                }
                else
                    e("." + n(this).parent().attr("class"));
            n(".slideshow-chunk").addClass("stopped");
        });
        n(".slideshow-chunk").hover(function () {
            n(this).toggleClass("hover");
        });
        n(".slideshow-chunk").length !== 0 && (t = { list: [], track: 0, isActive: !1, toSet: 0, current: "", seconds: 7e3 }, n(".slideshow-chunk").data("seconds") && (t.seconds = n(".slideshow-chunk").data("seconds")), n(".s-ctrl li").each(function () {
            n(this).hasClass("active") && (t.isActive = !0, n(this).removeClass("active"));
            t.list[t.track] = n(this).attr("class");
            t.isActive && (t.isActive = !1, n(this).addClass("active"));
            t.track++;
        }), setInterval(function () {
            n(".slideshow-chunk.hover").length < 1 && n(".slideshow-chunk.stopped").length < 1 && (t.toSet = 0, t.track = 0, n(t.list).each(function () {
                t.current = "." + t.list[t.track];
                n(t.current).hasClass("active") && (t.toSet = t.track < t.list.length - 1 ? t.track + 1 : 0);
                t.track++;
            }), e("." + t.list[t.toSet]));
        }, t.seconds));
    });
}(jQuery);
/*! jQuery UI - v1.10.3 - 2013-08-07
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.datepicker.js, jquery.ui.slider.js, jquery.ui.effect.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */
(function (n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t);
    }
    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function () {
            return "hidden" === n.css(this, "visibility");
        }).length;
    }
    var u = 0, f = /^ui-id-\d+$/;
    n.ui = n.ui || {};
    n.extend(n.ui, { version: "1.10.3", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } });
    n.fn.extend({ focus: function (t) {
        return function (i, r) {
            return "number" == typeof i ? this.each(function () {
                var t = this;
                setTimeout(function () {
                    n(t).focus();
                    r && r.call(t);
                }, i);
            }) : t.apply(this, arguments);
        };
    }(n.fn.focus), scrollParent: function () {
        var t;
        return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
            return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"));
        }).eq(0) : this.parents().filter(function () {
            return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"));
        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t;
    }, zIndex: function (i) {
        if (i !== t)
            return this.css("zIndex", i);
        if (this.length)
            for (var u, f, r = n(this[0]); r.length && r[0] !== document;) {
                if (u = r.css("position"), ("absolute" === u || "relative" === u || "fixed" === u) && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && 0 !== f))
                    return f;
                r = r.parent();
            }
        return 0;
    }, uniqueId: function () {
        return this.each(function () {
            this.id || (this.id = "ui-id-" + ++u);
        });
    }, removeUniqueId: function () {
        return this.each(function () {
            f.test(this.id) && n(this).removeAttr("id");
        });
    } });
    n.extend(n.expr[":"], { data: n.expr.createPseudo ? n.expr.createPseudo(function (t) {
        return function (i) {
            return !!n.data(i, t);
        };
    }) : function (t, i, r) {
        return !!n.data(t, r[3]);
    }, focusable: function (t) {
        return i(t, !isNaN(n.attr(t, "tabindex")));
    }, tabbable: function (t) {
        var r = n.attr(t, "tabindex"), u = isNaN(r);
        return (u || r >= 0) && i(t, !u);
    } });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function (i, r) {
        function u(t, i, r, u) {
            return n.each(o, function () {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0);
            }), i;
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"], f = r.toLowerCase(), e = { innerWidth: n.fn.innerWidth, innerHeight: n.fn.innerHeight, outerWidth: n.fn.outerWidth, outerHeight: n.fn.outerHeight };
        n.fn["inner" + r] = function (i) {
            return i === t ? e["inner" + r].call(this) : this.each(function () {
                n(this).css(f, u(this, i) + "px");
            });
        };
        n.fn["outer" + r] = function (t, i) {
            return "number" != typeof t ? e["outer" + r].call(this, t) : this.each(function () {
                n(this).css(f, u(this, t, !0, i) + "px");
            });
        };
    });
    n.fn.addBack || (n.fn.addBack = function (n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n));
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function (t) {
        return function (i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this);
        };
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.support.selectstart = "onselectstart" in document.createElement("div");
    n.fn.extend({ disableSelection: function () {
        return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (n) {
            n.preventDefault();
        });
    }, enableSelection: function () {
        return this.unbind(".ui-disableSelection");
    } });
    n.extend(n.ui, { plugin: { add: function (t, i, r) {
        var u, f = n.ui[t].prototype;
        for (u in r)
            f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]]);
    }, call: function (n, t, i) {
        var r, u = n.plugins[t];
        if (u && n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType)
            for (r = 0; u.length > r; r++)
                n.options[u[r][0]] && u[r][1].apply(n.element, i);
    } }, hasScroll: function (t, i) {
        if ("hidden" === n(t).css("overflow"))
            return !1;
        var r = i && "left" === i ? "scrollLeft" : "scrollTop", u = !1;
        return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u);
    } });
})(jQuery), function (n, t) {
    var r = 0, i = Array.prototype.slice, u = n.cleanData;
    n.cleanData = function (t) {
        for (var i, r = 0; null != (i = t[r]); r++)
            try {
                n(i).triggerHandler("remove");
            }
            catch (f) {
            }
        u(t);
    };
    n.widget = function (i, r, u) {
        var h, e, f, s, c = {}, o = i.split(".")[0];
        i = i.split(".")[1];
        h = o + "-" + i;
        u || (u = r, r = n.Widget);
        n.expr[":"][h.toLowerCase()] = function (t) {
            return !!n.data(t, h);
        };
        n[o] = n[o] || {};
        e = n[o][i];
        f = n[o][i] = function (n, i) {
            return this._createWidget ? (arguments.length && this._createWidget(n, i), t) : new f(n, i);
        };
        n.extend(f, e, { version: u.version, _proto: n.extend({}, u), _childConstructors: [] });
        s = new r;
        s.options = n.widget.extend({}, s.options);
        n.each(u, function (i, u) {
            return n.isFunction(u) ? (c[i] = function () {
                var n = function () {
                    return r.prototype[i].apply(this, arguments);
                }, t = function (n) {
                    return r.prototype[i].apply(this, n);
                };
                return function () {
                    var i, r = this._super, f = this._superApply;
                    return this._super = n, this._superApply = t, i = u.apply(this, arguments), this._super = r, this._superApply = f, i;
                };
            }(), t) : (c[i] = u, t);
        });
        f.prototype = n.widget.extend(s, { widgetEventPrefix: e ? s.widgetEventPrefix : i }, c, { constructor: f, namespace: o, widgetName: i, widgetFullName: h });
        e ? (n.each(e._childConstructors, function (t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, f, i._proto);
        }), delete e._childConstructors) : r._childConstructors.push(f);
        n.widget.bridge(i, f);
    };
    n.widget.extend = function (r) {
        for (var u, f, o = i.call(arguments, 1), e = 0, s = o.length; s > e; e++)
            for (u in o[e])
                f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r;
    };
    n.widget.bridge = function (r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function (e) {
            var h = "string" == typeof e, o = i.call(arguments, 1), s = this;
            return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function () {
                var i, u = n.data(this, f);
                return u ? n.isFunction(u[e]) && "_" !== e.charAt(0) ? (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : t) : n.error("no such method '" + e + "' for " + r + " widget instance") : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'");
            }) : this.each(function () {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e, this));
            }), s;
        };
    };
    n.Widget = function () {
    };
    n.Widget._childConstructors = [];
    n.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: !1, create: null }, _createWidget: function (t, i) {
        i = n(i || this.defaultElement || this)[0];
        this.element = n(i);
        this.uuid = r++;
        this.eventNamespace = "." + this.widgetName + this.uuid;
        this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
        this.bindings = n();
        this.hoverable = n();
        this.focusable = n();
        i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function (n) {
            n.target === i && this.destroy();
        } }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
        this._create();
        this._trigger("create", null, this._getCreateEventData());
        this._init();
    }, _getCreateOptions: n.noop, _getCreateEventData: n.noop, _create: n.noop, _init: n.noop, destroy: function () {
        this._destroy();
        this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
        this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
        this.bindings.unbind(this.eventNamespace);
        this.hoverable.removeClass("ui-state-hover");
        this.focusable.removeClass("ui-state-focus");
    }, _destroy: n.noop, widget: function () {
        return this.element;
    }, option: function (i, r) {
        var u, f, e, o = i;
        if (0 === arguments.length)
            return n.widget.extend({}, this.options);
        if ("string" == typeof i)
            if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; u.length - 1 > e; e++)
                    f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                if (i = u.pop(), r === t)
                    return f[i] === t ? null : f[i];
                f[i] = r;
            }
            else {
                if (r === t)
                    return this.options[i] === t ? null : this.options[i];
                o[i] = r;
            }
        return this._setOptions(o), this;
    }, _setOptions: function (n) {
        var t;
        for (t in n)
            this._setOption(t, n[t]);
        return this;
    }, _setOption: function (n, t) {
        return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this;
    }, enable: function () {
        return this._setOption("disabled", !1);
    }, disable: function () {
        return this._setOption("disabled", !0);
    }, _on: function (i, r, u) {
        var e, f = this;
        "boolean" != typeof i && (u = r, r = i, i = !1);
        u ? (r = e = n(r), this.bindings = this.bindings.add(r)) : (u = r, r = this.element, e = this.widget());
        n.each(u, function (u, o) {
            function s() {
                return i || f.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? f[o] : o).apply(f, arguments) : t;
            }
            "string" != typeof o && (s.guid = o.guid = o.guid || s.guid || n.guid++);
            var h = u.match(/^(\w+)\s*(.*)$/), c = h[1] + f.eventNamespace, l = h[2];
            l ? e.delegate(l, c, s) : r.bind(c, s);
        });
    }, _off: function (n, t) {
        t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
        n.unbind(t).undelegate(t);
    }, _delay: function (n, t) {
        function r() {
            return ("string" == typeof n ? i[n] : n).apply(i, arguments);
        }
        var i = this;
        return setTimeout(r, t || 0);
    }, _hoverable: function (t) {
        this.hoverable = this.hoverable.add(t);
        this._on(t, { mouseenter: function (t) {
            n(t.currentTarget).addClass("ui-state-hover");
        }, mouseleave: function (t) {
            n(t.currentTarget).removeClass("ui-state-hover");
        } });
    }, _focusable: function (t) {
        this.focusable = this.focusable.add(t);
        this._on(t, { focusin: function (t) {
            n(t.currentTarget).addClass("ui-state-focus");
        }, focusout: function (t) {
            n(t.currentTarget).removeClass("ui-state-focus");
        } });
    }, _trigger: function (t, i, r) {
        var u, f, e = this.options[t];
        if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
            for (u in f)
                u in i || (i[u] = f[u]);
        return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented());
    } };
    n.each({ show: "fadeIn", hide: "fadeOut" }, function (t, i) {
        n.Widget.prototype["_" + t] = function (r, u, f) {
            "string" == typeof u && (u = { effect: u });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = { duration: u });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function (i) {
                n(this)[t]();
                f && f.call(r[0]);
                i();
            });
        };
    });
}(jQuery), function (n) {
    var t = !1;
    n(document).mouseup(function () {
        t = !1;
    });
    n.widget("ui.mouse", { version: "1.10.3", options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 }, _mouseInit: function () {
        var t = this;
        this.element.bind("mousedown." + this.widgetName, function (n) {
            return t._mouseDown(n);
        }).bind("click." + this.widgetName, function (i) {
            return !0 === n.data(i.target, t.widgetName + ".preventClickEvent") ? (n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined;
        });
        this.started = !1;
    }, _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName);
        this._mouseMoveDelegate && n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
    }, _mouseDown: function (i) {
        if (!t) {
            this._mouseStarted && this._mouseUp(i);
            this._mouseDownEvent = i;
            var r = this, u = 1 === i.which, f = "string" == typeof this.options.cancel && i.target.nodeName ? n(i.target).closest(this.options.cancel).length : !1;
            return u && !f && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                r.mouseDelayMet = !0;
            }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === n.data(i.target, this.widgetName + ".preventClickEvent") && n.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (n) {
                return r._mouseMove(n);
            }, this._mouseUpDelegate = function (n) {
                return r._mouseUp(n);
            }, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0;
        }
    }, _mouseMove: function (t) {
        return n.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted);
    }, _mouseUp: function (t) {
        return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1;
    }, _mouseDistanceMet: function (n) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance;
    }, _mouseDelayMet: function () {
        return this.mouseDelayMet;
    }, _mouseStart: function () {
    }, _mouseDrag: function () {
    }, _mouseStop: function () {
    }, _mouseCapture: function () {
        return !0;
    } });
}(jQuery), function (n, t) {
    function e(n, t, i) {
        return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)];
    }
    function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0;
    }
    function v(t) {
        var i = t[0];
        return 9 === i.nodeType ? { width: t.width(), height: t.height(), offset: { top: 0, left: 0 } } : n.isWindow(i) ? { width: t.width(), height: t.height(), offset: { top: t.scrollTop(), left: t.scrollLeft() } } : i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : { width: t.outerWidth(), height: t.outerHeight(), offset: t.offset() };
    }
    n.ui = n.ui || {};
    var f, u = Math.max, i = Math.abs, o = Math.round, s = /left|center|right/, h = /top|center|bottom/, c = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, a = /%$/, y = n.fn.position;
    n.position = { scrollbarWidth: function () {
        if (f !== t)
            return f;
        var u, r, i = n("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"), e = i.children()[0];
        return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r;
    }, getScrollInfo: function (t) {
        var i = t.isWindow ? "" : t.element.css("overflow-x"), r = t.isWindow ? "" : t.element.css("overflow-y"), u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth, f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
        return { width: f ? n.position.scrollbarWidth() : 0, height: u ? n.position.scrollbarWidth() : 0 };
    }, getWithinInfo: function (t) {
        var i = n(t || window), r = n.isWindow(i[0]);
        return { element: i, isWindow: r, offset: i.offset() || { left: 0, top: 0 }, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: r ? i.width() : i.outerWidth(), height: r ? i.height() : i.outerHeight() };
    } };
    n.fn.position = function (t) {
        if (!t || !t.of)
            return y.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, a, w, p, d, g = n(t.of), tt = n.position.getWithinInfo(t.within), it = n.position.getScrollInfo(tt), k = (t.collision || "flip").split(" "), nt = {};
        return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function () {
            var i, r, n = (t[this] || "").split(" ");
            1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = s.test(n[0]) ? n[0] : "center";
            n[1] = h.test(n[1]) ? n[1] : "center";
            i = c.exec(n[0]);
            r = c.exec(n[1]);
            nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]];
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? p.left += f : "center" === t.at[0] && (p.left += f / 2), "bottom" === t.at[1] ? p.top += a : "center" === t.at[1] && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function () {
            var y, d, h = n(this), c = h.outerWidth(), l = h.outerHeight(), rt = r(this, "marginLeft"), ut = r(this, "marginTop"), ft = c + rt + r(this, "marginRight") + it.width, et = l + ut + r(this, "marginBottom") + it.height, s = n.extend({}, p), v = e(nt.my, h.outerWidth(), h.outerHeight());
            "right" === t.my[0] ? s.left -= c : "center" === t.my[0] && (s.left -= c / 2);
            "bottom" === t.my[1] ? s.top -= l : "center" === t.my[1] && (s.top -= l / 2);
            s.left += v[0];
            s.top += v[1];
            n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
            y = { marginLeft: rt, marginTop: ut };
            n.each(["left", "top"], function (i, r) {
                n.ui.position[k[i]] && n.ui.position[k[i]][r](s, { targetWidth: f, targetHeight: a, elemWidth: c, elemHeight: l, collisionPosition: y, collisionWidth: ft, collisionHeight: et, offset: [b[0] + v[0], b[1] + v[1]], my: t.my, at: t.at, within: tt, elem: h });
            });
            t.using && (d = function (n) {
                var r = w.left - s.left, v = r + f - c, e = w.top - s.top, y = e + a - l, o = { target: { element: g, left: w.left, top: w.top, width: f, height: a }, element: { element: h, left: s.left, top: s.top, width: c, height: l }, horizontal: 0 > v ? "left" : r > 0 ? "right" : "center", vertical: 0 > y ? "top" : e > 0 ? "bottom" : "middle" };
                c > f && f > i(r + v) && (o.horizontal = "center");
                l > a && a > i(e + y) && (o.vertical = "middle");
                o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                t.using.call(this, n, o);
            });
            h.offset(n.extend(s, { using: d }));
        });
    };
    n.ui.position = { fit: { left: function (n, t) {
        var h, e = t.within, r = e.isWindow ? e.scrollLeft : e.offset.left, o = e.width, s = n.left - t.collisionPosition.marginLeft, i = r - s, f = s + t.collisionWidth - o - r;
        t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && 0 >= i ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left);
    }, top: function (n, t) {
        var h, o = t.within, r = o.isWindow ? o.scrollTop : o.offset.top, e = t.within.height, s = n.top - t.collisionPosition.marginTop, i = r - s, f = s + t.collisionHeight - e - r;
        t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && 0 >= i ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top);
    } }, flip: { left: function (n, t) {
        var o, s, r = t.within, y = r.offset.left + r.scrollLeft, c = r.width, h = r.isWindow ? r.scrollLeft : r.offset.left, l = n.left - t.collisionPosition.marginLeft, a = l - h, v = l + t.collisionWidth - c - h, u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, e = -2 * t.offset[0];
        0 > a ? (o = n.left + u + f + e + t.collisionWidth - c - y, (0 > o || i(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - t.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > i(s)) && (n.left += u + f + e));
    }, top: function (n, t) {
        var o, s, r = t.within, y = r.offset.top + r.scrollTop, a = r.height, h = r.isWindow ? r.scrollTop : r.offset.top, v = n.top - t.collisionPosition.marginTop, c = v - h, l = v + t.collisionHeight - a - h, p = "top" === t.my[1], u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, e = -2 * t.offset[1];
        0 > c ? (s = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || i(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - t.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > i(o)) && (n.top += u + f + e));
    } }, flipfit: { left: function () {
        n.ui.position.flip.left.apply(this, arguments);
        n.ui.position.fit.left.apply(this, arguments);
    }, top: function () {
        n.ui.position.flip.top.apply(this, arguments);
        n.ui.position.fit.top.apply(this, arguments);
    } } }, function () {
        var t, i, r, u, f, e = document.getElementsByTagName("body")[0], o = document.createElement("div");
        t = document.createElement(e ? "div" : "body");
        r = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" };
        e && n.extend(r, { position: "absolute", left: "-1000px", top: "-1000px" });
        for (f in r)
            t.style[f] = r[f];
        t.appendChild(o);
        i = e || document.documentElement;
        i.insertBefore(t, i.firstChild);
        o.style.cssText = "position: absolute; left: 10.7432222px;";
        u = n(o).offset().left;
        n.support.offsetFractions = u > 10 && 11 > u;
        t.innerHTML = "";
        i.removeChild(t);
    }();
}(jQuery), function (n, t) {
    function f() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" };
        this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 };
        n.extend(this._defaults, this.regional[""]);
        this.dpDiv = e(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"));
    }
    function e(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function () {
            n(this).removeClass("ui-state-hover");
            -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover");
            -1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover");
        }).delegate(i, "mouseover", function () {
            n.datepicker._isDisabledDatepicker(u.inline ? t.parent()[0] : u.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"));
        });
    }
    function r(t, i) {
        n.extend(t, i);
        for (var r in i)
            null == i[r] && (t[r] = i[r]);
        return t;
    }
    n.extend(n.ui, { datepicker: { version: "1.10.3" } });
    var u, i = "datepicker";
    n.extend(f.prototype, { markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function () {
        return this.dpDiv;
    }, setDefaults: function (n) {
        return r(this._defaults, n || {}), this;
    }, _attachDatepicker: function (t, i) {
        var r, f, u;
        r = t.nodeName.toLowerCase();
        f = "div" === r || "span" === r;
        t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
        u = this._newInst(n(t), f);
        u.settings = n.extend({}, i || {});
        "input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u);
    }, _newInst: function (t, i) {
        var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
        return { id: r, input: t, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? e(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv };
    }, _connectDatepicker: function (t, r) {
        var u = n(t);
        r.append = n([]);
        r.trigger = n([]);
        u.hasClass(this.markerClassName) || (this._attachments(u, r), u.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(r), n.data(t, i, r), r.settings.disabled && this._disableDatepicker(t));
    }, _attachments: function (t, i) {
        var u, r, f, e = this._get(i, "appendText"), o = this._get(i, "isRTL");
        i.append && i.append.remove();
        e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
        t.unbind("focus", this._showDatepicker);
        i.trigger && i.trigger.remove();
        u = this._get(i, "showOn");
        ("focus" === u || "both" === u) && t.focus(this._showDatepicker);
        ("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({ src: f, alt: r, title: r }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({ src: f, alt: r, title: r }) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function () {
            return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1;
        }));
    }, _autoSize: function (n) {
        if (this._get(n, "autoSize") && !n.inline) {
            var r, u, f, t, i = new Date(2009, 11, 20), e = this._get(n, "dateFormat");
            e.match(/[DM]/) && (r = function (n) {
                for (u = 0, f = 0, t = 0; n.length > t; t++)
                    n[t].length > u && (u = n[t].length, f = t);
                return f;
            }, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
            n.input.attr("size", this._formatDate(n, i).length);
        }
    }, _inlineDatepicker: function (t, r) {
        var u = n(t);
        u.hasClass(this.markerClassName) || (u.addClass(this.markerClassName).append(r.dpDiv), n.data(t, i, r), this._setDate(r, this._getDefaultDate(r), !0), this._updateDatepicker(r), this._updateAlternate(r), r.settings.disabled && this._disableDatepicker(t), r.dpDiv.css("display", "block"));
    }, _dialogDatepicker: function (t, u, f, e, o) {
        var h, c, l, a, v, s = this._dialogInst;
        return s || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, n.data(this._dialogInput[0], i, s)), r(s.settings, e || {}), u = u && u.constructor === Date ? this._formatDate(s, u) : u, this._dialogInput.val(u), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (c = document.documentElement.clientWidth, l = document.documentElement.clientHeight, a = document.documentElement.scrollLeft || document.body.scrollLeft, v = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + a, l / 2 - 150 + v]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = f, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], i, s), this;
    }, _destroyDatepicker: function (t) {
        var r, u = n(t), f = n.data(t, i);
        u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), n.removeData(t, i), "input" === r ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === r || "span" === r) && u.removeClass(this.markerClassName).empty());
    }, _enableDatepicker: function (t) {
        var r, u, f = n(t), e = n.data(t, i);
        f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), "input" === r ? (t.disabled = !1, e.trigger.filter("button").each(function () {
            this.disabled = !1;
        }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === r || "span" === r) && (u = f.children("." + this._inlineClass), u.children().removeClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
            return n === t ? null : n;
        }));
    }, _disableDatepicker: function (t) {
        var r, u, f = n(t), e = n.data(t, i);
        f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), "input" === r ? (t.disabled = !0, e.trigger.filter("button").each(function () {
            this.disabled = !0;
        }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === r || "span" === r) && (u = f.children("." + this._inlineClass), u.children().addClass("ui-state-disabled"), u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
            return n === t ? null : n;
        }), this._disabledInputs[this._disabledInputs.length] = t);
    }, _isDisabledDatepicker: function (n) {
        if (!n)
            return !1;
        for (var t = 0; this._disabledInputs.length > t; t++)
            if (this._disabledInputs[t] === n)
                return !0;
        return !1;
    }, _getInst: function (t) {
        try {
            return n.data(t, i);
        }
        catch (r) {
            throw "Missing instance data for this datepicker";
        }
    }, _optionDatepicker: function (i, u, f) {
        var o, c, s, h, e = this._getInst(i);
        return 2 === arguments.length && "string" == typeof u ? "defaults" === u ? n.extend({}, n.datepicker._defaults) : e ? "all" === u ? n.extend({}, e.settings) : this._get(e, u) : null : (o = u || {}, "string" == typeof u && (o = {}, o[u] = f), e && (this._curInst === e && this._hideDatepicker(), c = this._getDateDatepicker(i, !0), s = this._getMinMaxDate(e, "min"), h = this._getMinMaxDate(e, "max"), r(e.settings, o), null !== s && o.dateFormat !== t && o.minDate === t && (e.settings.minDate = this._formatDate(e, s)), null !== h && o.dateFormat !== t && o.maxDate === t && (e.settings.maxDate = this._formatDate(e, h)), "disabled" in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(n(i), e), this._autoSize(e), this._setDate(e, c), this._updateAlternate(e), this._updateDatepicker(e)), t);
    }, _changeDatepicker: function (n, t, i) {
        this._optionDatepicker(n, t, i);
    }, _refreshDatepicker: function (n) {
        var t = this._getInst(n);
        t && this._updateDatepicker(t);
    }, _setDateDatepicker: function (n, t) {
        var i = this._getInst(n);
        i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i));
    }, _getDateDatepicker: function (n, t) {
        var i = this._getInst(n);
        return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null;
    }, _doKeyDown: function (t) {
        var u, e, f, i = n.datepicker._getInst(t.target), r = !0, o = i.dpDiv.is(".ui-datepicker-rtl");
        if (i._keyEvent = !0, n.datepicker._datepickerShowing)
            switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker();
                    r = !1;
                    break;
                case 13: return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                default: r = !1;
            }
        else
            36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
        r && (t.preventDefault(), t.stopPropagation());
    }, _doKeyPress: function (i) {
        var r, u, f = n.datepicker._getInst(i.target);
        return n.datepicker._get(f, "constrainInput") ? (r = n.datepicker._possibleChars(n.datepicker._get(f, "dateFormat")), u = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > u || !r || r.indexOf(u) > -1) : t;
    }, _doKeyUp: function (t) {
        var r, i = n.datepicker._getInst(t.target);
        if (i.input.val() !== i.lastVal)
            try {
                r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
                r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i));
            }
            catch (u) {
            }
        return !0;
    }, _showDatepicker: function (t) {
        if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
            var i, o, s, u, f, e, h;
            i = n.datepicker._getInst(t);
            n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
            o = n.datepicker._get(i, "beforeShow");
            s = o ? o.apply(t, [t, i]) : {};
            s !== !1 && (r(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function () {
                return u |= "fixed" === n(this).css("position"), !u;
            }), f = { left: n.datepicker._pos[0], top: n.datepicker._pos[1] }, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, u), i.dpDiv.css({ position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute", display: "none", left: f.left + "px", top: f.top + "px" }), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.zIndex(n(t).zIndex() + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.focus(), n.datepicker._curInst = i));
        }
    }, _updateDatepicker: function (t) {
        this.maxRows = 4;
        u = t;
        t.dpDiv.empty().append(this._generateHTML(t));
        this._attachHandlers(t);
        t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
        var i, r = this._getNumberOfMonths(t), f = r[1];
        t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
        f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
        t.dpDiv[(1 !== r[0] || 1 !== r[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
        t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
        t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.focus();
        t.yearshtml && (i = t.yearshtml, setTimeout(function () {
            i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
            i = t.yearshtml = null;
        }, 0));
    }, _shouldFocusInput: function (n) {
        return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus");
    }, _checkOffset: function (t, i, r) {
        var u = t.dpDiv.outerWidth(), f = t.dpDiv.outerHeight(), h = t.input ? t.input.outerWidth() : 0, o = t.input ? t.input.outerHeight() : 0, e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()), s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
        return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i;
    }, _findPos: function (t) {
        for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));)
            t = t[u ? "previousSibling" : "nextSibling"];
        return i = n(t).offset(), [i.left, i.top];
    }, _hideDatepicker: function (t) {
        var u, e, f, o, r = this._curInst;
        !r || t && r !== n.data(t, i) || this._datepickerShowing && (u = this._get(r, "showAnim"), e = this._get(r, "duration"), f = function () {
            n.datepicker._tidyDialog(r);
        }, n.effects && (n.effects.effect[u] || n.effects[u]) ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), e, f) : r.dpDiv["slideDown" === u ? "slideUp" : "fadeIn" === u ? "fadeOut" : "hide"](u ? e : null, f), u || f(), this._datepickerShowing = !1, o = this._get(r, "onClose"), o && o.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1);
    }, _tidyDialog: function (n) {
        n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
    }, _checkExternalClick: function (t) {
        if (n.datepicker._curInst) {
            var i = n(t.target), r = n.datepicker._getInst(i[0]);
            (i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker();
        }
    }, _adjustDate: function (t, i, r) {
        var f = n(t), u = this._getInst(f[0]);
        this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u));
    }, _gotoToday: function (t) {
        var r, u = n(t), i = this._getInst(u[0]);
        this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
        this._notifyChange(i);
        this._adjustDate(u);
    }, _selectMonthYear: function (t, i, r) {
        var f = n(t), u = this._getInst(f[0]);
        u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
        this._notifyChange(u);
        this._adjustDate(f);
    }, _selectDay: function (t, i, r, u) {
        var f, e = n(t);
        n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)));
    }, _clearDate: function (t) {
        var i = n(t);
        this._selectDate(i, "");
    }, _selectDate: function (t, i) {
        var u, f = n(t), r = this._getInst(f[0]);
        i = null != i ? i : this._formatDate(r);
        r.input && r.input.val(i);
        this._updateAlternate(r);
        u = this._get(r, "onSelect");
        u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
        r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null);
    }, _updateAlternate: function (t) {
        var i, r, u, f = this._get(t, "altField");
        f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).each(function () {
            n(this).val(u);
        }));
    }, noWeekends: function (n) {
        var t = n.getDay();
        return [t > 0 && 6 > t, ""];
    }, iso8601Week: function (n) {
        var i, t = new Date(n.getTime());
        return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1;
    }, parseDate: function (i, r, u) {
        if (null == i || null == r)
            throw "Invalid arguments";
        if (r = "object" == typeof r ? "" + r : r + "", "" === r)
            return null;
        for (var v, y, f, e = 0, p = (u ? u.shortYearCutoff : null) || this._defaults.shortYearCutoff, g = "string" != typeof p ? p : (new Date).getFullYear() % 100 + parseInt(p, 10), nt = (u ? u.dayNamesShort : null) || this._defaults.dayNamesShort, tt = (u ? u.dayNames : null) || this._defaults.dayNames, it = (u ? u.monthNamesShort : null) || this._defaults.monthNamesShort, rt = (u ? u.monthNames : null) || this._defaults.monthNames, o = -1, h = -1, c = -1, w = -1, b = !1, a = function (n) {
            var t = i.length > s + 1 && i.charAt(s + 1) === n;
            return t && s++, t;
        }, l = function (n) {
            var i = a(n), u = "@" === n ? 14 : "!" === n ? 20 : "y" === n && i ? 4 : "o" === n ? 3 : 2, f = RegExp("^\\d{1," + u + "}"), t = r.substring(e).match(f);
            if (!t)
                throw "Missing number at position " + e;
            return e += t[0].length, parseInt(t[0], 10);
        }, d = function (i, u, f) {
            var o = -1, s = n.map(a(i) ? f : u, function (n, t) {
                return [[t, n]];
            }).sort(function (n, t) {
                return -(n[1].length - t[1].length);
            });
            if (n.each(s, function (n, i) {
                var u = i[1];
                return r.substr(e, u.length).toLowerCase() === u.toLowerCase() ? (o = i[0], e += u.length, !1) : t;
            }), -1 !== o)
                return o + 1;
            throw "Unknown name at position " + e;
        }, k = function () {
            if (r.charAt(e) !== i.charAt(s))
                throw "Unexpected literal at position " + e;
            e++;
        }, s = 0; i.length > s; s++)
            if (b)
                "'" !== i.charAt(s) || a("'") ? k() : b = !1;
            else
                switch (i.charAt(s)) {
                    case "d":
                        c = l("d");
                        break;
                    case "D":
                        d("D", nt, tt);
                        break;
                    case "o":
                        w = l("o");
                        break;
                    case "m":
                        h = l("m");
                        break;
                    case "M":
                        h = d("M", it, rt);
                        break;
                    case "y":
                        o = l("y");
                        break;
                    case "@":
                        f = new Date(l("@"));
                        o = f.getFullYear();
                        h = f.getMonth() + 1;
                        c = f.getDate();
                        break;
                    case "!":
                        f = new Date((l("!") - this._ticksTo1970) / 1e4);
                        o = f.getFullYear();
                        h = f.getMonth() + 1;
                        c = f.getDate();
                        break;
                    case "'":
                        a("'") ? k() : b = !0;
                        break;
                    default: k();
                }
        if (r.length > e && (y = r.substr(e), !/^\s+/.test(y)))
            throw "Extra/unparsed characters found in date: " + y;
        if (-1 === o ? o = (new Date).getFullYear() : 100 > o && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (g >= o ? 0 : -100)), w > -1)
            for (h = 1, c = w;;) {
                if (v = this._getDaysInMonth(o, h - 1), v >= c)
                    break;
                h++;
                c -= v;
            }
        if (f = this._daylightSavingAdjust(new Date(o, h - 1, c)), f.getFullYear() !== o || f.getMonth() + 1 !== h || f.getDate() !== c)
            throw "Invalid date";
        return f;
    }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function (n, t, i) {
        if (!t)
            return "";
        var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, c = (i ? i.dayNames : null) || this._defaults.dayNames, l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, a = (i ? i.monthNames : null) || this._defaults.monthNames, f = function (t) {
            var i = n.length > u + 1 && n.charAt(u + 1) === t;
            return i && u++, i;
        }, e = function (n, t, i) {
            var r = "" + t;
            if (f(n))
                for (; i > r.length;)
                    r = "0" + r;
            return r;
        }, s = function (n, t, i, r) {
            return f(n) ? r[t] : i[t];
        }, r = "", o = !1;
        if (t)
            for (u = 0; n.length > u; u++)
                if (o)
                    "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
                else
                    switch (n.charAt(u)) {
                        case "d":
                            r += e("d", t.getDate(), 2);
                            break;
                        case "D":
                            r += s("D", t.getDay(), h, c);
                            break;
                        case "o":
                            r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            r += e("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            r += s("M", t.getMonth(), l, a);
                            break;
                        case "y":
                            r += f("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            r += t.getTime();
                            break;
                        case "!":
                            r += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            f("'") ? r += "'" : o = !0;
                            break;
                        default: r += n.charAt(u);
                    }
        return r;
    }, _possibleChars: function (n) {
        for (var i = "", r = !1, u = function (i) {
            var r = n.length > t + 1 && n.charAt(t + 1) === i;
            return r && t++, r;
        }, t = 0; n.length > t; t++)
            if (r)
                "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
            else
                switch (n.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M": return null;
                    case "'":
                        u("'") ? i += "'" : r = !0;
                        break;
                    default: i += n.charAt(t);
                }
        return i;
    }, _get: function (n, i) {
        return n.settings[i] !== t ? n.settings[i] : this._defaults[i];
    }, _setDateFromField: function (n, t) {
        if (n.input.val() !== n.lastVal) {
            var f = this._get(n, "dateFormat"), r = n.lastVal = n.input ? n.input.val() : null, u = this._getDefaultDate(n), i = u, e = this._getFormatConfig(n);
            try {
                i = this.parseDate(f, r, e) || u;
            }
            catch (o) {
                r = t ? "" : r;
            }
            n.selectedDay = i.getDate();
            n.drawMonth = n.selectedMonth = i.getMonth();
            n.drawYear = n.selectedYear = i.getFullYear();
            n.currentDay = r ? i.getDate() : 0;
            n.currentMonth = r ? i.getMonth() : 0;
            n.currentYear = r ? i.getFullYear() : 0;
            this._adjustInstDate(n);
        }
    }, _getDefaultDate: function (n) {
        return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date));
    }, _determineDate: function (t, i, r) {
        var f = function (n) {
            var t = new Date;
            return t.setDate(t.getDate() + n), t;
        }, e = function (i) {
            try {
                return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t));
            }
            catch (h) {
            }
            for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                switch (u[2] || "d") {
                    case "d":
                    case "D":
                        r += parseInt(u[1], 10);
                        break;
                    case "w":
                    case "W":
                        r += 7 * parseInt(u[1], 10);
                        break;
                    case "m":
                    case "M":
                        e += parseInt(u[1], 10);
                        r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                        break;
                    case "y":
                    case "Y":
                        f += parseInt(u[1], 10);
                        r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                }
                u = s.exec(i);
            }
            return new Date(f, e, r);
        }, u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
        return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u);
    }, _daylightSavingAdjust: function (n) {
        return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null;
    }, _setDate: function (n, t, i) {
        var u = !t, f = n.selectedMonth, e = n.selectedYear, r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
        n.selectedDay = n.currentDay = r.getDate();
        n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
        n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
        f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
        this._adjustInstDate(n);
        n.input && n.input.val(u ? "" : this._formatDate(n));
    }, _getDate: function (n) {
        return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
    }, _attachHandlers: function (t) {
        var r = this._get(t, "stepMonths"), i = "#" + t.id.replace(/\\\\/g, "\\");
        t.dpDiv.find("[data-handler]").map(function () {
            var t = { prev: function () {
                n.datepicker._adjustDate(i, -r, "M");
            }, next: function () {
                n.datepicker._adjustDate(i, +r, "M");
            }, hide: function () {
                n.datepicker._hideDatepicker();
            }, today: function () {
                n.datepicker._gotoToday(i);
            }, selectDay: function () {
                return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
            }, selectMonth: function () {
                return n.datepicker._selectMonthYear(i, this, "M"), !1;
            }, selectYear: function () {
                return n.datepicker._selectMonthYear(i, this, "Y"), !1;
            } };
            n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
        });
    }, _generateHTML: function (n) {
        var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date, gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())), f = this._get(n, "isRTL"), li = this._get(n, "showButtonPanel"), hi = this._get(n, "hideIfNoPrevNext"), ni = this._get(n, "navigationAsDateFormat"), e = this._getNumberOfMonths(n), ai = this._get(n, "showCurrentAtPos"), ci = this._get(n, "stepMonths"), ti = 1 !== e[0] || 1 !== e[1], ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)), w = this._getMinMaxDate(n, "min"), v = this._getMinMaxDate(n, "max"), t = n.drawMonth - ai, r = n.drawYear;
        if (0 > t && (t += 12, r--), v)
            for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;)
                t--, 0 > t && (t = 11, r--);
        for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
            for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
                if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
                    if (u += "<div class='ui-datepicker-group", e[1] > 1)
                        switch (p) {
                            case 0:
                                u += " ui-datepicker-group-first";
                                l = " ui-corner-" + (f ? "right" : "left");
                                break;
                            case e[1] - 1:
                                u += " ui-datepicker-group-last";
                                l = " ui-corner-" + (f ? "left" : "right");
                                break;
                            default:
                                u += " ui-datepicker-group-middle";
                                l = "";
                        }
                    u += "'>";
                }
                for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++)
                    vt = (o + c) % 7, at += "<th" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
                for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
                    for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++)
                        d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
                    u += kt + "<\/tr>";
                }
                t++;
                t > 11 && (t = 0, r++);
                u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
                ct += u;
            }
            nt += ct;
        }
        return nt += ri, n._keyEvent = !1, nt;
    }, _generateMonthYearHeader: function (n, t, i, r, u, f, e, o) {
        var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"), b = this._get(n, "changeYear"), g = this._get(n, "showMonthAfterYear"), c = "<div class='ui-datepicker-title'>", l = "";
        if (f || !w)
            l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
        else {
            for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)
                (!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
            l += "<\/select>";
        }
        if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
            if (n.yearshtml = "", f || !b)
                c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
            else {
                for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function (n) {
                    var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                    return isNaN(t) ? y : t;
                }, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++)
                    n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                n.yearshtml += "<\/select>";
                c += n.yearshtml;
                n.yearshtml = null;
            }
        return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>";
    }, _adjustInstDate: function (n, t, i) {
        var u = n.drawYear + ("Y" === i ? t : 0), f = n.drawMonth + ("M" === i ? t : 0), e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0), r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
        n.selectedDay = r.getDate();
        n.drawMonth = n.selectedMonth = r.getMonth();
        n.drawYear = n.selectedYear = r.getFullYear();
        ("M" === i || "Y" === i) && this._notifyChange(n);
    }, _restrictMinMax: function (n, t) {
        var i = this._getMinMaxDate(n, "min"), r = this._getMinMaxDate(n, "max"), u = i && i > t ? i : t;
        return r && u > r ? r : u;
    }, _notifyChange: function (n) {
        var t = this._get(n, "onChangeMonthYear");
        t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n]);
    }, _getNumberOfMonths: function (n) {
        var t = this._get(n, "numberOfMonths");
        return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
    }, _getMinMaxDate: function (n, t) {
        return this._determineDate(n, this._get(n, t + "Date"), null);
    }, _getDaysInMonth: function (n, t) {
        return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate();
    }, _getFirstDayOfMonth: function (n, t) {
        return new Date(n, t, 1).getDay();
    }, _canAdjustMonth: function (n, t, i, r) {
        var f = this._getNumberOfMonths(n), u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
        return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u);
    }, _isInRange: function (n, t) {
        var i, f, e = this._getMinMaxDate(n, "min"), o = this._getMinMaxDate(n, "max"), r = null, u = null, s = this._get(n, "yearRange");
        return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear());
    }, _getFormatConfig: function (n) {
        var t = this._get(n, "shortYearCutoff");
        return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), { shortYearCutoff: t, dayNamesShort: this._get(n, "dayNamesShort"), dayNames: this._get(n, "dayNames"), monthNamesShort: this._get(n, "monthNamesShort"), monthNames: this._get(n, "monthNames") };
    }, _formatDate: function (n, t, i, r) {
        t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
        var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
        return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n));
    } });
    n.fn.datepicker = function (t) {
        if (!this.length)
            return this;
        n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
        0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t);
        }) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i));
    };
    n.datepicker = new f;
    n.datepicker.initialized = !1;
    n.datepicker.uuid = (new Date).getTime();
    n.datepicker.version = "1.10.3";
}(jQuery), function (n) {
    var t = 5;
    n.widget("ui.slider", n.ui.mouse, { version: "1.10.3", widgetEventPrefix: "slide", options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, _create: function () {
        this._keySliding = !1;
        this._mouseSliding = !1;
        this._animateOff = !0;
        this._handleIndex = null;
        this._detectOrientation();
        this._mouseInit();
        this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
        this._refresh();
        this._setOption("disabled", this.options.disabled);
        this._animateOff = !1;
    }, _refresh: function () {
        this._createRange();
        this._createHandles();
        this._setupEvents();
        this._refreshValue();
    }, _createHandles: function () {
        var r, i, u = this.options, t = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = [];
        for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; i > r; r++)
            f.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'><\/a>");
        this.handles = t.add(n(f.join("")).appendTo(this.element));
        this.handle = this.handles.eq(0);
        this.handles.each(function (t) {
            n(this).data("ui-slider-handle-index", t);
        });
    }, _createRange: function () {
        var t = this.options, i = "";
        t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = n("<div><\/div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : this.range = n([]);
    }, _setupEvents: function () {
        var n = this.handles.add(this.range).filter("a");
        this._off(n);
        this._on(n, this._handleEvents);
        this._hoverable(n);
        this._focusable(n);
    }, _destroy: function () {
        this.handles.remove();
        this.range.remove();
        this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
        this._mouseDestroy();
    }, _mouseCapture: function (t) {
        var s, f, r, i, u, h, e, c, o = this, l = this.options;
        return l.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), s = { x: t.pageX, y: t.pageY }, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) {
            var e = Math.abs(f - o.values(t));
            (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t);
        }), h = this._start(t, u), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = u, i.addClass("ui-state-active").focus(), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? { left: 0, top: 0 } : { left: t.pageX - e.left - i.width() / 2, top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0));
    }, _mouseStart: function () {
        return !0;
    }, _mouseDrag: function (n) {
        var t = { x: n.pageX, y: n.pageY }, i = this._normValueFromMouse(t);
        return this._slide(n, this._handleIndex, i), !1;
    }, _mouseStop: function (n) {
        return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
    }, _detectOrientation: function () {
        this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    }, _normValueFromMouse: function (n) {
        var i, r, t, u, f;
        return "horizontal" === this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), 0 > t && (t = 0), "vertical" === this.orientation && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f);
    }, _start: function (n, t) {
        var i = { handle: this.handles[t], value: this.value() };
        return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", n, i);
    }, _slide: function (n, t, i) {
        var r, f, u;
        this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > r || 1 === t && r > i) && (i = r), i !== this.values(t) && (f = this.values(), f[t] = i, u = this._trigger("slide", n, { handle: this.handles[t], value: i, values: f }), r = this.values(t ? 0 : 1), u !== !1 && this.values(t, i, !0))) : i !== this.value() && (u = this._trigger("slide", n, { handle: this.handles[t], value: i }), u !== !1 && this.value(i));
    }, _stop: function (n, t) {
        var i = { handle: this.handles[t], value: this.value() };
        this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
        this._trigger("stop", n, i);
    }, _change: function (n, t) {
        if (!this._keySliding && !this._mouseSliding) {
            var i = { handle: this.handles[t], value: this.value() };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values());
            this._lastChangedValue = t;
            this._trigger("change", n, i);
        }
    }, value: function (n) {
        return arguments.length ? (this.options.value = this._trimAlignValue(n), this._refreshValue(), this._change(null, 0), undefined) : this._value();
    }, values: function (t, i) {
        var u, f, r;
        if (arguments.length > 1)
            return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), undefined;
        if (!arguments.length)
            return this._values();
        if (!n.isArray(arguments[0]))
            return this.options.values && this.options.values.length ? this._values(t) : this.value();
        for (u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1)
            u[r] = this._trimAlignValue(f[r]), this._change(null, r);
        this._refreshValue();
    }, _setOption: function (t, i) {
        var r, u = 0;
        switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), n.isArray(this.options.values) && (u = this.options.values.length), n.Widget.prototype._setOption.apply(this, arguments), t) {
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = !0;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0, this._refreshValue(), r = 0; u > r; r += 1)
                    this._change(null, r);
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0;
                this._refreshValue();
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0;
                this._refresh();
                this._animateOff = !1;
        }
    }, _value: function () {
        var n = this.options.value;
        return this._trimAlignValue(n);
    }, _values: function (n) {
        var r, t, i;
        if (arguments.length)
            return r = this.options.values[n], r = this._trimAlignValue(r);
        if (this.options.values && this.options.values.length) {
            for (t = this.options.values.slice(), i = 0; t.length > i; i += 1)
                t[i] = this._trimAlignValue(t[i]);
            return t;
        }
        return [];
    }, _trimAlignValue: function (n) {
        if (this._valueMin() >= n)
            return this._valueMin();
        if (n >= this._valueMax())
            return this._valueMax();
        var t = this.options.step > 0 ? this.options.step : 1, i = (n - this._valueMin()) % t, r = n - i;
        return 2 * Math.abs(i) >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5));
    }, _valueMin: function () {
        return this.options.min;
    }, _valueMax: function () {
        return this.options.max;
    }, _refreshValue: function () {
        var s, t, c, f, h, e = this.options.range, i = this.options, r = this, u = this._animateOff ? !1 : i.animate, o = {};
        this.options.values && this.options.values.length ? this.handles.each(function (f) {
            t = 100 * ((r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()));
            o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
            n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
            r.options.range === !0 && ("horizontal" === r.orientation ? (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({ left: t + "%" }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({ width: t - s + "%" }, { queue: !1, duration: i.animate })) : (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({ bottom: t + "%" }, i.animate), 1 === f && r.range[u ? "animate" : "css"]({ height: t - s + "%" }, { queue: !1, duration: i.animate })));
            s = t;
        }) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? 100 * ((c - f) / (h - f)) : 0, o["horizontal" === this.orientation ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), "min" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({ width: t + "%" }, i.animate), "max" === e && "horizontal" === this.orientation && this.range[u ? "animate" : "css"]({ width: 100 - t + "%" }, { queue: !1, duration: i.animate }), "min" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({ height: t + "%" }, i.animate), "max" === e && "vertical" === this.orientation && this.range[u ? "animate" : "css"]({ height: 100 - t + "%" }, { queue: !1, duration: i.animate }));
    }, _handleEvents: { keydown: function (i) {
        var o, u, r, f, e = n(i.target).data("ui-slider-handle-index");
        switch (i.keyCode) {
            case n.ui.keyCode.HOME:
            case n.ui.keyCode.END:
            case n.ui.keyCode.PAGE_UP:
            case n.ui.keyCode.PAGE_DOWN:
            case n.ui.keyCode.UP:
            case n.ui.keyCode.RIGHT:
            case n.ui.keyCode.DOWN:
            case n.ui.keyCode.LEFT: if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, n(i.target).addClass("ui-state-active"), o = this._start(i, e), o === !1))
                return;
        }
        switch (f = this.options.step, u = r = this.options.values && this.options.values.length ? this.values(e) : this.value(), i.keyCode) {
            case n.ui.keyCode.HOME:
                r = this._valueMin();
                break;
            case n.ui.keyCode.END:
                r = this._valueMax();
                break;
            case n.ui.keyCode.PAGE_UP:
                r = this._trimAlignValue(u + (this._valueMax() - this._valueMin()) / t);
                break;
            case n.ui.keyCode.PAGE_DOWN:
                r = this._trimAlignValue(u - (this._valueMax() - this._valueMin()) / t);
                break;
            case n.ui.keyCode.UP:
            case n.ui.keyCode.RIGHT:
                if (u === this._valueMax())
                    return;
                r = this._trimAlignValue(u + f);
                break;
            case n.ui.keyCode.DOWN:
            case n.ui.keyCode.LEFT:
                if (u === this._valueMin())
                    return;
                r = this._trimAlignValue(u - f);
        }
        this._slide(i, e, r);
    }, click: function (n) {
        n.preventDefault();
    }, keyup: function (t) {
        var i = n(t.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), n(t.target).removeClass("ui-state-active"));
    } } });
}(jQuery), function (n, t) {
    var i = "ui-effects-";
    n.effects = { effect: {} }, function (n, t) {
        function f(n, t, i) {
            var r = h[t.type] || {};
            return null == n ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : n > r.max ? r.max : n);
        }
        function s(f) {
            var o = i(), s = o._rgba = [];
            return f = f.toLowerCase(), r(v, function (n, i) {
                var r, h = i.re.exec(f), c = h && i.parse(h), e = i.space || "rgba";
                return c ? (r = o[e](c), o[u[e].cache] = r[u[e].cache], s = o._rgba = r._rgba, !1) : t;
            }), s.length ? ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) : e[f];
        }
        function o(n, t, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? n + 6 * (t - n) * i : 1 > 2 * i ? t : 2 > 3 * i ? n + 6 * (t - n) * (2 / 3 - i) : n;
        }
        var e, a = /^([\-+])=\s*(\d+\.?\d*)/, v = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (n) {
            return [n[1], n[2], n[3], n[4]];
        } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function (n) {
            return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]];
        } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (n) {
            return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)];
        } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (n) {
            return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)];
        } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (n) {
            return [n[1], n[2] / 100, n[3] / 100, n[4]];
        } }], i = n.Color = function (t, i, r, u) {
            return new n.Color.fn.parse(t, i, r, u);
        }, u = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } }, h = { byte: { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } }, c = i.support = {}, l = n("<p>")[0], r = n.each;
        l.style.cssText = "background-color:rgba(1,1,1,.5)";
        c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
        r(u, function (n, t) {
            t.cache = "_" + n;
            t.props.alpha = { idx: 3, type: "percent", def: 1 };
        });
        i.fn = n.extend(i.prototype, { parse: function (o, h, c, l) {
            if (o === t)
                return this._rgba = [null, null, null, null], this;
            (o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
            var a = this, v = n.type(o), y = this._rgba = [];
            return h !== t && (o = [o, h, c, l], v = "array"), "string" === v ? this.parse(s(o) || e._default) : "array" === v ? (r(u.rgba.props, function (n, t) {
                y[t.idx] = f(o[t.idx], t);
            }), this) : "object" === v ? (o instanceof i ? r(u, function (n, t) {
                o[t.cache] && (a[t.cache] = o[t.cache].slice());
            }) : r(u, function (t, i) {
                var u = i.cache;
                r(i.props, function (n, t) {
                    if (!a[u] && i.to) {
                        if ("alpha" === n || null == o[n])
                            return;
                        a[u] = i.to(a._rgba);
                    }
                    a[u][t.idx] = f(o[n], t, !0);
                });
                a[u] && 0 > n.inArray(null, a[u].slice(0, 3)) && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])));
            }), this) : t;
        }, is: function (n) {
            var o = i(n), f = !0, e = this;
            return r(u, function (n, i) {
                var s, u = o[i.cache];
                return u && (s = e[i.cache] || i.to && i.to(e._rgba) || [], r(i.props, function (n, i) {
                    return null != u[i.idx] ? f = u[i.idx] === s[i.idx] : t;
                })), f;
            }), f;
        }, _space: function () {
            var n = [], t = this;
            return r(u, function (i, r) {
                t[r.cache] && n.push(i);
            }), n.pop();
        }, transition: function (n, t) {
            var e = i(n), c = e._space(), o = u[c], l = 0 === this.alpha() ? i("transparent") : this, a = l[o.cache] || o.to(l._rgba), s = a.slice();
            return e = e[o.cache], r(o.props, function (n, i) {
                var c = i.idx, r = a[c], u = e[c], o = h[i.type] || {};
                null !== u && (null === r ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)));
            }), this[c](s);
        }, blend: function (t) {
            if (1 === this._rgba[3])
                return this;
            var r = this._rgba.slice(), u = r.pop(), f = i(t)._rgba;
            return i(n.map(r, function (n, t) {
                return (1 - u) * f[t] + u * n;
            }));
        }, toRgbaString: function () {
            var i = "rgba(", t = n.map(this._rgba, function (n, t) {
                return null == n ? t > 2 ? 1 : 0 : n;
            });
            return 1 === t[3] && (t.pop(), i = "rgb("), i + t.join() + ")";
        }, toHslaString: function () {
            var i = "hsla(", t = n.map(this.hsla(), function (n, t) {
                return null == n && (n = t > 2 ? 1 : 0), t && 3 > t && (n = Math.round(100 * n) + "%"), n;
            });
            return 1 === t[3] && (t.pop(), i = "hsl("), i + t.join() + ")";
        }, toHexString: function (t) {
            var i = this._rgba.slice(), r = i.pop();
            return t && i.push(~~(255 * r)), "#" + n.map(i, function (n) {
                return n = (n || 0).toString(16), 1 === n.length ? "0" + n : n;
            }).join("");
        }, toString: function () {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
        } });
        i.fn.parse.prototype = i.fn;
        u.hsla.to = function (n) {
            if (null == n[0] || null == n[1] || null == n[2])
                return [null, null, null, n[3]];
            var s, h, i = n[0] / 255, r = n[1] / 255, f = n[2] / 255, c = n[3], u = Math.max(i, r, f), e = Math.min(i, r, f), t = u - e, o = u + e, l = .5 * o;
            return s = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, h = 0 === t ? 0 : .5 >= l ? t / o : t / (2 - o), [Math.round(s) % 360, h, l, null == c ? 1 : c];
        };
        u.hsla.from = function (n) {
            if (null == n[0] || null == n[1] || null == n[2])
                return [null, null, null, n[3]];
            var r = n[0] / 360, u = n[1], t = n[2], e = n[3], i = .5 >= t ? t * (1 + u) : t + u - t * u, f = 2 * t - i;
            return [Math.round(255 * o(f, i, r + 1 / 3)), Math.round(255 * o(f, i, r)), Math.round(255 * o(f, i, r - 1 / 3)), e];
        };
        r(u, function (u, e) {
            var s = e.props, o = e.cache, h = e.to, c = e.from;
            i.fn[u] = function (u) {
                if (h && !this[o] && (this[o] = h(this._rgba)), u === t)
                    return this[o].slice();
                var l, a = n.type(u), v = "array" === a || "object" === a ? u : arguments, e = this[o].slice();
                return r(s, function (n, t) {
                    var i = v["object" === a ? n : t.idx];
                    null == i && (i = e[t.idx]);
                    e[t.idx] = f(i, t);
                }), c ? (l = i(c(e)), l[o] = e, l) : i(e);
            };
            r(s, function (t, r) {
                i.fn[t] || (i.fn[t] = function (i) {
                    var f, e = n.type(i), h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : u, o = this[h](), s = o[r.idx];
                    return "undefined" === e ? s : ("function" === e && (i = i.call(this, s), e = n.type(i)), null == i && r.empty ? this : ("string" === e && (f = a.exec(i), f && (i = s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), o[r.idx] = i, this[h](o)));
                });
            });
        });
        i.hook = function (t) {
            var u = t.split(" ");
            r(u, function (t, r) {
                n.cssHooks[r] = { set: function (t, u) {
                    var o, f, e = "";
                    if ("transparent" !== u && ("string" !== n.type(u) || (o = s(u)))) {
                        if (u = i(o || u), !c.rgba && 1 !== u._rgba[3]) {
                            for (f = "backgroundColor" === r ? t.parentNode : t; ("" === e || "transparent" === e) && f && f.style;)
                                try {
                                    e = n.css(f, "backgroundColor");
                                    f = f.parentNode;
                                }
                                catch (h) {
                                }
                            u = u.blend(e && "transparent" !== e ? e : "_default");
                        }
                        u = u.toRgbaString();
                    }
                    try {
                        t.style[r] = u;
                    }
                    catch (h) {
                    }
                } };
                n.fx.step[r] = function (t) {
                    t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
                    n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos));
                };
            });
        };
        i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
        n.cssHooks.borderColor = { expand: function (n) {
            var t = {};
            return r(["Top", "Right", "Bottom", "Left"], function (i, r) {
                t["border" + r + "Color"] = n;
            }), t;
        } };
        e = n.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" };
    }(jQuery), function () {
        function i(t) {
            var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, f = {};
            if (i && i.length && i[0] && i[i[0]])
                for (u = i.length; u--;)
                    r = i[u], "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
            else
                for (r in i)
                    "string" == typeof i[r] && (f[r] = i[r]);
            return f;
        }
        function r(t, i) {
            var r, u, e = {};
            for (r in i)
                u = i[r], t[r] !== u && (f[r] || (n.fx.step[r] || !isNaN(parseFloat(u))) && (e[r] = u));
            return e;
        }
        var u = ["add", "remove", "toggle"], f = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
        n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, i) {
            n.fx.step[i] = function (n) {
                ("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr) || (jQuery.style(n.elem, i, n.end), n.setAttr = !0);
            };
        });
        n.fn.addBack || (n.fn.addBack = function (n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n));
        });
        n.effects.animateClass = function (t, f, e, o) {
            var s = n.speed(f, e, o);
            return this.queue(function () {
                var o, e = n(this), h = e.attr("class") || "", f = s.children ? e.find("*").addBack() : e;
                f = f.map(function () {
                    var t = n(this);
                    return { el: t, start: i(this) };
                });
                o = function () {
                    n.each(u, function (n, i) {
                        t[i] && e[i + "Class"](t[i]);
                    });
                };
                o();
                f = f.map(function () {
                    return this.end = i(this.el[0]), this.diff = r(this.start, this.end), this;
                });
                e.attr("class", h);
                f = f.map(function () {
                    var i = this, t = n.Deferred(), r = n.extend({}, s, { queue: !1, complete: function () {
                        t.resolve(i);
                    } });
                    return this.el.animate(this.diff, r), t.promise();
                });
                n.when.apply(n, f.get()).done(function () {
                    o();
                    n.each(arguments, function () {
                        var t = this.el;
                        n.each(this.diff, function (n) {
                            t.css(n, "");
                        });
                    });
                    s.complete.call(e[0]);
                });
            });
        };
        n.fn.extend({ addClass: function (t) {
            return function (i, r, u, f) {
                return r ? n.effects.animateClass.call(this, { add: i }, r, u, f) : t.apply(this, arguments);
            };
        }(n.fn.addClass), removeClass: function (t) {
            return function (i, r, u, f) {
                return arguments.length > 1 ? n.effects.animateClass.call(this, { remove: i }, r, u, f) : t.apply(this, arguments);
            };
        }(n.fn.removeClass), toggleClass: function (i) {
            return function (r, u, f, e, o) {
                return "boolean" == typeof u || u === t ? f ? n.effects.animateClass.call(this, u ? { add: r } : { remove: r }, f, e, o) : i.apply(this, arguments) : n.effects.animateClass.call(this, { toggle: r }, u, f, e);
            };
        }(n.fn.toggleClass), switchClass: function (t, i, r, u, f) {
            return n.effects.animateClass.call(this, { add: i, remove: t }, r, u, f);
        } });
    }(), function () {
        function r(t, i, r, u) {
            return n.isPlainObject(t) && (i = t, t = t.effect), t = { effect: t }, null == i && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), ("number" == typeof i || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : "number" == typeof r ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t;
        }
        function u(t) {
            return !t || "number" == typeof t || n.fx.speeds[t] ? !0 : "string" != typeof t || n.effects.effect[t] ? n.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0;
        }
        n.extend(n.effects, { version: "1.10.3", save: function (n, t) {
            for (var r = 0; t.length > r; r++)
                null !== t[r] && n.data(i + t[r], n[0].style[t[r]]);
        }, restore: function (n, r) {
            for (var f, u = 0; r.length > u; u++)
                null !== r[u] && (f = n.data(i + r[u]), f === t && (f = ""), n.css(r[u], f));
        }, setMode: function (n, t) {
            return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t;
        }, getBaseline: function (n, t) {
            var i, r;
            switch (n[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default: i = n[0] / t.height;
            }
            switch (n[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default: r = n[1] / t.width;
            }
            return { x: r, y: i };
        }, createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper"))
                return t.parent();
            var i = { width: t.outerWidth(!0), height: t.outerHeight(!0), float: t.css("float") }, u = n("<div><\/div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }), f = { width: t.width(), height: t.height() }, r = document.activeElement;
            try {
                r.id;
            }
            catch (e) {
                r = document.body;
            }
            return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).focus(), u = t.parent(), "static" === t.css("position") ? (u.css({ position: "relative" }), t.css({ position: "relative" })) : (n.extend(i, { position: t.css("position"), zIndex: t.css("z-index") }), n.each(["top", "left", "bottom", "right"], function (n, r) {
                i[r] = t.css(r);
                isNaN(parseInt(i[r], 10)) && (i[r] = "auto");
            }), t.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })), t.css(f), u.css(i).show();
        }, removeWrapper: function (t) {
            var i = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).focus()), t;
        }, setTransition: function (t, i, r, u) {
            return u = u || {}, n.each(i, function (n, i) {
                var f = t.cssUnit(i);
                f[0] > 0 && (u[i] = f[0] * r + f[1]);
            }), u;
        } });
        n.fn.extend({ effect: function () {
            function i(i) {
                function f() {
                    n.isFunction(o) && o.call(r[0]);
                    n.isFunction(i) && i();
                }
                var r = n(this), o = t.complete, u = t.mode;
                (r.is(":hidden") ? "hide" === u : "show" === u) ? (r[u](), f()) : e.call(r[0], t, f);
            }
            var t = r.apply(this, arguments), u = t.mode, f = t.queue, e = n.effects.effect[t.effect];
            return n.fx.off || !e ? u ? this[u](t.duration, t.complete) : this.each(function () {
                t.complete && t.complete.call(this);
            }) : f === !1 ? this.each(i) : this.queue(f || "fx", i);
        }, show: function (n) {
            return function (t) {
                if (u(t))
                    return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return i.mode = "show", this.effect.call(this, i);
            };
        }(n.fn.show), hide: function (n) {
            return function (t) {
                if (u(t))
                    return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return i.mode = "hide", this.effect.call(this, i);
            };
        }(n.fn.hide), toggle: function (n) {
            return function (t) {
                if (u(t) || "boolean" == typeof t)
                    return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return i.mode = "toggle", this.effect.call(this, i);
            };
        }(n.fn.toggle), cssUnit: function (t) {
            var i = this.css(t), r = [];
            return n.each(["em", "px", "%", "pt"], function (n, t) {
                i.indexOf(t) > 0 && (r = [parseFloat(i), t]);
            }), r;
        } });
    }(), function () {
        var t = {};
        n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (n, i) {
            t[i] = function (t) {
                return Math.pow(t, n + 2);
            };
        });
        n.extend(t, { Sine: function (n) {
            return 1 - Math.cos(n * Math.PI / 2);
        }, Circ: function (n) {
            return 1 - Math.sqrt(1 - n * n);
        }, Elastic: function (n) {
            return 0 === n || 1 === n ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin((80 * (n - 1) - 7.5) * Math.PI / 15);
        }, Back: function (n) {
            return n * n * (3 * n - 2);
        }, Bounce: function (n) {
            for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > n;)
                ;
            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - n, 2);
        } });
        n.each(t, function (t, i) {
            n.easing["easeIn" + t] = i;
            n.easing["easeOut" + t] = function (n) {
                return 1 - i(1 - n);
            };
            n.easing["easeInOut" + t] = function (n) {
                return .5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2;
            };
        });
    }();
}(jQuery);
$(function () {
    "use strict";
    window.location.hash && ($("[data-control='tabs']").each(function () {
        $(this).trigger("tab.tabs", window.location.hash.substring(1));
    }), $(".wa-tabs").filter(":not([data-control='tabs'])").each(function () {
        $(this).find("[data-slug='" + window.location.hash.substring(1) + "']").trigger("click");
    }));
});
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function (n) {
    n.extend(n.fn, { validate: function (t) {
        if (!this.length) {
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
            return;
        }
        var i = n.data(this[0], "validator");
        return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (t) {
            i.settings.submitHandler && (i.submitButton = t.target);
            n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
            n(t.target).attr("formnovalidate") !== undefined && (i.cancelSubmit = !0);
        }), this.submit(function (t) {
            function r() {
                var r;
                return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && r.remove(), !1) : !0;
            }
            return (i.settings.debug && t.preventDefault(), i.cancelSubmit) ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1);
        })), i);
    }, valid: function () {
        if (n(this[0]).is("form"))
            return this.validate().form();
        var t = !0, i = n(this[0].form).validate();
        return this.each(function () {
            t = t && i.element(this);
        }), t;
    }, removeAttrs: function (t) {
        var i = {}, r = this;
        return n.each(t.split(/\s/), function (n, t) {
            i[t] = r.attr(t);
            r.removeAttr(t);
        }), i;
    }, rules: function (t, i) {
        var r = this[0], o, u, h;
        if (t) {
            var e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r);
            switch (t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i));
                    delete f.messages;
                    s[r.name] = f;
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove": return i ? (o = {}, n.each(i.split(/\s/), function (n, t) {
                    o[t] = f[t];
                    delete f[t];
                }), o) : (delete s[r.name], f);
            }
        }
        return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (h = u.required, delete u.required, u = n.extend({ required: h }, u)), u;
    } });
    n.extend(n.expr[":"], { blank: function (t) {
        return !n.trim("" + n(t).val());
    }, filled: function (t) {
        return !!n.trim("" + n(t).val());
    }, unchecked: function (t) {
        return !n(t).prop("checked");
    } });
    n.validator = function (t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init();
    };
    n.validator.format = function (t, i) {
        return arguments.length === 1 ? function () {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i);
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function (n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function () {
                return i;
            });
        }), t);
    };
    n.extend(n.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "label", focusInvalid: !0, errorContainer: n([]), errorLabelContainer: n([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function (n) {
        this.lastActive = n;
        this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(n)).hide());
    }, onfocusout: function (n) {
        !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n);
    }, onkeyup: function (n, t) {
        (t.which !== 9 || this.elementValue(n) !== "") && (n.name in this.submitted || n === this.lastElement) && this.element(n);
    }, onclick: function (n) {
        n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode);
    }, highlight: function (t, i, r) {
        t.type === "radio" ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r);
    }, unhighlight: function (t, i, r) {
        t.type === "radio" ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r);
    } }, setDefaults: function (t) {
        n.extend(n.validator.defaults, t);
    }, messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: n.validator.format("Please enter no more than {0} characters."), minlength: n.validator.format("Please enter at least {0} characters."), rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."), range: n.validator.format("Please enter a value between {0} and {1}."), max: n.validator.format("Please enter a value less than or equal to {0}."), min: n.validator.format("Please enter a value greater than or equal to {0}.") }, autoCreateRanges: !1, prototype: { init: function () {
        function r(t) {
            var i = n.data(this[0].form, "validator"), r = "on" + t.type.replace(/^validate/, "");
            i.settings[r] && i.settings[r].call(i, this[0], t);
        }
        var i, t;
        this.labelContainer = n(this.settings.errorLabelContainer);
        this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
        this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
        this.submitted = {};
        this.valueCache = {};
        this.pendingRequest = 0;
        this.pending = {};
        this.invalid = {};
        this.reset();
        i = this.groups = {};
        n.each(this.settings.groups, function (t, r) {
            typeof r == "string" && (r = r.split(/\s/));
            n.each(r, function (n, r) {
                i[r] = t;
            });
        });
        t = this.settings.rules;
        n.each(t, function (i, r) {
            t[i] = n.validator.normalizeRule(r);
        });
        n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", r).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", r);
        this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
    }, form: function () {
        return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid();
    }, checkForm: function () {
        this.prepareForm();
        for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++)
            this.check(t[n]);
        return this.valid();
    }, element: function (t) {
        t = this.validationTargetFor(this.clean(t));
        this.lastElement = t;
        this.prepareElement(t);
        this.currentElements = n(t);
        var i = this.check(t) !== !1;
        return i ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i;
    }, showErrors: function (t) {
        if (t) {
            n.extend(this.errorMap, t);
            this.errorList = [];
            for (var i in t)
                this.errorList.push({ message: t[i], element: this.findByName(i)[0] });
            this.successList = n.grep(this.successList, function (n) {
                return !(n.name in t);
            });
        }
        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
    }, resetForm: function () {
        n.fn.resetForm && n(this.currentForm).resetForm();
        this.submitted = {};
        this.lastElement = null;
        this.prepareForm();
        this.hideErrors();
        this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
    }, numberOfInvalids: function () {
        return this.objectLength(this.invalid);
    }, objectLength: function (n) {
        var t = 0, i;
        for (i in n)
            t++;
        return t;
    }, hideErrors: function () {
        this.addWrapper(this.toHide).hide();
    }, valid: function () {
        return this.size() === 0;
    }, size: function () {
        return this.errorList.length;
    }, focusInvalid: function () {
        if (this.settings.focusInvalid)
            try {
                n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
            }
            catch (t) {
            }
    }, findLastActive: function () {
        var t = this.lastActive;
        return t && n.grep(this.errorList, function (n) {
            return n.element.name === t.name;
        }).length === 1 && t;
    }, elements: function () {
        var t = this, i = {};
        return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
            return (!this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules())) ? !1 : (i[this.name] = !0, !0);
        });
    }, clean: function (t) {
        return n(t)[0];
    }, errors: function () {
        var t = this.settings.errorClass.replace(" ", ".");
        return n(this.settings.errorElement + "." + t, this.errorContext);
    }, reset: function () {
        this.successList = [];
        this.errorList = [];
        this.errorMap = {};
        this.toShow = n([]);
        this.toHide = n([]);
        this.currentElements = n([]);
    }, prepareForm: function () {
        this.reset();
        this.toHide = this.errors().add(this.containers);
    }, prepareElement: function (n) {
        this.reset();
        this.toHide = this.errorsFor(n);
    }, elementValue: function (t) {
        var r = n(t).attr("type"), i = n(t).val();
        return r === "radio" || r === "checkbox" ? n("input[name='" + n(t).attr("name") + "']:checked").val() : typeof i == "string" ? i.replace(/\r/g, "") : i;
    }, check: function (t) {
        var r, u;
        t = this.validationTargetFor(this.clean(t));
        var f = n(t).rules(), e = !1, s = this.elementValue(t), i;
        for (r in f) {
            u = { method: r, parameters: f[r] };
            try {
                if (i = n.validator.methods[r].call(this, s, t, u.parameters), i === "dependency-mismatch") {
                    e = !0;
                    continue;
                }
                if (e = !1, i === "pending") {
                    this.toHide = this.toHide.not(this.errorsFor(t));
                    return;
                }
                if (!i)
                    return this.formatAndAdd(t, u), !1;
            }
            catch (o) {
                this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", o);
                throw o;
            }
        }
        if (!e)
            return this.objectLength(f) && this.successList.push(t), !0;
    }, customDataMessage: function (t, i) {
        return n(t).data("msg-" + i.toLowerCase()) || t.attributes && n(t).attr("data-msg-" + i.toLowerCase());
    }, customMessage: function (n, t) {
        var i = this.settings.messages[n];
        return i && (i.constructor === String ? i : i[t]);
    }, findDefined: function () {
        for (var n = 0; n < arguments.length; n++)
            if (arguments[n] !== undefined)
                return arguments[n];
        return undefined;
    }, defaultMessage: function (t, i) {
        return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || undefined, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>");
    }, formatAndAdd: function (t, i) {
        var r = this.defaultMessage(t, i.method), u = /\$?\{(\d+)\}/g;
        typeof r == "function" ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
        this.errorList.push({ message: r, element: t });
        this.errorMap[t.name] = r;
        this.submitted[t.name] = r;
    }, addWrapper: function (n) {
        return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n;
    }, defaultShowErrors: function () {
        for (var i, t, n = 0; this.errorList[n]; n++)
            t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
            for (n = 0; this.successList[n]; n++)
                this.showLabel(this.successList[n]);
        if (this.settings.unhighlight)
            for (n = 0, i = this.validElements(); i[n]; n++)
                this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
        this.toHide = this.toHide.not(this.toShow);
        this.hideErrors();
        this.addWrapper(this.toShow).show();
    }, validElements: function () {
        return this.currentElements.not(this.invalidElements());
    }, invalidElements: function () {
        return n(this.errorList).map(function () {
            return this.element;
        });
    }, showLabel: function (t, i) {
        var r = this.errorsFor(t);
        r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t)));
        !i && this.settings.success && (r.text(""), typeof this.settings.success == "string" ? r.addClass(this.settings.success) : this.settings.success(r, t));
        this.toShow = this.toShow.add(r);
    }, errorsFor: function (t) {
        var i = this.idOrName(t);
        return this.errors().filter(function () {
            return n(this).attr("for") === i;
        });
    }, idOrName: function (n) {
        return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name);
    }, validationTargetFor: function (n) {
        return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n;
    }, checkable: function (n) {
        return /radio|checkbox/i.test(n.type);
    }, findByName: function (t) {
        return n(this.currentForm).find("[name='" + t + "']");
    }, getLength: function (t, i) {
        switch (i.nodeName.toLowerCase()) {
            case "select": return n("option:selected", i).length;
            case "input": if (this.checkable(i))
                return this.findByName(i.name).filter(":checked").length;
        }
        return t.length;
    }, depend: function (n, t) {
        return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0;
    }, dependTypes: { boolean: function (n) {
        return n;
    }, string: function (t, i) {
        return !!n(t, i.form).length;
    }, "function": function (n, t) {
        return n(t);
    } }, optional: function (t) {
        var i = this.elementValue(t);
        return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch";
    }, startRequest: function (n) {
        this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0);
    }, stopRequest: function (t, i) {
        this.pendingRequest--;
        this.pendingRequest < 0 && (this.pendingRequest = 0);
        delete this.pending[t.name];
        i && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && this.pendingRequest === 0 && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1);
    }, previousValue: function (t) {
        return n.data(t, "previousValue") || n.data(t, "previousValue", { old: null, valid: !0, message: this.defaultMessage(t, "remote") });
    } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function (t, i) {
        t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t);
    }, classRules: function (t) {
        var i = {}, r = n(t).attr("class");
        return r && n.each(r.split(" "), function () {
            this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this]);
        }), i;
    }, attributeRules: function (t) {
        var u = {}, e = n(t), f = e[0].getAttribute("type"), r, i;
        for (r in n.validator.methods)
            r === "required" ? (i = e.get(0).getAttribute(r), i === "" && (i = !0), i = !!i) : i = e.attr(r), /min|max/.test(r) && (f === null || /number|range|text/.test(f)) && (i = Number(i)), i ? u[r] = i : f === r && f !== "range" && (u[r] = !0);
        return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u;
    }, dataRules: function (t) {
        var i, r, u = {}, f = n(t);
        for (i in n.validator.methods)
            r = f.data("rule-" + i.toLowerCase()), r !== undefined && (u[i] = r);
        return u;
    }, staticRules: function (t) {
        var i = {}, r = n.data(t.form, "validator");
        return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i;
    }, normalizeRules: function (t, i) {
        return n.each(t, function (r, u) {
            if (u === !1) {
                delete t[r];
                return;
            }
            if (u.param || u.depends) {
                var f = !0;
                switch (typeof u.depends) {
                    case "string":
                        f = !!n(u.depends, i.form).length;
                        break;
                    case "function": f = u.depends.call(i, i);
                }
                f ? t[r] = u.param !== undefined ? u.param : !0 : delete t[r];
            }
        }), n.each(t, function (r, u) {
            t[r] = n.isFunction(u) ? u(i) : u;
        }), n.each(["minlength", "maxlength"], function () {
            t[this] && (t[this] = Number(t[this]));
        }), n.each(["rangelength", "range"], function () {
            var i;
            t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : typeof t[this] == "string" && (i = t[this].split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]));
        }), n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t;
    }, normalizeRule: function (t) {
        if (typeof t == "string") {
            var i = {};
            n.each(t.split(/\s/), function () {
                i[this] = !0;
            });
            t = i;
        }
        return t;
    }, addMethod: function (t, i, r) {
        n.validator.methods[t] = i;
        n.validator.messages[t] = r !== undefined ? r : n.validator.messages[t];
        i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t));
    }, methods: { required: function (t, i, r) {
        if (!this.depend(r, i))
            return "dependency-mismatch";
        if (i.nodeName.toLowerCase() === "select") {
            var u = n(i).val();
            return u && u.length > 0;
        }
        return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0;
    }, email: function (n, t) {
        return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n);
    }, url: function (n, t) {
        return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n);
    }, date: function (n, t) {
        return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString());
    }, dateISO: function (n, t) {
        return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n);
    }, number: function (n, t) {
        return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n);
    }, digits: function (n, t) {
        return this.optional(t) || /^\d+$/.test(n);
    }, creditcard: function (n, t) {
        var r, e;
        if (this.optional(t))
            return "dependency-mismatch";
        if (/[^0-9 \-]+/.test(n))
            return !1;
        var f = 0, i = 0, u = !1;
        for (n = n.replace(/\D/g, ""), r = n.length - 1; r >= 0; r--)
            e = n.charAt(r), i = parseInt(e, 10), u && (i *= 2) > 9 && (i -= 9), f += i, u = !u;
        return f % 10 == 0;
    }, minlength: function (t, i, r) {
        var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
        return this.optional(i) || u >= r;
    }, maxlength: function (t, i, r) {
        var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
        return this.optional(i) || u <= r;
    }, rangelength: function (t, i, r) {
        var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
        return this.optional(i) || u >= r[0] && u <= r[1];
    }, min: function (n, t, i) {
        return this.optional(t) || n >= i;
    }, max: function (n, t, i) {
        return this.optional(t) || n <= i;
    }, range: function (n, t, i) {
        return this.optional(t) || n >= i[0] && n <= i[1];
    }, equalTo: function (t, i, r) {
        var u = n(r);
        return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
            n(i).valid();
        }), t === u.val();
    }, remote: function (t, i, r) {
        var f, u, e;
        return this.optional(i) ? "dependency-mismatch" : (f = this.previousValue(i), this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = typeof r == "string" && { url: r } || r, f.old === t) ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, { url: r, mode: "abort", port: "validate" + i.name, dataType: "json", data: e, success: function (r) {
            var e, h, s, o;
            u.settings.messages[i.name].remote = f.originalMessage;
            e = r === !0 || r === "true";
            e ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (s = {}, o = r || u.defaultMessage(i, "remote"), s[i.name] = f.message = n.isFunction(o) ? o(t) : o, u.invalid[i.name] = !0, u.showErrors(s));
            f.valid = e;
            u.stopRequest(i, e);
        } }, r)), "pending");
    } } });
    n.format = n.validator.format;
})(jQuery), function (n) {
    var t = {}, i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function (n, i, r) {
        var u = n.port;
        n.mode === "abort" && (t[u] && t[u].abort(), t[u] = r);
    }) : (i = n.ajax, n.ajax = function (r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode, u = ("port" in r ? r : n.ajaxSettings).port;
        return f === "abort" ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments);
    });
}(jQuery), function (n) {
    n.extend(n.fn, { validateDelegate: function (t, i, r) {
        return this.bind(i, function (i) {
            var u = n(i.target);
            if (u.is(t))
                return r.apply(u, arguments);
        });
    } });
}(jQuery);
/*!
** Unobtrusive validation support library for jQuery and jQuery Validate
** Copyright (C) Microsoft Corporation. All rights reserved.
*/
(function (n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message);
    }
    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
    }
    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
    }
    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1);
    }
    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n;
    }
    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"), u = r.attr("data-valmsg-replace"), e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide();
    }
    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"), r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function () {
            n("<li />").html(this.message).appendTo(r);
        }));
    }
    function a(t) {
        var i = t.data("unobtrusiveContainer"), r = i.attr("data-valmsg-replace"), u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty());
    }
    function v() {
        var t = n(this);
        t.data("validator").resetForm();
        t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
        t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer");
    }
    function s(t) {
        var i = n(t), f = i.data(u), s = n.proxy(v, t), e = r.unobtrusive.options || {}, o = function (i, r) {
            var u = e[i];
            u && n.isFunction(u) && u.apply(t, r);
        };
        return f || (f = { options: { errorClass: e.errorClass || "input-validation-error", errorElement: e.errorElement || "span", errorPlacement: function () {
            c.apply(t, arguments);
            o("errorPlacement", arguments);
        }, invalidHandler: function () {
            l.apply(t, arguments);
            o("invalidHandler", arguments);
        }, messages: {}, rules: {}, success: function () {
            a.apply(t, arguments);
            o("success", arguments);
        } }, attachValidation: function () {
            i.off("reset." + u, s).on("reset." + u, s).validate(this.options);
        }, validate: function () {
            return i.validate(), i.valid();
        } }, i.data(u, f)), f;
    }
    var r = n.validator, t, u = "unobtrusiveValidation";
    r.unobtrusive = { adapters: [], parseElement: function (t, i) {
        var u = n(t), f = u.parents("form")[0], r, e, o;
        f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function () {
            var i = "data-val-" + this.name, r = u.attr(i), s = {};
            r !== undefined && (i += "-", n.each(this.params, function () {
                s[this] = u.attr(i + this);
            }), this.adapt({ element: t, form: f, message: r, params: s, rules: e, messages: o }));
        }), n.extend(e, { __dummy__: !0 }), i || r.attachValidation());
    }, parse: function (t) {
        var i = n(t), u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
        i.find("[data-val=true]").each(function () {
            r.unobtrusive.parseElement(this, !0);
        });
        u.each(function () {
            var n = s(this);
            n && n.attachValidation();
        });
    } };
    t = r.unobtrusive.adapters;
    t.add = function (n, t, i) {
        return i || (i = t, t = []), this.push({ name: n, params: t, adapt: i }), this;
    };
    t.addBool = function (n, t) {
        return this.add(n, function (r) {
            i(r, t || n, !0);
        });
    };
    t.addMinMax = function (n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function (n) {
            var f = n.params.min, e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e);
        });
    };
    t.addSingleVal = function (n, t, r) {
        return this.add(n, [t || "val"], function (u) {
            i(u, r || n, u.params[t]);
        });
    };
    r.addMethod("__dummy__", function () {
        return !0;
    });
    r.addMethod("regex", function (n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length);
    });
    r.addMethod("nonalphamin", function (n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r;
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function (t) {
        var r = e(t.element.name), u = t.params.other, s = o(u, r), h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h);
    });
    t.add("required", function (n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0);
    });
    t.add("remote", ["url", "type", "additionalfields"], function (t) {
        var r = { url: t.params.url, type: t.params.type || "GET", data: {} }, u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function (i, e) {
            var s = o(e, u);
            r.data[s] = function () {
                return n(t.form).find(":input").filter("[name='" + f(s) + "']").val();
            };
        });
        i(t, "remote", r);
    });
    t.add("password", ["min", "nonalphamin", "regex"], function (n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex);
    });
    n(function () {
        r.unobtrusive.parse(document);
    });
})(jQuery);
/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2009-2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.2.0
 */
!function (n, t) {
    "use strict";
    var v, l, ut, u = n, s = u.document, w = u.navigator, tt = u.setTimeout, si = u.clearTimeout, hi = u.setInterval, ci = u.clearInterval, yt = u.getComputedStyle, ft = u.encodeURIComponent, pt = u.ActiveXObject, li = u.Error, ai = u.Number.parseInt || u.parseInt, d = u.Number.parseFloat || u.parseFloat, vi = u.Number.isNaN || u.isNaN, wt = u.Date.now, bt = u.Object.keys, yi = u.Object.defineProperty, h = u.Object.prototype.hasOwnProperty, pi = u.Array.prototype.slice, wi = function () {
        var i = function (n) {
            return n;
        }, n, t;
        if ("function" == typeof u.wrap && "function" == typeof u.unwrap)
            try {
                n = s.createElement("div");
                t = u.unwrap(n);
                1 === n.nodeType && t && 1 === t.nodeType && (i = u.unwrap);
            }
            catch (r) {
            }
        return i;
    }(), e = function (n) {
        return pi.call(n, 0);
    }, o = function () {
        for (var r, n, c, u, o = e(arguments), f = o[0] || {}, i = 1, s = o.length; s > i; i++)
            if (null != (r = o[i]))
                for (n in r)
                    h.call(r, n) && (c = f[n], u = r[n], f !== u && u !== t && (f[n] = u));
        return f;
    }, b = function (n) {
        var t, i, u, r;
        if ("object" != typeof n || null == n || "number" == typeof n.nodeType)
            t = n;
        else if ("number" == typeof n.length)
            for (t = [], i = 0, u = n.length; u > i; i++)
                h.call(n, i) && (t[i] = b(n[i]));
        else {
            t = {};
            for (r in n)
                h.call(n, r) && (t[r] = b(n[r]));
        }
        return t;
    }, bi = function (n, t) {
        for (var r = {}, i = 0, u = t.length; u > i; i++)
            t[i] in n && (r[t[i]] = n[t[i]]);
        return r;
    }, ki = function (n, t) {
        var r = {}, i;
        for (i in n)
            -1 === t.indexOf(i) && (r[i] = n[i]);
        return r;
    }, di = function (n) {
        if (n)
            for (var t in n)
                h.call(n, t) && delete n[t];
        return n;
    }, kt = function (n, t) {
        if (n && 1 === n.nodeType && n.ownerDocument && t && (1 === t.nodeType && t.ownerDocument && t.ownerDocument === n.ownerDocument || 9 === t.nodeType && !t.ownerDocument && t === n.ownerDocument))
            do {
                if (n === t)
                    return !0;
                n = n.parentNode;
            } while (n);
        return !1;
    }, dt = function (n) {
        var t;
        return "string" == typeof n && n && (t = n.split("#")[0].split("?")[0], t = n.slice(0, n.lastIndexOf("/") + 1)), t;
    }, gi = function (n) {
        var i, t;
        return "string" == typeof n && n && (t = n.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), t && t[1] ? i = t[1] : (t = n.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), t && t[1] && (i = t[1]))), i;
    }, nr = function () {
        var t, n;
        try {
            throw new li;
        }
        catch (i) {
            n = i;
        }
        return n && (t = n.sourceURL || n.fileName || gi(n.stack)), t;
    }, tr = function () {
        var i, n, r;
        if (s.currentScript && (i = s.currentScript.src))
            return i;
        if (n = s.getElementsByTagName("script"), 1 === n.length)
            return n[0].src || t;
        if ("readyState" in n[0])
            for (r = n.length; r--;)
                if ("interactive" === n[r].readyState && (i = n[r].src))
                    return i;
        return "loading" === s.readyState && (i = n[n.length - 1].src) ? i : (i = nr()) ? i : t;
    }, ir = function () {
        for (var n, i, u = s.getElementsByTagName("script"), r = u.length; r--;) {
            if (!(i = u[r].src)) {
                n = null;
                break;
            }
            if (i = dt(i), null == n)
                n = i;
            else if (n !== i) {
                n = null;
                break;
            }
        }
        return n || t;
    }, rr = function () {
        var n = dt(tr()) || ir() || "";
        return n + "ZeroClipboard.swf";
    }, gt = function () {
        return null == n.opener && (!!n.top && n != n.top || !!n.parent && n != n.parent);
    }(), r = { bridge: null, version: "0.0.0", pluginType: "unknown", disabled: null, outdated: null, sandboxed: null, unavailable: null, degraded: null, deactivated: null, overdue: null, ready: null }, ni = "11.0.0", y = {}, a = {}, et = null, ot = 0, st = 0, ur = { ready: "Flash communication is established", error: { "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.", "flash-outdated": "Flash is too outdated to support ZeroClipboard", "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible", "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript", "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript", "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.", "flash-overdue": "Flash communication was established but NOT within the acceptable time limit", "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number", "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard", "config-mismatch": "ZeroClipboard configuration does not match Flash's reality", "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity" } }, fr = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"], p = ["flash-disabled", "flash-outdated", "flash-sandboxed", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"], er = new RegExp("^flash-(" + p.map(function (n) {
        return n.replace(/^flash-/, "");
    }).join("|") + ")$"), or = new RegExp("^flash-(" + p.slice(1).map(function (n) {
        return n.replace(/^flash-/, "");
    }).join("|") + ")$"), f = { swfPath: rr(), trustedDomains: n.location.host ? [n.location.host] : [], cacheBust: !0, forceEnhancedClipboard: !1, flashLoadTimeout: 3e4, autoActivate: !0, bubbleEvents: !0, containerId: "global-zeroclipboard-html-bridge", containerClass: "global-zeroclipboard-container", swfObjectId: "global-zeroclipboard-flash-bridge", hoverClass: "zeroclipboard-is-hover", activeClass: "zeroclipboard-is-active", forceHandCursor: !1, title: null, zIndex: 999999999 }, sr = function (n) {
        if ("object" == typeof n && null !== n)
            for (var t in n)
                if (h.call(n, t))
                    if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(t))
                        f[t] = n[t];
                    else if (null == r.bridge)
                        if ("containerId" === t || "swfObjectId" === t) {
                            if (!iu(n[t]))
                                throw new Error("The specified `" + t + "` value is not valid as an HTML4 Element ID");
                            f[t] = n[t];
                        }
                        else
                            f[t] = n[t];
        return "string" != typeof n || !n ? b(f) : h.call(f, n) ? f[n] : void 0;
    }, hr = function () {
        return at(), { browser: bi(w, ["userAgent", "platform", "appName"]), flash: ki(r, ["bridge"]), zeroclipboard: { version: i.version, config: i.config() } };
    }, cr = function () {
        return !!(r.disabled || r.outdated || r.sandboxed || r.unavailable || r.degraded || r.deactivated);
    }, lr = function (n, u) {
        var f, o, e, s = {};
        if ("string" == typeof n && n)
            e = n.toLowerCase().split(/\s+/);
        else if ("object" == typeof n && n && "undefined" == typeof u)
            for (f in n)
                h.call(n, f) && "string" == typeof f && f && "function" == typeof n[f] && i.on(f, n[f]);
        if (e && e.length) {
            for (f = 0, o = e.length; o > f; f++)
                n = e[f].replace(/^on/, ""), s[n] = !0, y[n] || (y[n] = []), y[n].push(u);
            if (s.ready && r.ready && i.emit({ type: "ready" }), s.error) {
                for (f = 0, o = p.length; o > f; f++)
                    if (r[p[f].replace(/^flash-/, "")] === !0) {
                        i.emit({ type: "error", name: p[f] });
                        break;
                    }
                v !== t && i.version !== v && i.emit({ type: "error", name: "version-mismatch", jsVersion: i.version, swfVersion: v });
            }
        }
        return i;
    }, ar = function (n, t) {
        var r, o, e, f, u;
        if (0 === arguments.length)
            f = bt(y);
        else if ("string" == typeof n && n)
            f = n.split(/\s+/);
        else if ("object" == typeof n && n && "undefined" == typeof t)
            for (r in n)
                h.call(n, r) && "string" == typeof r && r && "function" == typeof n[r] && i.off(r, n[r]);
        if (f && f.length)
            for (r = 0, o = f.length; o > r; r++)
                if (n = f[r].toLowerCase().replace(/^on/, ""), u = y[n], u && u.length)
                    if (t)
                        for (e = u.indexOf(t); -1 !== e;)
                            u.splice(e, 1), e = u.indexOf(t, e);
                    else
                        u.length = 0;
        return i;
    }, vr = function (n) {
        return "string" == typeof n && n ? b(y[n]) || null : b(y);
    }, yr = function (n) {
        var u, f, t;
        return n = ti(n), n && !ou(n) ? "ready" === n.type && r.overdue === !0 ? i.emit({ type: "error", name: "flash-overdue" }) : (u = o({}, n), fu.call(this, u), "copy" === n.type && (t = vu(a), f = t.data, et = t.formatMap), f) : void 0;
    }, pr = function () {
        var t = r.sandboxed, n;
        (at(), "boolean" != typeof r.ready && (r.ready = !1), r.sandboxed !== t && r.sandboxed === !0) ? (r.ready = !1, i.emit({ type: "error", name: "flash-sandboxed" })) : i.isFlashUnusable() || null !== r.bridge || (n = f.flashLoadTimeout, "number" == typeof n && n >= 0 && (ot = tt(function () {
            "boolean" != typeof r.deactivated && (r.deactivated = !0);
            r.deactivated === !0 && i.emit({ type: "error", name: "flash-deactivated" });
        }, n)), r.overdue = !1, lu());
    }, wr = function () {
        i.clearData();
        i.blur();
        i.emit("destroy");
        au();
        i.off();
    }, br = function (n, t) {
        var r, u;
        if ("object" == typeof n && n && "undefined" == typeof t)
            r = n, i.clearData();
        else {
            if ("string" != typeof n || !n)
                return;
            r = {};
            r[n] = t;
        }
        for (u in r)
            "string" == typeof u && u && h.call(r, u) && "string" == typeof r[u] && r[u] && (a[u] = r[u]);
    }, kr = function (n) {
        "undefined" == typeof n ? (di(a), et = null) : "string" == typeof n && h.call(a, n) && delete a[n];
    }, dr = function (n) {
        return "undefined" == typeof n ? b(a) : "string" == typeof n && h.call(a, n) ? a[n] : void 0;
    }, gr = function (n) {
        var t, i, u;
        n && 1 === n.nodeType && (l && (nt(l, f.activeClass), l !== n && nt(l, f.hoverClass)), l = n, ui(n, f.hoverClass), t = n.getAttribute("title") || f.title, "string" == typeof t && t && (i = g(r.bridge), i && i.setAttribute("title", t)), u = f.forceHandCursor === !0 || "pointer" === fi(n, "cursor"), nf(u), gu());
    }, nu = function () {
        var n = g(r.bridge);
        n && (n.removeAttribute("title"), n.style.left = "0px", n.style.top = "-9999px", n.style.width = "1px", n.style.height = "1px");
        l && (nt(l, f.hoverClass), nt(l, f.activeClass), l = null);
    }, tu = function () {
        return l || null;
    }, iu = function (n) {
        return "string" == typeof n && n && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(n);
    }, ti = function (n) {
        var t, u;
        if ("string" == typeof n && n ? (t = n, n = {}) : "object" == typeof n && n && "string" == typeof n.type && n.type && (t = n.type), t)
            return t = t.toLowerCase(), !n.target && (/^(copy|aftercopy|_click)$/.test(t) || "error" === t && "clipboard-error" === n.name) && (n.target = ut), o(n, { type: t, target: n.target || l || null, relatedTarget: n.relatedTarget || null, currentTarget: r && r.bridge || null, timeStamp: n.timeStamp || wt() || null }), u = ur[n.type], "error" === n.type && n.name && u && (u = u[n.name]), u && (n.message = u), "ready" === n.type && o(n, { target: null, version: r.version }), "error" === n.type && (er.test(n.name) && o(n, { target: null, minimumVersion: ni }), or.test(n.name) && o(n, { version: r.version })), "copy" === n.type && (n.clipboardData = { setData: i.setData, clearData: i.clearData }), "aftercopy" === n.type && (n = yu(n, et)), n.target && !n.relatedTarget && (n.relatedTarget = ru(n.target)), uu(n);
    }, ru = function (n) {
        var t = n && n.getAttribute && n.getAttribute("data-clipboard-target");
        return t ? s.getElementById(t) : null;
    }, uu = function (n) {
        if (n && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(n.type)) {
            var f = n.target, l = "_mouseover" === n.type && n.relatedTarget ? n.relatedTarget : t, a = "_mouseout" === n.type && n.relatedTarget ? n.relatedTarget : t, e = ct(f), v = u.screenLeft || u.screenX || 0, y = u.screenTop || u.screenY || 0, p = s.body.scrollLeft + s.documentElement.scrollLeft, w = s.body.scrollTop + s.documentElement.scrollTop, h = e.left + ("number" == typeof n._stageX ? n._stageX : 0), c = e.top + ("number" == typeof n._stageY ? n._stageY : 0), i = h - p, r = c - w, b = v + i, k = y + r, d = "number" == typeof n.movementX ? n.movementX : 0, g = "number" == typeof n.movementY ? n.movementY : 0;
            delete n._stageX;
            delete n._stageY;
            o(n, { srcElement: f, fromElement: l, toElement: a, screenX: b, screenY: k, pageX: h, pageY: c, clientX: i, clientY: r, x: i, y: r, movementX: d, movementY: g, offsetX: 0, offsetY: 0, layerX: 0, layerY: 0 });
        }
        return n;
    }, ii = function (n) {
        var t = n && "string" == typeof n.type && n.type || "";
        return !/^(?:(?:before)?copy|destroy)$/.test(t);
    }, ri = function (n, t, i, r) {
        r ? tt(function () {
            n.apply(t, i);
        }, 0) : n.apply(t, i);
    }, fu = function (n) {
        var r, e, t, f, s, h;
        if ("object" == typeof n && n && n.type) {
            var c = ii(n), l = y["*"] || [], a = y[n.type] || [], i = l.concat(a);
            if (i && i.length)
                for (h = this, r = 0, e = i.length; e > r; r++)
                    t = i[r], f = h, "string" == typeof t && "function" == typeof u[t] && (t = u[t]), "object" == typeof t && t && "function" == typeof t.handleEvent && (f = t, t = t.handleEvent), "function" == typeof t && (s = o({}, n), ri(t, f, [s], c));
            return this;
        }
    }, eu = function (n) {
        var t = null;
        return (gt === !1 || n && "error" === n.type && n.name && -1 !== fr.indexOf(n.name)) && (t = !1), t;
    }, ou = function (n) {
        var t = n.target || l || null, e = "swf" === n._source, h, c, s, y, u;
        switch (delete n._source, n.type) {
            case "error":
                h = "flash-sandboxed" === n.name || eu(n);
                "boolean" == typeof h && (r.sandboxed = h);
                -1 !== p.indexOf(n.name) ? o(r, { disabled: "flash-disabled" === n.name, outdated: "flash-outdated" === n.name, unavailable: "flash-unavailable" === n.name, degraded: "flash-degraded" === n.name, deactivated: "flash-deactivated" === n.name, overdue: "flash-overdue" === n.name, ready: !1 }) : "version-mismatch" === n.name && (v = n.swfVersion, o(r, { disabled: !1, outdated: !1, unavailable: !1, degraded: !1, deactivated: !1, overdue: !1, ready: !1 }));
                it();
                break;
            case "ready":
                v = n.swfVersion;
                c = r.deactivated === !0;
                o(r, { disabled: !1, outdated: !1, sandboxed: !1, unavailable: !1, degraded: !1, deactivated: !1, overdue: c, ready: !c });
                it();
                break;
            case "beforecopy":
                ut = t;
                break;
            case "copy":
                u = n.relatedTarget;
                !a["text/html"] && !a["text/plain"] && u && (y = u.value || u.outerHTML || u.innerHTML) && (s = u.value || u.textContent || u.innerText) ? (n.clipboardData.clearData(), n.clipboardData.setData("text/plain", s), y !== s && n.clipboardData.setData("text/html", y)) : !a["text/plain"] && n.target && (s = n.target.getAttribute("data-clipboard-text")) && (n.clipboardData.clearData(), n.clipboardData.setData("text/plain", s));
                break;
            case "aftercopy":
                su(n);
                i.clearData();
                t && t !== ku() && t.focus && t.focus();
                break;
            case "_mouseover":
                i.focus(t);
                f.bubbleEvents === !0 && e && (t && t !== n.relatedTarget && !kt(n.relatedTarget, t) && k(o({}, n, { type: "mouseenter", bubbles: !1, cancelable: !1 })), k(o({}, n, { type: "mouseover" })));
                break;
            case "_mouseout":
                i.blur();
                f.bubbleEvents === !0 && e && (t && t !== n.relatedTarget && !kt(n.relatedTarget, t) && k(o({}, n, { type: "mouseleave", bubbles: !1, cancelable: !1 })), k(o({}, n, { type: "mouseout" })));
                break;
            case "_mousedown":
                ui(t, f.activeClass);
                f.bubbleEvents === !0 && e && k(o({}, n, { type: n.type.slice(1) }));
                break;
            case "_mouseup":
                nt(t, f.activeClass);
                f.bubbleEvents === !0 && e && k(o({}, n, { type: n.type.slice(1) }));
                break;
            case "_click":
                ut = null;
                f.bubbleEvents === !0 && e && k(o({}, n, { type: n.type.slice(1) }));
                break;
            case "_mousemove": f.bubbleEvents === !0 && e && k(o({}, n, { type: n.type.slice(1) }));
        }
        if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(n.type))
            return !0;
    }, su = function (n) {
        if (n.errors && n.errors.length > 0) {
            var t = b(n);
            o(t, { type: "error", name: "clipboard-error" });
            delete t.success;
            tt(function () {
                i.emit(t);
            }, 0);
        }
    }, k = function (n) {
        if (n && "string" == typeof n.type && n) {
            var i, r = n.target || null, f = r && r.ownerDocument || s, e = { view: f.defaultView || u, canBubble: !0, cancelable: !0, detail: "click" === n.type ? 1 : 0, button: "number" == typeof n.which ? n.which - 1 : "number" == typeof n.button ? n.button : f.createEvent ? 0 : 1 }, t = o(e, n);
            r && f.createEvent && r.dispatchEvent && (t = [t.type, t.canBubble, t.cancelable, t.view, t.detail, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget], i = f.createEvent("MouseEvents"), i.initMouseEvent && (i.initMouseEvent.apply(i, t), i._source = "js", r.dispatchEvent(i)));
        }
    }, hu = function () {
        var n = f.flashLoadTimeout, t, u;
        "number" == typeof n && n >= 0 && (t = Math.min(1e3, n / 10), u = f.swfObjectId + "_fallbackContent", st = hi(function () {
            var n = s.getElementById(u);
            du(n) && (it(), r.deactivated = null, i.emit({ type: "error", name: "swf-not-found" }));
        }, t));
    }, cu = function () {
        var n = s.createElement("div");
        return n.id = f.containerId, n.className = f.containerClass, n.style.position = "absolute", n.style.left = "0px", n.style.top = "-9999px", n.style.width = "1px", n.style.height = "1px", n.style.zIndex = "" + lt(f.zIndex), n;
    }, g = function (n) {
        for (var t = n && n.parentNode; t && "OBJECT" === t.nodeName && t.parentNode;)
            t = t.parentNode;
        return t || null;
    }, lu = function () {
        var l, n = r.bridge, t = g(n), h, e, c;
        if (!n) {
            var a = bu(u.location.host, f), y = "never" === a ? "none" : "all", p = wu(o({ jsVersion: i.version }, f)), v = f.swfPath + pu(f.swfPath, f);
            t = cu();
            h = s.createElement("div");
            t.appendChild(h);
            s.body.appendChild(t);
            e = s.createElement("div");
            c = "activex" === r.pluginType;
            e.innerHTML = '<object id="' + f.swfObjectId + '" name="' + f.swfObjectId + '" width="100%" height="100%" ' + (c ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + v + '"') + ">" + (c ? '<param name="movie" value="' + v + '"/>' : "") + '<param name="allowScriptAccess" value="' + a + '"/><param name="allowNetworking" value="' + y + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + p + '"/><div id="' + f.swfObjectId + '_fallbackContent">&nbsp;<\/div><\/object>';
            n = e.firstChild;
            e = null;
            wi(n).ZeroClipboard = i;
            t.replaceChild(n, h);
            hu();
        }
        return n || (n = s[f.swfObjectId], n && (l = n.length) && (n = n[l - 1]), !n && t && (n = t.firstChild)), r.bridge = n || null, n;
    }, au = function () {
        var n = r.bridge, i;
        n && (i = g(n), i && ("activex" === r.pluginType && "readyState" in n ? (n.style.display = "none", function u() {
            if (4 === n.readyState) {
                for (var t in n)
                    "function" == typeof n[t] && (n[t] = null);
                n.parentNode && n.parentNode.removeChild(n);
                i.parentNode && i.parentNode.removeChild(i);
            }
            else
                tt(u, 10);
        }()) : (n.parentNode && n.parentNode.removeChild(n), i.parentNode && i.parentNode.removeChild(i))), it(), r.ready = null, r.bridge = null, r.deactivated = null, v = t);
    }, vu = function (n) {
        var i = {}, r = {}, t;
        if ("object" == typeof n && n) {
            for (t in n)
                if (t && h.call(n, t) && "string" == typeof n[t] && n[t])
                    switch (t.toLowerCase()) {
                        case "text/plain":
                        case "text":
                        case "air:text":
                        case "flash:text":
                            i.text = n[t];
                            r.text = t;
                            break;
                        case "text/html":
                        case "html":
                        case "air:html":
                        case "flash:html":
                            i.html = n[t];
                            r.html = t;
                            break;
                        case "application/rtf":
                        case "text/rtf":
                        case "rtf":
                        case "richtext":
                        case "air:rtf":
                        case "flash:rtf":
                            i.rtf = n[t];
                            r.rtf = t;
                    }
            return { data: i, formatMap: r };
        }
    }, yu = function (n, t) {
        var r, i, f, o, e, u;
        if ("object" != typeof n || !n || "object" != typeof t || !t)
            return n;
        r = {};
        for (i in n)
            if (h.call(n, i))
                if ("errors" === i)
                    for (r[i] = n[i] ? n[i].slice() : [], f = 0, o = r[i].length; o > f; f++)
                        r[i][f].format = t[r[i][f].format];
                else if ("success" !== i && "data" !== i)
                    r[i] = n[i];
                else {
                    r[i] = {};
                    e = n[i];
                    for (u in e)
                        u && h.call(e, u) && h.call(t, u) && (r[i][t[u]] = e[u]);
                }
        return r;
    }, pu = function (n, t) {
        var i = null == t || t && t.cacheBust === !0;
        return i ? (-1 === n.indexOf("?") ? "?" : "&") + "noCache=" + wt() : "";
    }, wu = function (n) {
        var r, o, f, t, i = "", e = [];
        if (n.trustedDomains && ("string" == typeof n.trustedDomains ? t = [n.trustedDomains] : "object" == typeof n.trustedDomains && "length" in n.trustedDomains && (t = n.trustedDomains)), t && t.length)
            for (r = 0, o = t.length; o > r; r++)
                if (h.call(t, r) && t[r] && "string" == typeof t[r]) {
                    if (f = ht(t[r]), !f)
                        continue;
                    if ("*" === f) {
                        e.length = 0;
                        e.push(f);
                        break;
                    }
                    e.push.apply(e, [f, "//" + f, u.location.protocol + "//" + f]);
                }
        return e.length && (i += "trustedOrigins=" + ft(e.join(","))), n.forceEnhancedClipboard === !0 && (i += (i ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof n.swfObjectId && n.swfObjectId && (i += (i ? "&" : "") + "swfObjectId=" + ft(n.swfObjectId)), "string" == typeof n.jsVersion && n.jsVersion && (i += (i ? "&" : "") + "jsVersion=" + ft(n.jsVersion)), i;
    }, ht = function (n) {
        var t, i;
        return null == n || "" === n ? null : (n = n.replace(/^\s+|\s+$/g, ""), "" === n) ? null : (t = n.indexOf("//"), n = -1 === t ? n : n.slice(t + 2), i = n.indexOf("/"), n = -1 === i ? n : -1 === t || 0 === i ? null : n.slice(0, i), n && ".swf" === n.slice(-4).toLowerCase() ? null : n || null);
    }, bu = function () {
        var n = function (n) {
            var i, u, r, t = [];
            if ("string" == typeof n && (n = [n]), "object" != typeof n || !n || "number" != typeof n.length)
                return t;
            for (i = 0, u = n.length; u > i; i++)
                if (h.call(n, i) && (r = ht(n[i]))) {
                    if ("*" === r) {
                        t.length = 0;
                        t.push("*");
                        break;
                    }
                    -1 === t.indexOf(r) && t.push(r);
                }
            return t;
        };
        return function (t, i) {
            var f = ht(i.swfPath), r, u;
            if (null === f && (f = t), r = n(i.trustedDomains), u = r.length, u > 0) {
                if (1 === u && "*" === r[0])
                    return "always";
                if (-1 !== r.indexOf(t))
                    return 1 === u && t === f ? "sameDomain" : "always";
            }
            return "never";
        };
    }(), ku = function () {
        try {
            return s.activeElement;
        }
        catch (n) {
            return null;
        }
    }, ui = function (n, t) {
        var i, u, f, r = [];
        if ("string" == typeof t && t && (r = t.split(/\s+/)), n && 1 === n.nodeType && r.length > 0)
            if (n.classList)
                for (i = 0, u = r.length; u > i; i++)
                    n.classList.add(r[i]);
            else if (n.hasOwnProperty("className")) {
                for (f = " " + n.className + " ", i = 0, u = r.length; u > i; i++)
                    -1 === f.indexOf(" " + r[i] + " ") && (f += r[i] + " ");
                n.className = f.replace(/^\s+|\s+$/g, "");
            }
        return n;
    }, nt = function (n, t) {
        var i, u, f, r = [];
        if ("string" == typeof t && t && (r = t.split(/\s+/)), n && 1 === n.nodeType && r.length > 0)
            if (n.classList && n.classList.length > 0)
                for (i = 0, u = r.length; u > i; i++)
                    n.classList.remove(r[i]);
            else if (n.className) {
                for (f = (" " + n.className + " ").replace(/[\r\n\t]/g, " "), i = 0, u = r.length; u > i; i++)
                    f = f.replace(" " + r[i] + " ", " ");
                n.className = f.replace(/^\s+|\s+$/g, "");
            }
        return n;
    }, fi = function (n, t) {
        var i = yt(n, null).getPropertyValue(t);
        return "cursor" !== t || i && "auto" !== i || "A" !== n.nodeName ? i : "pointer";
    }, ct = function (n) {
        var i = { left: 0, top: 0, width: 0, height: 0 }, r, f;
        if (n.getBoundingClientRect) {
            var t = n.getBoundingClientRect(), h = u.pageXOffset, c = u.pageYOffset, l = s.documentElement.clientLeft || 0, a = s.documentElement.clientTop || 0, e = 0, o = 0;
            "relative" === fi(s.body, "position") && (r = s.body.getBoundingClientRect(), f = s.documentElement.getBoundingClientRect(), e = r.left - f.left || 0, o = r.top - f.top || 0);
            i.left = t.left + h - l - e;
            i.top = t.top + c - a - o;
            i.width = "width" in t ? t.width : t.right - t.left;
            i.height = "height" in t ? t.height : t.bottom - t.top;
        }
        return i;
    }, du = function (n) {
        if (!n)
            return !1;
        var t = yt(n, null), r = d(t.height) > 0, u = d(t.width) > 0, f = d(t.top) >= 0, e = d(t.left) >= 0, o = r && u && f && e, i = o ? null : ct(n);
        return "none" !== t.display && "collapse" !== t.visibility && (o || !!i && (r || i.height > 0) && (u || i.width > 0) && (f || i.top >= 0) && (e || i.left >= 0));
    }, it = function () {
        si(ot);
        ot = 0;
        ci(st);
        st = 0;
    }, gu = function () {
        var t, n;
        l && (t = g(r.bridge)) && (n = ct(l), o(t.style, { width: n.width + "px", height: n.height + "px", top: n.top + "px", left: n.left + "px", zIndex: "" + lt(f.zIndex) }));
    }, nf = function (n) {
        r.ready === !0 && (r.bridge && "function" == typeof r.bridge.setHandCursor ? r.bridge.setHandCursor(n) : r.ready = !1);
    }, lt = function (n) {
        if (/^(?:auto|inherit)$/.test(n))
            return n;
        var t;
        return "number" != typeof n || vi(n) ? "string" == typeof n && (t = lt(ai(n, 10))) : t = n, "number" == typeof t ? t : "auto";
    }, at = function (t) {
        var e, u, f, s = r.sandboxed, i = null;
        if (t = t === !0, gt === !1)
            i = !1;
        else {
            try {
                u = n.frameElement || null;
            }
            catch (o) {
                f = { name: o.name, message: o.message };
            }
            if (u && 1 === u.nodeType && "IFRAME" === u.nodeName)
                try {
                    i = u.hasAttribute("sandbox");
                }
                catch (o) {
                    i = null;
                }
            else {
                try {
                    e = document.domain || null;
                }
                catch (o) {
                    e = null;
                }
                (null === e || f && "SecurityError" === f.name && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(f.message.toLowerCase())) && (i = !0);
            }
        }
        return r.sandboxed = i, s === i || t || ei(pt), i;
    }, ei = function (n) {
        function f(n) {
            var t = n.match(/[\d]+/g);
            return t.length = 3, t.join(".");
        }
        function l(n) {
            return !!n && (n = n.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(n) || "chrome.plugin" === n.slice(-13));
        }
        function h(n) {
            n && (i = !0, n.version && (t = f(n.version)), !t && n.description && (t = f(n.description)), n.filename && (c = l(n.filename)));
        }
        var e, u, o, i = !1, s = !1, c = !1, t = "";
        if (w.plugins && w.plugins.length)
            e = w.plugins["Shockwave Flash"], h(e), w.plugins["Shockwave Flash 2.0"] && (i = !0, t = "2.0.0.11");
        else if (w.mimeTypes && w.mimeTypes.length)
            o = w.mimeTypes["application/x-shockwave-flash"], e = o && o.enabledPlugin, h(e);
        else if ("undefined" != typeof n) {
            s = !0;
            try {
                u = new n("ShockwaveFlash.ShockwaveFlash.7");
                i = !0;
                t = f(u.GetVariable("$version"));
            }
            catch (a) {
                try {
                    u = new n("ShockwaveFlash.ShockwaveFlash.6");
                    i = !0;
                    t = "6.0.21";
                }
                catch (v) {
                    try {
                        u = new n("ShockwaveFlash.ShockwaveFlash");
                        i = !0;
                        t = f(u.GetVariable("$version"));
                    }
                    catch (y) {
                        s = !1;
                    }
                }
            }
        }
        r.disabled = i !== !0;
        r.outdated = t && d(t) < d(ni);
        r.version = t || "0.0.0";
        r.pluginType = c ? "pepper" : s ? "activex" : i ? "netscape" : "unknown";
    }, i;
    ei(pt);
    at(!0);
    i = function () {
        return this instanceof i ? void ("function" == typeof i._createClient && i._createClient.apply(this, e(arguments))) : new i;
    };
    yi(i, "version", { value: "2.2.0", writable: !1, configurable: !0, enumerable: !0 });
    i.config = function () {
        return sr.apply(this, e(arguments));
    };
    i.state = function () {
        return hr.apply(this, e(arguments));
    };
    i.isFlashUnusable = function () {
        return cr.apply(this, e(arguments));
    };
    i.on = function () {
        return lr.apply(this, e(arguments));
    };
    i.off = function () {
        return ar.apply(this, e(arguments));
    };
    i.handlers = function () {
        return vr.apply(this, e(arguments));
    };
    i.emit = function () {
        return yr.apply(this, e(arguments));
    };
    i.create = function () {
        return pr.apply(this, e(arguments));
    };
    i.destroy = function () {
        return wr.apply(this, e(arguments));
    };
    i.setData = function () {
        return br.apply(this, e(arguments));
    };
    i.clearData = function () {
        return kr.apply(this, e(arguments));
    };
    i.getData = function () {
        return dr.apply(this, e(arguments));
    };
    i.focus = i.activate = function () {
        return gr.apply(this, e(arguments));
    };
    i.blur = i.deactivate = function () {
        return nu.apply(this, e(arguments));
    };
    i.activeElement = function () {
        return tu.apply(this, e(arguments));
    };
    var tf = 0, c = {}, rf = 0, rt = {}, vt = {};
    o(f, { autoActivate: !0 });
    var uf = function (n) {
        var t = this;
        t.id = "" + tf++;
        c[t.id] = { instance: t, elements: [], handlers: {} };
        n && t.clip(n);
        i.on("*", function (n) {
            return t.emit(n);
        });
        i.on("destroy", function () {
            t.destroy();
        });
        i.create();
    }, ff = function (n, u) {
        var f, o, e, s = {}, l = c[this.id], a = l && l.handlers;
        if (!l)
            throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
        if ("string" == typeof n && n)
            e = n.toLowerCase().split(/\s+/);
        else if ("object" == typeof n && n && "undefined" == typeof u)
            for (f in n)
                h.call(n, f) && "string" == typeof f && f && "function" == typeof n[f] && this.on(f, n[f]);
        if (e && e.length) {
            for (f = 0, o = e.length; o > f; f++)
                n = e[f].replace(/^on/, ""), s[n] = !0, a[n] || (a[n] = []), a[n].push(u);
            if (s.ready && r.ready && this.emit({ type: "ready", client: this }), s.error) {
                for (f = 0, o = p.length; o > f; f++)
                    if (r[p[f].replace(/^flash-/, "")]) {
                        this.emit({ type: "error", name: p[f], client: this });
                        break;
                    }
                v !== t && i.version !== v && this.emit({ type: "error", name: "version-mismatch", jsVersion: i.version, swfVersion: v });
            }
        }
        return this;
    }, ef = function (n, t) {
        var i, o, f, u, r, s = c[this.id], e = s && s.handlers;
        if (!e)
            return this;
        if (0 === arguments.length)
            u = bt(e);
        else if ("string" == typeof n && n)
            u = n.split(/\s+/);
        else if ("object" == typeof n && n && "undefined" == typeof t)
            for (i in n)
                h.call(n, i) && "string" == typeof i && i && "function" == typeof n[i] && this.off(i, n[i]);
        if (u && u.length)
            for (i = 0, o = u.length; o > i; i++)
                if (n = u[i].toLowerCase().replace(/^on/, ""), r = e[n], r && r.length)
                    if (t)
                        for (f = r.indexOf(t); -1 !== f;)
                            r.splice(f, 1), f = r.indexOf(t, f);
                    else
                        r.length = 0;
        return this;
    }, of = function (n) {
        var i = null, t = c[this.id] && c[this.id].handlers;
        return t && (i = "string" == typeof n && n ? t[n] ? t[n].slice(0) : [] : b(t)), i;
    }, sf = function (n) {
        if (vf.call(this, n)) {
            "object" == typeof n && n && "string" == typeof n.type && n.type && (n = o({}, n));
            var t = o({}, ti(n), { client: this });
            yf.call(this, t);
        }
        return this;
    }, hf = function (n) {
        var t, i;
        if (!c[this.id])
            throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
        for (n = oi(n), t = 0; t < n.length; t++)
            h.call(n, t) && n[t] && 1 === n[t].nodeType && (n[t].zcClippingId ? -1 === rt[n[t].zcClippingId].indexOf(this.id) && rt[n[t].zcClippingId].push(this.id) : (n[t].zcClippingId = "zcClippingId_" + rf++, rt[n[t].zcClippingId] = [this.id], f.autoActivate === !0 && pf(n[t])), i = c[this.id] && c[this.id].elements, -1 === i.indexOf(n[t]) && i.push(n[t]));
        return this;
    }, cf = function (n) {
        var e = c[this.id], i, u, t, r;
        if (!e)
            return this;
        for (u = e.elements, n = "undefined" == typeof n ? u.slice(0) : oi(n), t = n.length; t--;)
            if (h.call(n, t) && n[t] && 1 === n[t].nodeType) {
                for (i = 0; -1 !== (i = u.indexOf(n[t], i));)
                    u.splice(i, 1);
                if (r = rt[n[t].zcClippingId], r) {
                    for (i = 0; -1 !== (i = r.indexOf(this.id, i));)
                        r.splice(i, 1);
                    0 === r.length && (f.autoActivate === !0 && wf(n[t]), delete n[t].zcClippingId);
                }
            }
        return this;
    }, lf = function () {
        var n = c[this.id];
        return n && n.elements ? n.elements.slice(0) : [];
    }, af = function () {
        c[this.id] && (this.unclip(), this.off(), delete c[this.id]);
    }, vf = function (n) {
        if (!n || !n.type || n.client && n.client !== this)
            return !1;
        var i = c[this.id], t = i && i.elements, r = !!t && t.length > 0, u = !n.target || r && -1 !== t.indexOf(n.target), f = n.relatedTarget && r && -1 !== t.indexOf(n.relatedTarget), e = n.client && n.client === this;
        return i && (u || f || e) ? !0 : !1;
    }, yf = function (n) {
        var i = c[this.id], f, s, t, e, h, l;
        if ("object" == typeof n && n && n.type && i) {
            var a = ii(n), v = i && i.handlers["*"] || [], y = i && i.handlers[n.type] || [], r = v.concat(y);
            if (r && r.length)
                for (l = this, f = 0, s = r.length; s > f; f++)
                    t = r[f], e = l, "string" == typeof t && "function" == typeof u[t] && (t = u[t]), "object" == typeof t && t && "function" == typeof t.handleEvent && (e = t, t = t.handleEvent), "function" == typeof t && (h = o({}, n), ri(t, e, [h], a));
        }
    }, oi = function (n) {
        return "string" == typeof n && (n = []), "number" != typeof n.length ? [n] : n;
    }, pf = function (n) {
        if (n && 1 === n.nodeType) {
            var t = function (n) {
                (n || (n = u.event)) && ("js" !== n._source && (n.stopImmediatePropagation(), n.preventDefault()), delete n._source);
            }, r = function (r) {
                (r || (r = u.event)) && (t(r), i.focus(n));
            };
            n.addEventListener("mouseover", r, !1);
            n.addEventListener("mouseout", t, !1);
            n.addEventListener("mouseenter", t, !1);
            n.addEventListener("mouseleave", t, !1);
            n.addEventListener("mousemove", t, !1);
            vt[n.zcClippingId] = { mouseover: r, mouseout: t, mouseenter: t, mouseleave: t, mousemove: t };
        }
    }, wf = function (n) {
        var t;
        if (n && 1 === n.nodeType && (t = vt[n.zcClippingId], "object" == typeof t && t)) {
            for (var i, r, f = ["move", "leave", "enter", "out", "over"], u = 0, e = f.length; e > u; u++)
                i = "mouse" + f[u], r = t[i], "function" == typeof r && n.removeEventListener(i, r, !1);
            delete vt[n.zcClippingId];
        }
    };
    i._createClient = function () {
        uf.apply(this, e(arguments));
    };
    i.prototype.on = function () {
        return ff.apply(this, e(arguments));
    };
    i.prototype.off = function () {
        return ef.apply(this, e(arguments));
    };
    i.prototype.handlers = function () {
        return of.apply(this, e(arguments));
    };
    i.prototype.emit = function () {
        return sf.apply(this, e(arguments));
    };
    i.prototype.clip = function () {
        return hf.apply(this, e(arguments));
    };
    i.prototype.unclip = function () {
        return cf.apply(this, e(arguments));
    };
    i.prototype.elements = function () {
        return lf.apply(this, e(arguments));
    };
    i.prototype.destroy = function () {
        return af.apply(this, e(arguments));
    };
    i.prototype.setText = function (n) {
        if (!c[this.id])
            throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.setData("text/plain", n), this;
    };
    i.prototype.setHtml = function (n) {
        if (!c[this.id])
            throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.setData("text/html", n), this;
    };
    i.prototype.setRichText = function (n) {
        if (!c[this.id])
            throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.setData("application/rtf", n), this;
    };
    i.prototype.setData = function () {
        if (!c[this.id])
            throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.setData.apply(this, e(arguments)), this;
    };
    i.prototype.clearData = function () {
        if (!c[this.id])
            throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.clearData.apply(this, e(arguments)), this;
    };
    i.prototype.getData = function () {
        if (!c[this.id])
            throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
        return i.getData.apply(this, e(arguments));
    };
    "function" == typeof define && define.amd ? define(function () {
        return i;
    }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = i : n.ZeroClipboard = i;
}(function () {
    return this || window;
}()), function (n, t) {
    "use strict";
    t.Pages = {};
}(jQuery, Acom), function (n) {
    "use strict";
    Acom.Pages.BlogPosts = function () {
        function c() {
            var r = l({ page: t }), n;
            i && (i.html("").append(h.clone()), n = e(), Acom.Util.Render.BlogPostsItemsResults(t, n.action, n.slug, a, f), Core.Util.SoftLoadQueryStringPairs(r));
        }
        function l(n) {
            var r = {}, i, t;
            for (i in n)
                n.hasOwnProperty(i) && (t = n[i], t === "default" && (t = null), i === "page" && t === 1 && (t = null), r[i] = t);
            return r;
        }
        function a(n) {
            n && n.length > 0 ? (i.html(n), s()) : f();
        }
        function f() {
            i.html("<div class='wa-content'><h2>Sorry! Something went wrong.<\/h2><h4>Please try again later.<\/h4><\/div>");
        }
        function e() {
            var t = n(".wa-blog-pagination-info"), i = { totalCount: 0, action: "index", slug: null };
            return t && t.length > 0 && (i = { totalCount: t.data("total-count"), action: t.data("action"), slug: t.data("slug") }), i;
        }
        function o(n, i) {
            t = i;
            c();
        }
        function s() {
            r.off("paged.pagination");
            r.data("items", e().totalCount).trigger("page.pagination", t);
            r.on("paged.pagination", o);
        }
        var t = 1, i = n(".wa-blog-posts-items"), r = n("[data-control='pagination']"), h = n("<div />", { "class": "wa-loader" }), u;
        r.on("paged.pagination", o);
        u = Core.Util.GetParameterByName("page");
        u && (t = u);
        s();
    };
    n(function () {
        n(".wa-blog-posts").each(function () {
            Acom.Pages.BlogPosts(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Pages.CaseStudies = function () {
        var w = n("#result-set"), s = n("[data-control='filter'] input"), b = n("[data-sort-type]"), h = n("[data-sort-type].active").attr("data-sort-type"), c = n("[data-control='pagination.next']"), l = n("#industryDropdown"), a = n("#serviceDropdown"), v = n("#customerLocationDropdown"), e = Core.Util.GetParameterByName("term") || "", i = Core.Util.GetParameterByName("industry") || t.UserManager().GetValue("casestudies.industry") || "all", r = Core.Util.GetParameterByName("service") || t.UserManager().GetValue("casestudies.service") || "all", u = Core.Util.GetParameterByName("country") || t.UserManager().GetValue("casestudies.country") || "all", o = 1, k = function (r) {
            var u = n(r.currentTarget);
            i = u.val();
            i = i === "all" ? "" : i;
            Core.Util.SoftLoadQueryStringPairs({ industry: i });
            t.UserManager().SetValue("casestudies.industry", i);
            f();
        }, d = function (i) {
            var u = n(i.currentTarget);
            r = u.val();
            r = r === "all" ? "" : r;
            Core.Util.SoftLoadQueryStringPairs({ service: r });
            t.UserManager().SetValue("casestudies.service", r);
            f();
        }, g = function (i) {
            var r = n(i.currentTarget);
            u = r.val();
            u = u === "all" ? "" : u;
            Core.Util.SoftLoadQueryStringPairs({ country: u });
            t.UserManager().SetValue("casestudies.country", u);
            f();
        }, y = function (n) {
            var t = n.keyCode === 13 || n.type === "click";
            e = s.val();
            t && f();
        }, nt = function (t) {
            var i = n(t.currentTarget);
            i.hasClass("disabled") || (o = i.data("page") || 1, p());
        }, tt = function (t) {
            var i = n(t.currentTarget);
            h = i.attr("data-sort-type");
            n("[data-sort-type].active").removeClass("active");
            i.addClass("active");
            f();
        }, f = function () {
            o = 1;
            p();
        }, p = function () {
            var n = function (n) {
                w.html(n);
                c.trigger("page.pagination", o);
                Core.Util.SoftLoadQueryStringPairs({ term: e });
            };
            t.Util.Render.CaseStudies({ Term: e, PageNumber: o, Sort: h, IndustrySlug: i, ServiceSlug: r, CountrySlug: u }).done(n);
        };
        e && s.val(e);
        l.val(i).change();
        a.val(r).change();
        v.val(u).change();
        i = i === "all" ? "" : i;
        r = r === "all" ? "" : r;
        u = u === "all" ? "" : u;
        Core.Util.SoftLoadQueryStringPairs({ industry: i, service: r, country: u });
        t.UserManager().SetValue("casestudies.industry", i);
        t.UserManager().SetValue("casestudies.service", r);
        t.UserManager().SetValue("casestudies.country", u);
        b.on("click", tt);
        c.on("click", "a", nt);
        s.on("keyup clear.text", y);
        l.on("change", k);
        a.on("change", d);
        v.on("change", g);
        n(".search-box-overlay").on("click", y);
        f();
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Community = t.Pages.Community || {};
    t.Pages.Community.Events = function () {
        var i = { initializePage: function () {
            this._selectDefaultFilters();
            this._filterEvents();
            n("#dropdown-eventtype, #dropdown-country, #dropdown-eventservice").on("change", this._filterEvents.bind(this));
        }, _selectDefaultFilters: function () {
            this._selectDefaultEventTypeFilter();
            this._selectDefaultCountryFilter();
            this._selectDefaultEventServiceFilter();
        }, _selectDefaultEventTypeFilter: function () {
            var i = n("#dropdown-eventtype"), r = Core.Util.SanitizeString(Core.Util.GetParameterByName("type")) || t.UserManager().GetValue("eventsTypeFilter"), u;
            r && i.val(r).change();
            u = i.val();
            u || i.val("all").change();
        }, _selectDefaultCountryFilter: function () {
            var i = n("#dropdown-country"), r = Core.Util.SanitizeString(Core.Util.GetParameterByName("country")) || t.UserManager().GetValue("eventCountry");
            n("#dropdown-country option[value='" + r + "']").length === 0 ? i.val(n("#dropdown-country option:first-child").val()).change() : i.val(r).change();
        }, _selectDefaultEventServiceFilter: function () {
            var i = n("#dropdown-eventservice"), r = Core.Util.SanitizeString(Core.Util.GetParameterByName("service")) || t.UserManager().GetValue("eventService");
            n("#dropdown-eventservice option[value='" + r + "']").length === 0 ? i.val(n("#dropdown-eventservice option:first-child").val()).change() : i.val(r).change();
        }, _filterEvents: function () {
            var i = n("#dropdown-eventtype").val(), r = n("#dropdown-country").val(), u = n("#dropdown-eventservice").val(), f = n(".no-events-type"), t = n("[data-events-dropdown-filter-set='events']").not(n("select")), e = n("div.year-group");
            t.hide();
            t = t.filter("[data-filter-country~='" + r + "'], [data-filter-country~=global]").filter("[data-filter-eventtype~='" + i + "']").filter("[data-filter-eventservice~='" + u + "']");
            f.toggle(t.length === 0);
            t.show();
            e.each(function (t, i) {
                var r = n(i);
                n(".wa-content[data-filter-year~=" + r.text() + "]:visible").length ? r.show() : r.hide();
            });
            this._saveFilterSelection(i, r, u);
        }, _saveFilterSelection: function (n, i, r) {
            n === "all" && (n = null);
            r === "all" && (r = null);
            Core.Util.SoftLoadQueryStringPairs({ type: n, country: i, service: r });
            t.UserManager().SetValue("eventsTypeFilter", n);
            t.UserManager().SetValue("eventCountry", i);
            t.UserManager().SetValue("eventService", r);
        } };
        i.initializePage();
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Documentation = {};
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Documentation.Articles = t.Pages.Documentation.Articles || {};
    t.Pages.Documentation.Articles.Index = function () {
        function w() {
            var n = Core.Util.GetParameterByName("term") || "";
            r && h.val(r).change();
            u && c.val(u).change();
            f && l.val(f).change();
            u = h.val();
            u == "all" && (u = "");
            r = c.val();
            r == "all" && (r = "");
            f = l.val();
            f == "all" && (f = "");
            n && o.val(n);
            s.trigger("page.pagination", i);
        }
        function e() {
            var e = function (t) {
                y.html(t);
                s.data("items", n(".wa-article-container").data("total"));
                s.trigger("page.pagination", i);
                Core.Util.SoftLoadQueryStringPairs({ service: u, platform: r, tag: f, term: o.val(), page: i == 1 ? "" : i });
            };
            t.Util.Render.DocArticles({ Term: o.val(), Page: i || 1, Sort: a, Platform: r, Service: u, Tag: f }).done(e);
        }
        function b() {
            a = this.value;
            e();
        }
        function k() {
            r = this.value == "all" ? "" : this.value;
            i = 1;
            e();
        }
        function d() {
            u = this.value == "all" ? "" : this.value;
            i = 1;
            e();
        }
        function g() {
            f = this.value == "all" ? "" : this.value;
            i = 1;
            e();
        }
        function nt(n) {
            n.type === "clear" && (o.val(""), e());
            var t = n.keyCode === 13;
            t && (i = 1, e());
        }
        function tt(t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (i = r.data("page"), e());
        }
        var v = n("[data-control='filter']"), o = n("[data-control='filter'] input"), a = n("#wa-dropdown-sort:selected").val(), s = n("[data-control='pagination']"), y = n("#result-set"), h = n("#wa-dropdown-service"), c = n("#wa-dropdown-platform"), l = n("#wa-dropdown-tags"), p = n("#wa-dropdown-sort"), r = Core.Util.SanitizeString(Core.Util.GetParameterByName("service")), u = Core.Util.SanitizeString(Core.Util.GetParameterByName("platform")), f = Core.Util.SanitizeString(Core.Util.GetParameterByName("tag")), i = Core.Util.SanitizeString(Core.Util.GetParameterByName("page")) || 1;
        w();
        v.on("keyup clear.text", nt);
        s.on("click", "a", tt);
        p.on("change", b);
        c.on("change", k);
        h.on("change", d);
        l.on("change", g);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Documentation.Videos = {};
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Documentation.Api = function () {
        var t = n("[data-control='filter']"), i = n("[data-control='filter'] input"), r = n(".wa-table-minimal"), u = n(".wa-libraryCategory"), f = function () {
            r.each(e);
            u.removeAttr("style").filter(":visible").last().css("padding-bottom", 0);
        }, e = function (t, i) {
            var r = n(i), u = r.find("tr");
            u.removeClass("merged").filter(":visible").last().addClass("merged");
        }, o = function (n) {
            n.type === "clear" && (i.val(""), t.trigger("filter.filter"));
        };
        t.on("filtered.filter", f);
        i.on("keyup clear.text", o);
        t.trigger("filtered.filter");
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    var i = function () {
        function u(n, i) {
            t.setCurrentPage(i);
            r();
        }
        var t = this, i = n("[data-control='pagination']"), r;
        this._currentPage = 1;
        r = function () {
        };
        this.getCurrentPage = function () {
            return n(".wa-searchResult-page").val() || t._currentPage;
        };
        this.setCurrentPage = function (i) {
            t._currentPage = i;
            n(".wa-searchResult-page").val(i);
        };
        this.paginate = function () {
            i.off("paged.pagination");
            i.data({ items: n(".wa-searchResult-count").val() || 0, pagesize: 10 }).trigger("page.pagination", t.getCurrentPage());
            i.on("paged.pagination", u);
        };
        this.setCallback = function (n) {
            r = n;
        };
        i.on("paged.pagination", u);
    };
    t.Pages.Documentation.Videos.AzureFriday = function () {
        var s = new Core.Util.Delay, o = n("#video-results"), h = n("[data-component='azure-friday-search']"), e = h.find(".wa-filter-empty"), r = n(".wa-section-azureFriday-filter"), c = r.find(".text-input"), l = r.find(".more-filters"), u = new i, f = function () {
            var f = c.val(), i = [];
            r.find(":checked").each(function () {
                i.push(n(this).val());
            });
            t.Util.Render.AzureFridaySearchResults(f, i, u.getCurrentPage()).success(function (n) {
                e.hide();
                o.html(n);
                n.trim().length === 0 && e.show();
                u.paginate();
            }).fail(function () {
                o.html("");
                e.show();
            });
        };
        u.setCallback(f);
        r.on("keyup", ".text-input", function () {
            s.wait(function () {
                u.setCurrentPage(1);
                f();
            }, 400);
        });
        r.on("click", "input[type=checkbox]", function () {
            f();
        });
        r.on("focus", ".text-input", function () {
            l.slideDown();
        });
        n(function () {
            f();
        });
    };
}(jQuery, Acom), function (n) {
    "use strict";
    Acom.Pages.GalleryServiceUpdates = function (t) {
        function y(t) {
            var h = (t - 1) * e, f = h + e, i, s;
            for (u.hide(), o.hide(), i = u.filter(function () {
                return n(this).attr("data-filter-hide") === "false";
            }), i.length < 1 && o.show(), f = i.length < f ? i.length : f, s = h; s < f; s++)
                n(i[s]).show();
            r.off("paged.pagination");
            r.data({ items: i.length, pagesize: e }).trigger("page.pagination", t);
            r.on("paged.pagination", p);
        }
        function p(n, t) {
            y(t);
        }
        function w() {
            var n = Core.Util.GetParameterByName("service"), t = Core.Util.GetParameterByName("platform"), i = Core.Util.GetParameterByName("update-type");
            n && c.val(n);
            t && l.val(t);
            i && h.val(i);
            (n || t || i) && s.trigger("change");
        }
        var f = t.find(".wa-serviceUpdates-container"), u = f.find(".wa-serviceUpdate"), r = f.find("[data-control='pagination']"), o = f.find(".wa-filter-empty"), s = t.find(".wa-dropdown"), h = t.find("#wa-dropdown-updateType > select"), c = t.find("#wa-dropdown-services > select"), l = t.find("#wa-dropdown-platform > select"), a = t.find(".dynamic-rss"), i = "0", e = 20, v = 1;
        s.on("change", function () {
            var t = h.val(), f = l.val(), e = c.val(), s = a.attr("href").split("?")[0], o = { service: e === i ? null : e, "update-type": t === i ? null : t, platform: f === i ? null : f };
            u.attr("data-filter-hide", "true");
            u.filter(function () {
                var r = n(this);
                return (!e || e === i || r.data("services").indexOf(e) > -1) && (!f || f === i || r.data("platforms").indexOf(f) > -1) && (!t || t === i || r.data("updatetypes").indexOf(t) > -1);
            }).attr("data-filter-hide", "false");
            r.trigger("page.pagination", v);
            a.attr("href", s + Core.Util.GetQueryStringFromPairs(o));
            Core.Util.SoftLoadQueryStringPairs(o);
        });
        r.on("paged.pagination", p);
        w();
        y(v);
    };
    n(function () {
        n(".wa-serviceUpdates").each(function () {
            Acom.Pages.GalleryServiceUpdates(n(this));
        });
    });
    n(function () {
        n(".wa-serviceUpdates-detail").each(function () {
            window.document.title = n("h1").text();
        });
    });
}(jQuery), function (n) {
    "use strict";
    Acom.Pages.GalleryVideos = function (t) {
        function s() {
            var n = w({ services: a.val(), series: v.val(), page: i });
            r && (r.html("").append(p.clone()), t.hasClass("wa-videos-home") ? Acom.Util.Render.GalleryVideosHomeResults(n.services, n.series, h, f) : t.hasClass("wa-videos-index") && (Acom.Util.Render.GalleryVideosIndexResults(n.services, n.series, i, h, f), Core.Util.SoftLoadQueryStringPairs(n)));
        }
        function w(t) {
            var i = {};
            return n.each(t, function (n, t) {
                t === "default" && (t = null);
                n === "page" && t === 1 && (t = null);
                i[n] = t;
            }), i;
        }
        function h(n) {
            n ? n && n.length > 0 ? (r.html(n), l()) : f() : f();
        }
        function f() {
            r.html("<div class='wa-content'><h2>Sorry! Something went wrong.<\/h2><h4>Please try again later.<\/h4><\/div>");
        }
        function b() {
            var i = 0, t = n(".wa-video-count");
            return t && t.length > 0 && (i = t.data("value")), i;
        }
        function c(n, t) {
            i = t;
            s();
        }
        function l() {
            u.off("paged.pagination");
            u.data("items", b()).trigger("page.pagination", i);
            u.on("paged.pagination", c);
        }
        var e = n("#dropdown-services,#dropdown-series"), i = 1, a = e.filter("#dropdown-services"), v = e.filter("#dropdown-series"), r = n(".wa-video-results"), u = n("[data-control='pagination']"), y = 1, p = n("<div />", { "class": "wa-loader" }), o;
        e.change(function () {
            i = y;
            s();
        });
        u.on("paged.pagination", c);
        o = Core.Util.GetParameterByName("page");
        o && (i = o);
        l();
    };
    n(function () {
        n(".wa-videos-home, .wa-videos-index").each(function () {
            Acom.Pages.GalleryVideos(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Pages.Marketplace = function () {
        var f = n("#marketplace-search input"), h = n("#gallery-featured"), c = n("#gallery-results"), o = n("#result-set"), u = n("[data-control='pagination.next']"), e = { term: "", page: 1 }, r = Core.Util.GetParameterByName("term") || e.term, i = Core.Util.GetParameterByName("page") || e.page, a = function () {
            i = 1;
            s().done(function (t) {
                o.html(t);
                u.data("items", n("#gallery-items").data("total"));
                u.trigger("page.pagination", i);
                h.hide();
                c.show();
            });
        }, v = function () {
            h.show();
            c.hide();
            i = 1;
            r = "";
            s().done(function (t) {
                o.html(t);
                u.data("items", n("#gallery-items").data("total"));
                u.trigger("page.pagination", i);
            });
        }, l = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            r = f.val();
            t && r ? a() : i && !r && v();
        }, y = function () {
            f.val("");
            f.trigger("clear.text");
        }, p = function (t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (i = r.data("page") || e.page, s().done(function (n) {
                o.html(n);
            }));
        }, s = function () {
            return Core.Util.SoftLoadQueryStringPairs({ term: r, page: i === e.page ? null : i }), t.Util.Render.Gallery(r, i);
        };
        n(".search-box-overlay").on("click", l);
        n(".clear").on("click", function () {
            y();
        });
        f.val(r);
        u.trigger("page.pagination", i);
        u.on("click", "a", p);
        f.on("keyup clear.text", l);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.ActiveDirectory = function () {
        var o = n("[data-control='filter'] input"), v = n("#result-set"), s = n("[data-control='pagination.next']"), y = n("[data-control='tabs']"), f = n("[data-control='checkbox']"), i = { term: "", categories: "", page: 1 }, u = Core.Util.GetParameterByName("term") || i.term, e = Core.Util.GetParameterByName("categories") || i.categories, r = Core.Util.GetParameterByName("page") || i.page, p = function () {
            u = i.term;
            r = i.page;
            f.trigger("uncheck.checkbox");
            o.val(u);
        }, c = function (t) {
            return n(t).find("input").val();
        }, w = function (n, t) {
            for (var r = !1, i = 0; i < t.length; i++)
                if (n.find("input").val() === t[i]) {
                    r = !0;
                    break;
                }
            return r;
        }, b = function (t, i) {
            return w(n(i), e.split(","));
        }, k = function () {
            r = i.page;
            h();
        }, d = function () {
            u = i.term;
            r = i.page;
            h();
        }, g = function (n, t) {
            t === "featured" && (p(), a());
        }, l = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            u = o.val();
            t && u ? k() : i && !u && d();
        }, nt = function (t) {
            var u = n(t.currentTarget);
            u.hasClass("disabled") || (r = u.data("page") || i.page, h());
        }, tt = function () {
            e = n.map(f.filter(".checked"), c).join();
            r = i.page;
            h();
        }, a = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: u, categories: e, page: r === i.page ? null : r });
        }, h = function () {
            a();
            t.Util.Render.GalleryActiveDirectory(u, e, r).done(function (t) {
                v.html(t);
                s.data("items", n("#gallery-items").data("total"));
                s.trigger("page.pagination", r);
            });
        };
        n(".search-box-overlay").on("click", l);
        o.val(u);
        f.filter(".categories").filter(b).trigger("check.checkbox");
        s.trigger("page.pagination", r);
        e = n.map(f.filter(".checked"), c).join();
        f.on("checked.checkbox unchecked.checkbox", tt);
        s.on("click", "a", nt);
        o.on("keyup clear.text", l);
        y.on("tabbed.tabs", g);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.ApplicationServices = function () {
        var f = n("[data-control='filter'] input"), h = n("#result-set"), e = n("[data-control='pagination.next']"), c = n("[data-control='tabs']"), u = { term: "", page: 1 }, r = Core.Util.GetParameterByName("term") || u.term, i = Core.Util.GetParameterByName("page") || u.page, l = function () {
            r = u.term;
            i = u.page;
            f.val(r);
        }, a = function (n, t) {
            t === "featured" && (l(), o());
        }, s = function (n) {
            var t = n.keyCode === 13 || n.type === "click", e = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            r = f.val();
            t && r ? (i = u.page, o()) : e && !r && (i = u.page, o());
        }, v = function (t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (i = r.data("page") || 1, o());
        }, y = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: r, page: i === 1 ? null : i });
        }, o = function () {
            y();
            t.Util.Render.GalleryApplicationServices(r, i).done(function (t) {
                h.html(t);
                e.data("items", n("#gallery-items").data("total"));
                e.trigger("page.pagination", i);
            });
        };
        n(".search-box-overlay").on("click", s);
        f.val(r);
        e.trigger("page.pagination", i);
        e.on("click", "a", v);
        f.on("keyup clear.text", s);
        c.on("tabbed.tabs", a);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.DataServices = function () {
        var f = n("[data-control='filter'] input"), h = n("#result-set"), e = n("[data-control='pagination.next']"), c = n("[data-control='tabs']"), i = { term: "", page: 1 }, r = Core.Util.GetParameterByName("term") || i.term, u = Core.Util.GetParameterByName("page") || i.page, l = function () {
            r = i.term;
            u = i.page;
            f.val(r);
        }, a = function () {
            u = i.page;
            o();
        }, v = function () {
            r = i.term;
            u = i.page;
            o();
        }, y = function (n, t) {
            t === "featured" && (l(), o());
        }, s = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            r = f.val();
            t && r ? a() : i && !r && v();
        }, p = function (t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (u = r.data("page") || i.page, o());
        }, o = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: r, page: u === i.page ? null : u });
            t.Util.Render.GalleryDataServices(r, u).done(function (t) {
                h.html(t);
                e.data("items", n("#gallery-items").data("total"));
                e.trigger("page.pagination", u);
            });
        };
        n(".search-box-overlay").on("click", s);
        f.val(r);
        e.trigger("page.pagination", u);
        e.on("click", "a", p);
        f.on("keyup clear.text", s);
        c.on("tabbed.tabs", y);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.VirtualMachines = function () {
        var c = n("[data-control='filter'] input"), b = n("#result-set"), l = n("[data-control='pagination.next']"), k = n("[data-control='tabs']"), i = n("[data-control='checkbox']"), r = { term: "", os: "", publisher: "", categories: "", page: 1 }, f = Core.Util.GetParameterByName("term") || r.term, o = Core.Util.GetParameterByName("operatingSystem") || r.os, s = Core.Util.GetParameterByName("publisherType") || r.publisher, h = Core.Util.GetParameterByName("categories") || r.categories, u = Core.Util.GetParameterByName("page") || r.page, d = function () {
            f = r.term;
            u = r.page;
            i.trigger("uncheck.checkbox");
            c.val(f);
        }, e = function (t) {
            return n(t).find("input").val();
        }, v = function (n, t) {
            for (var r = !1, i = 0; i < t.length; i++)
                if (n.find("input").val() === t[i]) {
                    r = !0;
                    break;
                }
            return r;
        }, g = function (t, i) {
            return v(n(i), o.split(","));
        }, nt = function (t, i) {
            return v(n(i), s.split(","));
        }, tt = function (t, i) {
            return v(n(i), h.split(","));
        }, it = function () {
            u = r.page;
            a();
        }, rt = function () {
            u = r.page;
            a();
        }, ut = function (n, t) {
            t === "featured" && (d(), w());
        }, y = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            f = c.val();
            t && f ? it() : i && !f && rt();
        }, ft = function (t) {
            var i = n(t.currentTarget);
            i.hasClass("disabled") || (u = i.data("page") || r.page, a());
        }, et = function (n, i) {
            t.EventManager.GoogleEventMarketplaceFilterSelect(i);
            p();
        }, p = function () {
            o = n.map(i.filter(".operatingSystem.checked"), e).join();
            s = n.map(i.filter(".publisherType.checked"), e).join();
            h = n.map(i.filter(".categories.checked"), e).join();
            u = r.page;
            a();
        }, w = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: f, operatingSystem: o, publisherType: s, categories: h, page: u === r.page ? null : u });
        }, a = function () {
            w();
            t.Util.Render.GalleryVirtualMachines(f, o, s, h, u).done(function (t) {
                b.html(t);
                l.data("items", n("#gallery-items").data("total"));
                l.trigger("page.pagination", u);
            });
        };
        n(".search-box-overlay").on("click", y);
        c.val(f);
        i.filter(".operatingSystem").filter(g).trigger("check.checkbox");
        i.filter(".publisherType").filter(nt).trigger("check.checkbox");
        i.filter(".categories").filter(tt).trigger("check.checkbox");
        l.trigger("page.pagination", u);
        o = n.map(i.filter(".operatingSystem.checked"), e).join();
        s = n.map(i.filter(".publisherType.checked"), e).join();
        h = n.map(i.filter(".categories.checked"), e).join();
        i.on("unchecked.checkbox", p);
        i.on("checked.checkbox", et);
        l.on("click", "a", ft);
        c.on("keyup clear.text", y);
        k.on("tabbed.tabs", ut);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.WebApplications = function () {
        var f = n("[data-control='filter'] input"), h = n("#result-set"), e = n("[data-control='pagination.next']"), c = n("[data-control='tabs']"), i = { term: "", page: 1 }, r = Core.Util.GetParameterByName("term") || i.term, u = Core.Util.GetParameterByName("page") || i.page, l = function () {
            r = i.term;
            u = i.page;
            f.val(r);
        }, a = function () {
            u = i.page;
            o();
        }, v = function () {
            r = i.term;
            u = i.page;
            o();
        }, y = function (n, t) {
            t === "featured" && (l(), o());
        }, s = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            r = f.val();
            t && r ? a() : i && !r && v();
        }, p = function (t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (u = r.data("page") || i.page, o());
        }, o = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: r, page: u === i.page ? null : u });
            t.Util.Render.GalleryWebApplications(r, u).done(function (t) {
                h.html(t);
                e.data("items", n("#gallery-items").data("total"));
                e.trigger("page.pagination", u);
            });
        };
        n(".search-box-overlay").on("click", s);
        f.val(r);
        e.trigger("page.pagination", u);
        e.on("click", "a", p);
        f.on("keyup clear.text", s);
        c.on("tabbed.tabs", y);
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    t.Pages.Marketplace.ApiApps = function () {
        var f = n("[data-control='filter'] input"), h = n("#result-set"), e = n("[data-control='pagination.next']"), c = n("[data-control='tabs']"), i = { term: "", page: 1 }, r = Core.Util.GetParameterByName("term") || i.term, u = Core.Util.GetParameterByName("page") || i.page, l = function () {
            r = i.term;
            u = i.page;
            f.val(r);
        }, a = function () {
            u = i.page;
            o();
        }, v = function () {
            r = i.term;
            u = i.page;
            o();
        }, y = function (n, t) {
            t === "featured" && (l(), o());
        }, s = function (n) {
            var t = n.keyCode === 13 || n.type === "click", i = n.keyCode === 8 || n.keyCode === 46 || n.type === "clear";
            r = f.val();
            t && r ? a() : i && !r && v();
        }, p = function (t) {
            var r = n(t.currentTarget);
            r.hasClass("disabled") || (u = r.data("page") || i.page, o());
        }, o = function () {
            Core.Util.SoftLoadQueryStringPairs({ term: r, page: u === i.page ? null : u });
            t.Util.Render.GalleryApiApps(r, u).done(function (t) {
                h.html(t);
                e.data("items", n("#gallery-items").data("total"));
                e.trigger("page.pagination", u);
            });
        };
        n(".search-box-overlay").on("click", s);
        f.val(r);
        e.trigger("page.pagination", u);
        e.on("click", "a", p);
        f.on("keyup clear.text", s);
        c.on("tabbed.tabs", y);
    };
}(jQuery, Acom), function () {
    "use strict";
    Acom.Pages.Marketplace.Offers = function () {
        function e(n, t) {
            var i;
            return function () {
                clearTimeout(i);
                i = setTimeout(n, t);
            };
        }
        var n = $("#wa-dropdown-country"), f = $("#offerSlug").text(), r = $('[data-tab-panel="plans"]'), u = new Acom.UserManager, t = u.GetValue("billing-country"), i = e(function () {
            var t = n.find("option:selected"), i = t.data("currency"), e = r.find(".wa-tab.active").data("slug") || $("#singleplan").data("slug");
            u.SetValue("billing-country", t.val());
            $.ajax({ url: "/" + window.Acom.currentCulture + "/marketplaceapi/virtual-machines/pricing/", type: "GET", dataType: "html", data: { offerSlug: f, planSlug: e, market: t.val(), region: pricingRegion } }).done(function (n) {
                $("#tab-" + e).html(n);
                $(".row-adder").each(function () {
                    var n = $(this), r = n.find(".tosum-1"), u = n.find(".tosum-2"), f = n.find(".added-total"), e = n.find(".added-total-monthly"), t = r.find(".price-data").data("amount") * currency[i].conversion + u.data("value");
                    f.text(Math.round(t * 1e3) / 1e3);
                    e.text(Math.round(t * 744e3) / 1e3);
                });
                changeCurrency(i);
                $(".currency-name").text(i);
            });
        }, 10);
        t && n.find('option[value="' + t + '"]').length && n.val(t);
        n.parent().on("changed", i);
        $("html").on("changed.region", i);
        r.on("tabbed.tabs", i);
    };
}(), function (n, t) {
    "use strict";
    t.Pages.Partners = {};
}(jQuery, Acom), function (n, t) {
    "use strict";
    var i = function () {
        function u(n, i) {
            t.setCurrentPage(i);
            r();
        }
        var t = this, i = n('[data-control="pagination"]'), r;
        this._currentPage = 1;
        r = function () {
        };
        this.getCurrentPage = function () {
            return n(".wa-searchResult-page").val() || t._currentPage;
        };
        this.setCurrentPage = function (i) {
            t._currentPage = i;
            n(".wa-searchResult-page").val(i);
        };
        this.paginate = function () {
            i.off("paged.pagination");
            i.data({ items: n(".wa-searchResult-count").val() || 0, pagesize: 24 }).trigger("page.pagination", t.getCurrentPage());
            i.on("paged.pagination", u);
        };
        this.setCallback = function (n) {
            r = n;
        };
        i.on("paged.pagination", u);
    };
    t.Pages.Partners.Directory = function () {
        var o = new Core.Util.Delay, e = n("#partner-list"), u = n("#partner-search"), f = new i, r = function () {
            var i = u.val(), r = n("#service-sort").val();
            t.Util.Render.Partners(i, r, f.getCurrentPage()).success(function (n) {
                e.html(n);
                f.paginate();
            }).fail(function () {
                e.html("");
            });
        };
        f.setCallback(r);
        n("#service-sort").on("change", r);
        u.on("keyup", function () {
            o.wait(function () {
                f.setCurrentPage(1);
                r();
            }, 400);
        });
        u.siblings(".clear").on("click", function () {
            u.val("");
            r();
        });
        u.siblings(".search-box-overlay").on("click", function () {
            r();
        });
        n(function () {
            r();
        });
    };
}(jQuery, Acom), function () {
    "use strict";
    Acom.Pages.Infographics = function (n, t, i, r, u) {
        function s() {
            return { Image: { xmlns: "http://schemas.microsoft.com/deepzoom/2008", Url: f, Format: "png", Overlap: "2", TileSize: "256", Size: { Height: e[r].height, Width: e[r].width } } };
        }
        var f, o, e = { landscape: { height: 7800, width: 11700 }, portrait: { height: 11700, width: 7800 } };
        f = n + "infographics/" + u + "/" + t + "/" + i + "/";
        o = new OpenSeadragon({ id: "infographic-zoom", showNavigationControl: !0, prefixUrl: "/css/opensource/images/", tileSources: s() });
    };
}(jQuery), function (n, t) {
    "use strict";
    t.Pages.Regions = function () {
        var r = n("[data-control='dynamictable']"), f = n("[data-control='dynamictablecollection']"), u = n(".wa-table-lock th .show-all"), o = n("#wa-tabs-main"), s = 1, e = new t.UserManager, i = acomuser.hiddenregions ? acomuser.hiddenregions.split(",") : [], h = function () {
            return r.filter(".show").length;
        }, c = function (n) {
            n.preventDefault();
            e.SetValue("hiddenregions", "");
            r.trigger("show.dynamictable");
            u.hide("fast");
            i = [];
        }, l = function (n, t) {
            t === "services" && (f.trigger("init.dynamictablecollection"), f.trigger("draw.dynamictablecollection"));
        }, a = function (t) {
            var r = n(t.currentTarget).data("region"), f;
            h() > s ? (f = n.inArray(r, i), f === -1 && i.push(r), e.SetValue("hiddenregions", i)) : t.preventDefault();
            u.show("fast");
        };
        i.length === 0 && u.hide();
        r.on("hiding.dynamictable", a);
        o.on("tabbed.tabs", l);
        u.on("click", c);
        f.trigger("init.dynamictablecollection");
        r.filter(function (t, r) {
            var u = n(r).data("region"), f = n.inArray(u, i);
            return f === -1;
        }).trigger("show.dynamictable");
    };
}(jQuery, Acom), function (n) {
    "use strict";
    Acom.Pages.SiteSearch = function (t) {
        function a(n, t) {
            var u, f = null;
            i = t;
            i !== 1 && (f = i);
            u = Core.Util.UpdateQueryString(window.location.search, r, f);
            Core.Util.SoftLoadUrl(null, null, window.location.href.split("?")[0] + u);
            e();
        }
        function k() {
            var t;
            u = l.val();
            i = 1;
            t = Core.Util.UpdateQueryString(window.location.search, r, null);
            t = Core.Util.UpdateQueryString(t, h, Core.Util.EncodeHtml(u));
            Core.Util.SoftLoadUrl(null, null, window.location.href.split("?")[0] + t);
            e();
            n("#MainSearchBox").val(u);
        }
        function d(t) {
            var o = n(t.currentTarget), f = o.find("input").val(), u;
            u = Core.Util.UpdateQueryString(window.location.search, r, null);
            u = f === s.val() ? Core.Util.UpdateQueryString(u, f, null) : Core.Util.UpdateQueryString(u, f, "true");
            i = 1;
            u = Core.Util.UpdateQueryString(u, r, null);
            Core.Util.SoftLoadUrl(null, null, window.location.href.split("?")[0] + u);
            e();
        }
        function g(t) {
            var h = n(t.currentTarget), f = h.find("input").val(), u;
            o.filter(".checked").length > 1 ? (u = Core.Util.UpdateQueryString(window.location.search, r, null), u = f === s.val() ? Core.Util.UpdateQueryString(u, f, "false") : Core.Util.UpdateQueryString(u, f, null), i = 1, u = Core.Util.UpdateQueryString(u, r, null), Core.Util.SoftLoadUrl(null, null, window.location.href.split("?")[0] + u), e()) : t.preventDefault();
        }
        function v() {
            f.off("paged.pagination");
            f.data({ items: n(".wa-searchResult-count").val(), pagesize: p }).trigger("page.pagination", i);
            f.on("paged.pagination", a);
        }
        function nt() {
            var n = Core.Util.GetParameterByName(h), t = Core.Util.GetParameterByName(r);
            n && (u = n);
            t && (i = t);
        }
        function tt(t) {
            t && t.length > 0 ? (n(".wa-searchResults-container").html(t), v()) : y();
        }
        function y() {
            n(".wa-searchResults-container").html("");
            n("#error-message").show();
        }
        function e() {
            n("#error-message").hide();
            Acom.Util.Render.SiteSearchResults(u, i, s.is(":checked"), w.is(":checked"), b.is(":checked"), tt, y);
        }
        var h = "query", r = "page", f = t.find("[data-control='pagination']"), p = 10, c = t.find("#wa-textSearch-primary"), l = c.find(".text-input"), o = t.find("[data-control='checkbox']"), s = t.find("input[value='azure']"), w = t.find("input[value='msdn']"), b = t.find("input[value='forums']"), u = l.val(), i = 1;
        f.on("paged.pagination", a);
        c.on("submitted.textbox changed.textbox", k);
        o.on("checked.checkbox", d);
        o.on("unchecking.checkbox", g);
        nt();
        v();
    };
    n(function () {
        n(".wa-siteSearch").each(function () {
            Acom.Pages.SiteSearch(n(this));
        });
    });
}(jQuery), function (n, t) {
    "use strict";
    t.Pages.Status = function () {
        function ft() {
            var n = this.value, i = n / 6e4;
            v.SetTime(n);
            t.EventManager.GoogleEventRegionRefresh(i);
        }
        function et(t) {
            var r = n(this), f = r.parents("tr"), u, i;
            for (t.preventDefault(), r.toggleClass("expanded"), u = r.hasClass("expanded") ? "show" : "hide", i = f.next(); i.hasClass("sub-row"); i = i.next())
                i[u]("fast");
        }
        function ot(t) {
            var i = n(this).parents("tr"), r = i.data("service"), u = i.data("category");
            t.preventDefault();
            st(u, r);
        }
        function st(r, u) {
            var o;
            i[r] = i[r] || [];
            o = n.inArray(u, i[r]);
            o === -1 && i[r].push(u);
            e.SetValue("hiddenservices", JSON.stringify(i));
            f.find("[data-category='" + r + "'][data-service='" + u + "']").hide("fast");
            t.EventManager.GoogleEventServiceCollapse(u);
        }
        function ht(i) {
            var r = n(i.currentTarget).data("region"), u;
            u = n.inArray(r, o);
            u === -1 && o.push(r);
            e.SetValue("hiddenregions", o);
            t.EventManager.GoogleEventRegionCollapse(r);
        }
        function ct(n, i) {
            i === "history" ? v.StopTime() : i === "current" && (f.trigger("init.dynamictablecollection"), f.trigger("draw.dynamictablecollection"), v.StartTime());
            t.EventManager.GoogleEventRegionTab(i);
        }
        function w(n, t) {
            u = t;
            s();
        }
        function lt() {
            r.off("paged.pagination");
            r.data({ items: n(".wa-historyResult-count").val(), pagesize: tt }).trigger("page.pagination", u);
            r.on("paged.pagination", w);
        }
        function at(n) {
            n && n.length > 0 ? (a.html(n), lt()) : b();
            l === "recent" ? r.hide() : r.show();
        }
        function b() {
            a.html("");
            n("#history-error-message").show();
        }
        function s() {
            n("#history-error-message").hide();
            a.html("").html("<div class='wa-loader'><\/div>");
            t.Util.Render.StatusHistoryResults(p, y, l, u, at, b);
        }
        function vt() {
            y = this.value;
            u = 1;
            s();
        }
        function yt() {
            p = this.value;
            u = 1;
            s();
        }
        function pt() {
            l = this.value;
            u = 1;
            s();
        }
        function wt(n) {
            n.preventDefault();
            Core.Util.Scroll().To(".wa-statusUpdates");
        }
        function bt() {
            var t = n(".label.expanded").parents("tr");
            t.each(function () {
                n(this).next().hasClass("sub-row") && n(this).next().show();
            });
        }
        var h = n("[data-control='dynamictable']"), f = n("[data-control='dynamictablecollection']"), k = n(".wa-table-lock tr .close"), d = n(".label.expand"), g = n(".incident-scroll"), c = n("#wa-dropdown-refresh"), nt = n("#wa-tabs-main"), r = n("[data-control='pagination']"), tt = 10, u = 1, y = "all", p = "all", l = "recent", a = n("#wa-historyResults-container"), it = n("#wa-dropdown-history-region"), rt = n("#wa-dropdown-service"), ut = n("#wa-dropdown-date"), v = new t.PageRefresh, e = new t.UserManager, i = acomuser.hiddenservices ? JSON.parse(acomuser.hiddenservices) : {}, o = acomuser.hiddenregions ? acomuser.hiddenregions.split(",") : [];
        e.SetValue("pagerefresh", acomuser.pagerefresh || 6e5);
        acomuser.pagerefresh && (c.find("option[value='" + acomuser.pagerefresh + "']").attr("selected", "selected"), c.change());
        c.on("change", ft);
        d.on("click", et);
        k.on("click", ot);
        g.on("click", wt);
        nt.on("tabbed.tabs", ct);
        h.on("hiding.dynamictable", ht);
        r.on("paged.pagination", w);
        it.on("change", vt);
        rt.on("change", yt);
        ut.on("change", pt);
        f.trigger("init.dynamictablecollection");
        h.trigger("show.dynamictable");
        Core.Util.GetParameterByName("__scenario") && Core.Util.GetParameterByName("__scenario").length > 0 && n("body").append("<div class='wa-watermark'><\/div>");
        bt();
    };
}(jQuery, Acom), function (n, t) {
    "use strict";
    var i = function () {
        function u(n) {
            var t = Core.Util.UpdateQueryString(window.location.search, "page", n === 1 ? null : n);
            Core.Util.SoftLoadUrl(null, null, window.location.pathname + t);
        }
        function f(n, i) {
            u(i);
            t.setCurrentPage(i);
            r();
        }
        var t = this, i = n('[data-control="pagination"]'), r;
        this._currentPage = Core.Util.GetParameterByName("page") || 1;
        r = function () {
        };
        this.getCurrentPage = function () {
            return n(".wa-searchResult-page").val() || t._currentPage;
        };
        this.setCurrentPage = function (i) {
            t._currentPage = i;
            n(".wa-searchResult-page").val(i);
            u(i);
        };
        this.paginate = function () {
            i.off("paged.pagination");
            i.data({ items: n(".wa-searchResult-count").val() || 0, pagesize: 24 }).trigger("page.pagination", t.getCurrentPage());
            i.on("paged.pagination", f);
        };
        this.setCallback = function (n) {
            r = n;
        };
        i.on("paged.pagination", f);
    };
    t.Pages.Documentation.ArmTemplates = function () {
        var o = new Core.Util.Delay, e = n("#template-list"), r = n("#template-search"), u = new i, f = function () {
            var i = r.val(), f = n("#template-sort").val();
            t.Util.Render.DocTemplates(i, f, u.getCurrentPage()).success(function (n) {
                e.html(n);
                u.paginate();
            }).fail(function () {
                e.html("");
            });
        };
        u.setCallback(f);
        n("#template-sort").on("change", f);
        r.on("keyup", function () {
            o.wait(function () {
                u.setCurrentPage(1);
                f();
            }, 400);
        });
        r.siblings(".clear").on("click", function () {
            r.val("");
            f();
        });
        r.siblings(".search-box-overlay").on("click", function () {
            f();
        });
        u.paginate();
    };
}(jQuery, Acom);


// JavaScript source code
function show(c_Str) {
    ul = document.getElementById("nav_list");
    for (var i = 0; i < ul.childNodes.length; i++) {
        if (c_Str + "_header" == ul.childNodes[i].id) {
            ul.childNodes[i].className = "active";
        }
        else {
            ul.childNodes[i].className = "";
        }
    }

    if (document.all(c_Str).style.display == 'none') {
        document.all(c_Str).style.display = 'block';
    }
    else {
        document.all(c_Str).style.display = 'none';
        document.getElementById(c_Str + "_header").className = "";
    }

}

$(document).ready(function () {
    $(".banner_close").click(function () {
        var dom = $(".banner_close").parent();
        $(dom).removeClass("banner_content").addClass("content_hide");
    });
    $(".content_title").click(function () {

        var dom = $(".banner_close").parent();
        $(dom).removeClass("content_hide").addClass("banner_content");
        $(".content_title").parent().removeClass("blue_content").addClass("grey_content");
        $(this).parent().removeClass("grey_content").addClass("blue_content");
        $(".triangle-up").css("display", "none");
        $(this).find(".triangle-up").css("display", "block");
        var strhref = $(this).attr('href');
        var domID = strhref.substring(1, (strhref.length));
        fetchdata(domID);
        var secCount = $("section").length;
        $("#page_body section").removeClass("content_show").addClass("content_hide");
        $("#page_body section").each(function () {
            if ($(this).attr('data-value') == domID) {
                $(this).removeClass("content_hide").addClass("content_show");

                previousScrollTop = 0;
                onscroll();
            }
        });
    });
    var previousScrollTop = 0;
    $(window).on('scroll', onscroll);

    $(window).on('resize', function (evt) {
        var width = 0.16 * $('.content').width();
        $('.left_content').css({
            'width': width,
        })
    });
});
//数据抓取
function fetchdata(vel) {
    var locaUrl = window.location.href;
    if (locaUrl.indexOf("#") > 0)
        locaUrl = locaUrl.split("#")[0].toString() + "?" + vel;
    //alert(locaUrl);
    $.get(locaUrl);
}
