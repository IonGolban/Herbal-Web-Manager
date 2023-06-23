import {setButtons,isLoggedIn} from "./utilFunctions.js";
const tagCSVdownload = document.getElementById('tag-csv-button');
const tagPDFdownload = document.getElementById('tag-pdf-button');
const likeCSVdownload = document.getElementById('like-csv-button');
const likePDFdownload = document.getElementById('like-pdf-button');
const viewCSVdownload = document.getElementById('view-csv-button');
const viewPDFdownload = document.getElementById('view-pdf-button');
const viewsTableBody = document.getElementById('views-table-body');
const likesTableBody = document.getElementById('likes-table-body');
const tagsTableBody = document.getElementById('tags-table-body');


document.addEventListener("DOMContentLoaded", async () => {
    await setButtons();
    await appendData();
  
});

async function appendData() {
    const viewBody = await getData("view");
    const likeBody = await getData("like");
    const tagBody = await getData("tag");

    console.log(viewBody);
    console.log(likeBody);
    console.log(tagBody);

    appendToBody(viewBody, viewsTableBody);
    appendToBody(likeBody, likesTableBody);
    appendToBody(tagBody, tagsTableBody);



}

function appendToBody(data, tbody) {
    data.forEach((data) => {
        const tr = document.createElement('tr');
        const keyTd = document.createElement('td');
        const valueTd = document.createElement('td');
    
        keyTd.textContent = data.key;
        valueTd.textContent = data.value;
    
        tr.appendChild(keyTd);
        tr.appendChild(valueTd);
    
        tbody.appendChild(tr);
      });
}

async function getData(type) {
    try {
        const res = await fetch(`/statistics/data?type=${type}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
          }
        }).then(res => {
          if (res.status == 401) {
            window.location.href = "/login";
            alert("You are not logged in!");
          }else if(res.status == 500){
            alert("Internal server error");
          }

          return res;
        })
  
        const data = await res.json();
  
  
        return data;
  
      } catch (error) {
        console.log(error);
      }
}



async function downloadStats(type, statsType) {
    await fetch(`/statistics/download?type=${type}&statsType=${statsType}`)
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Error fetching statistics');
            }
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `stats-${statsType}.${type}`);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error(error);
        });
}

viewCSVdownload.addEventListener('click', async () => {
    await downloadStats("csv", "view");
});

viewPDFdownload.addEventListener('click', async () => {
    await downloadStats("pdf", "view");
}
);

likeCSVdownload.addEventListener('click', async () => {
    await downloadStats("csv", "like");
}
);

likePDFdownload.addEventListener('click', async () => {
    await downloadStats("pdf", "like");
}
);

tagCSVdownload.addEventListener('click', async () => {
    await downloadStats("csv", "tag");
}
);

tagPDFdownload.addEventListener('click', async () => {
    await downloadStats("pdf", "tag");
}
);




