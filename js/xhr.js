const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};


const sendData = () => {
  sendHttpRequest('POST', "https://jsonplaceholder.typicode.com/posts", 
  [{
    "School":"Grammar School",
    "Major":"Science",
    "Type":"AA",
    "YearConferred":"2020"
    },
    {
    "School":"College",
    "Major":"Engineering",
    "Type":"BS",
    "YearConferred":"2025"
    },
    {
      "School":"University",
      "Major":"Engineering",
      "Type":"MS",
      "YearConferred":"2030"
      }
  ])
    .then(responseData => {
      console.log(responseData);
      const Obj = Object.values(responseData)
      const table = document.querySelector(".tbody")
      Obj.map((item,id)=>{
          if (id < Obj.length - 1) {
            table.innerHTML += `
            <tr>
                <td>${item.School}</td>
                <td>${item.Major}</td>
                <td>${item.Type}</td>
                <td>${item.YearConferred}</td>
            </tr>`
          }
        }
      )}
    )
    .catch(err => {
      console.log("Error",err);
    });
};

postBtn.addEventListener('click', sendData);
