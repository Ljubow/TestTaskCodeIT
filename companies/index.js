// 'use strict';


let totalComp = document.getElementById('totalComp');
let dataList = document.getElementById('dataList');
let dataLocation = document.getElementById('dataLocation');
let dataNews = document.getElementById('dataNews');

(function fetchData() {
    let data1 = [];
    let data2 = [];
    let data3 = [];
    // const elem = document.querySelector('.row');
    const request = new XMLHttpRequest;
    const url = 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList';

    request.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            // let content = '';
            let list = '';
            let location = '';
            let myArrs = JSON.parse(this.responseText).list;
            // console.log(myArrs);

            myArrs.map((item) => {
                let data = {
                    name: item.name,
                    location: item.location.name,
                    partners: item.partners.name,
                };
                list += `<li class="list-group-item">${data.name}</li>`;
                location += `<li class="list-group-item">${data.location}</li>`;
            })

            let lenMyArrs = myArrs.length;
            data3.push(lenMyArrs);
            totalComp.innerHTML = data3;
            
            data2.push(location);
            dataLocation.innerHTML = data2;

            data1.push(list);
            dataList.innerHTML = data1;
            
        }
    };
    request.open('GET', url, true);
    request.send();
})();

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

            myArrs.map((item) => {
                        let data = {
                            author: item.author,
                            date: new Date(item.date*1000),
                            description: item.description,
                            img: item.img,
                        };
                        let dataUni = data.date;
                        header = `<div class="rounded center-block">
                               <img src='${data.img}'>
                           </div>`;
                        body = `<div class='card-body'>
                                 <p><b>Authors</b>: ${data.author}</p>
                                 <p><b>Date</b>:${dataUni.toGMTString()}</p>
                         </div>`;
                        footer = ` <p><b>Description</b>:${data.description}</p>`;
                        content += `${header}
                        <div class="container-fluid">
                                    ${body}
                                    ${footer}
                        </div>`;
                    });
                    let data = [];
                    console.log(content);
                    data.push(content);
                    dataNews.innerHTML = data;
        }
    };

    requestNews.open('GET', url1, true);
    requestNews.send();

})()