// declare variables
const nameInput = document.getElementById("title")
const category = document.getElementById("category")
const image= document.getElementById("image")
const authorInput = document.getElementById("author")
const content = document.getElementById("blogContent")
const date = document.getElementById("date")

//  create card
function createCard(transport) {
    return`
    <div class="blog-card"style="background:rgba(245, 245, 245, 0.541):padding:24px;border:1px solid #eee;box-shadow:5px 5px 9px rgba(0,0,0,0.08);margin-bottom:16px;transition:all 0.3s ease;">
        <h3 style="font-size:1.25rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.title}</h3>
        <h2 style="font-size:1rem;font-weight:500;color:#000004;margin-botton:10px;">${transport.category}
        <img src="${transport.image}" alt="${transport.title}" width="260px">
        <h3 style="font-size:1rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.author}</h3>
        <p style="font-size:1rem;, color:#000004;">${transport.content}</p>
        <h3 style="font-size:1rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.date}</h3>
    </div>
    
    `

    
}
// fetch data from db.json
function fetchBlogs(){
    fetch("http://localhost:3000/transport")
    .then(res=>res.json())
    .then(Data=>{
        Data.forEach(transport=>{
            blogs.innerHTML += createCard(transport);

        })
          .catch(error => {
      console.error("Error fetching animals:", error);
      outputContainer.innerHTML = "<p>Error loading data</p>";
     });
      });
}

document.addEventListener("DOMContentLoaded", fetchBlogs);


// posting data from the html form to the server
const formContent = document.getElementById("myForm").addEventListener("submit", (event)=> {
    event.preventDefault();
      // Basic validation: check if it's a valid image URL
  const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
//  const isValidImage = validImageExtensions.some(ext =>
//   image.value.toLowerCase().endsWith(ext)
// );

//   if (!isValidImage) {
//     alert("Please enter a valid image URL (jpg, png, etc)");
//     return;
//   }
    // gets the value from the input fields and assigns it to the newBlog variable.
    const newBlog ={
        title:nameInput.value,
        category:category.value,
        image:image.value,
        author:authorInput.value,
        content:content.value,
        date:date.value,
    };
 fetch("http://localhost:3000/transport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  })
    .then((res) => res.json())
    .then((data) => {
      // Optionally add the new blog to the DOM immediately
      blogs.innerHTML += createCard(data);

      // Clear form
      document.getElementById("myForm").reset();
    })
    .catch((err) => console.error("POST error:", err));
});
