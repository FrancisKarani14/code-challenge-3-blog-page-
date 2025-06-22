// declare variables
const nameInput = document.getElementById("title");
const category = document.getElementById("category");
const image = document.getElementById("image");
const authorInput = document.getElementById("author");
const content = document.getElementById("blogContent");
const date = document.getElementById("date");


// create card
function createCard(transport) {
  return `
    <div class="blog-card" data-id="${transport.id}" style="background:rgba(245, 245, 245, 0.541); padding:24px; border:1px solid #eee; box-shadow:5px 5px 9px rgba(0,0,0,0.08); margin-bottom:16px; transition:all 0.3s ease;">
      <h3 style="font-size:1.25rem; font-weight:600; color:#000004; margin-bottom:8px;">${transport.title}</h3>
      <h2 style="font-size:1rem; font-weight:500; color:#000004; margin-bottom:10px;">${transport.category}</h2>
      <img src="${transport.image}" alt="${transport.title}" width="260px" style="display:block; margin:10px 0;">
      <h3 style="font-size:1rem; font-weight:600; color:#000004; margin-bottom:8px;">${transport.author}</h3>
      <p style="font-size:1rem; color:#000004;">${transport.content}</p>
      <h3 style="font-size:1rem; font-weight:600; color:#000004; margin-bottom:8px;">${transport.date}</h3>

      <button class="delete" style="background:#FF0000; color:#fff; padding:8px 12px; border:none; border-radius:4px; cursor:pointer; margin-right:10px;">
        <i class="fi fi-sr-trash"></i> Delete
      </button>
      <button class="update" style="background:#1efb03; color:#000; padding:8px 12px; border:none; border-radius:4px; cursor:pointer;">
        <i class="fi fi-sr-rotate-square"></i> Update
      </button>
    </div>
  `;
}

// fetch data from db.json
function fetchBlogs() {
  fetch("http://localhost:3000/transport")
    .then(res => res.json())
    .then(Data => {
      Data.forEach(transport => {
        blogs.innerHTML += createCard(transport);
      });
    })
    .catch(error => {
      console.error("Error fetching blogs:", error);
      blogs.innerHTML = "<p>Error loading data</p>";
    });
}

document.addEventListener("DOMContentLoaded", fetchBlogs);

// post new blog from form
document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

  const newBlog = {
    title: nameInput.value,
    category: category.value,
    image: image.value,
    author: authorInput.value,
    content: content.value,
    date: date.value,
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
      blogs.innerHTML += createCard(data);
      document.getElementById("myForm").reset();
    })
    .catch((err) => console.error("POST error:", err));
});

// delete blog post
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete") || event.target.closest(".delete")) {
    const blogCard = event.target.closest(".blog-card");
    const blogId = blogCard.dataset.id;

    if (confirm("Are you sure you want to delete this blog?")) {
      fetch(`http://localhost:3000/transport/${blogId}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete blog.");
          blogCard.remove();
        })
        .catch((err) => console.error("Delete error:", err));
    }
  }
});
