var xml = new XMLHttpRequest();
xml.open('get', '/api/list', true);
xml.onreadystatechange = function() {
    if (xml.readyState == 4) {
        if (xml.status == 200) {
            var res = JSON.parse(xml.responseText);
            newdate = res;
            render(newdate.data);
        }
    }
}
xml.send();
var newdate;
var list = document.querySelector(".contentlist"); //渲染数据
function render(data) {
    var str = "";
    data.forEach(function(file) {
        str += `<li>
                    <div class="left"><img src=${file.img} alt=""></div>
                    <div class="right">
                        <div class="top">
                            <p class="name">${file.name}</p>
                            <p class="adress">${file.address}</p>
                        </div>

                        <div class="show">
                            <p><span class="price">${file.price}</span>${file.show}</p>
                            <span>${file.xiao}</span>
                        </div>
                    </div>
                </li>`
    })
    list.innerHTML += str;
}

//轮播图
var swiper = new Swiper(".swiper-container", {
    autoplay: true,
    pagination: {
        el: ".swiper-pagination"
    }
})

//上拉加载 下拉刷新
var pullDown = document.querySelector('.pullDown');
var pullUp = document.querySelector('.pullUp');

var Bscroll = new BScroll('.section', {
    probeType: 2,
    click: true,
    clickBar: true
})


Bscroll.on('scroll', function() {
    if (this.y < this.maxScrollY - 50) {
        pullUp.innerHTML = '释放加载更多...';
        pullUp.classList.add("filp");
    } else if (this.y < this.maxScrollY - 10) {
        pullUp.innerHTML = '上拉加载';
        pullUp.classList.remove("filp");
    } else if (this.y > 50) {
        pullDown.innerHTML = "释放刷新";
        pullDown.classList.add("filp");
    } else if (this.y > 10) {
        pullDown.innerHTML = "下拉刷新";
        pullDown.classList.remove("filp");
    }
})

Bscroll.on('scrollEnd', function() {
    if (pullUp.classList.contains('filp')) {
        pullUp.innerHTML = '上拉加载';
        pullUp.classList.remove("filp");
        pullup()
    } else if (pullDown.classList.contains('filp')) {
        pullDown.innerHTML = "下拉刷新";
        pullDown.classList.remove("filp");
        pulldown()
    }
})

function pulldown() {
    list.innerHTML = "";
    render(newdate.data);
    Bscroll.refresh();
}

function pullup() {
    render(newdate.data);
    Bscroll.refresh();
}