$(document).ready(function() {
    var callData = new CallData();
    var listChosen = new ListChosen();

    renderHTML();

    function renderHTML() {
        callData
            .getListData()
            .done(function(result) {
                var contentNavPills = "";
                var contentTabPenes = "";
                result.navPills.forEach((item, index) => {
                    var activeClass = item.tabName == "tabTopClothes" ? "active" : "";
                    contentNavPills += getEleTabPill(item, activeClass);

                    var daseClass = item.tabName !== "tabTopClothes" ? "fade" : "";
                    contentTabPenes += `
                    <div class="tab-pane container ${daseClass} ${activeClass}" id="${item.tabName}">
                        <div class="row">
                            ${renderTabPane(item.tabName,result.tabPanes)}
                        </div>
                    </div>
                    `;
                });

                $(".nav-pills").html(contentNavPills);
                $(".tab-content").html(contentTabPenes);
            })
            .fail(function(error) {
                console.log(error);
            });
    }

    function getEleTabPill(item, activeClass) {
        return `
        <li class="nav-item">
        <a
          class="nav-link ${activeClass} btn-default"
          data-toggle="pill"
          href="#${item.tabName}"
          >${item.showName}</a
        >
        </li>`;
    }

    function getTypeArr(tabType, data) {
        var tempArr = [];
        data.forEach(function(item) {
            if (item.type === tabType) {
                tempArr.push(item);
            }
        });
        return tempArr;
    }

    function getElmItem(tempArr) {
        var elmItem = "";
        tempArr.forEach(function(item) {
            elmItem += `
            <div class="col-md-3">
                <div class="card text-center">
                    <img src="${item.imgSrc_jpg}"/>
                    <h4><b>${item.name}</b></h4>
                    <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}"
                    data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}"
                     class="changeStyle">Thử đồ</button>
                </div>
            </div>`
        });
        return elmItem;
    }

    function renderTabPane(tabName, arrTabPane) {
        var tempArr = null;
        var elmItem = null;
        switch (tabName) {
            case "tabTopClothes":
                tempArr = getTypeArr("topclothes", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabBotClothes":
                tempArr = getTypeArr("botclothes", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabShoes":
                tempArr = getTypeArr("shoes", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabHandBags":
                tempArr = getTypeArr("handbags", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabNecklaces":
                tempArr = getTypeArr("necklaces", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabHairStyle":
                tempArr = getTypeArr("hairstyle", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            case "tabBackground":
                tempArr = getTypeArr("background", arrTabPane);
                elmItem = getElmItem(tempArr);

                break;
            default:
                break;
        }
        return elmItem;
    }

    function findIndex(type) {
        var index = -1;
        if (listChosen.arr && listChosen.arr.length > 0) {
            listChosen.arr.forEach(function(item, i) {
                if (item.type === type) {
                    index = i;
                }
            });
        }
        return index;
    }

    $("body").delegate(".changeStyle", "click", function() {
        var id = $(this).data("id");
        var type = $(this).data("type");
        var name = $(this).data("name");
        var desc = $(this).data("desc");
        var imgsrc_jpg = $(this).data("imgsrcjpg");
        var imgsrc_png = $(this).data("imgsrcpng");
        var choseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgsrc_png);

        var index = findIndex(choseItem.type);
        if (index !== -1) {
            //update
            listChosen.arr[index] = choseItem;
        } else {
            listChosen.addItem(choseItem);
        }

        renderContent(listChosen.arr);
    });

    function renderContent(choseItems) {
        if (choseItems && choseItems.length > 0) {
            choseItems.forEach(function(item) {
                if (item.type === "topclothes") {
                    renderBikiniTop(item.imgsrc_png);
                    console
                }
                if (item.type === "botclothes") {
                    renderBikiniBottom(item.imgsrc_png);
                }
                if (item.type === "shoes") {
                    renderFeet(item.imgsrc_png);
                }
                if (item.type === "handbags") {
                    renderHandbags(item.imgsrc_png);
                }
                if (item.type === "necklaces") {
                    renderNecklace(item.imgsrc_png);
                }
                if (item.type === "hairstyle") {
                    renderHairstyle(item.imgsrc_png);
                }
                if (item.type === "background") {
                    renderBackground(item.imgsrc_png);
                }
            })
        }
    }

    function renderBikiniTop(img) {
        $(".bikinitop").css({
            width: "500px",
            height: "500px",
            background: `url(${img})`,
            position: "absolute",
            top: "-9%",
            left: "-5%",
            zIndex: "3",
            transform: "scale(0.5)"
        })
    }

    function renderBikiniBottom(img) {
        $(".bikinibottom").css({
            width: "500px",
            height: "500px",
            background: `url(${img})`,
            position: "absolute",
            top: "-9%",
            left: "-5%",
            zIndex: "3",
            transform: "scale(0.5)"
        })
    }

    function renderFeet(img) {
        $(".feet").css({
            width: "500px",
            height: "1000px",
            background: `url(${img})`,
            position: "absolute",
            bottom: "-37%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "1"
        })
    }

    function renderHandbags(img) {
        $(".handbag").css({
            width: "500px",
            height: "1000px",
            background: `url(${img})`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4"
        })
    }

    function renderNecklace(img) {
        $(".necklace").css({
            width: "500px",
            height: "1000px",
            background: `url(${img})`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4"
        })
    }

    function renderHairstyle(img) {
        $(".hairstyle").css({
            width: "1000px",
            height: "1000px",
            background: `url(${img})`,
            position: "absolute",
            top: "-75%",
            right: "-57%",
            transform: "scale(0.15)",
            zIndex: "4"
        })
    }

    function renderBackground(img) {
        $(".background").css({
            backgroundImage: `url(${img})`
        })
    }

});