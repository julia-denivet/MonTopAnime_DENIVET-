const divManga = `
<div class="col-12 col-md-4 m-1">
    <div>
      <div class="card">
      <img style="width:500px;" src="__src__" class="card-img-top" />
      <div class="card-body">
          <h5 class="card-title">__top__. __title__</h5>
      </div>
      </div>
    </div>
</div>
`;

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  json.forEach((Top, i) => {
    const newDivManga = divManga
      .replace("__src__", Top.img_link)
      .replace("__top__", i + 1)
      .replace("__title__", Top.name);
    divList.appendChild(htmlToElement(newDivManga));
  });
};

const fetchLocal = (url) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(new Response(xhr.response, { status: xhr.status }));
    };
    xhr.onerror = function () {
      reject(new TypeError("Local request failed"));
    };
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
  });
};

const fetchApiMangas = () => {
  fetchLocal("api/Top.json").then((response) =>
    response.json().then(fetchApiDone)
  );
};

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchApiMangas);
} else {
  document.addEventListener("DOMContentLoaded", fetchApiMangas);
}
