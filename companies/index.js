// 'use strict';

let totalComp = document.getElementById('totalComp');
let dataList = document.getElementById('dataList');
let dataLocation = document.getElementById('dataLocation');
let dataNews = document.getElementById('dataNews');

(function fetchData() {

    let data1 = [];
    let data2 = [];
    let data3 = [];
    const request = new XMLHttpRequest;
    const url = 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList';

    request.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let list = '';
            let location = '';
            let myArrs = JSON.parse(this.responseText).list;
            // console.log(myArrs);
            myArrs.map((item) => {
                function partner(data) {
                    let html = '';
                    for(let i=0; i<data.length; i++){
                        html += `${data[i].name} ${data[i].value}% `;
                    }
                    return html;
                }
                let data = {
                    name: item.name,
                    location: item.location.name,
                    partners: partner(item.partners),
                };
                // tab = `<li>${data.partners}</li>`;
                list += `<a class="list-group-item list-group-item-action" href="#tab">${data.name}</a>`;
                location += `<li class="list-group-item">${data.location}</li>`;
            });
            let lenMyArrs = myArrs.length;
            data3.push(lenMyArrs);
            totalComp.innerHTML = data3;
            data2.push(location);
            dataLocation.innerHTML = data2;
            data1.push(list);
            dataList.innerHTML = data1;
        }
    }
    request.open('GET', url, true);
    request.send();
})();

//  let data4 = [];
//  let tabs = document.getElementById('tab');
//  let a = document.getElementsByTagName('a');
//  for(let i=0; i<a.length; i++){
//  a[i].addEventListener('click', isTab);
 
//  function isTab(event) {
//     let target = event.target;
//     for(let i= 0; i<a.length; i++){
//         if (target == a(i)){
//             showContent(i);
//             break;
//         }
//     }
// }
// }
// (function showContent(b) {
//      let content = `<div class="card border-secondary">
//                  <h5 class="card-header text-center">Partners</h5>
//                  <ul id="tab">
//                  <div class="tab-pane fade" id="tab">${data.partners[b]}</div></ul>
//              </div>`;
//      data4.push(content);
//      tabs.innerHTML = data4;
//  }).bind(data);

(function fetchNews() {
    let content = '';
    const requestNews = new XMLHttpRequest;
    const url1 = 'http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList';
    requestNews.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            let header = '';
            let body = '';
            let footer = '';
            let myArrs = JSON.parse(this.responseText).list;
            console.log(myArrs);

            myArrs.map((item, i) => {
                        let data = {
                            author: item.author,
                            date: new Date(item.date*1000),
                            description: item.description,
                            img: item.img,
                        };
                        let dataUni = data.date;
                        header = `<img src='${data.img}'>
                        <div class = "body"><p><b>Authors</b>: ${data.author}</p>
                                <p><b>Date</b>:${dataUni.toGMTString()}</p></div>`;
                        footer = `<p><b>Description</b>:${data.description}</p>`;

                         let className = 'carousel-item';
                         if (i == 0) {
                             className += ' active';
                         }
                        content += `<div class="${className}">
                                    ${header}
                                    ${body}
                                    ${footer}
                                    </div>`;
                    });
            dataNews.innerHTML = content;
        }
    }
    requestNews.open('GET', url1, true);
    requestNews.send();
})()